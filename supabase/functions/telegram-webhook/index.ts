import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { decode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN') ?? '';
const TELEGRAM_ADMIN_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID') ?? '';

// Restricted CORS - webhook primarily receives from Telegram, but allow production domain for testing
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://aleksamois.ru',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory store for users waiting to ask a question
const awaitingQuestionUsers = new Map<number, { leadId: string; name: string }>();

// HTML escape function to prevent injection in Telegram messages
function escapeHtml(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

async function sendTelegramMessage(chatId: number | string, text: string, parseMode = 'HTML', replyMarkup?: object) {
  const body: Record<string, unknown> = {
    chat_id: chatId,
    text,
    parse_mode: parseMode
  };
  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return response.json();
}

async function sendTelegramDocument(chatId: number | string, pdfBase64: string, filename: string, caption: string, replyMarkup?: object) {
  // Decode base64 to Uint8Array and convert to ArrayBuffer
  const pdfBytes = decode(pdfBase64);
  const arrayBuffer = pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength) as ArrayBuffer;
  
  const formData = new FormData();
  formData.append('chat_id', String(chatId));
  formData.append('document', new Blob([arrayBuffer], { type: 'application/pdf' }), filename);
  formData.append('caption', caption);
  formData.append('parse_mode', 'HTML');
  if (replyMarkup) {
    formData.append('reply_markup', JSON.stringify(replyMarkup));
  }

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
    method: 'POST',
    body: formData
  });
  return response.json();
}

async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text: text || ''
    })
  });
  return response.json();
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(amount);
}

function formatNumber(amount: number): string {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(amount);
}

function getReadinessEmoji(level: string): string {
  switch (level) {
    case 'high': return '🟢';
    case 'medium': return '🟡';
    case 'low': return '🔴';
    default: return '⚪';
  }
}

function getReadinessText(level: string): string {
  switch (level) {
    case 'high': return 'Высокая';
    case 'medium': return 'Средняя';
    case 'low': return 'Низкая';
    default: return level;
  }
}

// Validate and sanitize Telegram username (alphanumeric and underscores only)
function sanitizeTelegramUsername(username: string): string {
  const cleaned = username.replace(/^@/, '').trim();
  // Telegram usernames: 5-32 chars, alphanumeric and underscores only
  if (/^[a-zA-Z0-9_]{5,32}$/.test(cleaned)) {
    return cleaned;
  }
  return '';
}

// Validate and format phone number
function sanitizePhone(phone: string): string {
  // Keep only digits and leading +
  return phone.replace(/[^\d+]/g, '').slice(0, 20);
}

