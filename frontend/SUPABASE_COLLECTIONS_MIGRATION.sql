-- Add admin-managed storefront placement fields to existing Ritika Marbles categories.
-- Run this once in Supabase Dashboard > SQL Editor, then manage values from Admin > Categories.

alter table public.categories add column if not exists menu_group text not null default 'god-statues';
alter table public.categories add column if not exists show_in_nav boolean not null default true;
alter table public.categories add column if not exists show_on_homepage boolean not null default true;
alter table public.categories add column if not exists is_active boolean not null default true;
alter table public.categories add column if not exists sort_order integer not null default 100;

create index if not exists categories_storefront_idx
  on public.categories (is_active, menu_group, sort_order);

-- Recommended ordering for the collections already present in the starter catalog.
update public.categories
set
  menu_group = case when slug = 'temples' then 'marble-collections' else 'god-statues' end,
  sort_order = case slug
    when 'ganesh' then 10
    when 'radha-krishna' then 20
    when 'ram-darbar' then 30
    when 'shiv-parvati' then 40
    when 'hanuman' then 50
    when 'lakshmi-ganesh-saraswati' then 60
    when 'laddu-gopal' then 70
    when 'temples' then 80
    else sort_order
  end
where slug in (
  'ganesh',
  'radha-krishna',
  'ram-darbar',
  'shiv-parvati',
  'hanuman',
  'lakshmi-ganesh-saraswati',
  'laddu-gopal',
  'temples'
);
