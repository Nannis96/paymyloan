"use client";

import { useSite } from "./SiteShell";
import { Container } from "./ui";

export default function SiteFooter() {
  const { t } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink py-10">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-[26rem]">
            <p className="m-0 font-serif text-[1.05rem] font-semibold text-ink">
              {t.nav.brand}
              <span className="text-accent">{t.nav.brandSuffix}</span>
            </p>
            <p className="mt-2 mb-0 font-mono text-[0.72rem] leading-relaxed text-ink-3">
              {t.footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-2 font-mono text-[0.72rem] text-ink-3">
            <span>{t.footer.entity}</span>
          </div>

          <div className="flex flex-col gap-2 font-mono text-[0.72rem]">
            {t.footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-ink-2 no-underline transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <span className="text-ink-3">{t.footer.linksNote}</span>
          </div>
        </div>

        <p className="mt-10 mb-0 font-mono text-[0.72rem] text-ink-3">
          © {year} PayMyLoan.ai · {t.footer.rights}
        </p>
      </Container>
    </footer>
  );
}
