-- Drop existing permissive policy that allows public access
DROP POLICY IF EXISTS "Service role can manage leads" ON public.leads;

-- Create a policy that denies all access to anonymous and authenticated users
-- Service role bypasses RLS automatically, so edge functions will still work
CREATE POLICY "Deny public access to leads"
ON public.leads
FOR ALL
USING (false)
WITH CHECK (false);