import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { decode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN') ?? '';
const TELEGRAM_ADMIN_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID') ?? '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function sendTelegramMessage(chatId: number | string, text: string, parseMode = 'HTML') {
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: parseMode
    })
  });
  return response.json();
}

async function sendTelegramDocument(chatId: number | string, pdfBase64: string, filename: string, caption: string) {
  // Decode base64 to Uint8Array and convert to ArrayBuffer
  const pdfBytes = decode(pdfBase64);
  const arrayBuffer = pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength) as ArrayBuffer;
  
  const formData = new FormData();
  formData.append('chat_id', String(chatId));
  formData.append('document', new Blob([arrayBuffer], { type: 'application/pdf' }), filename);
  formData.append('caption', caption);
  formData.append('parse_mode', 'HTML');

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
    method: 'POST',
    body: formData
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const update = await req.json();
    console.log('Telegram webhook received:', JSON.stringify(update, null, 2));

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

        // Send PDF if available
        if (lead.pdf_base64) {
          console.log('Sending PDF to user...');
          const today = new Date().toLocaleDateString('ru-RU').replace(/\./g, '-');
          const filename = `AI-Diagnostic-Brief-${today}.pdf`;
          
          const caption = `🎯 <b>Ваш диагностический отчёт готов!</b>

👤 ${lead.name}
📊 Сфера: ${lead.industry}

${getReadinessEmoji(lead.ai_readiness_level)} AI-готовность: ${getReadinessText(lead.ai_readiness_level)}
💰 Потенциал: ${formatCurrency(lead.min_savings)} – ${formatCurrency(lead.max_savings)}/год

📩 Скоро с вами свяжется консультант`;

          const sendResult = await sendTelegramDocument(chatId, lead.pdf_base64, filename, caption);
          console.log('PDF send result:', JSON.stringify(sendResult, null, 2));
          
          if (!sendResult.ok) {
            // Fallback to text message if PDF fails
            console.error('Failed to send PDF, sending text message');
            await sendTelegramMessage(chatId, caption);
          }
        } else {
          // No PDF, send text summary
          const userMessage = `
🎯 <b>Ваш отчёт готов!</b>

👤 <b>${lead.name}</b>
📊 Сфера: ${lead.industry}

━━━━━━━━━━━━━━━━━━━━━

${getReadinessEmoji(lead.ai_readiness_level)} <b>AI-готовность:</b> ${getReadinessText(lead.ai_readiness_level)}

💰 <b>Потенциальная экономия:</b>
${formatCurrency(lead.min_savings)} – ${formatCurrency(lead.max_savings)} в год

📈 <b>Ожидаемый ROI:</b> ${Math.round(lead.roi * 100)}%

🔥 <b>Выявленные точки роста:</b>
${lead.pain_points.map((p: string) => `• ${p}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━

📩 Скоро с вами свяжется консультант для разбора вашей ситуации.
          `.trim();

          await sendTelegramMessage(chatId, userMessage);
        }

        // Mark as pdf_sent
        await supabase
          .from('leads')
          .update({ pdf_sent: true })
          .eq('lead_id', leadId);

        // Send admin notification
        if (TELEGRAM_ADMIN_CHAT_ID && !lead.admin_notified) {
          const adminMessage = `
🔔 <b>НОВЫЙ ЛИД ИЗ КАЛЬКУЛЯТОРА</b>

👤 <b>Имя:</b> ${lead.name}
📱 <b>Telegram:</b> ${lead.telegram_nick}
📞 <b>Телефон:</b> ${lead.phone}
🏢 <b>Сфера:</b> ${lead.industry}

━━━━━━━━━━━━━━━━━━━━━

📊 <b>Данные диагностики:</b>
• Сотрудников: ${lead.employee_count}
• Ср. зарплата: ${formatCurrency(lead.avg_salary)}
• Рутина: ${Math.round(lead.routine_time_share * 100)}%

${getReadinessEmoji(lead.ai_readiness_level)} <b>AI-готовность:</b> ${getReadinessText(lead.ai_readiness_level)}

💰 <b>Потенциал:</b> ${formatCurrency(lead.min_savings)} – ${formatCurrency(lead.max_savings)}/год
📈 <b>ROI:</b> ${Math.round(lead.roi * 100)}%

🔥 <b>Боли:</b>
${lead.pain_points.map((p: string) => `• ${p}`).join('\n')}

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