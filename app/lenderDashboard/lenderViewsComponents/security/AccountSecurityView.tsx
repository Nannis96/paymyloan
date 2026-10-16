"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import TwoFactorSetupModal from "@/app/components/dashboards/settings/TwoFactorSetupModal";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function AccountSecurityView() {
  const { t, lang } = useSite();
  const isEs = lang === "es";
  const s = (t.dashboardLender.mimic as any).settings.accountSecurity;

  const [user, setUser] = useState<{ email?: string; phone?: string | null; isTwoFactorEnabled?: boolean } | null>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevoking, setIsRevoking] = useState(false);
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);

  // Puedes simular esta alerta de seguridad pasandola a true para pruebas
  const isSuspiciousAlertOpen = false; 

  const handleTwoFactorSuccess = async () => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success && json.data?.user) {
        setUser(json.data.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken") || "";
        const headers = { Authorization: `Bearer ${token}` };

        const [authRes, logsRes] = await Promise.all([
          fetch(`${BASE_URL}/api/auth/me`, { headers }),
          fetch(`${BASE_URL}/api/audit-logs?pageSize=3`, { headers })
        ]);

        const authJson = await authRes.json();
        const logsJson = await logsRes.json();

        if (authJson.success && authJson.data?.user) {
          setUser(authJson.data.user);
        }
        if (logsJson.success && logsJson.data?.items) {
          setAuditLogs(logsJson.data.items);
        }
      } catch (err) {
        console.error("Error fetching security data", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

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

  if (isLoading) {
    return <div className="text-[13px] text-[#8898aa]">Cargando configuración de seguridad...</div>;
  }

  return (
    <div className="animate-in fade-in duration-300 max-w-[720px]">
      <div className="mb-[24px] flex items-center justify-between">
        <div>
          <div className="mb-[4px] text-[22px] font-[800] tracking-[-0.3px] text-[#0a2540]">
            {s.title}
          </div>
          <div className="text-[13px] text-[#8898aa]">
            {s.sub}
          </div>
        </div>
        <Link 
          href="/lenderDashboard/settings"
          className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[14px] py-[6px] font-sans text-[12px] font-[600] text-[#425466] hover:border-[#aab7c4] no-underline transition-colors"
        >
          {s.back}
        </Link>
      </div>

      {/* Alerta Sospechosa (Opcional) */}
      {isSuspiciousAlertOpen && (
        <div className="mb-[16px] flex items-start gap-5 rounded-xl border-2 border-red-500 bg-red-50 p-6 sm:p-7">
          <div>
            <div className="mb-1.5 text-[18px] font-extrabold text-red-600">
              {s.alertTitle}
            </div>
            <div className="text-[14px] leading-relaxed text-[#425466]">
              {s.alertSub} <strong className="text-red-600 font-bold">1-800-PAYMYLOAN</strong>.
            </div>
          </div>
        </div>
      )}

      {/* Banner de Congelamiento */}
      <div className="mb-[16px] flex flex-col items-start justify-between gap-5 rounded-xl bg-[#0a2540] p-6 sm:flex-row sm:items-center sm:p-7">
        <div className="text-white">
          <strong className="mb-1 block text-[15px] font-extrabold">{s.freezeTitle}</strong>
          <span className="text-[13px] text-[#8898aa]">{s.freezeSub}</span>
        </div>
        <button 
          onClick={handleFreeze}
          className="shrink-0 whitespace-nowrap rounded-md bg-red-600 px-6 py-3 text-[14px] font-bold text-white transition-opacity hover:opacity-90 border-none cursor-pointer"
        >
          {s.freezeBtn}
        </button>
      </div>

      {/* Sesiones Activas */}
      <div className="mb-[16px] rounded-xl border border-[#e6ebf1] bg-white p-7 shadow-sm transition-colors">
        <div className="mb-4 flex items-center gap-2.5 text-[15px] font-extrabold text-[#0a2540]">
          <div className="h-2 w-2 shrink-0 rounded-full bg-[#635bff]"></div>
          {s.sessionsTitle}
        </div>
        <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#8898aa]">
          {s.loggedInDev}
        </div>
        
        <div className="flex items-center justify-between border-b border-[#e6ebf1] py-2.5 text-[13px]">
          <div>
            <div className="font-bold text-[#0a2540]">
              {isEs ? "Navegador Actual" : "Current Browser"} 
              <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                {s.thisDevice}
              </span>
            </div>
            <div className="text-[12px] text-[#8898aa]">Activo ahora</div>
          </div>
          <button disabled className="rounded-md border-[1.5px] border-[#e6ebf1] bg-white px-4 py-2 text-[13px] font-bold text-[#8898aa] opacity-50 cursor-not-allowed">
            {s.current}
          </button>
        </div>
        <div className="mt-4">
          <button 
            onClick={handleRevokeAll}
            disabled={isRevoking}
            className="w-full rounded-md bg-red-600 py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 border-none cursor-pointer"
          >
            {isRevoking ? "Cerrando sesiones..." : s.revokeAll}
          </button>
        </div>
      </div>

      {/* Acciones de Seguridad */}
      <div className="mb-[16px] rounded-xl border border-[#e6ebf1] bg-white p-7 shadow-sm transition-colors">
        <div className="mb-4 flex items-center gap-2.5 text-[15px] font-extrabold text-[#0a2540]">
          <div className="h-2 w-2 shrink-0 rounded-full bg-[#635bff]"></div>
          {s.secActionsTitle}
        </div>
        {[
          { label: s.password, meta: isEs ? "Recomendamos usar una contraseña fuerte" : "We recommend using a strong password" },
          { label: s.phone, meta: user?.phone ? `${user.phone} - ${user?.isTwoFactorEnabled ? '2FA Activo' : '2FA Inactivo'}` : (isEs ? "No proporcionado" : "Not provided") },
          { label: s.email, meta: user?.email || "N/A" },
          { label: s.bank, meta: "Cuenta pendiente de configuración" }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between border-b border-[#e6ebf1] py-3 last:border-0 last:pb-0">
            <div>
              <strong className="block text-[14px] font-bold text-[#0a2540]">{item.label}</strong>
              <span className="text-[12px] text-[#8898aa]">{item.meta}</span>
            </div>
            <button className="rounded-md border-[1.5px] border-[#e6ebf1] bg-white px-4 py-2 text-[13px] font-bold text-[#425466] transition-colors hover:border-[#635bff] hover:text-[#635bff] cursor-pointer">
              {s.change}
            </button>
          </div>
        ))}
        <div className="mt-4 rounded-lg bg-[#f0efff] px-4 py-3.5 text-[13px] leading-relaxed text-[#425466]">
          <strong className="text-[#635bff]">{s.secCallout}</strong> {s.secCalloutSub}
        </div>

        {!user?.isTwoFactorEnabled && (
          <div className="mt-4 border-t border-[#e6ebf1] pt-4">
            <button 
              onClick={() => setIsTwoFactorModalOpen(true)}
              className="rounded-md bg-[#635bff] px-5 py-2.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90 border-none cursor-pointer"
            >
              {isEs ? "Configurar 2FA ahora" : "Set up 2FA now"}
            </button>
          </div>
        )}
      </div>

      {/* Eventos Recientes */}
      <div className="mb-[16px] rounded-xl border border-[#e6ebf1] bg-white p-7 shadow-sm transition-colors">
        <div className="mb-4 flex items-center gap-2.5 text-[15px] font-extrabold text-[#0a2540]">
          <div className="h-2 w-2 shrink-0 rounded-full bg-[#635bff]"></div>
          {s.eventsTitle}
        </div>
        
        {auditLogs.length === 0 ? (
          <div className="py-4 text-center text-sm text-[#8898aa]">Sin eventos recientes.</div>
        ) : (
          auditLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between border-b border-[#e6ebf1] py-2.5 text-[13px] last:border-0">
              <div>
                <div className="font-bold text-[#0a2540] uppercase text-[11px] tracking-wider">{log.action.replace(/_/g, " ")}</div>
                <div className="text-[12px] text-[#8898aa]">{formatLogDate(log.createdAt)}</div>
              </div>
              <span className="text-[12px] font-bold text-green-700">{s.confirmed}</span>
            </div>
          ))
        )}
      </div>

      {/* Contacto de Emergencia */}
      <div className="rounded-xl border border-[#c7c4ff] bg-[#f0efff] p-7 shadow-sm transition-colors">
        <div className="mb-2 flex items-center gap-2.5 text-[15px] font-extrabold text-[#0a2540]">
          <div className="h-2 w-2 shrink-0 rounded-full bg-red-500"></div>
          {s.emergencyTitle}
        </div>
        <div className="text-[14px] leading-relaxed text-[#425466]">
          {s.emergencyText1} <strong className="text-[#0a2540] font-bold">1-800-PAYMYLOAN</strong>
          <br />
          {s.emergencyText2}
        </div>
      </div>

      <TwoFactorSetupModal
        isOpen={isTwoFactorModalOpen}
        onClose={() => setIsTwoFactorModalOpen(false)}
        onSuccess={handleTwoFactorSuccess}
      />
    </div>
  );
}