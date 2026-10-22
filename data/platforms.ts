/**
 * Central product data: names, images and layout. Words come from locales.
 *
 * Technical specifications are not published on the website (2026-10-22); visitors request them by email
 * (components/product/RequestSpecs.tsx). Do not add figures or specification tables here.
 */
import type en from "@/locales/en.json";
import { IMAGES, type SiteImage } from "./images";

export type PlatformKey = keyof typeof en.platforms.items;

/**
 * stated   — plain statement (no tag)
 * optional — optional configuration, not standard
 */
export type SpecStatus = "stated" | "optional";

/** An image from data/images.ts plus how it is cropped in its frame. */
export type PlatformImage = SiteImage & {
  /** CSS object-position used when the image is cropped by its frame. */
  position: string;
};

export interface GalleryItem {
  /** Key into locales products.<key>.gallery */
  id: string;
  image: PlatformImage;
}

export interface ProductPage {
  hero: {
    image: PlatformImage;
    /** Mobile (4:3 frame) object-position. */
    mobilePosition: string;
    /** Mobile-only zoom when the product is small in the 4:3 frame. */
    mobileZoom?: { scale: number; origin: string };
    /** CSS filter for source files that are not pre-graded (e.g. the studio render). */
    filter?: string;
    /** Opacity of the navy colour tint (default 0.15). */
    tint?: number;
    /** Width (% of the image) of the left fade into the text column; keep small when the craft fills the frame. */
    fade?: number;
    /**
     * Show the whole image at its own aspect instead of cropping it into the hero frame — for wide images where a
     * crop would cut the craft. Desktop: a band `width`% of the viewport wide, vertically centred beside the text.
     * Phones: full width below the header.
     */
    whole?: { width: number };
  };
  overview: {
    image: PlatformImage;
    aspect: number;
    /** Desktop columns for the image (portrait images use 5). */
    span?: 5 | 7;
    /** Ids into locales products.<key>.overview.blocks, with the status tag each block carries. */
    blocks: { id: string; status?: SpecStatus }[];
  };
  /** Gallery rows; each row is laid out at equal height. Omitted when no further accurate imagery exists. */
  gallery?: GalleryItem[][];
}

/** Page with its own bespoke layout (components/munin). */
export interface CustomProductPage {
  custom: "munin";
}

export interface Platform {
  slug: "piranha" | "ragnar-28" | "munin" | "jet-sled";
  key: PlatformKey;
  name: string;
  /** Homepage platform-card image. */
  image: PlatformImage;
  page: ProductPage | CustomProductPage;
}

/** A platform rendered with the shared product-page layout. */
export type StandardPlatform = Platform & { page: ProductPage };

export const isStandard = (p: Platform): p is StandardPlatform => !("custom" in p.page);

export const platforms: Platform[] = [
  {
    slug: "piranha",
    key: "piranha",
    name: "PIRANHA",
    image: { ...IMAGES.piranhaCard, position: "50% 50%" },
    page: {
      hero: {
        image: { ...IMAGES.heroPiranha, position: "92% 50%" },
        mobilePosition: "96% 50%",
        mobileZoom: { scale: 1.32, origin: "72% 46%" },
        filter: "brightness(1.22) contrast(1.12)",
        tint: 0.5,
        fade: 32,
      },
      overview: {
        // USV configuration: deck with equipment case and antennas (differs from the studio hero).
        image: { ...IMAGES.piranhaUsv, position: "50% 50%" },
        aspect: 885 / 1109,
        span: 5,
        blocks: [{ id: "autonomy", status: "optional" }],
      },
      // Field configuration, top view and standing view share one row.
      gallery: [
        [
          { id: "field", image: { ...IMAGES.piranhaCard, position: "50% 50%" } },
          { id: "top", image: { ...IMAGES.piranhaTop, position: "50% 50%" } },
          { id: "hull", image: { ...IMAGES.piranhaHull, position: "50% 50%" } },
        ],
      ],
    },
  },
  {
    slug: "ragnar-28",
    key: "ragnar28",
    name: "RAGNAR 28",
    image: { ...IMAGES.ragnarUnderway, position: "40% 50%" },
    page: {
      // Whole vessel in view: the wide image is shown uncropped beside the text.
      hero: { image: { ...IMAGES.ragnarUnderway, position: "50% 50%" }, mobilePosition: "50% 50%", fade: 12, whole: { width: 60 } },
      overview: {
        image: { ...IMAGES.ragnarModules, position: "50% 50%" },
        aspect: 1448 / 1086,
        blocks: [],
      },
      // No gallery: the full-vessel image is the hero.
    },
  },
  {
    slug: "munin",
    key: "munin",
    name: "PBO 4 “MUNIN”",
    image: { ...IMAGES.muninCard, position: "50% 76%" },
    // Bespoke page (components/munin, data/munin.ts).
    page: { custom: "munin" },
  },
  {
    slug: "jet-sled",
    key: "jetSled",
    name: "JET SLED",
    image: { ...IMAGES.jetSledCard, position: "50% 60%" },
    page: {
      hero: { image: { ...IMAGES.jetSledCard, position: "55% 55%" }, mobilePosition: "55% 55%", fade: 24 },
      overview: {
        // Real operational-demo photograph (PDF p.11), different from the sheet photograph used in the hero.
        image: { ...IMAGES.jetSledDemo, position: "50% 50%" },
        aspect: 1200 / 900,
        blocks: [{ id: "propulsion" }, { id: "control" }],
      },
      // No gallery: no further accurate JET SLED imagery is available.
    },
  },
];

export const getPlatform = (slug: string) => platforms.find((p) => p.slug === slug);
