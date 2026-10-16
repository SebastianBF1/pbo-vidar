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
  // ---------------------------------------------------------------- PIRANHA
  homeHeroPiranha: { src: asset("/images/piranha-hero-illustration.webp"), width: 1672, height: 941 },
  heroPiranha: { src: asset("/images/piranha-studio.jpg"), width: 2048, height: 1242 },
  piranhaCard: { src: asset("/images/piranha-field.jpg"), width: 592, height: 452 },
  piranhaTop: { src: asset("/images/piranha-top.jpg"), width: 604, height: 452 },
  piranhaUsv: { src: asset("/images/piranha-usv.jpg"), width: 540, height: 720 },
  piranhaHull: { src: asset("/images/piranha-hull.jpg"), width: 392, height: 840 },
  // ---------------------------------------------------------------- RAGNAR 28
  ragnarGraded: { src: asset("/images/ragnar-28-graded.jpg"), width: 1024, height: 1024 },
  ragnarFeature: { src: asset("/images/ragnar-28.jpg"), width: 1024, height: 1024 },
  ragnarModules: { src: asset("/images/ragnar-28-poster.jpg"), width: 692, height: 516 },
  ragnarPosterWide: { src: asset("/images/ragnar-28-poster-wide.jpg"), width: 1490, height: 642 },
  // ---------------------------------------------------------------- PBO 4 "MUNIN"
  muninCard: { src: asset("/images/munin-water.jpg"), width: 414, height: 442 },
  aboutMunin: { src: asset("/images/munin.jpg"), width: 1024, height: 1024 },
  muninHeroWide: { src: asset("/images/munin-hero-wide.jpg"), width: 2048, height: 682 },
  muninFront: { src: asset("/images/munin-front.jpg"), width: 394, height: 250 },
  muninTechSide: { src: asset("/images/munin-tech-side.jpg"), width: 1370, height: 685 },
  muninTechRear: { src: asset("/images/munin-tech-rear.jpg"), width: 1448, height: 724 },
  muninAction: { src: asset("/images/munin-action.jpg"), width: 493, height: 261 },
  muninMissionSurveillance: { src: asset("/images/munin-mission-surveillance.jpg"), width: 172, height: 69 },
  muninMissionSpecial: { src: asset("/images/munin-mission-special.jpg"), width: 175, height: 70 },
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
