# PBO VIDAR — website

Marketing website for PBO VIDAR (English / Ukrainian). Next.js 16, TypeScript and Tailwind CSS 4.

## Routes

- `/en`, `/ua` — homepage
- `/{en|ua}/platforms/{piranha|ragnar-28|munin|jet-sled}` — product pages

All copy lives in `locales/en.json` and `locales/ua.json`; product data in `data/platforms.ts`;
image paths in `data/images.ts`; contact and social links in `data/company.ts`.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000 → /en
npm run lint
npx tsc --noEmit
```

## GitHub Pages

`.github/workflows/deploy-pages.yml` builds a static export on every push to `main` and deploys it to
GitHub Pages (Settings → Pages → Source: GitHub Actions).

To build the static site locally:

```bash
PAGES_BASE_PATH=/pbo-vidar npm run build:pages   # output in ./out
```

The export serves images unoptimized, prerenders every page, and `scripts/postexport.mjs` adds the root
redirect (`/` → `/en/`).
