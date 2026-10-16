/**
 * Central product data. Values are copied from supplied material only; numbers are stored once and
 * formatted per language by lib/format.ts. Words come from locales (units, values, labels).
 *
 * Sources: the printed PBO technical sheets and brochures for each platform.
 */
import type en from "@/locales/en.json";
import { IMAGES, type SiteImage } from "./images";

export type SpecKey = keyof typeof en.specs;
export type PlatformKey = keyof typeof en.platforms.items;
export type Unit = keyof typeof en.units;
export type ValueKey = keyof typeof en.values;
export type SpecGroup = keyof typeof en.productPage.groups;

/**
 * stated     — manufacturer specification as printed
 * calculated — estimated / calculated value (must never be presented as confirmed)
 * optional   — optional configuration, not standard
 * target     — integration target (planned, not delivered)
 */
export type SpecStatus = "stated" | "calculated" | "optional" | "target";

export interface Spec {
  key: SpecKey;
  group: SpecGroup;
  /** Numeric part, e.g. "1.86", "3000" or a composite like "2 × 200–300" (rendered as-is). */
  amount?: string;
  unit?: Unit;
  /** "upTo" → “Up to 50 knots”, "approx" → “~11 kW”, "plus" → “75+ knots”. */
  q?: "upTo" | "approx" | "plus";
  /** Word value from locales `values`. */
  text?: ValueKey;
  status?: SpecStatus;
  /** Set to false to keep a value out of every rendered page. */
  display?: false;
}

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
  };
  /** 4–6 figures for the key-specification strip. */
  keySpecs: SpecKey[];
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
  /** Footnote keys shown under the specification table. */
  notes?: ("jetSledPayload")[];
}

/** Page with its own bespoke layout (components/munin). */
export interface CustomProductPage {
  custom: "munin";
  /** Figures for the key-specification panel. */
  keySpecs: SpecKey[];
}

export interface Platform {
  slug: "piranha" | "ragnar-28" | "munin" | "jet-sled";
  key: PlatformKey;
  name: string;
  /** Homepage platform-card image. */
  image: PlatformImage;
  /** Large image for the homepage image-led feature section, when different from the card image. */
  featureImage?: PlatformImage;
  /** Key figures shown on the homepage card (max 4–6). */
  cardSpecs: Spec[];
  /** Full published specification list. Render via publicSpecs(). */
  specs: Spec[];
  /** Footnote under the homepage card (platforms.items.<key>.note). */
  hasNote?: boolean;
  page: ProductPage | CustomProductPage;
}

/** A platform rendered with the shared product-page layout. */
export type StandardPlatform = Platform & { page: ProductPage };

export const isStandard = (p: Platform): p is StandardPlatform => !("custom" in p.page);

/** Only values cleared for publication. Every page that renders specs must go through this. */
export const publicSpecs = (specs: Spec[]): Spec[] => specs.filter((s) => s.display !== false);

// ------------------------------------------------------------------------------------------ PIRANHA

const piranhaSpecs: Spec[] = [
  { key: "length", group: "dimensions", amount: "1.86", unit: "m" },
  { key: "width", group: "dimensions", amount: "0.73", unit: "m" },
  { key: "systemWeight", group: "dimensions", amount: "50", unit: "kg" },
  { key: "ratedLoad", group: "dimensions", amount: "136", unit: "kg" },
  { key: "buoyancy", group: "dimensions", amount: "12", unit: "L" },
  { key: "topSpeed", group: "performance", amount: "56", unit: "kmh" },
  { key: "propulsion", group: "propulsion", text: "linearWaterJet" },
  { key: "bldcMotor", group: "propulsion", amount: "11", unit: "kW", q: "approx" },
  { key: "control", group: "control", text: "nativeControl" },
  {
    key: "integration",
    group: "control",
    text: "integrationStack",
    status: "target",
  },
  {
    key: "autonomy",
    group: "control",
    text: "available",
    status: "optional",
  },
  { key: "hull", group: "construction", text: "compositeEpsGlass" },
];

