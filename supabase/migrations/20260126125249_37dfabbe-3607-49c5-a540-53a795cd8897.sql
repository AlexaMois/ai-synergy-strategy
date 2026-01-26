-- Create a votes tracking table to prevent vote manipulation
-- Uses session_id for anonymous voting (no auth required)

CREATE TABLE public.idea_votes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    idea_id UUID NOT NULL REFERENCES public.ideas(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(idea_id, session_id)
);

-- Enable Row Level Security
ALTER TABLE public.idea_votes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert their vote (but unique constraint prevents duplicates)
CREATE POLICY "Anyone can vote once per session" 
ON public.idea_votes 
FOR INSERT 
WITH CHECK (true);

-- Allow reading votes (needed for checking if already voted)
CREATE POLICY "Anyone can view votes" 
ON public.idea_votes 
FOR SELECT 
USING (true);

-- Create a function to safely increment votes with validation
CREATE OR REPLACE FUNCTION public.increment_idea_vote(p_idea_id UUID, p_session_id TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_exists BOOLEAN;
BEGIN
    -- Check if session already voted for this idea
    SELECT EXISTS (
        SELECT 1 FROM public.idea_votes 
        WHERE idea_id = p_idea_id AND session_id = p_session_id
    ) INTO v_exists;
    
    IF v_exists THEN
        RETURN FALSE; -- Already voted
    END IF;
    
    -- Insert vote record
    INSERT INTO public.idea_votes (idea_id, session_id)
    VALUES (p_idea_id, p_session_id);
    
    -- Increment vote count on ideas table
    UPDATE public.ideas
    SET votes = votes + 1, updated_at = now()
    WHERE id = p_idea_id;
    
    RETURN TRUE; -- Successfully voted
END;
$$;

-- Drop the overly permissive vote update policy
DROP POLICY IF EXISTS "Anyone can increment votes on ideas" ON public.ideas;

-- Create a restricted update policy - only allow vote updates via the function
-- Regular users cannot directly update the ideas table
-- The function runs with SECURITY DEFINER so it can update votes