import type { NextConfig } from "next";

/**
 * Two build modes:
 *  - default (`npm run dev` / `npm run build`): server build, `/` redirects to `/en`.
 *  - GitHub Pages (`PAGES_BASE_PATH=/pbo-vidar npm run build:pages`): fully static export under a sub-path.
 *    Redirects and the image optimizer need a server, so the export serves images as-is and `/` is a
 *    static redirect page written by scripts/postexport.mjs.
 */
const pagesBasePath = process.env.PAGES_BASE_PATH;
const isPages = pagesBasePath !== undefined;

const nextConfig: NextConfig = {
  // Partial prerendering (enabled by cacheComponents) needs a server; the static export prerenders every page fully.
  cacheComponents: !isPages,
  partialPrefetching: !isPages,
  devIndicators: false,
  env: {
    // Read by lib/asset.ts for paths Next does not prefix itself (next/image src, full-page navigations).
    NEXT_PUBLIC_BASE_PATH: pagesBasePath ?? "",
    // Absolute URLs for canonical / hreflang links (search engines require fully qualified URLs).
    NEXT_PUBLIC_SITE_ORIGIN: isPages ? (process.env.PAGES_ORIGIN ?? "https://sebastianbf1.github.io") : "http://localhost:3000",
  },
  images: isPages ? { unoptimized: true } : { qualities: [75, 85] },
  ...(isPages
    ? {
        output: "export" as const,
        basePath: pagesBasePath,
        // `/en/` → en/index.html, so direct loads and refreshes work on GitHub Pages.
        trailingSlash: true,
      }
    : {
        async redirects() {
          // English is the default language.
          return [{ source: "/", destination: "/en", permanent: false }];
        },
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
