import type { Platform } from "@/data/platforms";
import type { Dictionary, Locale } from "@/lib/i18n";
import { muninCopy } from "@/lib/product-copy";
import { MuninEnvironments } from "./MuninEnvironments";
import { MuninHero } from "./MuninHero";
import { MuninOverview } from "./MuninOverview";

/** Bespoke PBO 4 “MUNIN” product page (everything above Other platforms). */
export function MuninPage({ platform, dict, locale }: { platform: Platform; dict: Dictionary; locale: Locale }) {
  const copy = muninCopy(dict);

  return (
    <div data-page="munin">
      <MuninHero platform={platform} copy={copy} dict={dict} locale={locale} />
      <MuninOverview copy={copy} dict={dict} productName={platform.name} locale={locale} />
      <MuninEnvironments copy={copy} />
    </div>
  );
}
