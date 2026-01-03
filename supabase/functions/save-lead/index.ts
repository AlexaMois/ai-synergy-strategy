import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// Restrict CORS to production domain only
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://aleksamois.ru',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_IP = 5; // 5 leads per hour per IP
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// Zod validation schemas
const DiagnosticResultsSchema = z.object({
  painPoints: z.array(z.string().max(200)).max(10).default([]),
  employeeCount: z.number().int().min(1).max(100000),
  avgSalary: z.number().min(0).max(10000000),
  routineTimeShare: z.number().min(0).max(1),
  aiReadinessLevel: z.enum(['low', 'medium', 'high']),
  potentialSavings: z.number().min(0),
  minSavings: z.number().min(0),
  maxSavings: z.number().min(0),
  roi: z.number().min(0).max(100000)
});

const SaveLeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  telegram: z.string().trim().min(1).max(50),
  phone: z.string().trim().min(1).max(30),
  industry: z.string().trim().min(1).max(100),
  pdfBase64: z.string().max(5000000).optional(), // Max ~3.5MB PDF
  diagnosticResults: DiagnosticResultsSchema
});

// Rate limiting helper
function checkRateLimit(key: string, maxRequests: number): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
}

// Get client IP from request headers
function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
         req.headers.get('x-real-ip') ||
         req.headers.get('cf-connecting-ip') ||
         'unknown';
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP = getClientIP(req);
    const rateLimit = checkRateLimit(`ip:${clientIP}`, MAX_REQUESTS_PER_IP);
    
    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      const retryAfter = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString()
          } 
        }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json();
    console.log('Received lead data from IP:', clientIP);

    // Validate input with Zod
    const validationResult = SaveLeadSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error('Validation error:', validationResult.error.flatten());
      return new Response(
        JSON.stringify({ error: 'Invalid input data', details: validationResult.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const validatedData = validationResult.data;
    const { name, telegram, phone, industry, pdfBase64, diagnosticResults } = validatedData;

    // Insert lead into database with validated data
    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert({
        name: name,
        telegram_nick: telegram,
        phone: phone,
        industry: industry,
        pdf_base64: pdfBase64 || null,
        pain_points: diagnosticResults.painPoints,
        employee_count: diagnosticResults.employeeCount,
        avg_salary: diagnosticResults.avgSalary,
        routine_time_share: diagnosticResults.routineTimeShare,
        ai_readiness_level: diagnosticResults.aiReadinessLevel,
        potential_savings: diagnosticResults.potentialSavings,
        min_savings: diagnosticResults.minSavings,
        max_savings: diagnosticResults.maxSavings,
        roi: diagnosticResults.roi
      })
      .select('lead_id')
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save lead' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Lead saved successfully:', lead.lead_id);

    // Construct Telegram bot link
    const botUsername = 'NeuroResheniyaBot';
    const telegramLink = `https://t.me/${botUsername}?start=${lead.lead_id}`;

    return new Response(
      JSON.stringify({ 
        success: true, 
        leadId: lead.lead_id,
        telegramLink 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
