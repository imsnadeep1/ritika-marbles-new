## Supabase RLS reset for Categories

If category insert still fails with:

`new row violates row-level security policy`

it usually means old/conflicting policies are still present.

Run `frontend/supabase/rls_policies.sql` in Supabase SQL Editor. This script:
- Enables RLS on `public.categories`
- Drops all existing policies on `public.categories`
- Recreates permissive policies for both `anon` and `authenticated`
- Drops conflicting storage policies on `storage.objects` for `categories`
- Recreates bucket policies for read/write