// ------------------------------------------------------------------------------------------ RAGNAR 28

const ragnarSpecs: Spec[] = [
  { key: "length", group: "dimensions", amount: "8.6", unit: "m" },
  { key: "beam", group: "dimensions", amount: "2.5", unit: "m" },
  { key: "payload", group: "dimensions", amount: "3000", unit: "kg", q: "upTo" },
  { key: "maxSpeed", group: "performance", amount: "75", unit: "knots", q: "plus" },
  { key: "rangeCruise", group: "performance", amount: "400", unit: "km", q: "plus" },
  { key: "engines", group: "propulsion", amount: "2 × 200–300", unit: "hp" },
  { key: "engineType", group: "propulsion", text: "inboardDiesel" },
  {
    key: "fuelTank",
    group: "propulsion",
    amount: "1000",
    unit: "L",
    status: "optional",
  },
  { key: "hull", group: "construction", text: "fiberglassComposite" },
];

// ------------------------------------------------------------------------------------------ PBO 4 "MUNIN"

const muninSpecs: Spec[] = [
  { key: "length", group: "dimensions", amount: "4.0", unit: "m" },
  { key: "beam", group: "dimensions", amount: "1.2", unit: "m" },
  { key: "height", group: "dimensions", amount: "0.5", unit: "m" },
  { key: "weightEmpty", group: "dimensions", amount: "200", unit: "kg", q: "approx" },
  { key: "payload", group: "dimensions", amount: "200", unit: "kg", q: "upTo" },
  { key: "maxSpeed", group: "performance", amount: "50", unit: "knots", q: "upTo" },
  { key: "range", group: "performance", amount: "100", unit: "nmi", q: "upTo" },
  { key: "propulsion", group: "propulsion", text: "electric" },
  {
    key: "propulsionOption",
    group: "propulsion",
    text: "gasolineEngine",
    status: "optional",
  },
  { key: "powerSupply", group: "propulsion", text: "supercap" },
  { key: "control", group: "control", text: "autonomous" },
  {
    key: "remoteControl",
    group: "control",
    text: "available",
    status: "optional",
  },
  { key: "hull", group: "construction", text: "compositeFiberglass" },
  { key: "operatingArea", group: "construction", text: "muninOperatingArea" },
  {
    key: "optionalEquipment",
    group: "equipment",
    text: "muninEquipment",
    status: "optional",
  },
];

// ------------------------------------------------------------------------------------------ JET SLED

const jetSledSpecs: Spec[] = [
  { key: "confirmedPayload", group: "performance", amount: "400", unit: "kg" },
  {
    key: "estSpeed50",
    group: "performance",
    amount: "40",
    unit: "kmh",
    q: "upTo",
    status: "calculated",
  },
  {
    key: "estRange50",
    group: "performance",
    amount: "40",
    unit: "km",
    q: "upTo",
    status: "calculated",
  },
  { key: "inflatableHull", group: "dimensions", amount: "20", unit: "kg" },
  { key: "jetDrive", group: "dimensions", amount: "20", unit: "kg" },
  { key: "battery", group: "dimensions", amount: "18", unit: "kg" },
  { key: "propulsion", group: "propulsion", text: "electricJet" },
  { key: "control", group: "control", text: "onboardOperation" },
  {
    key: "remoteControl",
    group: "control",
    text: "available",
    status: "optional",
  },
];

/** Selects facts from a platform's single spec list, so every value is defined once. */
const pick = (specs: Spec[], keys: SpecKey[]): Spec[] =>
  keys.map((key) => {
    const spec = publicSpecs(specs).find((s) => s.key === key);
    if (!spec) throw new Error(`Spec "${key}" is missing or not cleared for display`);
    return spec;
  });

/** Homepage hero strip. */
export const piranhaHeroSpecs = pick(piranhaSpecs, ["length", "width", "systemWeight", "topSpeed", "bldcMotor", "ratedLoad"]);

