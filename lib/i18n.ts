import en from "@/locales/en.json";
import ua from "@/locales/ua.json";

export const locales = ["en", "ua"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Dictionary = typeof en;

/** Marker used in locale files for copy that has not been supplied/approved yet. */
export const TODO_MARKER = "TODO_UA";

/** HTML lang attribute per route locale ("ua" in the URL, ISO "uk" for the document). */
export const htmlLang: Record<Locale, string> = { en: "en", ua: "uk" };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/**
 * Replaces every TODO_UA leaf with the English value so the layout can be reviewed
 * in either language. Nothing is machine-translated.
 */
function withFallback(target: unknown, fallback: unknown): { value: unknown; pending: number } {
  if (target === TODO_MARKER) return { value: fallback, pending: 1 };
  if (Array.isArray(fallback)) {
    const arr = Array.isArray(target) ? target : [];
    let pending = 0;
    const value = fallback.map((item, i) => {
      const r = withFallback(arr[i] ?? TODO_MARKER, item);
      pending += r.pending;
      return r.value;
    });
    return { value, pending };
  }
  if (fallback && typeof fallback === "object") {
    const obj = (target && typeof target === "object" ? target : {}) as Record<string, unknown>;
    let pending = 0;
    const value = Object.fromEntries(
      Object.entries(fallback as Record<string, unknown>).map(([key, item]) => {
        const r = withFallback(obj[key] ?? TODO_MARKER, item);
        pending += r.pending;
        return [key, r.value];
      }),
    );
    return { value, pending };
  }
  return { value: target ?? fallback, pending: 0 };
}

export function getDictionary(locale: Locale): { dict: Dictionary; pendingKeys: number } {
  if (locale === "en") return { dict: en, pendingKeys: 0 };
  const { value, pending } = withFallback(ua, en);
  return { dict: value as Dictionary, pendingKeys: pending };
}
