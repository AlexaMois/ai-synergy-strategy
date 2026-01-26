-- Create admin-only INSERT policy for ideas (for admin panel to add ideas with any source/status)
CREATE POLICY "Only admins can insert non-client ideas"
ON public.ideas FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin') 
  OR (source = 'client_form' AND status = 'backlog')
);