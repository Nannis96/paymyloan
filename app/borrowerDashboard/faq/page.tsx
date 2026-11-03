"use client";

import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import Link from "next/link";

export default function FaqPage() {
  const { t } = useSite();
  
  // Seguro por si hay un error de TS en los diccionarios y no se compilan
  const faq = t.faq || {
    title: "FAQ",
    subtitle: "Cargando...",
    sections: []
  };

  return (
    <SiteShell isMinimal={true}>
      <div className="w-full animate-in fade-in duration-300 pb-12 pt-2">
        
        {/* Encabezado */}
        <header className="mb-8">
          <h1 className="text-[28px] font-[900] tracking-tight text-ink mb-2">
            {faq.title}
          </h1>
          <p className="text-[14px] text-ink-3">
            {faq.subtitle}
          </p>
        </header>

        {/* Listado de FAQs estructurado por secciones */}
        <div className="flex flex-col gap-8">
          {faq.sections.map((section: any, idx: number) => (
            <section key={idx}>
              <h2 className="mb-4 text-[16px] font-[800] text-accent">
                {section.title}
              </h2>
              <div className="flex flex-col gap-3">
                {section.items.map((item: any, itemIdx: number) => (
                  <details
                    key={itemIdx}
                    className="group rounded-[10px] border border-rule bg-surface shadow-sm open:bg-surface-2 transition-colors"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-[16px] text-[14px] font-[700] text-ink list-none [&::-webkit-details-marker]:hidden hover:text-accent transition-colors">
                      {item.q}
                      <span className="transition-transform duration-200 group-open:rotate-180 text-ink-3 group-hover:text-accent">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 6l4 4 4-4" />
                        </svg>
                      </span>
                    </summary>
                    <div className="p-[0_16px_16px_16px] text-[13px] text-ink-2 leading-[1.7]">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </SiteShell>
  );
}