-- Adds explicit product availability labels used by the admin product form.
-- Run once in Supabase Dashboard > SQL Editor for existing projects.

alter table public.products
  add column if not exists availability_status text not null default 'stock_available';

update public.products
set availability_status = case
  when coalesce(in_stock, true) then 'stock_available'
  else 'available_on_order'
end
where availability_status is null
   or availability_status not in ('stock_available', 'available_on_order');

alter table public.products
  drop constraint if exists products_availability_status_check;

alter table public.products
  add constraint products_availability_status_check
  check (availability_status in ('stock_available', 'available_on_order'));

create index if not exists products_availability_status_idx
  on public.products (availability_status);
