"use client";
import { useEffect, useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { apiFetch } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";

export default function DocumentsPage() {
  const { lang } = useSite();
  const isEs = lang === "es";
  const [contracts, setContracts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContracts() {
      try {
        const res = await apiFetch(API_ROUTES.contracts.base);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data?.items) {
            setContracts(json.data.items);
          }
        }
      } catch (error) {
        console.error("Error fetching contracts", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchContracts();
  }, []);

  const generalDocs = [
    { id: 1, name: "Identificación Oficial", date: "2026-08-15", status: "Verificado" },
    { id: 2, name: "Acta Constitutiva (LLC)", date: "2026-08-15", status: "Verificado" },
    { id: 3, name: "Estados de Cuenta", date: "2026-09-01", status: "Pendiente" }
  ];

  return (
    <SiteShell isMinimal={true}>
      <div className="max-w-[900px] animate-in fade-in duration-300 pb-12">
        <header className="mb-8">
          <h1 className="text-[28px] font-[900] tracking-tight text-ink">
            {isEs ? "Documentos" : "Documents"}
          </h1>
          <p className="mt-[4px] text-[14px] text-ink-3">
            {isEs ? "Gestiona tus archivos generales y los documentos asociados a cada trato." : "Manage your general files and deal-specific documents."}
          </p>
        </header>

        {/* Documentos Generales */}
        <div className="mb-8">
          <h2 className="mb-4 text-[16px] font-[800] text-ink">
            {isEs ? "Documentos Generales" : "General Documents"}
          </h2>
          <div className="rounded-xl border border-rule bg-surface p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              {generalDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between border-b border-rule pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-ink-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-ink">{doc.name}</div>
                      <div className="text-[12px] text-ink-3">Subido: {doc.date}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${doc.status === 'Verificado' ? 'bg-success-soft text-success' : 'bg-amber-soft text-amber'}`}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Documentos de Tratos */}
        <div>
          <h2 className="mb-4 text-[16px] font-[800] text-ink">
            {isEs ? "Documentos por Trato" : "Deal Documents"}
          </h2>
          
          {isLoading ? (
            <div className="text-[14px] text-ink-3">{isEs ? "Cargando tratos..." : "Loading deals..."}</div>
          ) : contracts.length === 0 ? (
            <div className="rounded-xl border border-rule bg-surface p-8 text-center shadow-sm">
              <p className="text-[14px] text-ink-3">
                {isEs ? "No tienes tratos activos con documentos." : "You have no active deals with documents."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {contracts.map((contract) => (
                <div key={contract.id} className="rounded-xl border border-rule bg-surface p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between border-b border-rule pb-4">
                    <div>
                      <h3 className="text-[15px] font-bold text-ink">{contract.property?.addressLine1 || "Propiedad"}</h3>
                      <div className="text-[12px] text-ink-3">{contract.contractNumber}</div>
                    </div>
                    <span className="rounded bg-surface-2 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-2">
                      {contract.status}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    {["Contrato de Compra", "Presupuesto de Remodelación", "Póliza de Seguro", "Carta de Compromiso"].map((docName, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-lg border border-rule bg-bg p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-2 text-ink-3">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                          </div>
                          <div className="text-[13px] font-semibold text-ink">{docName}</div>
                        </div>
                        <div className="text-[11px] font-bold text-ink-3 uppercase tracking-wider">
                          {isEs ? "Archivo" : "File"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}