"use client";

import { apiFetch, cerrarSesion } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";

function SecurityContent() {
  const { t } = useSite();
  // Usamos los mismos textos de configuración para evitar duplicar traducciones
  const s = (t.dashboardLender.mimic as any).settings.accountSecurity;
  
  const searchParams = useSearchParams();

  // Permite activar la alerta si la URL contiene ?report=1 (desde un correo)
  const isSuspiciousAlertOpen = searchParams?.get("report") === "1";

  const [isFreezing, setIsFreezing] = useState(false);
  const [isRevokingAll, setIsRevokingAll] = useState(false);

  // El back revoca todas las sesiones (tambien la actual): cierra y manda a /login.
  const cerrarTodas = async (setBusy: (v: boolean) => void) => {
    setBusy(true);
    try {
      const res = await apiFetch(API_ROUTES.auth.logoutAll, { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      cerrarSesion();
    } catch (error) {
      console.error(error);
      alert("Could not sign out of all devices. Try again.");
      setBusy(false);
    }
  };

  const handleFreeze = async () => {
    if (!confirm('Sign out of ALL devices, including this one? You will need to log in again.')) return;
    await cerrarTodas(setIsFreezing);
  };

  const handleRevoke = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    btn.innerText = "Revoked";
    btn.classList.add("opacity-50", "cursor-not-allowed");
  };

  const handleRevokeAll = async () => {
    if (!confirm('Sign out of ALL devices, including this one? You will need to log in again.')) return;
    await cerrarTodas(setIsRevokingAll);
  };

  return (
    <div className="mx-auto max-w-[680px] animate-in fade-in duration-300 pb-12">
      
      {/* Botón Volver */}
      <div className="mb-6">
        <Link
          href="/borrowerDashboard/settings"
          className="text-[13px] font-semibold text-ink-3 transition-colors hover:text-accent no-underline"
        >
          &larr; {s.back || "Back to settings"}
        </Link>
      </div>

      {/* Alerta Sospechosa (activada por deep link ?report=1) */}
      {isSuspiciousAlertOpen && (
        <div className="mb-8 flex items-start gap-5 rounded-xl border-2 border-crit bg-crit-soft p-6 sm:p-7">
          <div className="mt-0.5 text-[28px] leading-none text-crit">⚠️</div>
          <div>
            <div className="mb-1.5 text-[18px] font-extrabold text-crit">
              {s.alertTitle}
            </div>
            <div className="text-[14px] leading-relaxed text-ink-2">
              {s.alertSub} <strong className="text-crit font-bold">[PML phone number]</strong>.
            </div>
          </div>
        </div>
      )}

      {/* Banner de Congelamiento */}
      <div className="mb-5 flex flex-col items-start justify-between gap-5 rounded-xl bg-brand-dark p-6 sm:flex-row sm:items-center sm:p-7">
        <div className="text-white">
          <strong className="mb-1 block text-[15px] font-extrabold">{s.freezeTitle}</strong>
          <span className="text-[13px] text-ink-3">{s.freezeSub}</span>
        </div>
        <button
          onClick={handleFreeze}
          disabled={isFreezing}
          className="shrink-0 whitespace-nowrap rounded-md bg-crit px-6 py-3 text-[14px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {isFreezing ? "..." : s.freezeBtn}
        </button>
      </div>

      {/* Sesiones Activas */}
      <div className="mb-5 rounded-xl border border-rule bg-surface p-7 shadow-sm transition-colors">
        <div className="mb-4 flex items-center gap-2.5 text-[15px] font-extrabold text-ink">
          <div className="h-2 w-2 shrink-0 rounded-full bg-accent"></div>
          {s.sessionsTitle}
        </div>
        <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-ink-3">
          {s.loggedInDev}
        </div>

        <div className="flex items-center justify-between border-b border-rule py-2.5 text-[13px]">
          <div>
            <div className="font-bold text-ink">
              Chrome on MacBook Pro
              <span className="ml-2 rounded bg-success-soft px-2 py-0.5 text-[10px] font-bold text-success border border-success/20">
                {s.thisDevice}
              </span>
            </div>
            <div className="text-[12px] text-ink-3">Memphis, TN • Last active just now</div>
          </div>
          <button disabled className="rounded-md border-[1.5px] border-rule bg-surface px-4 py-2 text-[13px] font-bold text-ink-3 opacity-50 cursor-not-allowed">
            {s.current}
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-rule py-2.5 text-[13px]">
          <div>
            <div className="font-bold text-ink">Safari on iPhone 15</div>
            <div className="text-[12px] text-ink-3">Memphis, TN • Last active 2 hours ago</div>
          </div>
          <button onClick={handleRevoke} className="cursor-pointer rounded-md bg-crit px-4 py-2 text-[13px] font-bold text-white transition-opacity hover:opacity-90">
            {s.revoke}
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-rule py-2.5 text-[13px]">
          <div>
            <div className="font-bold text-ink">Chrome on Windows</div>
            <div className="text-[12px] text-ink-3">Unknown location • Last active 3 days ago</div>
          </div>
          <button onClick={handleRevoke} className="cursor-pointer rounded-md bg-crit px-4 py-2 text-[13px] font-bold text-white transition-opacity hover:opacity-90">
            {s.revoke}
          </button>
        </div>

        <div className="mt-4">
          <button 
            onClick={handleRevokeAll} 
            disabled={isRevokingAll} 
            className="cursor-pointer w-full rounded-md bg-crit py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isRevokingAll ? "..." : s.revokeAll}
          </button>
        </div>
      </div>

      {/* Acciones de Seguridad */}
      <div className="mb-5 rounded-xl border border-rule bg-surface p-7 shadow-sm transition-colors">
        <div className="mb-4 flex items-center gap-2.5 text-[15px] font-extrabold text-ink">
          <div className="h-2 w-2 shrink-0 rounded-full bg-accent"></div>
          {s.secActionsTitle}
        </div>
        {[
          { label: s.password, meta: "Last changed 30 days ago" },
          { label: s.phone, meta: "(901) ***-**91 • Used for 2FA" },
          { label: s.email, meta: "j***@gmail.com" },
          { label: s.bank, meta: "Account ending 4821 • Chase Bank" }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between border-b border-rule py-3 last:border-0 last:pb-0">
            <div>
              <strong className="block text-[14px] font-bold text-ink">{item.label}</strong>
              <span className="text-[12px] text-ink-3">{item.meta}</span>
            </div>
            <button className="cursor-pointer rounded-md border-[1.5px] border-rule bg-surface px-4 py-2 text-[13px] font-bold text-ink-2 transition-colors hover:border-accent hover:text-accent">
              {s.change}
            </button>
          </div>
        ))}
        <div className="mt-4 rounded-lg bg-accent-soft px-4 py-3.5 text-[13px] leading-relaxed text-ink-2 border border-accent/20">
          <strong className="text-accent">{s.secCallout}</strong> {s.secCalloutSub}
        </div>
      </div>

      {/* Eventos Recientes */}
      <div className="mb-5 rounded-xl border border-rule bg-surface p-7 shadow-sm transition-colors">
        <div className="mb-4 flex items-center gap-2.5 text-[15px] font-extrabold text-ink">
          <div className="h-2 w-2 shrink-0 rounded-full bg-accent"></div>
          {s.eventsTitle}
        </div>

        <div className="flex items-center justify-between border-b border-rule py-2.5 text-[13px]">
          <div>
            <div className="font-bold text-ink">Login from new device</div>
            <div className="text-[12px] text-ink-3">Chrome on Windows • Unknown location • Sep 22, 2026</div>
          </div>
          <span className="text-[12px] font-bold text-crit">{s.flagged}</span>
        </div>

        <div className="flex items-center justify-between border-b border-rule py-2.5 text-[13px]">
          <div>
            <div className="font-bold text-ink">Bank account change attempted</div>
            <div className="text-[12px] text-ink-3">Safari on iPhone • Memphis, TN • Sep 20, 2026</div>
          </div>
          <span className="text-[12px] font-bold text-success">{s.confirmed}</span>
        </div>

        <div className="flex items-center justify-between py-2.5 text-[13px]">
          <div>
            <div className="font-bold text-ink">Password changed</div>
            <div className="text-[12px] text-ink-3">Chrome on MacBook • Memphis, TN • Aug 23, 2026</div>
          </div>
          <span className="text-[12px] font-bold text-success">{s.confirmed}</span>
        </div>
      </div>

      {/* Contacto de Emergencia */}
      <div className="rounded-xl border border-crit/20 bg-crit-soft p-7 shadow-sm transition-colors">
        <div className="mb-2 flex items-center gap-2.5 text-[15px] font-extrabold text-ink">
          <div className="h-2 w-2 shrink-0 rounded-full bg-crit"></div>
          {s.emergencyTitle}
        </div>
        <div className="text-[14px] leading-relaxed text-ink-2">
          {s.emergencyText1} <strong className="text-ink font-bold">[PML phone number]</strong>
          <br />
          {s.emergencyText2}
        </div>
      </div>

    </div>
  );
}

export default function BorrowerSecurityView() {
  return (
    <Suspense fallback={<div className="p-8 text-ink-3">Cargando...</div>}>
      <SecurityContent />
    </Suspense>
  );
}