-- Run in Supabase SQL editor for project: tjslxhwneivmidkwreie
-- This allows authenticated users to manage categories.

alter table public.categories enable row level security;

create policy if not exists "categories_select_authenticated"
on public.categories
for select
to authenticated
using (true);

create policy if not exists "categories_insert_authenticated"
on public.categories
for insert
to authenticated
with check (true);

create policy if not exists "categories_update_authenticated"
on public.categories
for update
to authenticated
using (true)
with check (true);

create policy if not exists "categories_delete_authenticated"
on public.categories
for delete
to authenticated
using (true);

-- Storage policies for bucket `categories`
create policy if not exists "categories_bucket_read_public"
on storage.objects
for select
to public
using (bucket_id = 'categories');

create policy if not exists "categories_bucket_insert_authenticated"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'categories');

create policy if not exists "categories_bucket_update_authenticated"
on storage.objects
for update
to authenticated
using (bucket_id = 'categories')
with check (bucket_id = 'categories');

create policy if not exists "categories_bucket_delete_authenticated"
on storage.objects
for delete
to authenticated
using (bucket_id = 'categories');
