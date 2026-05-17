create table if not exists public.storefront_content (
  id text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.storefront_content enable row level security;

create policy "Allow public storefront content reads"
on public.storefront_content
for select
using (true);

create policy "Allow authenticated storefront content writes"
on public.storefront_content
for all
to authenticated
using (true)
with check (true);
