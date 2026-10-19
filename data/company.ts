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

/** Prepared email behind “Start a conversation” — English on both language versions; the visitor edits and sends it. */
export const COLLABORATION_MAIL = {
  subject: "Collaboration Opportunity – PBO VIDAR",
  body: [
    "Hello PBO VIDAR team,",
    "",
    "I would like to explore a potential collaboration opportunity with PBO VIDAR.",
    "",
    "Here is a brief description of my idea or requirements:",
    "",
    "[Your message]",
    "",
    "Best regards,",
  ].join("\r\n"), // RFC 6068: line breaks in a mailto body are CRLF (%0D%0A)
};

export const COLLABORATION_MAILTO = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
  COLLABORATION_MAIL.subject,
)}&body=${encodeURIComponent(COLLABORATION_MAIL.body)}`;
