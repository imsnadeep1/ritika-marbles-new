## Supabase RLS setup for category admin

If you see:

`Failed to add category: new row violates row-level security policy`

run `frontend/supabase/rls_policies.sql` in the Supabase SQL editor for your project.

This grants authenticated users access to:
- `public.categories` CRUD
- `storage.objects` operations for the `categories` bucket

After applying policies, redeploy and test category creation again.
