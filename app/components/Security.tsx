"use client";

import {
  Ban,
  BellRing,
  FileLock2,
  KeyRound,
  ScrollText,
  UserLock,
} from "lucide-react";
import { useSite } from "./SiteShell";
import { Container, SectionHeading } from "./ui";

const ICONOS = [KeyRound, UserLock, Ban, ScrollText, BellRing, FileLock2];

export default function Security() {
  const { t } = useSite();

  return (
    <section id="seguridad" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow={t.security.eyebrow} title={t.security.title} />

        <ul className="mt-12 grid list-none gap-x-10 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {t.security.items.map((item, i) => {
            const Icono = ICONOS[i % ICONOS.length];
            return (
              <li key={item.title} className="border-t border-rule pt-5">
                <Icono
                  aria-hidden
                  className="mb-3 h-5 w-5 text-accent"
                  strokeWidth={1.5}
                />
                <h3 className="m-0 mb-2 font-sans text-[0.98rem] leading-snug font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="m-0 text-[0.9rem] text-ink-2">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
