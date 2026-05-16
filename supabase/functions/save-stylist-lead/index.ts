import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

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
  section: z.string().max(100).optional(),
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
  answers: z.array(AnswerItemSchema).max(120),
  photos: z.array(PhotoItemSchema).max(20).optional().default([]),
  items_count: z.number().int().min(0).max(20).optional().default(0),
  max_photos: z.number().int().min(1).max(50).optional().default(20),
  website: z.string().max(0).optional(),
  test_mode: z.boolean().optional().default(false),
});

// Fixed display order of sections in the Telegram message
const SECTION_ORDER = [
  "Данные клиентки",
  "Образ жизни",
  "Желаемый образ",
  "Силуэт и посадка",
  "Цвета",
  "Гардероб",
  "Покупки и бюджет",
  "Волосы и макияж",
  "Стилевые режимы",
  "Фото",
  "5 вещей для разбора",
  "Финальный комментарий",
] as const;

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

type Answer = { section?: string; question: string; value: string | string[] | number };
type Photo = { slotId: string; slotLabel: string; path: string };

function valueToText(v: string | string[] | number): string {
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}

function renderAnswerBlock(a: Answer): string {
  const v = valueToText(a.value).trim();
  if (!v) return "";
  return `\n🔹 <b>${escapeHtml(a.question)}</b>\n${escapeHtml(v)}\n`;
}

function renderPhotosSection(photos: Photo[], maxPhotos: number): string {
  // Exclude per-item photos (slotId starts with review_item_) from "Типы фото"
  const general = photos.filter((p) => !p.slotId.startsWith("review_item_"));
  const total = photos.length;

  let block = `\n🔹 <b>Всего фото</b>\n${total} из ${maxPhotos}\n`;

  if (general.length > 0) {
    const counts = new Map<string, number>();
    for (const p of general) counts.set(p.slotLabel, (counts.get(p.slotLabel) ?? 0) + 1);
    const lines = Array.from(counts.entries())
      .map(([label, n]) => `${label} — ${n}`)
      .join("\n");
    block += `\n🔹 <b>Типы фото</b>\n${escapeHtml(lines)}\n`;
  }
  return block;
}

function formatTelegramMessage(
  leadId: string,
  name: string,
  contact: string,
  contactType: string,
  answers: Answer[],
  photos: Photo[],
  itemsCount: number,
  maxPhotos: number,
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
  msg += `📸 <b>Фото:</b> ${photos.length} из ${maxPhotos}\n`;
  msg += `🧺 <b>Вещей на разбор:</b> ${itemsCount}\n`;

  // Group answers by section
  const grouped = new Map<string, Answer[]>();
  for (const a of answers) {
    const s = a.section || "Прочее";
    const list = grouped.get(s) ?? [];
    list.push(a);
    grouped.set(s, list);
  }

  // Render sections in fixed order, then any unknown sections at the end
  const renderedSections = new Set<string>();
  let idx = 0;
  for (const section of SECTION_ORDER) {
    idx++;
    const items = grouped.get(section) ?? [];
    const isPhotos = section === "Фото";
    const isItems = section === "5 вещей для разбора";

    // Skip section entirely if nothing to render
    if (!isPhotos && items.length === 0) {
      // Items section: still show header even if empty? Skip if 0.
      if (isItems && itemsCount === 0) continue;
      if (!isItems) continue;
    }

    msg += `\n━━━ <b>${idx}. ${escapeHtml(section.toUpperCase())}</b> ━━━\n`;

    if (isPhotos) {
      msg += renderPhotosSection(photos, maxPhotos);
    } else {
      for (const a of items) msg += renderAnswerBlock(a);
    }
    renderedSections.add(section);
  }

  // Unknown sections (fallback)
  for (const [section, items] of grouped) {
    if (renderedSections.has(section)) continue;
    idx++;
    msg += `\n━━━ <b>${idx}. ${escapeHtml(section.toUpperCase())}</b> ━━━\n`;
    for (const a of items) msg += renderAnswerBlock(a);
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

    const { name, contact, contact_type, answers, photos, items_count, max_photos, website, test_mode } = parsed.data;

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
        answers: { answers, photos, items_count, max_photos },
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

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      try {
        const text = formatTelegramMessage(
          lead.lead_id,
          name,
          contact,
          contact_type,
          answers,
          photos,
          items_count,
          max_photos,
          test_mode,
        );
        // Telegram limits messages to 4096 chars; split if needed
        const chunks: string[] = [];
        const MAX = 3800;
        if (text.length <= MAX) {
          chunks.push(text);
        } else {
          let buf = "";
          for (const line of text.split("\n")) {
            if ((buf + line + "\n").length > MAX) {
              chunks.push(buf);
              buf = "";
            }
            buf += line + "\n";
          }
          if (buf) chunks.push(buf);
        }
        for (const chunk of chunks) {
          const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: chunk, parse_mode: "HTML" }),
          });
          if (!tgRes.ok) {
            console.error("Telegram send failed:", tgRes.status, await tgRes.text());
          }
        }

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
