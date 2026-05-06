-- Stylist leads table for /neurostylist questionnaire
CREATE TABLE IF NOT EXISTS public.stylist_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id text NOT NULL DEFAULT substring(gen_random_uuid()::text, 1, 8),
  name text NOT NULL,
  contact text NOT NULL,
  contact_type text NOT NULL DEFAULT 'telegram',
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.stylist_leads ENABLE ROW LEVEL SECURITY;

-- Deny all public access; writes go through edge function with service role
CREATE POLICY "Deny public access to stylist_leads"
ON public.stylist_leads
FOR ALL
TO public
USING (false)
WITH CHECK (false);

-- updated_at trigger reusing existing function
CREATE TRIGGER update_stylist_leads_updated_at
BEFORE UPDATE ON public.stylist_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
