"use client";

import Link from "next/link";
import { useSite } from "./layout/SiteShell";
import { Container, Eyebrow } from "./ui";

export default function PrivacyNotice() {
  const { t } = useSite();
  const p = t.privacy;

  return (
    <section className="border-b-2 border-ink py-14 md:py-20">
      <Container className="max-w-[52rem]">
        <Link
          href="/"
          className="eyebrow text-ink-3 no-underline transition-colors hover:text-accent"
        >
          ← {p.back}
        </Link>

        <Eyebrow className="mt-8 mb-3">{p.eyebrow}</Eyebrow>
        <h1 className="m-0 font-serif text-[clamp(2rem,5vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.015em] text-ink text-balance">
          {p.title}
        </h1>
        <p className="eyebrow mt-4 mb-0 text-ink-3">{p.updated}</p>

        <div className="mt-8 flex flex-col gap-4">
          {p.intro.map((paragraph) => (
            <p key={paragraph} className="m-0 max-w-[46rem] text-[1.02rem] text-ink-2">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-10">
          {p.sections.map((section) => (
            <div key={section.heading} className="border-t border-rule-strong pt-8">
              <h2 className="m-0 font-serif text-[1.3rem] leading-tight font-semibold tracking-[-0.01em] text-ink">
                {section.heading}
              </h2>

              {section.paragraphs.length > 0 ? (
                <div className="mt-4 flex flex-col gap-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="m-0 text-[0.98rem] text-ink-2">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {"list" in section && section.list ? (
                <ul className="mt-4 mb-0 flex list-none flex-col gap-2 p-0">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.98rem] text-ink-2">
                      <span
                        aria-hidden
                        className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {"note" in section && section.note ? (
                <p className="mt-4 mb-0 border-l-2 border-accent pl-[1.1rem] text-[0.92rem] text-ink-3">
                  {section.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
