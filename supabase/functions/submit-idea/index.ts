import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// Strict CORS - only allow production domain
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://aleksamois.ru',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiter (resets on function cold start, but effective for burst protection)
const rateLimiter = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 ideas per hour per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimiter.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimiter.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count++;
  return false;
}

// Input validation schema
const IdeaSubmissionSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Имя слишком длинное")
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s\-']+$/, "Имя содержит недопустимые символы"),
  email: z.string()
    .trim()
    .email("Некорректный email адрес")
    .max(255, "Email слишком длинный")
    .toLowerCase(),
  idea: z.string()
    .trim()
    .min(10, "Описание идеи должно содержать минимум 10 символов")
    .max(2000, "Описание идеи слишком длинное"),
  // Honeypot field - should always be empty
  website: z.string().max(0, "Bot detected").optional(),
});

// Sanitize text for storage (basic XSS prevention)
function sanitizeText(text: string): string {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Метод не поддерживается' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                     req.headers.get('cf-connecting-ip') ||
                     req.headers.get('x-real-ip') ||
                     'unknown';

    // Check rate limit
    if (isRateLimited(clientIP)) {
      console.log(`Rate limited IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: 'Слишком много запросов. Попробуйте позже.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse and validate input
    const body = await req.json();
    const validationResult = IdeaSubmissionSchema.safeParse(body);

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      console.log('Validation failed:', validationResult.error.errors);
      return new Response(
        JSON.stringify({ error: firstError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { name, email, idea } = validationResult.data;

    // Honeypot check - if website field has value, it's a bot
    if (body.website && body.website.length > 0) {
      console.log('Honeypot triggered');
      // Return success to not alert the bot, but don't save
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client with service role
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Sanitize inputs before storage
    const safeName = sanitizeText(name);
    const safeEmail = sanitizeText(email);
    const safeIdea = sanitizeText(idea);

    // Create title from first 100 chars of idea
    const title = safeIdea.substring(0, 100) + (safeIdea.length > 100 ? '...' : '');

    // Insert idea into database
    const { error: insertError } = await supabase
      .from('ideas')
      .insert({
        title,
        description: `От: ${safeName} (${safeEmail})\n\n${safeIdea}`,
        source: 'client_form',
        status: 'backlog',
        priority: 'medium',
        votes: 0,
      });

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Не удалось сохранить идею. Попробуйте позже.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Idea submitted successfully from ${clientIP} by ${safeEmail}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Идея успешно отправлена!' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing idea submission:', error);
    return new Response(
      JSON.stringify({ error: 'Произошла ошибка. Попробуйте позже.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
