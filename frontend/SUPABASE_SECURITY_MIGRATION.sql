-- Security hardening migration for Ritika Marbles
-- Run in Supabase Dashboard > SQL Editor

-- Allow authenticated users to verify admin status without reading admin_users directly
grant execute on function public.is_admin() to authenticated;

-- Prevent public users from self-approving feedback
drop policy if exists "Public can submit feedback" on public.feedback;
create policy "Public can submit feedback"
on public.feedback for insert
to anon, authenticated
with check (coalesce(approved, false) = false);

-- Prevent public users from self-approving reviews
drop policy if exists "Public can submit reviews" on public.reviews;
create policy "Public can submit reviews"
on public.reviews for insert
to anon, authenticated
with check (coalesce(approved, false) = false);

-- Defense in depth: force pending approval on insert even if client sends approved=true
create or replace function public.force_pending_approval()
returns trigger
language plpgsql
as $$
begin
  new.approved = false;
  return new;
end;
$$;

drop trigger if exists feedback_force_pending_approval on public.feedback;
create trigger feedback_force_pending_approval
before insert on public.feedback
for each row
execute function public.force_pending_approval();

drop trigger if exists reviews_force_pending_approval on public.reviews;
create trigger reviews_force_pending_approval
before insert on public.reviews
for each row
execute function public.force_pending_approval();
