# CS Dashboard - React + Tailwind

Built to track the value of a CS2 inventory. Enter item names and quantities, fetch live Steam Market prices, and see per-item and total portfolio value.

Deployed at: https://new-cs-dashboard.vercel.app/
Backend API: https://cs2-tracker-api-production.up.railway.app/ (FastAPI + Railway)

## Features

- Live prices from Steam Market with 4-hour server-side cache (survives restarts)
- Item images fetched via Steam CDN
- Portfolio persistence via localStorage and shareable URL keys
- Fetch progress bar with per-item status (loading / success / error)
- Sort results by unit price, total value, or quantity
- Wrong item name casing is auto-corrected via Steam search
- Error cards show an editable name input + retry button

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. Set `VITE_API_URL` to point at your backend.

## Known Limitations

- Steam soft-rate-limits data centre IPs (Railway) for some items - use the retry button on error cards
- Item names must match Steam Market `hash_name` exactly (casing is auto-corrected when possible)

## Changelog

- 26/02/2026 - Images added to results page
- 05/04/2026 - FastAPI backend on Railway; server-side price cache; progress bar; sort; name auto-correct; retry on error