// Inline keyboard for actions after PDF
function getActionButtons(leadId: string) {
  return {
    inline_keyboard: [
      [
        { text: '📞 Записаться на созвон (10–15 мин)', callback_data: `call_${leadId}` }
      ],
      [
        { text: '❓ Задать вопрос', callback_data: `question_${leadId}` }
      ]
    ]
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify Telegram secret token to prevent forged webhook requests.
    // Configure via setWebhook?secret_token=<TELEGRAM_WEBHOOK_SECRET>
    const expectedSecret = Deno.env.get('TELEGRAM_WEBHOOK_SECRET') ?? '';
    const providedSecret = req.headers.get('x-telegram-bot-api-secret-token') ?? '';
    if (!expectedSecret || providedSecret !== expectedSecret) {
      console.warn('Rejected webhook: invalid or missing secret token');
      return new Response('Forbidden', { status: 403, headers: corsHeaders });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const update = await req.json();
    console.log('Telegram webhook received:', JSON.stringify(update, null, 2));

    // Handle callback queries (inline button clicks)
    if (update.callback_query) {
      const callbackQuery = update.callback_query;
      const chatId = callbackQuery.message?.chat?.id;
      const data = callbackQuery.data || '';
      
      console.log(`Callback query: ${data} from chat ${chatId}`);
      
      // Parse callback data
      if (data.startsWith('call_')) {
        const leadId = data.replace('call_', '');
        
        // Find lead
        const { data: lead, error } = await supabase
          .from('leads')
          .select('*')
          .eq('lead_id', leadId)
          .maybeSingle();
        
        if (lead && !error) {
          const safeName = escapeHtml(lead.name);
          const safeIndustry = escapeHtml(lead.industry);
          
          // Validate and format telegram username for clickable link
          const tgUsername = sanitizeTelegramUsername(lead.telegram_nick);
          const tgLink = tgUsername 
            ? `<a href="https://t.me/${tgUsername}">@${tgUsername}</a>`
            : escapeHtml(lead.telegram_nick);
          
          // Validate and format phone for clickable link
          const phoneClean = sanitizePhone(lead.phone);
          const phoneDisplay = escapeHtml(lead.phone);
          const phoneLink = phoneClean ? `<a href="tel:${phoneClean}">${phoneDisplay}</a>` : phoneDisplay;
          
          // Send notification to admin
          const adminMessage = `
📞 <b>ЗАПРОС НА СОЗВОН</b>

👤 <b>Имя:</b> ${safeName}
📱 <b>Telegram:</b> ${tgLink}
📞 <b>Телефон:</b> ${phoneLink}
🏢 <b>Сфера:</b> ${safeIndustry}

💰 <b>Потенциал:</b> ${formatCurrency(lead.min_savings)} – ${formatCurrency(lead.max_savings)}/год

🆔 Lead ID: ${lead.lead_id}
          `.trim();
          
          await sendTelegramMessage(TELEGRAM_ADMIN_CHAT_ID, adminMessage);
          
          // Confirm to user
          await sendTelegramMessage(chatId, '✅ Отлично! Я передала вашу заявку. Свяжусь в ближайшее время, чтобы согласовать удобное время.\n\nТел.: +7 993 721 73 67');
        }
        
        await answerCallbackQuery(callbackQuery.id, 'Заявка отправлена!');
        
      } else if (data.startsWith('question_')) {
        const leadId = data.replace('question_', '');
        
        // Find lead to get the name
        const { data: lead } = await supabase
          .from('leads')
          .select('name')
          .eq('lead_id', leadId)
          .maybeSingle();
        
        // Store that this user is waiting to ask a question
        if (chatId) {
          awaitingQuestionUsers.set(chatId, { 
            leadId, 
            name: lead?.name || 'Неизвестный' 
          });
        }
        
        await sendTelegramMessage(chatId, '✍️ Напишите ваш вопрос, и я передам его Александре:');
        await answerCallbackQuery(callbackQuery.id);
      }
      
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Handle regular text messages (for question flow)
    if (update.message?.text && !update.message.text.startsWith('/')) {
      const chatId = update.message.chat.id;
      const userQuestion = update.message.text;
      
      // Check if user was waiting to ask a question
      const pendingQuestion = awaitingQuestionUsers.get(chatId);
      if (pendingQuestion) {
        // Forward question to admin
        const safeQuestion = escapeHtml(userQuestion);
        const safeName = escapeHtml(pendingQuestion.name);
        
        // Find lead for more context
        const { data: lead } = await supabase
          .from('leads')
          .select('telegram_nick, phone')
          .eq('lead_id', pendingQuestion.leadId)
          .maybeSingle();
        
        let contactInfo = '';
        if (lead) {
          const tgUsername = sanitizeTelegramUsername(lead.telegram_nick);
          const tgLink = tgUsername 
            ? `<a href="https://t.me/${tgUsername}">@${tgUsername}</a>`
            : escapeHtml(lead.telegram_nick);
          
          const phoneClean = sanitizePhone(lead.phone);
          const phoneDisplay = escapeHtml(lead.phone);
          const phoneLink = phoneClean ? `<a href="tel:${phoneClean}">${phoneDisplay}</a>` : phoneDisplay;
          
          contactInfo = `\n📱 <b>Telegram:</b> ${tgLink}\n📞 <b>Телефон:</b> ${phoneLink}`;
        }
        
        const adminMessage = `
❓ <b>ВОПРОС ОТ ЛИДА</b>

👤 <b>От:</b> ${safeName}${contactInfo}

💬 <b>Вопрос:</b>
${safeQuestion}

🆔 Lead ID: ${pendingQuestion.leadId}
        `.trim();
        
        await sendTelegramMessage(TELEGRAM_ADMIN_CHAT_ID, adminMessage);
        
        // Confirm to user
        await sendTelegramMessage(chatId, '✅ Вопрос отправлен! Александра ответит вам в ближайшее время.');
        
        // Clear pending state
        awaitingQuestionUsers.delete(chatId);
        
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // Handle /start command
    if (update.message?.text?.startsWith('/start')) {
      const chatId = update.message.chat.id;
      const parts = update.message.text.split(' ');
      
      if (parts.length > 1) {
        const leadId = parts[1];
        console.log(`Processing /start with lead_id: ${leadId}`);

        // Find lead by lead_id
        const { data: lead, error: findError } = await supabase
          .from('leads')
          .select('*')
          .eq('lead_id', leadId)
          .maybeSingle();

        if (findError || !lead) {
          console.error('Lead not found:', findError);
          await sendTelegramMessage(chatId, '❌ Ссылка недействительна или устарела.');
          return new Response(JSON.stringify({ ok: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // Update lead with chat_id
        const { error: updateError } = await supabase
          .from('leads')
          .update({ chat_id: chatId })
          .eq('lead_id', leadId);

        if (updateError) {
          console.error('Error updating lead:', updateError);
        }

        // Escape user-provided data for HTML messages
        const safeName = escapeHtml(lead.name);
        const safeIndustry = escapeHtml(lead.industry);
        const safePainPoints = lead.pain_points.map((p: string) => escapeHtml(p));
        
        // Get inline buttons
        const actionButtons = getActionButtons(leadId);

        // Send PDF if available
        if (lead.pdf_base64) {
          console.log('Sending PDF to user...');
          const today = new Date().toLocaleDateString('ru-RU').replace(/\./g, '-');
          const filename = `AI-Diagnostic-Brief-${today}.pdf`;
          
          // Format effect range (numbers only, currency in text)
          const effectRange = `${formatNumber(lead.min_savings)} – ${formatNumber(lead.max_savings)}`;
          
          const caption = `${safeName}, добрый день.

Ваш диагностический брифинг готов — отправляю PDF.

Ключевое: потенциал ${effectRange} ₽/год, готовность к ИИ — ${getReadinessText(lead.ai_readiness_level).toLowerCase()}.`;

          const sendResult = await sendTelegramDocument(chatId, lead.pdf_base64, filename, caption, actionButtons);
          console.log('PDF send result:', JSON.stringify(sendResult, null, 2));
          
          if (!sendResult.ok) {
            // Fallback to text message if PDF fails
            console.error('Failed to send PDF, sending text message');
            await sendTelegramMessage(chatId, caption, 'HTML', actionButtons);
          }
        } else {
          // No PDF, send text summary with escaped user input
          const userMessage = `
🎯 <b>Ваш отчёт готов!</b>

👤 <b>${safeName}</b>
📊 Сфера: ${safeIndustry}

━━━━━━━━━━━━━━━━━━━━━

${getReadinessEmoji(lead.ai_readiness_level)} <b>AI-готовность:</b> ${getReadinessText(lead.ai_readiness_level)}

💰 <b>Потенциальная экономия:</b>
${formatCurrency(lead.min_savings)} – ${formatCurrency(lead.max_savings)} в год

📈 <b>Ожидаемый ROI:</b> ${Math.round(lead.roi * 100)}%

🔥 <b>Выявленные точки роста:</b>
${safePainPoints.map((p: string) => `• ${p}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━

📩 Скоро с вами свяжется консультант для разбора вашей ситуации.
          `.trim();

          await sendTelegramMessage(chatId, userMessage, 'HTML', actionButtons);
        }

        // Mark as pdf_sent
        await supabase
          .from('leads')
          .update({ pdf_sent: true })
          .eq('lead_id', leadId);

        // Send admin notification with sanitized data
        if (TELEGRAM_ADMIN_CHAT_ID && !lead.admin_notified) {
          // Validate and format telegram username for clickable link
          const tgUsername = sanitizeTelegramUsername(lead.telegram_nick);
          const tgLink = tgUsername 
            ? `<a href="https://t.me/${tgUsername}">@${tgUsername}</a>`
            : escapeHtml(lead.telegram_nick);
          
          // Validate and format phone for clickable link
          const phoneClean = sanitizePhone(lead.phone);
          const phoneDisplay = escapeHtml(lead.phone);
          const phoneLink = phoneClean ? `<a href="tel:${phoneClean}">${phoneDisplay}</a>` : phoneDisplay;
          
          const adminMessage = `
🔔 <b>НОВЫЙ ЛИД ИЗ КАЛЬКУЛЯТОРА</b>

👤 <b>Имя:</b> ${safeName}
📱 <b>Telegram:</b> ${tgLink}
📞 <b>Телефон:</b> ${phoneLink}
🏢 <b>Сфера:</b> ${safeIndustry}

━━━━━━━━━━━━━━━━━━━━━

📊 <b>Данные диагностики:</b>
• Сотрудников: ${lead.employee_count}
• Ср. зарплата: ${formatCurrency(lead.avg_salary)}
• Рутина: ${Math.round(lead.routine_time_share * 100)}%

${getReadinessEmoji(lead.ai_readiness_level)} <b>AI-готовность:</b> ${getReadinessText(lead.ai_readiness_level)}

💰 <b>Потенциал:</b> ${formatCurrency(lead.min_savings)} – ${formatCurrency(lead.max_savings)}/год
📈 <b>ROI:</b> ${Math.round(lead.roi * 100)}%

🔥 <b>Боли:</b>
${safePainPoints.map((p: string) => `• ${p}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━
🆔 Lead ID: ${lead.lead_id}
          `.trim();

          await sendTelegramMessage(TELEGRAM_ADMIN_CHAT_ID, adminMessage);

          // Mark admin as notified
          await supabase
            .from('leads')
            .update({ admin_notified: true })
            .eq('lead_id', leadId);
        }

      } else {
        // Regular /start without lead_id
        await sendTelegramMessage(
          chatId,
          '👋 Привет! Это бот для получения AI-отчётов.\n\nПерейдите по ссылке из калькулятора, чтобы получить ваш персональный отчёт.'
        );
      }
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
