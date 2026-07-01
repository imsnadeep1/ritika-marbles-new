-- Product gallery images migration
-- Run in Supabase Dashboard > SQL Editor

alter table public.products
  add column if not exists image_urls text[] not null default '{}'::text[];

-- Backfill gallery from existing cover image
update public.products
set image_urls = array[image_url]
where coalesce(image_url, '') <> ''
  and (image_urls is null or image_urls = '{}'::text[]);

-- Keep cover image aligned with first gallery image
update public.products
set image_url = image_urls[1]
where coalesce(array_length(image_urls, 1), 0) > 0
  and (image_url is null or image_url = '');
