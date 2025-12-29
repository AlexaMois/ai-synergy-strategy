import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

// Restrict CORS to production domain
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://aleksamois.ru",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schemas
const ContactFormSchema = z.object({
  name: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  industry: z.string().min(1).max(100),
  phone: z.string().min(1).max(30),
  email: z.string().email().max(255),
  comment: z.string().max(1000).optional(),
});

const DiagnosticResultsSchema = z.object({
  painPoints: z.array(z.string().max(200)).max(10),
  employeeCount: z.number().int().min(1).max(100000),
  avgSalary: z.number().min(0).max(10000000),
  routineTimeShare: z.number().min(0).max(1),
  potentialSavingsMin: z.number().min(0),
  potentialSavingsMax: z.number().min(0),
  roi: z.number().min(0).max(10000),
});

const RequestBodySchema = z.object({
  formType: z.string().max(50),
  data: ContactFormSchema,
  pageUrl: z.string().max(500),
  diagnosticResults: DiagnosticResultsSchema.optional(),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;
type DiagnosticResults = z.infer<typeof DiagnosticResultsSchema>;

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
    "/start": "AI-диагностика",
    "/case-studies/kraypotrebsoyuz": "Кейс: Крайпотребсоюз",
    "/case-studies/cargo-express": "Кейс: Грузовой Экспресс",
    "/case-studies/doc-search": "Кейс: DocSearch",
  };
  return pageNames[path] || truncate(path, 50);
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

const formatCurrency = (value: number): string => {
  return value.toLocaleString("ru-RU");
};

const truncate = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

const formatMessage = (
  formType: string,
  data: ContactFormData,
  pageUrl: string,
  diagnosticResults?: DiagnosticResults
): string => {
  const pageName = getPageName(pageUrl);
  const dateTime = formatDateTime();

  let message = "";

  // Different header for AI diagnostic
  if (formType === "ai-diagnostic" || diagnosticResults) {
    message = `🤖 <b>AI-ДИАГНОСТИКА с сайта</b>\n\n`;
  } else {
    message = `📊 <b>Новая заявка с сайта:</b>\n\n`;
  }

  message += `👤 <b>Имя:</b> ${escapeHtml(truncate(data.name, 100))}\n`;
  message += `🏢 <b>Компания:</b> ${escapeHtml(truncate(data.company, 100))}\n`;
  message += `🏭 <b>Отрасль:</b> ${escapeHtml(truncate(data.industry, 100))}\n`;
  message += `📞 <b>Телефон:</b> ${escapeHtml(truncate(data.phone, 30))}\n`;
  message += `📧 <b>Email:</b> ${escapeHtml(truncate(data.email, 255))}\n`;

  // Add diagnostic results if present
  if (diagnosticResults) {
    message += `\n━━━ <b>РЕЗУЛЬТАТЫ ДИАГНОСТИКИ</b> ━━━\n\n`;

    message += `🔹 <b>Выбранные боли:</b>\n`;
    diagnosticResults.painPoints.slice(0, 10).forEach((point) => {
      message += `  • ${escapeHtml(truncate(point, 200))}\n`;
    });

    message += `\n🔹 <b>Параметры:</b>\n`;
    message += `  • Сотрудников: ${diagnosticResults.employeeCount}\n`;
    message += `  • Ср. зарплата: ${formatCurrency(diagnosticResults.avgSalary)} ₽\n`;
    message += `  • Доля времени: ${Math.round(diagnosticResults.routineTimeShare * 100)}%\n`;

    message += `\n🔹 <b>Расчёт:</b>\n`;
    message += `  • Потенциал экономии: ${formatCurrency(diagnosticResults.potentialSavingsMin)} – ${formatCurrency(diagnosticResults.potentialSavingsMax)} ₽/год\n`;
    message += `  • ROI: ${diagnosticResults.roi}%\n`;
  }

  if (data.comment && data.comment.trim()) {
    message += `\n💬 <b>Комментарий:</b>\n${escapeHtml(truncate(data.comment, 1000))}\n`;
  }

  message += `\n📍 <b>Страница:</b> ${escapeHtml(pageName)}\n`;
  message += `🕐 <b>Время отправки:</b> ${dateTime}`;

  return message;
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

    // Parse and validate input with Zod
    const rawBody = await req.json();
    const validationResult = RequestBodySchema.safeParse(rawBody);

    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error.flatten());
      return new Response(
        JSON.stringify({ success: false, error: "Invalid input data" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { formType, data, pageUrl, diagnosticResults } = validationResult.data;

    console.log("Received valid form submission:", {
      formType,
      pageUrl,
      hasDiagnosticResults: !!diagnosticResults,
      dataFields: Object.keys(data),
    });

    const message = formatMessage(formType, data, pageUrl, diagnosticResults);

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

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-to-telegram function:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Request processing failed" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
