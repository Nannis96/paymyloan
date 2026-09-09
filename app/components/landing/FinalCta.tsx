"use client";

import { useSite } from "../layout/SiteShell";
import { BTN_PRIMARY, Container, Eyebrow } from "../ui";

export default function FinalCta() {
  const { t } = useSite();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="rounded-[2px] border border-rule bg-surface p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[38rem]">
              <Eyebrow className="mb-3">{t.finalCta.eyebrow}</Eyebrow>
              <h2 className="m-0 mb-3 font-serif text-[1.9rem] leading-[1.15] font-semibold tracking-[-0.01em] text-ink text-balance md:text-[2.3rem]">
                {t.finalCta.title}
              </h2>
              <p className="m-0 text-ink-2">{t.finalCta.body}</p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-3">
              <a href="#registro" className={`${BTN_PRIMARY} no-underline`}>
                {t.finalCta.cta}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
