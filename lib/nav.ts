/** Global navigation (header + footer): labels come from locales `nav`, destinations from here. */
export type NavId = "about" | "platforms" | "technology" | "impact" | "contact";

export const HEADER_NAV: readonly NavId[] = ["about", "platforms", "technology", "contact"];
/** Same structure everywhere: the footer repeats the header navigation. */
export const FOOTER_NAV: readonly NavId[] = HEADER_NAV;

export function navHref(id: NavId, locale: string): string {
  switch (id) {
    case "about":
      return `/${locale}/about`;
    case "technology":
      return `/${locale}/technology`;
    case "platforms":
      return `/${locale}#platforms`;
    case "impact":
      return `/${locale}#impact`;
    case "contact":
      // the collaboration section on the homepage
      return `/${locale}#opportunities`;
  }
}
