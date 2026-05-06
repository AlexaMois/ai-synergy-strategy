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

const PhotoItemSchema = z.object({
  slotId: z.string().min(1).max(50),
  slotLabel: z.string().min(1).max(200),
  path: z.string().min(1).max(500),
});

const SaveStylistLeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  contact: z.string().trim().min(1).max(100),
  contact_type: z.enum(["telegram", "phone"]).default("telegram"),
  answers: z.array(AnswerItemSchema).max(50),
  photos: z.array(PhotoItemSchema).max(20).optional().default([]),
  website: z.string().max(0).optional(),
  test_mode: z.boolean().optional().default(false),
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
  photoCount: number,
  testMode: boolean,
): string {
  const header = testMode
    ? `🧪 <b>[TEST] НейроСтилист — тестовая анкета</b>`
    : `👗 <b>НейроСтилист — новая анкета</b>`;
  let msg = `${header}\n\n`;
  msg += `👤 <b>Имя:</b> ${escapeHtml(name)}\n`;
  const contactIcon = contactType === "phone" ? "📞" : "💬";
  msg += `${contactIcon} <b>Контакт:</b> ${escapeHtml(contact)}\n`;
  msg += `🆔 <b>ID:</b> ${escapeHtml(leadId)}\n`;
  msg += `🕐 <b>Время:</b> ${formatDateTime()} (МСК)\n`;
  if (photoCount > 0) msg += `📸 <b>Фото:</b> ${photoCount}\n`;
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

    const { name, contact, contact_type, answers, photos, website, test_mode } = parsed.data;

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
        answers: { answers, photos },
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

    // Telegram (best-effort)
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const text = formatTelegramMessage(
          lead.lead_id,
          name,
          contact,
          contact_type,
          answers,
          photos.length,
          test_mode,
        );
        const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: "HTML" }),
        });
        if (!tgRes.ok) {
          console.error("Telegram send failed:", tgRes.status, await tgRes.text());
        }

        // Send photos: download from storage via signed URL, then upload to Telegram via FormData
        for (const photo of photos) {
          try {
            const { data: signed, error: signErr } = await supabase.storage
              .from("stylist-uploads")
              .createSignedUrl(photo.path, 600);
            if (signErr || !signed?.signedUrl) {
              console.error("Sign URL failed for", photo.path, signErr);
              continue;
            }
            const fileRes = await fetch(signed.signedUrl);
            if (!fileRes.ok) {
              console.error("Photo fetch failed:", photo.path, fileRes.status);
              continue;
            }
            const blob = await fileRes.blob();
            const form = new FormData();
            form.append("chat_id", String(TELEGRAM_CHAT_ID));
            form.append("caption", `${photo.slotLabel} · ${lead.lead_id}`);
            form.append("photo", blob, photo.path.split("/").pop() || "photo.jpg");
            const photoRes = await fetch(
              `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`,
              { method: "POST", body: form },
            );
            if (!photoRes.ok) {
              // Photo too large or wrong format — fall back to document
              const docForm = new FormData();
              docForm.append("chat_id", String(TELEGRAM_CHAT_ID));
              docForm.append("caption", `${photo.slotLabel} · ${lead.lead_id}`);
              docForm.append("document", blob, photo.path.split("/").pop() || "photo.jpg");
              await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
                method: "POST",
                body: docForm,
              });
            }
          } catch (photoErr) {
            console.error("Photo send exception:", photo.path, photoErr);
          }
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
