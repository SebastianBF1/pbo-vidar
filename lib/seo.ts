import type { Metadata } from "next";
import { asset } from "./asset";

/** Canonical URL and the EN / UA alternates of a route (path after the locale, e.g. "/about/"; "/" for home). */
export function alternatesFor(locale: string, path: string): Metadata["alternates"] {
  return {
    canonical: asset(`/${locale}${path}`),
    languages: { en: asset(`/en${path}`), uk: asset(`/ua${path}`), "x-default": asset(`/en${path}`) },
  };
}

export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_ORIGIN || "http://localhost:3000");
