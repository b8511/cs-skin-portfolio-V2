# CS Dashboard - React + Tailwind

This project was built to help me learn React and improve my skills with TypeScript.

It’s a simple dashboard where users can enter the names of items from CS2, specify the quantity they own, and add them to a list. Once all items are added, the app displays the current value of each item, their cumulative value, and the total inventory value.

The idea came from having difficulty tracking the value of my own inventory, especially since some items were stored in storage units. The app assumes you already know which items you own and their quantities.

Deployed at : https://cs-skin-portfolio-v2-fu63it1wb-b8511s-projects.vercel.app/

## Issues

- There is no data persistence — once you leave the site, all data is lost.
- Adding items manually can be tedious; an autocomplete feature would improve usability.
- The UI is quite minimal and could benefit from visual enhancements, such as item images.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Problems

- Steam requests get 429 (Too Many Requests)

- csmarketapi fails to fetch items

##### Possible Solutions

> Request throttling on client — Add a delay between each item's API call (e.g., 500ms). Easiest, no backend changes needed.

> In-memory caching — Cache results in the Vercel function so duplicate requests don't hit Steam. Simple, helps if users retry.

> Redis caching — Use Vercel KV to cache prices across deployments. Medium effort, survives redeploys.

> Request queuing — Serialize requests (one at a time) instead of parallel. Slower UX but safer for Steam limits.

> Rate limit headers — Parse Steam's Retry-After header and respect it explicitly. Moderate, more robust than fixed backoff.

> Batch API or proxy — Use a third-party CS2 price API (CSGOFloat, etc.) instead of Steam directly. Requires API key, depends on third party.

> Your own Steam bot — Host a dedicated service that scrapes/caches Steam prices yourself. Hard, needs hosting + maintenance.
