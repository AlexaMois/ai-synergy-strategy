-- 1) Convert deny-all policies on leads/stylist_leads from PERMISSIVE to RESTRICTIVE
DROP POLICY IF EXISTS "Deny public access to leads" ON public.leads;
CREATE POLICY "Deny public access to leads"
ON public.leads
AS RESTRICTIVE
FOR ALL
TO public
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "Deny public access to stylist_leads" ON public.stylist_leads;
CREATE POLICY "Deny public access to stylist_leads"
ON public.stylist_leads
AS RESTRICTIVE
FOR ALL
TO public
USING (false)
WITH CHECK (false);

-- 2) Storage: tighten stylist-uploads bucket
-- Drop the over-permissive insert policy and re-create it with stricter shape.
DROP POLICY IF EXISTS "Anyone can upload stylist photos" ON storage.objects;

-- Allow anon + authenticated to INSERT only into this bucket; service_role bypasses RLS.
CREATE POLICY "Stylist uploads insert only"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'stylist-uploads');

-- Restrictive: prevent anon/authenticated from SELECT/UPDATE/DELETE on this bucket.
-- Edge functions use service_role and bypass RLS, so admin flows keep working.
CREATE POLICY "Stylist uploads no public read"
ON storage.objects
AS RESTRICTIVE
FOR SELECT
TO anon, authenticated
USING (bucket_id <> 'stylist-uploads');

CREATE POLICY "Stylist uploads no public update"
ON storage.objects
AS RESTRICTIVE
FOR UPDATE
TO anon, authenticated
USING (bucket_id <> 'stylist-uploads')
WITH CHECK (bucket_id <> 'stylist-uploads');

CREATE POLICY "Stylist uploads no public delete"
ON storage.objects
AS RESTRICTIVE
FOR DELETE
TO anon, authenticated
USING (bucket_id <> 'stylist-uploads');

-- 3) Scrub leaked email from existing public idea descriptions, and prevent future leaks.
UPDATE public.ideas
SET description = regexp_replace(description, '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', '[email removed]', 'g')
WHERE description ~ '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}';

UPDATE public.ideas
SET description = regexp_replace(description, '(\+?\d[\d\s\-\(\)]{7,}\d)', '[phone removed]', 'g')
WHERE description ~ '\+?\d[\d\s\-\(\)]{7,}\d';

UPDATE public.ideas
SET description = regexp_replace(description, '@[A-Za-z0-9_]{3,}', '[handle removed]', 'g')
WHERE description ~ '@[A-Za-z0-9_]{3,}';

-- Sanitize on insert/update for client_form submissions.
CREATE OR REPLACE FUNCTION public.sanitize_idea_pii()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.source = 'client_form'::idea_source THEN
    NEW.description := regexp_replace(NEW.description, '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', '[email removed]', 'g');
    NEW.description := regexp_replace(NEW.description, '(\+?\d[\d\s\-\(\)]{7,}\d)', '[phone removed]', 'g');
    NEW.description := regexp_replace(NEW.description, '@[A-Za-z0-9_]{3,}', '[handle removed]', 'g');
    NEW.title := regexp_replace(NEW.title, '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', '[email removed]', 'g');
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS sanitize_idea_pii_trg ON public.ideas;
CREATE TRIGGER sanitize_idea_pii_trg
BEFORE INSERT OR UPDATE ON public.ideas
FOR EACH ROW EXECUTE FUNCTION public.sanitize_idea_pii();

-- 4) Restrict EXECUTE on has_role to server roles only.
-- RLS policy evaluation runs as the table owner/postgres and is unaffected,
-- but anon/authenticated should not be able to call it directly via PostgREST.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;