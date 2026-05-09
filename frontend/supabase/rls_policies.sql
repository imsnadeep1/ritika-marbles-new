-- Reset and recreate policies for categories and categories storage bucket.
-- This removes conflicting existing policies that may still block inserts.

alter table public.categories enable row level security;

-- Drop all existing policies on categories to avoid conflicts.
do $$
declare p record;
begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'categories' loop
    execute format('drop policy if exists %I on public.categories', p.policyname);
  end loop;
end $$;

-- Recreate simple permissive policies for anon and authenticated roles.
create policy categories_select_all
on public.categories
for select
to anon, authenticated
using (true);

create policy categories_insert_all
on public.categories
for insert
to anon, authenticated
with check (true);

create policy categories_update_all
on public.categories
for update
to anon, authenticated
using (true)
with check (true);

create policy categories_delete_all
on public.categories
for delete
to anon, authenticated
using (true);

-- Drop any old storage policies for the `categories` bucket.
do $$
declare p record;
begin
  for p in
    select policyname
    from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and (qual like '%categories%' or with_check like '%categories%')
  loop
    execute format('drop policy if exists %I on storage.objects', p.policyname);
  end loop;
end $$;

-- Recreate storage policies.
create policy categories_bucket_read_public
on storage.objects
for select
to public
using (bucket_id = 'categories');

create policy categories_bucket_insert_all
on storage.objects
for insert
to anon, authenticated
with check (bucket_id = 'categories');

create policy categories_bucket_update_all
on storage.objects
for update
to anon, authenticated
using (bucket_id = 'categories')
with check (bucket_id = 'categories');

create policy categories_bucket_delete_all
on storage.objects
for delete
to anon, authenticated
using (bucket_id = 'categories');
