"use client";

import React, { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface AccountSecurityModalProps {
  isSuspiciousAlertOpen?: boolean;
  userEmail?: string;
  userPhone?: string | null;
  is2FAEnabled?: boolean;
}

export default function AccountSecurityModal({
  isSuspiciousAlertOpen = false,
  userEmail = "N/A",
  userPhone = null,
  is2FAEnabled = false
}: AccountSecurityModalProps) {
  const { t, lang } = useSite();
  const isEs = lang === "es";
  const s = (t.dashboardLender.mimic as any).settings.accountSecurity;

  const [isOpen, setIsOpen] = useState(false);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAuditLogs();
    }
  }, [isOpen]);

  const fetchAuditLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${BASE_URL}/api/audit-logs?pageSize=3`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success && json.data?.items) {
        setAuditLogs(json.data.items);
      }
    } catch (err) {
      console.error("Error fetching audit logs", err);
    } finally {
      setIsLoadingLogs(false);
    }
  };

  const handleFreeze = () => alert(s.freezeTitle + " OK.");

  const handleRevokeAll = async () => {
    if (!confirm(isEs ? "¿Seguro que deseas cerrar todas tus sesiones?" : "Are you sure you want to log out all other sessions?")) return;
    setIsRevoking(true);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${BASE_URL}/api/auth/logout-all`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        alert(isEs ? "Sesiones revocadas exitosamente." : "Sessions revoked successfully.");
      } else {
        alert(isEs ? "Error al revocar sesiones." : "Failed to revoke sessions.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRevoking(false);
    }
  };

  const formatLogDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(isEs ? "es-MX" : "en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <>
      {/* 1. COMPONENTE TRIGGER INCRUSTADO EN SETTINGS */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
        <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[18px_22px]">
          <div>
            <div className="text-[14px] font-[700] text-[#0a2540]">{s.title}</div>
            <div className="mt-[2px] text-[12px] text-[#8898aa]">{s.sub}</div>
          </div>
          <button 
            onClick={() => setIsOpen(true)}
            className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[14px] py-[6px] font-sans text-[12px] font-[600] text-[#425466] hover:border-[#aab7c4]"
          >
            {s.buttonLabel}
          </button>
        </div>
      </div>

      {/* 2. MODAL A PANTALLA COMPLETA */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-bg text-ink font-sans transition-colors duration-200">
          
          {/* Navbar Superior del Modal */}
          <div className="sticky top-0 z-10 flex h-[60px] items-center justify-between border-b border-rule bg-surface px-6 sm:px-8">
            <button 
              onClick={() => setIsOpen(false)}
              className="text-[14px] font-semibold text-ink-2 hover:text-accent transition-colors"
            >
              {s.back}
            </button>
          </div>

          {/* Contenido Principal */}
          <div className="mx-auto max-w-[680px] p-6 sm:py-10">
            
            {/* Alerta Sospechosa (Opcional) */}
            {isSuspiciousAlertOpen && (
              <div className="mb-8 flex items-start gap-5 rounded-xl border-2 border-crit bg-crit-soft p-6 sm:p-7">
                <div className="mt-0.5 text-[28px] leading-none text-crit">⚠️</div>
                <div>
                  <div className="mb-1.5 text-[18px] font-extrabold text-crit">
                    {s.alertTitle}
                  </div>
                  <div className="text-[14px] leading-relaxed text-ink-2">
                    {s.alertSub} <strong className="text-crit font-bold">1-800-PAYMYLOAN</strong>.
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
                className="shrink-0 whitespace-nowrap rounded-md bg-crit px-6 py-3 text-[14px] font-bold text-white transition-opacity hover:opacity-90"
              >
                {s.freezeBtn}
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
                    {isEs ? "Navegador Actual" : "Current Browser"} 
                    <span className="ml-2 rounded bg-success-soft px-2 py-0.5 text-[10px] font-bold text-success">
                      {s.thisDevice}
                    </span>
                  </div>
                  <div className="text-[12px] text-ink-3">Activo ahora</div>
                </div>
                <button disabled className="rounded-md border-[1.5px] border-rule bg-surface px-4 py-2 text-[13px] font-bold text-ink-3 opacity-50 cursor-not-allowed">
                  {s.current}
                </button>
              </div>

              <div className="mt-4">
                <button 
                  onClick={handleRevokeAll}
                  disabled={isRevoking}
                  className="w-full rounded-md bg-crit py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isRevoking ? "Cerrando sesiones..." : s.revokeAll}
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
                { label: s.password, meta: isEs ? "Recomendamos usar una contraseña fuerte" : "We recommend using a strong password" },
                { label: s.phone, meta: userPhone ? `${userPhone} - ${is2FAEnabled ? '2FA Activo' : '2FA Inactivo'}` : (isEs ? "No proporcionado" : "Not provided") },
                { label: s.email, meta: userEmail },
                { label: s.bank, meta: "Cuenta pendiente de configuración" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-rule py-3 last:border-0 last:pb-0">
                  <div>
                    <strong className="block text-[14px] font-bold text-ink">{item.label}</strong>
                    <span className="text-[12px] text-ink-3">{item.meta}</span>
                  </div>
                  <button className="rounded-md border-[1.5px] border-rule bg-surface px-4 py-2 text-[13px] font-bold text-ink-2 transition-colors hover:border-accent hover:text-accent">
                    {s.change}
                  </button>
                </div>
              ))}

              <div className="mt-4 rounded-lg bg-accent-soft px-4 py-3.5 text-[13px] leading-relaxed text-ink-2">
                <strong className="text-accent">{s.secCallout}</strong> {s.secCalloutSub}
              </div>
            </div>

            {/* Eventos Recientes */}
            <div className="mb-5 rounded-xl border border-rule bg-surface p-7 shadow-sm transition-colors">
              <div className="mb-4 flex items-center gap-2.5 text-[15px] font-extrabold text-ink">
                <div className="h-2 w-2 shrink-0 rounded-full bg-accent"></div>
                {s.eventsTitle}
              </div>
              
              {isLoadingLogs ? (
                <div className="py-4 text-center text-sm text-ink-3">Cargando eventos...</div>
              ) : auditLogs.length === 0 ? (
                <div className="py-4 text-center text-sm text-ink-3">Sin eventos recientes.</div>
              ) : (
                auditLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between border-b border-rule py-2.5 text-[13px] last:border-0">
                    <div>
                      <div className="font-bold text-ink uppercase text-[11px] tracking-wider">{log.action.replace(/_/g, " ")}</div>
                      <div className="text-[12px] text-ink-3">{formatLogDate(log.createdAt)}</div>
                    </div>
                    <span className="text-[12px] font-bold text-success">{s.confirmed}</span>
                  </div>
                ))
              )}
            </div>

            {/* Contacto de Emergencia */}
            <div className="rounded-xl border border-accent/30 bg-accent-soft p-7 shadow-sm transition-colors">
              <div className="mb-2 flex items-center gap-2.5 text-[15px] font-extrabold text-ink">
                <div className="h-2 w-2 shrink-0 rounded-full bg-crit"></div>
                {s.emergencyTitle}
              </div>
              <div className="text-[14px] leading-relaxed text-ink-2">
                {s.emergencyText1} <strong className="text-ink font-bold">1-800-PAYMYLOAN</strong>
                <br />
                {s.emergencyText2}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}