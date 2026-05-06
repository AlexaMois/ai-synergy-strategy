CREATE TABLE public.stylist_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id TEXT NOT NULL DEFAULT substring(gen_random_uuid()::text, 1, 8),
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  contact_type TEXT NOT NULL DEFAULT 'telegram',
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.stylist_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny public access to stylist_leads"
ON public.stylist_leads
FOR ALL
TO public
USING (false)
WITH CHECK (false);

CREATE TRIGGER update_stylist_leads_updated_at
BEFORE UPDATE ON public.stylist_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();