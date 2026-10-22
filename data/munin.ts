/**
 * Layout data for the bespoke PBO 4 “MUNIN” product page (components/munin). Words from locales products.munin.page.
 */
import { IMAGES } from "./images";

export const MUNIN_PAGE = {
  hero: IMAGES.muninHeroWide,
  // Brochure operating area: rivers, lakes, coastal waters, offshore.
  environments: [
    { id: "rivers", image: IMAGES.muninEnvRivers },
    { id: "lakes", image: IMAGES.muninEnvLakes },
    { id: "coastal", image: IMAGES.muninEnvCoastal },
    { id: "offshore", image: IMAGES.muninEnvOffshore },
  ] as const,
};
