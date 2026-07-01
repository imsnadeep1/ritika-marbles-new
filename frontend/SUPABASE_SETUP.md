# Supabase setup for Ritika Marbles

Run `SUPABASE_SETUP.sql` in **Supabase Dashboard > SQL Editor**.

The script creates:

- `categories`
- `products`
- `feedback`
- `contact_inquiries`
- `reviews`
- `esteemed_clients`
- `storefront_content`
- `admin_users`
- public storage buckets:
  - `products`
  - `categories`
  - `clients`
- indexes, update triggers, row-level security, and storage policies.

## Admin user

Create an admin user in **Supabase Dashboard > Authentication > Users**.

Then allowlist that user's email in SQL Editor:

```sql
insert into public.admin_users (email)
values ('your_admin_email@example.com')
on conflict (email) do nothing;
```

Then set these Vercel environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_ADMIN_EMAIL=your_admin_email
```

Redeploy after changing Vercel environment variables.

## Contact / quote form email

Run `SUPABASE_CONTACT_INQUIRIES.sql` in **Supabase Dashboard > SQL Editor** if your project was created before this table was added.

Then add these **Vercel environment variables** for email delivery:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=contact@ritikamarbles.com
```

`CONTACT_FROM_EMAIL` is **optional**. If you do not set it, the site uses Resend's built-in test sender:

```env
Ritika Marbles <onboarding@resend.dev>
```

**Important:** With the test sender, Resend only delivers to the email address on your Resend account. To deliver to `contact@ritikamarbles.com`, verify `ritikamarbles.com` in Resend and set:

```env
CONTACT_FROM_EMAIL=Ritika Marbles <noreply@ritikamarbles.com>
```

Create a free account at [resend.com](https://resend.com) and add your API key in Vercel.

## Security hardening

Run `SUPABASE_SECURITY_MIGRATION.sql` in **Supabase Dashboard > SQL Editor** on existing projects to:

- Allow authenticated admin verification via `is_admin()`
- Block public users from self-approving feedback/reviews
- Add database triggers that force pending approval on insert

Also review `SECURITY.md` in the repo root for production checklist items (Vercel env vars, Supabase Auth settings, branch protection).

## Notes

- Public visitors can read products, categories, approved feedback, approved reviews, clients, and storefront content.
- Admins can use **Admin > Menu & Collection Cards** to assign each collection to the God Statues or Marble Collections menu, toggle navbar/homepage visibility, hide collections, and set display order.
- Public visitors can submit product feedback.
- Only emails listed in `admin_users` can manage admin content and upload assets.
- Product/category/client images and product videos are stored in Supabase Storage.

## If you previously saw a UUID / bigint foreign key error

Run the latest `SUPABASE_SETUP.sql` again. It detects whether your existing
`products.id` and `categories.id` columns are `bigint` or `uuid`. If a previous
failed run created incompatible relationship columns, it recreates those
relationship columns with the correct type before adding foreign keys.

## Existing deployments: enable admin-managed collection menus

If your Supabase project was configured before collection placement controls were added, run `SUPABASE_COLLECTIONS_MIGRATION.sql` once in **Supabase Dashboard > SQL Editor**. It adds the safe, non-destructive category metadata columns and applies a recommended order to existing starter categories. Existing categories and products are preserved.

## Marble Collections starter setup

Run [`SUPABASE_COLLECTIONS_MIGRATION.sql`](./SUPABASE_COLLECTIONS_MIGRATION.sql) once in **Supabase Dashboard → SQL Editor** for an existing project. It preserves existing products and categories, adds the collection-placement fields, and safely adds starter Marble Collections when their slugs do not already exist.

The starter Marble Collections are:

- Marble Temples & Mandirs
- Marble Handicrafts & Home Décor
- Marble Tulsi Stands & Planters
- Custom Marble Statues & Projects

Use **Admin → Menu & Collection Cards** to edit the names and images, reorder the category cards, or control whether each category appears in the navbar and on the homepage. Use **Admin → Featured Edits** to adjust the two large editorial cards lower on the homepage. Use **Admin → Products** to assign products to each category.
