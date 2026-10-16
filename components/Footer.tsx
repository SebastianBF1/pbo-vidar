import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { COMPANY, type SocialId } from "@/data/company";
import { fill } from "@/lib/format";
import type { Dictionary } from "@/lib/i18n";
import { IconFacebook, IconInstagram, IconMail, IconYouTube } from "./Icons";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";

const SECTIONS = ["about", "platforms", "technology", "impact", "contact"] as const;
const SOCIAL_ICONS: Record<SocialId, ComponentType<SVGProps<SVGSVGElement>>> = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  youtube: IconYouTube,
};

export function Footer({ dict, locale }: { dict: Dictionary; locale: string }) {
  const f = dict.footer;
  return (
    <footer id="contact" className="relative border-t border-line bg-ink">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:gap-8 md:py-20">
        <div className="md:col-span-4">
          <Logo size="lg" />
          <p className="label mt-8 leading-relaxed text-fg/75">
            {f.tagline[0]}
            <br />
            {f.tagline[1]}
          </p>
        </div>

        <nav aria-label={f.navTitle} className="md:col-span-3">
          <p className="label">{f.navTitle}</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 md:block md:space-y-1">
            {SECTIONS.map((id) => (
              <li key={id}>
                <Link
                  href={`/${locale}#${id}`}
                  className="inline-flex min-h-10 items-center font-mono text-[0.75rem] uppercase tracking-[0.22em] text-fg/85 transition-colors duration-300 hover:text-cyan"
                >
                  {dict.nav[id]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-10 md:col-span-5">
          <div>
            <p className="label">{f.contactTitle}</p>
            <a
              href={`mailto:${COMPANY.email}`}
              className="group mt-5 inline-flex items-center gap-3 font-display text-[1.375rem] font-semibold tracking-[0.02em] transition-colors duration-300 hover:text-cyan md:text-[1.5rem]"
            >
              <IconMail className="h-5 w-5 text-cyan transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span className="sr-only">{f.email}: </span>
              {COMPANY.email}
            </a>
            <a
              href={COMPANY.website.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block w-fit font-mono text-[0.75rem] uppercase tracking-[0.2em] text-fg/70 transition-colors duration-300 hover:text-cyan"
            >
              {COMPANY.website.label}
            </a>
          </div>

          <div className="flex flex-wrap items-start gap-x-14 gap-y-10">
            <div>
              <p className="label">{f.socialTitle}</p>
              <ul className="mt-4 flex items-center gap-3">
                {COMPANY.social.map((s) => {
                  const Icon = SOCIAL_ICONS[s.id];
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={fill(f.socialLabel, { network: s.name })}
                        title={s.name}
                        className="flex h-11 w-11 items-center justify-center border border-line text-fg/85 transition-colors duration-300 hover:border-cyan hover:text-cyan"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <p className="label">{f.languageTitle}</p>
              <LanguageSwitch label={f.languageTitle} className="mt-2 text-[0.8125rem]" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-line-soft">
        <div className="container-x flex flex-col gap-2 py-6 font-mono text-[0.6563rem] uppercase tracking-[0.2em] text-muted sm:flex-row sm:justify-between">
          <span>© 2026 {f.copyright}</span>
          <span className="flex items-center gap-3">
            <span className="inline-flex h-2.5 w-4 flex-col" aria-hidden>
              <span className="h-1/2 bg-[#0057b7]" />
              <span className="h-1/2 bg-signal" />
            </span>
            {dict.mission.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}
