import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

// Allowed origins for CORS - restrict to production domain
const ALLOWED_ORIGINS = [
  "https://aleksamois.ru",
  "https://www.aleksamois.ru",
  // Allow preview domains during development
  "http://localhost:8080",
  "http://localhost:5173",
];

const getCorsHeaders = (origin: string | null): Record<string, string> => {
  // Check if origin is in allowed list, or allow preview domains
  const isAllowed = origin && (
    ALLOWED_ORIGINS.includes(origin) ||
    origin.includes(".lovableproject.com") ||
    origin.includes(".lovable.app")
  );
  
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
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

// Input validation
const validateInput = (data: ContactFormData): { valid: boolean; error?: string } => {
  // Name validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    return { valid: false, error: "Name is required" };
  }
  if (data.name.length > 100) {
    return { valid: false, error: "Name is too long (max 100 characters)" };
  }

  // Company validation
  if (!data.company || typeof data.company !== 'string' || data.company.trim().length === 0) {
    return { valid: false, error: "Company is required" };
  }
  if (data.company.length > 200) {
    return { valid: false, error: "Company name is too long (max 200 characters)" };
  }

  // Industry validation
  if (!data.industry || typeof data.industry !== 'string' || data.industry.trim().length === 0) {
    return { valid: false, error: "Industry is required" };
  }
  if (data.industry.length > 100) {
    return { valid: false, error: "Industry is too long (max 100 characters)" };
  }

  // Phone validation - basic format check
  if (!data.phone || typeof data.phone !== 'string' || data.phone.trim().length === 0) {
    return { valid: false, error: "Phone is required" };
  }
  const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
  if (!phoneRegex.test(data.phone.trim())) {
    return { valid: false, error: "Invalid phone format" };
  }

  // Email validation
  if (!data.email || typeof data.email !== 'string' || data.email.trim().length === 0) {
    return { valid: false, error: "Email is required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim())) {
    return { valid: false, error: "Invalid email format" };
  }
  if (data.email.length > 255) {
    return { valid: false, error: "Email is too long (max 255 characters)" };
  }

  // Comment validation (optional)
  if (data.comment && data.comment.length > 2000) {
    return { valid: false, error: "Comment is too long (max 2000 characters)" };
  }

  return { valid: true };
};

const getPageName = (path: string): string => {
  const pageNames: Record<string, string> = {
    "/": "Главная",
    "/services": "Услуги",
    "/services/diagnostics": "Диагностика",
    "/services/architecture": "Архитектура",
    "/services/support": "Сопровождение",
    "/services/add-ons": "Доп. решения",
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
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST method
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      throw new Error("Telegram configuration is missing");
    }

    const { formType, data, pageUrl }: RequestBody = await req.json();

    // Validate input data
    const validation = validateInput(data);
    if (!validation.valid) {
      console.warn("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ success: false, error: validation.error }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Received form submission:", { formType, pageUrl, origin });

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