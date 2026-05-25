
-- Strengthen sanitizer to also strip "От: ... (...)" submitter prefix lines
CREATE OR REPLACE FUNCTION public.sanitize_idea_pii()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.source = 'client_form'::idea_source THEN
    -- Remove email-like patterns
    NEW.description := regexp_replace(NEW.description, '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', '[email removed]', 'g');
    NEW.description := regexp_replace(NEW.description, '(\+?\d[\d\s\-\(\)]{7,}\d)', '[phone removed]', 'g');
    NEW.description := regexp_replace(NEW.description, '@[A-Za-z0-9_]{3,}', '[handle removed]', 'g');
    NEW.title := regexp_replace(NEW.title, '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', '[email removed]', 'g');
    -- Remove leading submitter attribution lines like "От: Name ([email removed])\n\n"
    NEW.description := regexp_replace(NEW.description, '^\s*От:\s*[^\n]*\n+', '', 'g');
  END IF;
  RETURN NEW;
END;
$function$;

-- Attach trigger (was missing)
DROP TRIGGER IF EXISTS sanitize_idea_pii_trigger ON public.ideas;
CREATE TRIGGER sanitize_idea_pii_trigger
BEFORE INSERT OR UPDATE ON public.ideas
FOR EACH ROW
EXECUTE FUNCTION public.sanitize_idea_pii();

-- Clean existing rows: strip submitter attribution prefix
UPDATE public.ideas
SET description = regexp_replace(description, '^\s*От:\s*[^\n]*\n+', '', 'g')
WHERE description ~ '^\s*От:';
