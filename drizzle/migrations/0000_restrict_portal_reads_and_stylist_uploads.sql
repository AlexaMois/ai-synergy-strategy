DROP POLICY IF EXISTS "Anyone can view ideas" ON public.ideas;
CREATE POLICY "Signed-in users can view ideas"
ON public.ideas
FOR SELECT
TO authenticated
USING ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Anyone can view roadmap items" ON public.roadmap_items;
CREATE POLICY "Signed-in users can view roadmap items"
ON public.roadmap_items
FOR SELECT
TO authenticated
USING ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Stylist uploads insert only" ON storage.objects;
CREATE POLICY "Stylist uploads insert only"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'stylist-uploads'
  AND (storage.foldername(name))[1] = (select auth.uid()::text)
);