"use client";

import { useSite } from "./SiteShell";
import { Container, SectionHeading } from "./ui";

export default function Benefits() {
  const { t } = useSite();

  return (
    <section id="que-resuelve" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={t.benefits.eyebrow}
          title={t.benefits.title}
          lead={t.benefits.lead}
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-rule bg-rule md:grid-cols-3">
          {t.benefits.items.map((item) => (
            <article key={item.title} className="bg-surface p-7">
              <h3 className="m-0 mb-3 font-sans text-[1.02rem] leading-snug font-semibold text-ink">
                {item.title}
              </h3>
              <p className="m-0 text-[0.92rem] text-ink-2">{item.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
