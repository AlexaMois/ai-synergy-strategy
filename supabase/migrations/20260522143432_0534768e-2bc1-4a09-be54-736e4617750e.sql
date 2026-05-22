UPDATE storage.buckets
SET allowed_mime_types = ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/heic','image/heif','image/avif','image/gif','application/octet-stream'],
    file_size_limit = 26214400
WHERE id = 'stylist-uploads';