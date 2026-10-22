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

const mailto = (subject: string, body: string) =>
  `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const COLLABORATION_MAILTO = mailto(COLLABORATION_MAIL.subject, COLLABORATION_MAIL.body);

/** “Get in contact” in the homepage hero — English on both language versions. */
export const ENQUIRY_MAILTO = mailto(
  "Enquiry – PBO VIDAR",
  [
    "Hello PBO VIDAR team,",
    "",
    "I would like to get in touch regarding your maritime technology and solutions.",
    "",
    "My enquiry:",
    "",
    "[Write your message here]",
    "",
    "Best regards,",
  ].join("\r\n"),
);

/** “Request specifications” on a product page — English on both language versions; nothing is sent automatically. */
export function specsRequestMail(productName: string) {
  const name = productName.replace(/[“”"]/g, ""); // PBO 4 “MUNIN” → PBO 4 MUNIN
  const subject = `${name} – Technical Specifications Request`;
  const body = [
    "Hello PBO VIDAR team,",
    "",
    `I am interested in receiving technical specifications and further information about ${name}.`,
    "",
    "Please let me know how I can obtain additional details.",
    "",
    "Best regards,",
  ].join("\r\n");
  return { subject, body, href: mailto(subject, body) };
}
