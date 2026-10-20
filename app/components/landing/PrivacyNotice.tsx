"use client";

import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import LandingHeader from "@/app/components/landing/LandingHeader";

export default function PrivacyNotice() {
  const { t } = useSite();
  const pr = t.privacy;

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
            &larr; {pr.back}
          </Link>
          <div className="mb-1.5 text-[28px] font-extrabold tracking-[-0.5px] text-ink">
            {pr.title}
          </div>
          <div className="text-[13px] text-ink-3">
            {pr.meta}
          </div>
        </div>

        {/* Tabla de Contenidos (TOC) */}
        <div className="mb-9 rounded-[10px] border border-rule bg-surface-2 p-5 md:p-6 shadow-sm">
          <div className="mb-3 text-[12px] font-bold uppercase tracking-[0.5px] text-ink-3">
            {pr.tocTitle}
          </div>
          <ul className="grid grid-cols-1 gap-1 list-none md:grid-cols-2">
            {pr.sections.map((sec) => (
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
          {pr.sections.map((sec) => (
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

              {/* Tabla (si existe) */}
              {sec.table && (
                <div className="my-3 overflow-x-auto rounded-lg border border-rule">
                  <table className="w-full border-collapse">
                    <thead className="bg-surface-2 border-b border-rule">
                      <tr>
                        {sec.table.headers.map((th, i) => (
                          <th key={`th-${i}`} className="px-3 py-2 text-left text-[11px] font-bold uppercase tracking-[0.4px] text-ink-3">
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-2 text-[13px] text-ink-2">
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={`tr-${rIdx}`}>
                          {row.map((cell, cIdx) => (
                            <td key={`td-${cIdx}`} className={`px-3 py-2.5 ${cIdx === 0 ? "font-semibold text-ink" : ""}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Lista con vinetas (si existe) */}
              {sec.list && (
                <ul className="mb-2.5 list-outside list-disc pl-5 space-y-1">
                  {sec.list.map((item, i) => {
                    /* Soporte para texto en negrita al inicio */
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

              {/* Parrafos posteriores (si existen) */}
              {sec.paragraphsAfter?.map((p, i) => (
                <p key={`pa-${i}`} className="mb-2.5 text-[13px] leading-[1.9] text-ink-2">
                  {p}
                </p>
              ))}

              {/* Highlight / Alerta (si existe) */}
              {sec.highlight && (
                <div className="my-3 rounded-r-md border-l-[3px] border-accent bg-accent-soft px-4 py-3 text-[13px] leading-[1.8] text-ink">
                  {sec.highlight}
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