import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

// Rate limiting: Simple in-memory store (resets on function cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests per minute per IP

// Allowed origins for CORS - restrict to production domain
const ALLOWED_ORIGINS = [
  'https://aleksamois.ru',
  'https://www.aleksamois.ru',
  'https://aleksamois.lovable.app'
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) 
    ? origin 
    : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
};

// Server-side schema validation
const contactDataSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  company: z.string().trim().min(1, "Company is required").max(100, "Company too long"),
  industry: z.string().trim().min(1, "Industry is required").max(100, "Industry too long"),
  phone: z.string().trim().min(1, "Phone is required").max(30, "Phone too long"),
  email: z.string().trim().email("Invalid email").max(255, "Email too long"),
  comment: z.string().max(1000, "Comment too long").optional(),
});

const requestBodySchema = z.object({
  formType: z.literal("contact"),
  data: contactDataSchema,
  pageUrl: z.string().min(1).max(500),
});

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

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

const formatMessage = (data: z.infer<typeof contactDataSchema>, pageUrl: string): string => {
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

const checkRateLimit = (clientIp: string): { allowed: boolean; retryAfter?: number } => {
  const now = Date.now();
  const record = rateLimitStore.get(clientIp);

  // Clean up expired entries periodically
  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitStore.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
};

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Only allow POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Rate limiting check
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    const rateLimitResult = checkRateLimit(clientIp);
    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ success: false, error: "Too many requests. Please try again later." }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": String(rateLimitResult.retryAfter || 60)
          } 
        }
      );
    }

    // Check Telegram configuration
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      throw new Error("Server configuration error");
    }

    // Parse and validate request body
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      console.error("Invalid JSON in request body");
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validationResult = requestBodySchema.safeParse(rawBody);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => `${e.path.join(".")}: ${e.message}`).join(", ");
      console.error("Validation failed:", errors);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid input data", details: errors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data, pageUrl } = validationResult.data;

    console.log("Received valid form submission:", { 
      pageUrl, 
      name: data.name.substring(0, 20), 
      company: data.company.substring(0, 20),
      hasComment: !!data.comment 
    });

    const message = formatMessage(data, pageUrl);

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
      throw new Error("Failed to send message");
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
      JSON.stringify({ success: false, error: "An error occurred. Please try again." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
