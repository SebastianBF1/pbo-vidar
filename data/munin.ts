/**
 * Layout data for the bespoke PBO 4 “MUNIN” product page (components/munin).
 * Specification values come from data/platforms.ts; words from locales products.munin.page.
 */
import { IMAGES, type SiteImage } from "./images";
import type { SpecKey, SpecStatus } from "./platforms";

export type MuninViewId = "front" | "side" | "rear";

export interface MuninView {
  id: MuninViewId;
  image: SiteImage;
  /**
   * "illustration": 2:1 illustrated view with its dimension lines already drawn in, fills the tile.
   * "photo": brochure photograph shown at a restrained size on the dark stage, with a beam line drawn by the
   *          site across the widest points of the hull (image px).
   */
  mode: "illustration" | "photo";
  /** Dimensions shown in the view — repeated as a readable caption on phones, where drawn labels get too small. */
  dims: SpecKey[];
  beam?: { x1: number; x2: number; y: number; drop: number };
}

export interface MuninFeature {
  id: "speed" | "range" | "payload" | "electric" | "control" | "waters";
  /** Spec whose public value is shown under the title (otherwise a locale sub-line, if any). */
  spec?: SpecKey;
}

export interface MuninMission {
  id: "surveillance" | "special";
  image: SiteImage;
  status?: SpecStatus;
}

export const MUNIN_PAGE = {
  hero: IMAGES.muninHeroWide,
  views: [
    // Front: brochure photograph (bow). Side and rear: technical illustrations.
    { id: "front", image: IMAGES.muninFront, mode: "photo", dims: ["beam"], beam: { x1: 102, x2: 298, y: 108, drop: 177 } },
    { id: "side", image: IMAGES.muninTechSide, mode: "illustration", dims: ["length", "height"] },
    { id: "rear", image: IMAGES.muninTechRear, mode: "illustration", dims: ["beam", "height"] },
  ] satisfies MuninView[],
  // Feature row, after the brochure.
  features: [
    { id: "speed", spec: "maxSpeed" },
    { id: "range", spec: "range" },
    { id: "payload", spec: "payload" },
    { id: "electric" },
    { id: "control" },
    { id: "waters" },
  ] satisfies MuninFeature[],
  action: IMAGES.muninAction,
  // Brochure mission list: “Surveillance”, “Special missions” (no further claims).
  missions: [
    { id: "surveillance", image: IMAGES.muninMissionSurveillance, status: "optional" },
    { id: "special", image: IMAGES.muninMissionSpecial, status: "optional" },
  ] satisfies MuninMission[],
  // Brochure operating area: rivers, lakes, coastal waters, offshore.
  environments: [
    { id: "rivers", image: IMAGES.muninEnvRivers },
    { id: "lakes", image: IMAGES.muninEnvLakes },
    { id: "coastal", image: IMAGES.muninEnvCoastal },
    { id: "offshore", image: IMAGES.muninEnvOffshore },
  ] as const,
};
