DROP POLICY IF EXISTS "Block anonymous idea inserts" ON public.ideas;
CREATE POLICY "Block anonymous idea inserts"
ON public.ideas
AS RESTRICTIVE
FOR INSERT
TO anon
WITH CHECK (false);