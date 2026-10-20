"use client";

import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import LandingHeader from "@/app/components/landing/LandingHeader";

export default function TermsOfService() {
  const { t } = useSite();
  const terms = t.terms;

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <LandingHeader />

      <main className="mx-auto w-full max-w-[760px] px-6 py-12 md:py-20">
        
        {/* Encabezado del Documento */}
        <div className="mb-10 border-b-2 border-rule pb-6">
          <Link 
            href="/" 
            className="mb-4 inline-block text-[13px] font-semibold text-ink-3 transition-colors hover:text-accent"
          >
            &larr; {terms.back}
          </Link>
          <div className="mb-1.5 text-[28px] font-extrabold tracking-[-0.5px] text-ink">
            {terms.title}
          </div>
          <div className="text-[13px] text-ink-3">
            {terms.meta}
          </div>
        </div>

        {/* Tabla de Contenidos (TOC) */}
        <div className="mb-9 rounded-[10px] border border-rule bg-surface-2 p-5 md:p-6 shadow-sm">
          <div className="mb-3 text-[12px] font-bold uppercase tracking-[0.5px] text-ink-3">
            {terms.tocTitle}
          </div>
          <ul className="grid grid-cols-1 gap-1 list-none md:grid-cols-2">
            {terms.sections.map((sec) => (
              <li key={sec.id}>
                <a 
                  href={`#${sec.id}`} 
                  className="text-[13px] font-medium text-accent hover:underline"
                >
                  {sec.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Secciones */}
        <div>
          {terms.sections.map((sec) => (
            <div key={sec.id} id={sec.id} className="mb-9 scroll-mt-24">
              <h2 className="mb-3 border-t border-rule pt-2 text-[16px] font-extrabold text-ink">
                {sec.heading}
              </h2>
              
              {/* Parrafos iniciales */}
              {sec.paragraphs?.map((p, i) => (
                <p key={`p-${i}`} className="mb-2.5 text-[13px] leading-[1.9] text-ink-2">
                  {p}
                </p>
              ))}

              {/* Lista con viñetas (si existe) */}
              {sec.list && (
                <ul className="mb-2.5 list-outside list-disc pl-5 space-y-1">
                  {sec.list.map((item, i) => {
                    const parts = item.split(": ");
                    if (parts.length > 1) {
                      return (
                        <li key={`li-${i}`} className="text-[13px] leading-[1.9] text-ink-2">
                          <strong className="text-ink font-semibold">{parts[0]}:</strong> {parts.slice(1).join(": ")}
                        </li>
                      );
                    }
                    return (
                      <li key={`li-${i}`} className="text-[13px] leading-[1.9] text-ink-2">
                        {item}
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Párrafos posteriores (si existen) */}
              {sec.paragraphsAfter?.map((p, i) => (
                <p key={`pa-${i}`} className="mb-2.5 text-[13px] leading-[1.9] text-ink-2">
                  {p}
                </p>
              ))}

              {/* Highlight (si existe) */}
              {sec.highlight && (
                <div className="my-3 rounded-r-md border-l-[3px] border-accent bg-accent-soft px-4 py-3 text-[13px] leading-[1.8] text-ink">
                  {sec.highlight}
                </div>
              )}

              {/* Warning (si existe) */}
              {sec.warning && (
                <div className="my-3 rounded-r-md border-l-[3px] border-crit bg-red-50 px-4 py-3 text-[13px] leading-[1.8] text-red-900 dark:bg-red-900/10 dark:text-red-300">
                  {sec.warning}
                </div>
              )}

              {/* Disclaimer (si existe) */}
              {sec.disclaimer && (
                <p className="mt-2.5 text-[12px] italic text-ink-3">
                  {sec.disclaimer}
                </p>
              )}
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}