import { publicSpecs, type Spec, type SpecKey, type SpecStatus } from "@/data/platforms";
import type { Dictionary, Locale } from "./i18n";

export interface DisplaySpec {
  key: SpecKey;
  label: string;
  /** Full value, e.g. “Up to 3,000 kg”. */
  value: string;
  /** Value split for large-figure layouts: small qualifier (“Up to”) + main figure (“3,000 kg”). */
  prefix?: string;
  main: string;
  /** "text" values are phrases (rendered in body type); "amount" values are figures. */
  kind: "amount" | "text";
  status: SpecStatus;
}

const NBSP = "\u00a0";
const PLAIN_NUMBER = /^\d+(\.\d+)?$/;
const NUMBER_LOCALE: Record<Locale, string> = { en: "en-US", ua: "uk-UA" };

/** "3000" → "3,000" / "3 000"; "1.86" → "1.86" / "1,86". Composite amounts ("2 × 200–300") pass through. */
export function formatAmount(amount: string, locale: Locale): string {
  if (!PLAIN_NUMBER.test(amount)) return amount;
  const decimals = amount.includes(".") ? amount.split(".")[1].length : 0;
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(amount));
}

function specParts(spec: Spec, dict: Dictionary, locale: Locale): { prefix?: string; main: string; value: string } {
  if (spec.text) return { main: dict.values[spec.text], value: dict.values[spec.text] };
  return amountParts(spec, dict, locale);
}

function amountParts(spec: Spec, dict: Dictionary, locale: Locale): { prefix?: string; main: string; value: string } {
  if (!spec.amount || !spec.unit) throw new Error(`Spec "${spec.key}" has neither text nor amount/unit`);
  const n = formatAmount(spec.amount, locale);
  const unit = dict.units[spec.unit];
  switch (spec.q) {
    case "upTo": {
      const main = `${n}${NBSP}${unit}`;
      return { prefix: dict.qualifiers.upTo.replace("{v}", "").trim(), main, value: dict.qualifiers.upTo.replace("{v}", main) };
    }
    case "approx":
      return { main: `~${n}${NBSP}${unit}`, value: `~${n}${NBSP}${unit}` };
    case "plus":
      return { main: `${n}+${NBSP}${unit}`, value: `${n}+${NBSP}${unit}` };
    default:
      return { main: `${n}${NBSP}${unit}`, value: `${n}${NBSP}${unit}` };
  }
}

export const formatSpecValue = (spec: Spec, dict: Dictionary, locale: Locale): string => specParts(spec, dict, locale).value;

/** Public, display-ready specs (values with display: false are dropped here). */
export function displaySpecs(specs: Spec[], dict: Dictionary, locale: Locale): DisplaySpec[] {
  return publicSpecs(specs).map((s) => ({
    key: s.key,
    label: dict.specs[s.key],
    ...specParts(s, dict, locale),
    kind: s.text ? "text" : "amount",
    status: s.status ?? "stated",
  }));
}

export const fill = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
