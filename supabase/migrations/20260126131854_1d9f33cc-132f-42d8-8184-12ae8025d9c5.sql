-- Drop the old permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can suggest ideas" ON public.ideas;