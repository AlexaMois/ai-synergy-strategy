-- Private bucket for stylist quiz photo uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'stylist-uploads',
  'stylist-uploads',
  false,
  10485760,
  ARRAY['image/jpeg','image/png','image/webp','image/heic','image/heif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Anyone (anon) can upload to this bucket
CREATE POLICY "Anyone can upload stylist photos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'stylist-uploads');

-- No public read — only service role (used inside edge function) can read
-- Service role bypasses RLS automatically, so no SELECT policy is needed.