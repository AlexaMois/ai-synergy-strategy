
-- 1) Attach PII sanitization trigger to ideas table
DROP TRIGGER IF EXISTS sanitize_idea_pii_trigger ON public.ideas;
CREATE TRIGGER sanitize_idea_pii_trigger
BEFORE INSERT OR UPDATE ON public.ideas
FOR EACH ROW EXECUTE FUNCTION public.sanitize_idea_pii();

-- 2) Sanitize existing rows (force trigger by updating)
UPDATE public.ideas SET description = description WHERE source = 'client_form';

-- 3) Lock down stylist-uploads bucket: drop permissive anon insert, allow service role only
DROP POLICY IF EXISTS "Stylist uploads insert only" ON storage.objects;

CREATE POLICY "Stylist uploads service role insert"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'stylist-uploads');
