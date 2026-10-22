/**
 * Public image paths (src + intrinsic size). Components take image paths from here.
 */
import { asset } from "@/lib/asset";

export interface SiteImage {
  src: string;
  width: number;
  height: number;
}

export const IMAGES = {
  logoMark: { src: asset("/images/pbo-mark.png"), width: 563, height: 511 },
  // ---------------------------------------------------------------- Company homepage hero
  heroCompany: { src: asset("/images/hero-kyiv-dnipro.webp"), width: 1643, height: 957 },
  // ---------------------------------------------------------------- PIRANHA
  homeHeroPiranha: { src: asset("/images/piranha-hero-illustration.webp"), width: 1672, height: 941 },
  heroPiranha: { src: asset("/images/piranha-studio.jpg"), width: 2048, height: 1242 },
  piranhaCard: { src: asset("/images/piranha-shore.webp"), width: 1448, height: 1086 },
  piranhaTop: { src: asset("/images/piranha-top-view.webp"), width: 1448, height: 1086 },
  piranhaUsv: { src: asset("/images/piranha-deck.webp"), width: 885, height: 1109 },
  piranhaHull: { src: asset("/images/piranha-standing.webp"), width: 731, height: 1098 },
  // ---------------------------------------------------------------- RAGNAR 28
  ragnarModules: { src: asset("/images/ragnar-28-deck.webp"), width: 1448, height: 1086 },
  ragnarUnderway: { src: asset("/images/ragnar-28-underway.webp"), width: 1916, height: 821 },
  // ---------------------------------------------------------------- PBO 4 "MUNIN"
  muninCard: { src: asset("/images/munin-water.jpg"), width: 414, height: 442 },
  aboutMunin: { src: asset("/images/munin-about-v2.webp"), width: 2000, height: 770 },
  muninHeroWide: { src: asset("/images/munin-hero-wide.jpg"), width: 2048, height: 682 },
  muninFront: { src: asset("/images/munin-front.jpg"), width: 394, height: 250 },
  muninEnvRivers: { src: asset("/images/munin-env-rivers.jpg"), width: 356, height: 158 },
  muninEnvLakes: { src: asset("/images/munin-env-lakes.jpg"), width: 350, height: 158 },
  muninEnvCoastal: { src: asset("/images/munin-env-coastal.jpg"), width: 350, height: 158 },
  muninEnvOffshore: { src: asset("/images/munin-env-offshore.jpg"), width: 356, height: 158 },
  // ---------------------------------------------------------------- JET SLED
  jetSledCard: { src: asset("/images/jet-sled-field.jpg"), width: 1220, height: 684 },
  jetSledDemo: { src: asset("/images/jet-sled-demo.jpg"), width: 1200, height: 900 },
  // ---------------------------------------------------------------- Homepage brand / atmosphere
  fieldOperations: { src: asset("/images/field-operations.jpg"), width: 809, height: 486 },
  brandAerial: { src: asset("/images/brand-aerial-graded.jpg"), width: 849, height: 486 },
} as const satisfies Record<string, SiteImage>;
