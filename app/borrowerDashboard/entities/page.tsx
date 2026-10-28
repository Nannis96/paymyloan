"use client";
import { useEffect, useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { apiFetch } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";
import Link from "next/link";

export default function EntitiesPage() {
  const { t, lang } = useSite();
  const [entityData, setEntityData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEntity() {
      try {
        // Obtenemos la VerificationRequest del borrower (si existe)
        const res = await apiFetch("/api/borrowers/me/verification");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setEntityData(json.data);
          }
        }
      } catch (error) {
        console.error("Error fetching entities", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEntity();
  }, []);

  const isEs = lang === "es";

  return (
    <SiteShell isMinimal={true}>
      <div className="max-w-[900px] animate-in fade-in duration-300">
        <header className="mb-8">
          <h1 className="text-[28px] font-[900] tracking-tight text-ink">
            {isEs ? "Entidades Comerciales" : "Business Entities"}
          </h1>
          <p className="mt-[4px] text-[14px] text-ink-3">
            {isEs ? "Gestiona el estado de verificacion de tu entidad." : "Manage your entity verification status."}
          </p>
        </header>

        {isLoading ? (
          <div className="text-[14px] text-ink-3">{isEs ? "Cargando entidad..." : "Loading entity..."}</div>
        ) : entityData ? (
          <div className="rounded-xl border border-rule bg-surface p-6 shadow-sm max-w-[600px]">
            <div className="flex items-center justify-between mb-4 border-b border-rule pb-4">
              <h2 className="text-lg font-bold text-ink">{entityData.entityName}</h2>
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                entityData.status === "APPROVED" ? "bg-success-soft text-success" : 
                entityData.status === "REJECTED" ? "bg-crit-soft text-crit" : "bg-amber-soft text-amber"
              }`}>
                {entityData.status}
              </span>
            </div>
            <div className="flex flex-col gap-3 text-[13px]">
              <div className="flex justify-between">
                <span className="text-ink-3">{isEs ? "Tipo" : "Type"}</span>
                <span className="font-semibold text-ink">{entityData.entityType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-3">EIN</span>
                <span className="font-semibold text-ink">{entityData.ein}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-3">{isEs ? "Estado de formacion" : "State"}</span>
                <span className="font-semibold text-ink">{entityData.stateOfFormation}</span>
              </div>
            </div>
            
            {entityData.status === "PENDING" && (
              <div className="mt-6 rounded-lg bg-amber-soft p-4 text-[12px] text-amber border border-amber/20">
                {isEs ? "Tu entidad esta en revision. Te notificaremos cuando sea aprobada." : "Your entity is under review. We will notify you once approved."}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-rule bg-surface p-8 text-center shadow-sm max-w-[600px]">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-ink-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            </div>
            <p className="text-[14px] font-bold text-ink mb-1">
              {isEs ? "Sin entidad registrada" : "No registered entity"}
            </p>
            <p className="text-[13px] text-ink-3 mb-6">
              {isEs 
                ? "Las entidades comerciales se vinculan automaticamente cuando pre-calificas tu primer trato o completas tu Onboarding." 
                : "Business entities are automatically linked when you pre-qualify your first deal or complete Onboarding."}
            </p>
            <Link href="/borrowerDashboard/pre-qualification" className="inline-block bg-accent text-white px-5 py-2.5 rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-colors">
              {isEs ? "Ir a Pre-calificacion" : "Go to Pre-qualification"}
            </Link>
          </div>
        )}
      </div>
    </SiteShell>
  );
}