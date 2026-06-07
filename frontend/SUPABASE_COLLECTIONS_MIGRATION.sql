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

-- Add starter Marble Collections without deleting or replacing existing categories.
-- These become navbar items and homepage collection cards immediately. You can
-- edit, reorder, hide, or remove them later from Admin > Menu & Collection Cards.
insert into public.categories (
  name,
  slug,
  description,
  image_url,
  menu_group,
  show_in_nav,
  show_on_homepage,
  is_active,
  sort_order
)
select
  starter.name,
  starter.slug,
  starter.description,
  starter.image_url,
  'marble-collections',
  true,
  true,
  true,
  starter.sort_order
from (values
  ('Marble Temples & Mandirs', 'temples', 'Beautiful marble temples and mandirs for homes, offices, and religious spaces.', '/images/products/mander-marble1.png', 80),
  ('Marble Handicrafts & Home Décor', 'marble-handicrafts-home-decor', 'Explore handcrafted marble décor, gifting items, pooja accessories, and decorative pieces made by skilled artisans.', '/images/products/decor.png', 90),
  ('Marble Tulsi Stands & Planters', 'tulsi-stands-planters', 'Discover carved marble Tulsi stands, pots, and planters for devotional and decorative spaces.', '/images/products/decor2.png', 100),
  ('Custom Marble Statues & Projects', 'custom-marble-projects', 'Commission custom marble statues, temples, décor, and architectural pieces crafted for your requirements.', '/images/products/gallery3.png', 110)
) as starter(name, slug, description, image_url, sort_order)
where not exists (
  select 1
  from public.categories existing
  where existing.slug = starter.slug
);

-- Repair older saved homepage editorial collection-card links that pointed to
-- placeholder /collections/* paths instead of real /category/* pages.
update public.storefront_content
set content = jsonb_set(
  content,
  '{collections}',
  (
    select jsonb_agg(
      case
        when item ->> 'href' = '/collections/handicrafts' then item || jsonb_build_object(
          'id', 'marble-handicrafts-home-decor',
          'title', 'Marble Handicrafts & Home Décor',
          'href', '/category/marble-handicrafts-home-decor',
          'imageUrl', '/images/products/decor.png'
        )
        when item ->> 'href' = '/collections/home-decor' then item || jsonb_build_object(
          'id', 'marble-handicrafts-home-decor',
          'title', 'Marble Handicrafts & Home Décor',
          'href', '/category/marble-handicrafts-home-decor',
          'imageUrl', '/images/products/decor.png'
        )
        else item
      end
    )
    from jsonb_array_elements(content -> 'collections') as item
  )
)
where id = 'main'
  and jsonb_typeof(content -> 'collections') = 'array'
  and exists (
    select 1
    from jsonb_array_elements(content -> 'collections') as item
    where item ->> 'href' in ('/collections/handicrafts', '/collections/home-decor')
  );
