-- Drop the overly permissive INSERT policy on idea_votes
-- Voting is now handled exclusively through the increment_idea_vote RPC function (SECURITY DEFINER)
DROP POLICY IF EXISTS "Anyone can vote once per session" ON public.idea_votes;

-- No public INSERT policy needed - the RPC function handles all inserts securely