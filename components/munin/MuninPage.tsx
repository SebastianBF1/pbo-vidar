import { publicSpecs, type Platform } from "@/data/platforms";
import { displaySpecs } from "@/lib/format";
import type { Dictionary, Locale } from "@/lib/i18n";
import { muninCopy } from "@/lib/product-copy";
import { MuninEnvironments } from "./MuninEnvironments";
import { MuninHero } from "./MuninHero";
import { MuninKeySpecs } from "./MuninKeySpecs";
import { MuninOverview } from "./MuninOverview";
import { MuninTechnical } from "./MuninTechnical";

/** Bespoke PBO 4 “MUNIN” product page (everything above Other platforms). */
export function MuninPage({ platform, dict, locale }: { platform: Platform; dict: Dictionary; locale: Locale }) {
  const copy = muninCopy(dict);
  // Every rendered value goes through publicSpecs()/displaySpecs().
  const all = publicSpecs(platform.specs);
  const display = displaySpecs(all, dict, locale);
  const table = all.map((s, i) => ({ ...display[i], group: s.group }));
  const keySpecs = platform.page.keySpecs.map((k) => {
    const s = display.find((x) => x.key === k);
    if (!s) throw new Error(`MUNIN key spec "${k}" is missing or not public`);
    return s;
  });

  return (
    <div data-page="munin">
      <MuninHero platform={platform} copy={copy} dict={dict} locale={locale} />
      <MuninKeySpecs title={copy.page.keySpecs} specs={keySpecs} />
      <MuninTechnical copy={copy} dict={dict} specs={table} />
      <MuninOverview copy={copy} dict={dict} specs={display} />
      <MuninEnvironments copy={copy} />
    </div>
  );
}
