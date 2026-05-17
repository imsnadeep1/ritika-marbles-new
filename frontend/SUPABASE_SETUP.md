# Supabase setup for Ritika Marbles

Run `SUPABASE_SETUP.sql` in **Supabase Dashboard > SQL Editor**.

The script creates:

- `categories`
- `products`
- `feedback`
- `reviews`
- `esteemed_clients`
- `storefront_content`
- public storage buckets:
  - `products`
  - `categories`
  - `clients`
- indexes, update triggers, row-level security, and storage policies.

## Admin user

Create an admin user in **Supabase Dashboard > Authentication > Users**.

Then set these Vercel environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_ADMIN_EMAIL=your_admin_email
VITE_SUPABASE_ADMIN_PASSWORD=your_admin_password
```

Redeploy after changing Vercel environment variables.

## Notes

- Public visitors can read products, categories, approved feedback, approved reviews, clients, and storefront content.
- Public visitors can submit product feedback.
- Authenticated users can manage all admin content and upload assets.
- Product/category/client images and product videos are stored in Supabase Storage.

## If you previously saw a UUID / bigint foreign key error

Run the latest `SUPABASE_SETUP.sql` again. It now detects whether your existing
`products.id` and `categories.id` columns are `bigint` or `uuid`, aligns the
relationship columns, and then creates the foreign keys.
