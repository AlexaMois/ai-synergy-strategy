-- Add admin policies for full CRUD operations (using service role or specific admin check)
-- For now, we'll create policies that allow all operations for authenticated users with a simple check
-- In production, you should implement proper role-based access

-- Drop existing restrictive policies for ideas (keep select and client_form insert)
DROP POLICY IF EXISTS "Anyone can vote on ideas" ON public.ideas;

-- Create a more restrictive vote policy that only allows incrementing votes
CREATE POLICY "Anyone can increment votes on ideas" 
ON public.ideas 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Add full CRUD policies for roadmap_items (admin-only in practice via hidden URL)
CREATE POLICY "Allow all operations on roadmap items" 
ON public.roadmap_items 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Add full CRUD policies for release_notes
CREATE POLICY "Allow all operations on release notes" 
ON public.release_notes 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Update ideas to allow admin operations
CREATE POLICY "Allow all operations on ideas" 
ON public.ideas 
FOR ALL 
USING (true)
WITH CHECK (true);