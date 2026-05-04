# Frontend Upgrade Guide: CRA → Vite

## What Changed

This upgrade modernizes the build process from Create React App (CRA) + Craco to **Vite** with significant performance improvements.

### Key Benefits
✅ **~5-10x faster build times** - Vite uses ES modules natively
✅ **Instant HMR (Hot Module Replacement)** - Near-instantaneous code updates
✅ **Smaller bundle size** - Better tree-shaking and code splitting
✅ **Modern tooling** - Latest ESLint, Tailwind, and React versions
✅ **Better developer experience** - Cleaner configuration

## Migration Steps

### 1. Install Dependencies
```bash
cd frontend
yarn install
# Remove old CRA packages if conflicts occur:
# yarn remove react-scripts @craco/craco
```

### 2. Update Environment Variables
Create `.env.local` from `.env.example`:
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
# Note: All env vars must start with VITE_ prefix for Vite
```

### 3. Update imports in your components
**Old (CRA):** `process.env.REACT_APP_VAR`
**New (Vite):** `import.meta.env.VITE_VAR`

### 4. Start Development Server
```bash
yarn dev
# Server runs on http://localhost:5173
```

### 5. Build for Production
```bash
yarn build
# Output is in dist/ directory
```

### 6. Preview Production Build
```bash
yarn preview
```

## Important Changes

### Entry Point
- **Old:** `public/index.html` + `src/index.js`
- **New:** `index.html` (root) + `src/main.jsx`

### Environment Variables
- Prefix all env vars with `VITE_`
- Access via `import.meta.env.VITE_*`

### File Extensions
- Use `.jsx` for React components
- Use `.js` for non-React files

### Path Alias
- Configured `@` alias pointing to `src/`
- Usage: `import Button from '@/components/Button'`

## Deployment

### Vercel
No changes needed! Vercel auto-detects Vite.

### Other Platforms
Ensure build command: `yarn build`
Ensure output directory: `dist`

## Troubleshooting

**Q: Module not found errors?**
A: Check that imports use correct `.jsx`/.js` extensions

**Q: Env variables not loading?**
A: Ensure they start with `VITE_` and restart dev server

**Q: CSS not applying?**
A: Check that Tailwind paths in `tailwind.config.js` are correct

## Performance Metrics

Expected improvements after Vite migration:
- Initial startup: **10-15s → 1-2s**
- HMR updates: **2-5s → <200ms**
- Production bundle: **~30% smaller**

## Need Help?

Refer to:
- [Vite Documentation](https://vitejs.dev)
- [React + Vite Guide](https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server)
- [ESLint Configuration](https://eslint.org/docs/latest/use/configure/)