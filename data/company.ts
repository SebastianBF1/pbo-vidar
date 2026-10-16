/**
 * Company contact and social links.
 * Source: footer of the current pboukraine.com (both /uk/ and /en/), retrieved 2026-10-15. Do not add links
 * that are not published there.
 */
export const COMPANY = {
  email: "info@pboukraine.com",
  website: { href: "https://www.pboukraine.com", label: "www.pboukraine.com" },
  social: [
    { id: "facebook", name: "Facebook", href: "https://www.facebook.com/pboukraine" },
    { id: "instagram", name: "Instagram", href: "https://www.instagram.com/pbo_ukraine" },
    { id: "youtube", name: "YouTube", href: "https://www.youtube.com/@PBOUkraine" },
  ],
} as const;

export type SocialId = (typeof COMPANY.social)[number]["id"];
