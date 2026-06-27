# AGENTS.md

## Cursor Cloud specific instructions

### What this repo is
- `frontend/` is the primary product: a **React 18 + Vite** marble storefront ("Ritika Marbles"). Data comes from **Supabase** (`@supabase/supabase-js`); static site copy/nav/gallery come from `frontend/src/data/mock.js`.
- `backend/` is a legacy **FastAPI + MongoDB** boilerplate (status checks + product/category models). It is **optional** and is *not* called by the frontend (the frontend talks directly to Supabase). Only run it if you specifically need it.
- Root `src/` is a tiny leftover stub; the real frontend lives in `frontend/`.

### Frontend (primary service)
- Package manager is **npm** (`frontend/package-lock.json` is the source of truth) even though `package.json` lists a `packageManager: yarn` field and `frontend/README.md` mentions CRA/`npm start`. Those are stale — use Vite scripts.
- Run from `frontend/`:
  - Dev server: `npm run dev` (Vite, serves on port `5173`). Pass `-- --host 0.0.0.0` to expose it.
  - Lint: `npm run lint`
  - Build: `npm run build` (output in `frontend/dist/`)
- The app runs **without Supabase credentials**: `frontend/src/lib/supabaseClient.js` logs a warning and renders public pages with empty data. Supabase-backed sections (products, categories, the footer "Our Products" list) will show "Loading…"/empty until env vars are set. The homepage, hero, About, Contact, and footer still render from `mock.js`.
- To enable live data, create `frontend/.env` from `frontend/.env.example` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SUPABASE_ADMIN_EMAIL`) and run the SQL in `frontend/SUPABASE_SETUP.sql` in your Supabase project. Admin pages under `/admin` require a Supabase auth user allowlisted in the `admin_users` table.
- `frontend/craco.config.js` is dead config from the old Create React App setup; Vite ignores it.

### Backend (optional, legacy)
- Python deps install into a venv at `backend/.venv` (the update script creates it). Activate with `source backend/.venv/bin/activate`.
- `backend/server.py` reads `MONGO_URL` and `DB_NAME` from the environment **at import time** — they must be set or uvicorn will crash on startup. Run with e.g. `MONGO_URL="mongodb://localhost:27017" DB_NAME="ritika_dev" uvicorn server:app --host 0.0.0.0 --port 8000` from `backend/`.
- Mongo connects lazily, so `GET /api/` (returns `{"message":"Hello World"}`) and `/docs` work without a running MongoDB; the `/api/status` endpoints require an actual MongoDB instance (not installed by default).
- All API routes are under the `/api` prefix.
