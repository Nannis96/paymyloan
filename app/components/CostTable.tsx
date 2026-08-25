"use client";

import { useSite } from "./SiteShell";
import { Container, SectionHeading } from "./ui";

export default function CostTable() {
  const { t } = useSite();

  return (
    <section id="costo" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={t.cost.eyebrow}
          title={t.cost.title}
          lead={t.cost.lead}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,32rem)_minmax(0,1fr)] lg:gap-12">
          {/* La tabla scrollea dentro de su propia caja: la página nunca
              se desplaza en horizontal. */}
          <div className="overflow-x-auto rounded-[2px] border border-rule bg-surface">
            <table className="w-full min-w-[26rem] border-collapse text-[0.86rem]">
              <thead>
                <tr>
                  {t.cost.tableHead.map((th, i) => (
                    <th
                      key={th}
                      scope="col"
                      className={`eyebrow border-b border-rule-strong bg-surface-2 px-[0.9rem] py-[0.7rem] whitespace-nowrap text-ink-3 ${
                        i === 0 ? "text-left" : "text-right"
                      }`}
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.cost.rows.map((fila) => (
                  <tr key={fila[0]} className="border-b border-rule last:border-0">
                    <td className="px-[0.9rem] py-[0.7rem] font-mono text-ink tabular-nums">
                      {fila[0]}
                    </td>
                    <td className="px-[0.9rem] py-[0.7rem] text-right font-mono text-ink-2 tabular-nums">
                      {fila[1]}
                    </td>
                    <td className="px-[0.9rem] py-[0.7rem] text-right font-mono text-ink-2 tabular-nums">
                      {fila[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-[2px] border border-accent-soft border-l-[3px] border-l-accent bg-accent-soft p-[1rem_1.1rem]">
              <span className="eyebrow mb-2 block text-accent">
                {t.cost.compareLabel}
              </span>
              <p className="m-0 text-[0.92rem] text-ink-2">{t.cost.compare}</p>
            </div>

            {/* Dato que el alcance deja abierto (Seccion 11, preguntas 2 y 5).
                Se muestra como pendiente en vez de inventar un precio. */}
            <div className="rounded-[2px] border border-amber-soft border-l-[3px] border-l-amber bg-amber-soft p-[1rem_1.1rem]">
              <span className="eyebrow mb-2 block text-amber">
                {t.cost.pendingLabel}
              </span>
              <p className="m-0 text-[0.92rem] text-ink-2">{t.cost.pending}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
