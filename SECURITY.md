# Security Guide — Ritika Marbles

## What is protected in this repo

- **Secrets stay server-side:** `RESEND_API_KEY` is only used in `/api/contact`.
- **Supabase anon key is public by design:** data access is enforced with Row Level Security (RLS).
- **Admin writes require an approved admin account** listed in `admin_users`.
- **Admin UI verifies `is_admin()`** after login, not just session presence.
- **Contact form** uses honeypot, rate limiting, field length limits, and restricted CORS.
- **Feedback/reviews** cannot be self-approved by public users.

## Required production setup

### 1. Vercel environment variables

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_SUPABASE_ADMIN_EMAIL=your-admin@email.com
RESEND_API_KEY=...
CONTACT_TO_EMAIL=contact@ritikamarbles.com
ALLOWED_ORIGINS=https://ritikamarbles.com,https://www.ritikamarbles.com
CONTACT_FROM_EMAIL=Ritika Marbles <noreply@ritikamarbles.com>
```

### 2. Supabase

1. Run `SUPABASE_SETUP.sql` for new projects.
2. Run `SUPABASE_SECURITY_MIGRATION.sql` on existing projects.
3. Add admin emails:

```sql
insert into public.admin_users (email)
values ('your-admin@email.com')
on conflict (email) do nothing;
```

4. In **Supabase Auth settings:**
   - Disable public signups
   - Use invite-only or manually created admin users
   - Enable leaked password protection if available

### 3. GitHub

- Keep `main` branch protected (require PR reviews if working with a team).
- Never commit `.env`, credentials, or service-role keys.
- Enable GitHub secret scanning and Dependabot alerts.

### 4. Resend

- Verify `ritikamarbles.com` before sending to `contact@ritikamarbles.com`.
- Do not use `onboarding@resend.dev` in production.

## Do not deploy publicly

The legacy FastAPI backend in `/backend` has no authentication. Keep it local or behind a private network only.

## Source code protection

The production storefront includes layered source protection:

- Minified and mangled JavaScript bundles with no source maps
- Content Security Policy headers to restrict script injection
- Public pages block casual right-click, image drag, and common view-source shortcuts
- `robots.txt` blocks indexing of `/admin`
- `.map` files return 404 if requested

Admin routes are excluded from client-side deterrents so your team can still debug the admin panel.

**Note:** Client-side code cannot be fully hidden in a browser. These measures deter casual copying but are not a substitute for legal copyright protection.

## Security maintenance checklist

- [ ] Run `npm audit` in `frontend/` monthly
- [ ] Rotate `RESEND_API_KEY` if exposed
- [ ] Review `contact_inquiries` and delete old PII periodically
- [ ] Confirm only approved admins exist in `admin_users`
- [ ] Re-run `SUPABASE_SECURITY_MIGRATION.sql` after restoring from backup

## Reporting issues

If you discover a security issue, email `contact@ritikamarbles.com` directly instead of opening a public issue with sensitive details.
