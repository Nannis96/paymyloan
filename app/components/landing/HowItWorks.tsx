"use client";

import { useSite } from "../layout/SiteShell";
import { Container, SectionHeading } from "../ui";

export default function HowItWorks() {
  const { t } = useSite();

  return (
    <section id="como-funciona" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} />

        <ol className="mt-12 grid list-none gap-px overflow-hidden rounded-[2px] border border-rule bg-rule p-0 sm:grid-cols-2 lg:grid-cols-4">
          {t.how.steps.map((paso, i) => (
            <li key={paso.title} className="bg-surface p-7">
              <span className="eyebrow block text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 mb-2 font-sans text-[1rem] leading-snug font-semibold text-ink">
                {paso.title}
              </h3>
              <p className="m-0 text-[0.9rem] text-ink-2">{paso.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
