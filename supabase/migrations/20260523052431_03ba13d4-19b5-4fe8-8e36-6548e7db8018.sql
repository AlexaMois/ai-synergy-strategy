-- 1. Harden has_role: SECURITY DEFINER + locked search_path + restricted EXECUTE
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

-- 2. Restrict idea_votes SELECT to admins only (public still sees aggregate ideas.votes)
DROP POLICY IF EXISTS "Anyone can view votes" ON public.idea_votes;

CREATE POLICY "Only admins can view votes"
ON public.idea_votes
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));