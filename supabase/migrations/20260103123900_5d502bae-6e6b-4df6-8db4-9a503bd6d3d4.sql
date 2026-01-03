-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id TEXT NOT NULL UNIQUE DEFAULT substring(gen_random_uuid()::text, 1, 8),
  name TEXT NOT NULL,
  telegram_nick TEXT NOT NULL,
  phone TEXT NOT NULL,
  industry TEXT NOT NULL,
  chat_id BIGINT,
  -- Diagnostic data
  pain_points TEXT[] NOT NULL DEFAULT '{}',
  employee_count INTEGER NOT NULL,
  avg_salary INTEGER NOT NULL,
  routine_time_share NUMERIC NOT NULL,
  -- Calculation results
  ai_readiness_level TEXT NOT NULL,
  potential_savings INTEGER NOT NULL,
  min_savings INTEGER NOT NULL,
  max_savings INTEGER NOT NULL,
  roi NUMERIC NOT NULL,
  -- Metadata
  pdf_sent BOOLEAN NOT NULL DEFAULT FALSE,
  admin_notified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow insert from edge functions (service role)
CREATE POLICY "Service role can manage leads"
ON public.leads
FOR ALL
USING (true)
WITH CHECK (true);

-- Create index for lead_id lookups
CREATE INDEX idx_leads_lead_id ON public.leads(lead_id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_leads_updated_at();