export const platforms: Platform[] = [
  {
    slug: "piranha",
    key: "piranha",
    name: "PIRANHA",
    image: { ...IMAGES.piranhaCard, position: "50% 50%" },
    cardSpecs: pick(piranhaSpecs, ["length", "topSpeed", "bldcMotor", "ratedLoad"]),
    specs: piranhaSpecs,
    page: {
      hero: {
        image: { ...IMAGES.heroPiranha, position: "92% 50%" },
        mobilePosition: "96% 50%",
        mobileZoom: { scale: 1.32, origin: "72% 46%" },
        filter: "brightness(1.22) contrast(1.12)",
        tint: 0.5,
        fade: 32,
      },
      keySpecs: ["length", "width", "systemWeight", "topSpeed", "bldcMotor", "ratedLoad"],
      overview: {
        // Real USV-configuration photograph (differs from the studio-render hero). Native 360×480 → kept small.
        image: { ...IMAGES.piranhaUsv, position: "50% 50%" },
        aspect: 540 / 720,
        span: 5,
        blocks: [{ id: "core" }, { id: "integration", status: "target" }, { id: "autonomy", status: "optional" }],
      },
      // The real PIRANHA photographs are low-resolution (~300 px wide at source), so they share one row at modest size.
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
    image: { ...IMAGES.ragnarGraded, position: "50% 56%" },
    featureImage: { ...IMAGES.ragnarFeature, position: "58% 62%" },
    cardSpecs: pick(ragnarSpecs, ["length", "maxSpeed", "payload", "rangeCruise"]),
    specs: ragnarSpecs,
    page: {
      hero: { image: { ...IMAGES.ragnarGraded, position: "50% 58%" }, mobilePosition: "50% 56%", fade: 18 },
      keySpecs: ["length", "beam", "payload", "maxSpeed", "rangeCruise", "engines"],
      overview: {
        image: { ...IMAGES.ragnarModules, position: "50% 50%" },
        aspect: 692 / 516,
        blocks: [{ id: "build" }],
      },
      gallery: [[{ id: "wide", image: { ...IMAGES.ragnarPosterWide, position: "50% 50%" } }]],
    },
  },
  {
    slug: "munin",
    key: "munin",
    name: "PBO 4 “MUNIN”",
    image: { ...IMAGES.muninCard, position: "50% 76%" },
    cardSpecs: pick(muninSpecs, ["length", "maxSpeed", "payload", "range"]),
    specs: muninSpecs,
    // Bespoke page (components/munin, data/munin.ts).
    page: {
      custom: "munin",
      keySpecs: ["length", "beam", "height", "weightEmpty", "payload", "maxSpeed", "range"],
    },
  },
  {
    slug: "jet-sled",
    key: "jetSled",
    name: "JET SLED",
    image: { ...IMAGES.jetSledCard, position: "50% 60%" },
    cardSpecs: pick(jetSledSpecs, ["confirmedPayload", "estSpeed50", "estRange50", "battery"]),
    specs: jetSledSpecs,
    hasNote: true,
    page: {
      hero: { image: { ...IMAGES.jetSledCard, position: "55% 55%" }, mobilePosition: "55% 55%", fade: 24 },
      keySpecs: ["confirmedPayload", "estSpeed50", "estRange50", "inflatableHull", "jetDrive", "battery"],
      overview: {
        // Real operational-demo photograph (PDF p.11), different from the sheet photograph used in the hero.
        image: { ...IMAGES.jetSledDemo, position: "50% 50%" },
        aspect: 1200 / 900,
        blocks: [{ id: "propulsion" }, { id: "control" }],
      },
      // No gallery: no further accurate JET SLED imagery is available.
      notes: ["jetSledPayload"],
    },
  },
];

export const getPlatform = (slug: string) => platforms.find((p) => p.slug === slug);

/** Picks the page's key-spec strip from the platform's single spec list. */
export const keySpecsOf = (platform: Platform): Spec[] => pick(platform.specs, platform.page.keySpecs);
