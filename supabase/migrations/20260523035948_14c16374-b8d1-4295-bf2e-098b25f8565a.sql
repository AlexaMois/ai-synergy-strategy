-- Replace the permissive INSERT policy so authenticated users (non-admins) can no longer
-- write directly to public.ideas. Client-form submissions continue to work because the
-- submit-idea edge function uses the service role, which bypasses RLS.
DROP POLICY IF EXISTS "Only admins can insert non-client ideas" ON public.ideas;

CREATE POLICY "Only admins can insert ideas"
ON public.ideas
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));