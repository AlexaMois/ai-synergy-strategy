import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json();
    console.log('Received lead data:', JSON.stringify(body, null, 2));

    const {
      name,
      telegram,
      phone,
      industry,
      diagnosticResults
    } = body;

    // Validate required fields
    if (!name || !telegram || !phone || !industry || !diagnosticResults) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Insert lead into database
    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert({
        name: name.trim(),
        telegram_nick: telegram.trim(),
        phone: phone.trim(),
        industry: industry.trim(),
        pain_points: diagnosticResults.painPoints || [],
        employee_count: diagnosticResults.employeeCount || 0,
        avg_salary: diagnosticResults.avgSalary || 0,
        routine_time_share: diagnosticResults.routineTimeShare || 0,
        ai_readiness_level: diagnosticResults.aiReadinessLevel || 'medium',
        potential_savings: diagnosticResults.potentialSavings || 0,
        min_savings: diagnosticResults.minSavings || 0,
        max_savings: diagnosticResults.maxSavings || 0,
        roi: diagnosticResults.roi || 0
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
    const botUsername = 'sashaneurobot'; // Current bot
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
