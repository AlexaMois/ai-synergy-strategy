import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  company: string;
  industry: string;
  phone: string;
  email: string;
  comment?: string;
}

interface RequestBody {
  formType: string;
  data: ContactFormData;
  pageUrl: string;
}

const getPageName = (path: string): string => {
  const pageNames: Record<string, string> = {
    "/": "Главная",
    "/services": "Услуги",
    "/cases": "Кейсы",
    "/about": "Обо мне",
    "/blog": "Блог",
    "/resources": "Материалы",
    "/pricing": "Цены",
    "/checklist": "Чек-лист",
    "/golossok-demo": "GolossOK Демо",
    "/golossok-pricing": "GolossOK Цены",
    "/case-studies/kraypotrebsoyuz": "Кейс: Крайпотребсоюз",
    "/case-studies/cargo-express": "Кейс: Грузовой Экспресс",
    "/case-studies/doc-search": "Кейс: DocSearch",
  };
  return pageNames[path] || path;
};

const formatDateTime = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Moscow",
  };
  return now.toLocaleString("ru-RU", options);
};

const formatMessage = (formType: string, data: ContactFormData, pageUrl: string): string => {
  const pageName = getPageName(pageUrl);
  const dateTime = formatDateTime();

  let message = `📊 <b>Новая заявка с сайта:</b>\n\n`;
  message += `👤 <b>Имя:</b> ${escapeHtml(data.name)}\n`;
  message += `🏢 <b>Компания:</b> ${escapeHtml(data.company)}\n`;
  message += `🏭 <b>Отрасль:</b> ${escapeHtml(data.industry)}\n`;
  message += `📞 <b>Телефон:</b> ${escapeHtml(data.phone)}\n`;
  message += `📧 <b>Email:</b> ${escapeHtml(data.email)}\n`;
  
  if (data.comment && data.comment.trim()) {
    message += `💬 <b>Комментарий:</b> ${escapeHtml(data.comment)}\n`;
  }
  
  message += `\n📍 <b>Страница:</b> ${escapeHtml(pageName)}\n`;
  message += `🕐 <b>Время отправки:</b> ${dateTime}`;

  return message;
};

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      throw new Error("Telegram configuration is missing");
    }

    const { formType, data, pageUrl }: RequestBody = await req.json();

    console.log("Received form submission:", { formType, pageUrl, data: { ...data, phone: "***", email: "***" } });

    const message = formatMessage(formType, data, pageUrl);

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error("Telegram API error:", telegramResult);
      throw new Error(`Telegram API error: ${telegramResult.description}`);
    }

    console.log("Message sent successfully to Telegram");

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-to-telegram function:", error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
