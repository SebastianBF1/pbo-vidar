import type { PlatformKey } from "@/data/platforms";
import type { Dictionary } from "./i18n";

/** Shape of locales products.<key> (per-product content varies, so it is typed here rather than inferred). */
export interface ProductCopy {
  description: string;
  roles: string[];
  heroAlt: string;
  overview: {
    heading: string;
    lead?: string;
    chips?: string[];
    imageAlt: string;
    caption?: string;
    blocks?: Record<string, { title: string; body?: string; items?: string[] }>;
  };
  gallery?: Record<string, { alt: string; caption?: string }>;
}

export const productCopy = (dict: Dictionary, key: PlatformKey): ProductCopy =>
  dict.products[key] as unknown as ProductCopy;

/** Shape of locales products.munin (bespoke page). */
export interface MuninCopy {
  description: string;
  roles: string[];
  heroAlt: string;
  overview: {
    heading: string;
    lead: string;
  };
  page: {
    environments: Record<"title" | "rivers" | "lakes" | "coastal" | "offshore", string>;
  };
}

export const muninCopy = (dict: Dictionary): MuninCopy => dict.products.munin as unknown as MuninCopy;
