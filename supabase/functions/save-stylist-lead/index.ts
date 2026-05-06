import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const AnswerItemSchema = z.object({
  question: z.string().min(1).max(300),
  value: z.union([z.string().max(2000), z.array(z.string().max(500)).max(30), z.number()]),
});

const SaveStylistLeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  contact: z.string().trim().min(1).max(100),
  contact_type: z.enum(["telegram", "phone"]).default("telegram"),
  answers: z.array(AnswerItemSchema).max(50),
  website: z.string().max(0).optional(), // honeypot
});

function checkRateLimit(key: string, maxRequests: number) {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  if (!entry || now > entry.resetAt) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(key, { count: 1, resetAt });
    return { allowed: true, resetAt };
  }
  if (entry.count >= maxRequests) return { allowed: false, resetAt: entry.resetAt };
  entry.count++;
  return { allowed: true, resetAt: entry.resetAt };
}

function getClientIP(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function formatDateTime(): string {
  return new Date().toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Moscow",
  });
}

function formatTelegramMessage(
  leadId: string,
  name: string,
  contact: string,
  contactType: string,
  answers: Array<{ question: string; value: string | string[] | number }>,
): string {
  let msg = `👗 <b>НейроСтилист — новая анкета</b>\n\n`;
  msg += `👤 <b>Имя:</b> ${escapeHtml(name)}\n`;
  const contactIcon = contactType === "phone" ? "📞" : "💬";
  msg += `${contactIcon} <b>Контакт:</b> ${escapeHtml(contact)}\n`;
  msg += `🆔 <b>ID:</b> ${escapeHtml(leadId)}\n`;
  msg += `🕐 <b>Время:</b> ${formatDateTime()} (МСК)\n`;
  msg += `\n━━━ <b>ОТВЕТЫ</b> ━━━\n`;
  for (const a of answers) {
    const v = Array.isArray(a.value) ? a.value.join(", ") : String(a.value);
    if (!v.trim()) continue;
    msg += `\n🔹 <b>${escapeHtml(a.question)}</b>\n${escapeHtml(v)}\n`;
  }
  return msg;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = getClientIP(req);
    const rl = checkRateLimit(`ip:${clientIP}`, MAX_REQUESTS_PER_IP);
    if (!rl.allowed) {
      return new Response(
        JSON.stringify({ error: "Слишком много заявок. Попробуйте позже." }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": Math.ceil((rl.resetAt - Date.now()) / 1000).toString(),
          },
        },
      );
    }

    const rawBody = await req.json();
    const parsed = SaveStylistLeadSchema.safeParse(rawBody);
    if (!parsed.success) {
      console.error("Validation failed:", parsed.error.flatten());
      return new Response(
        JSON.stringify({ error: "Некорректные данные", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { name, contact, contact_type, answers, website } = parsed.data;

    // Honeypot
    if (website && website.length > 0) {
      console.warn("Honeypot triggered from", clientIP);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: lead, error: insertError } = await supabase
      .from("stylist_leads")
      .insert({
        name,
        contact,
        contact_type,
        answers,
      })
      .select("lead_id")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: "Не удалось сохранить заявку" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Telegram notification (best-effort)
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const text = formatTelegramMessage(lead.lead_id, name, contact, contact_type, answers);
        const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "HTML" }),
        });
        if (!tgRes.ok) {
          const errBody = await tgRes.text();
          console.error("Telegram send failed:", tgRes.status, errBody);
        }
      } catch (tgErr) {
        console.error("Telegram exception:", tgErr);
      }
    } else {
      console.warn("Telegram secrets missing — skipping notification");
    }

    return new Response(
      JSON.stringify({ success: true, leadId: lead.lead_id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("save-stylist-lead error:", error);
    return new Response(JSON.stringify({ error: "Внутренняя ошибка" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});