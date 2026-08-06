// Уведомление в Telegram БЕЗ персональных данных.
// Передаётся только: номер записи в Bpium (или внутренний номер), название формы/страницы и время.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://aleksamois.ru",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Только служебные поля. Персональные данные не принимаются и не пересылаются.
const RequestBodySchema = z.object({
  formName: z.string().trim().min(1).max(80),
  recordId: z.string().trim().max(64).optional(),
  pageUrl: z.string().trim().max(200).optional(),
  website: z.string().max(0).optional(), // honeypot
});

// IP используется только in-memory для ограничения частоты и никогда не логируется.
const rateKey = async (req: Request): Promise<string> => {
  const raw =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(digest).slice(0, 8))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const checkRateLimit = (key: string): boolean => {
  const now = Date.now();
  const rec = rateLimitStore.get(key);
  if (!rec || rec.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (rec.count >= MAX_REQUESTS_PER_WINDOW) return false;
  rec.count++;
  return true;
};

const formatDateTime = (): string =>
  new Date().toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Krasnoyarsk",
  });

const escapeHtml = (t: string): string =>
  t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const requestId = crypto.randomUUID();
  const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("telegram_config_missing", requestId);
      return json({ success: false, error: "Notification channel is not configured" }, 500);
    }

    if (!checkRateLimit(await rateKey(req))) {
      return json({ success: false, error: "Слишком много запросов. Попробуйте позже." }, 429);
    }

    const parsed = RequestBodySchema.safeParse(await req.json());
    if (!parsed.success) {
      console.error("validation_error", requestId);
      return json({ success: false, error: "Invalid input data" }, 400);
    }

    const { formName, recordId, pageUrl, website } = parsed.data;
    if (website && website.length > 0) return json({ success: true });

    let message = `🔔 <b>Новая заявка с сайта</b>\n\n`;
    message += `📄 <b>Форма:</b> ${escapeHtml(formName)}\n`;
    if (pageUrl) message += `📍 <b>Страница:</b> ${escapeHtml(pageUrl)}\n`;
    message += `🔢 <b>Номер записи:</b> ${recordId ? escapeHtml(recordId) : "не присвоен"}\n`;
    message += `🕐 <b>Время:</b> ${formatDateTime()}\n\n`;
    message += `Данные заявки — в CRM. В уведомлении персональные данные не передаются.`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: "HTML" }),
      },
    );

    if (!telegramResponse.ok) {
      console.error("telegram_error", telegramResponse.status, requestId);
      return json({ success: false, error: "Notification failed" }, 502);
    }

    console.log("notification_sent", requestId);
    return json({ success: true });
  } catch (_error) {
    console.error("request_failed", requestId);
    return json({ success: false, error: "Request processing failed" }, 500);
  }
});
