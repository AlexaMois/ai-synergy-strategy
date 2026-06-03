-- Restore public INSERT into stylist-uploads bucket so the quiz form can upload photos.
-- A previous migration restricted INSERT to service_role only, which broke client uploads.

DROP POLICY IF EXISTS "Stylist uploads service role insert" ON storage.objects;
DROP POLICY IF EXISTS "Stylist uploads insert only" ON storage.objects;

CREATE POLICY "Stylist uploads insert only"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'stylist-uploads');
