/**
 * Prefixes a public-folder path with the deployment base path (e.g. `/pbo-vidar` on GitHub Pages).
 * Needed for next/image `src` and full-page navigations; `next/link` adds the base path itself.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${BASE_PATH}${path}`;
