"use client";

import { Check } from "lucide-react";
import { useSite } from "../layout/SiteShell";
import RegisterForm from "../RegisterForm";
import { Container, Eyebrow } from "../ui";

export default function Hero() {
  const { t } = useSite();

  return (
    <section className="border-b-2 border-ink pt-14 pb-16 md:pt-20 md:pb-20">
      <Container>
        {/* En móvil el orden es copy -> formulario -> quién opera, para que la
            acción principal quede lo más arriba posible. En escritorio son dos
            columnas y la franja de "operado por" se ancla abajo, a la altura
            del borde inferior del formulario. */}
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_25rem] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10 xl:grid-cols-[minmax(0,1fr)_27rem]">
          <div className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
            <Eyebrow className="mb-4">{t.hero.eyebrow}</Eyebrow>

            <h1 className="m-0 max-w-[16ch] font-serif text-[clamp(2.4rem,6vw,3.6rem)] leading-[1.04] font-semibold tracking-[-0.015em] text-ink text-balance">
              {t.hero.title}
            </h1>

            <p className="mt-5 mb-8 max-w-[44rem] text-[1.06rem] text-ink-2">
              {t.hero.deck}
            </p>

            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {t.hero.points.map((punto) => (
                <li key={punto} className="flex items-start gap-3 text-ink-2">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[2px] bg-accent-soft text-accent"
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-[0.95rem]">{punto}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-2 min-w-0 lg:col-start-2 lg:row-start-1 lg:row-end-3">
            <RegisterForm />
          </div>

          <div className="order-3 border-t border-rule pt-5 lg:col-start-1 lg:row-start-2 lg:self-end">
            <p className="eyebrow m-0 mb-2 text-ink-3">{t.hero.trustLabel}</p>
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
              {t.hero.trust.map((item) => (
                <li key={item} className="font-mono text-[0.74rem] text-ink-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
