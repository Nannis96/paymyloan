"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import BorrowerAccountSecurityModal from "./BorrowerAccountSecurityModal";

export default function BorrowerSettingsView() {
  const { t } = useSite();
  
  // Usamos el diccionario que coincide exactamente con la plantilla HTML proporcionada
  const s = (t.dashboardLender.mimic as any).settings;

  // Estado del usuario traído de la API real
  const [user, setUser] = useState<{ name?: string; email?: string; phone?: string | null } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Estados locales para los toggles de notificaciones
  const [toggles, setToggles] = useState([true, true, true, false]);

  const handleToggle = (index: number) => {
    const newToggles = [...toggles];
    newToggles[index] = !newToggles[index];
    setToggles(newToggles);
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        
        const res = await fetch(API_ROUTES.auth.me, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        
        if (json.success && json.data.user) {
          setUser(json.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data for settings", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, []);

  if (isLoading) {
    return <div className="text-[13px] text-ink-3">Cargando configuración...</div>;
  }

  return (
    <div className="animate-in fade-in duration-300 max-w-[720px]">
      <div className="mb-[4px] text-[22px] font-[800] tracking-[-0.3px] text-ink">
        {s.title}
      </div>
      <div className="mb-[28px] text-[13px] text-ink-3">
        {s.sub}
      </div>

      {/* Verification banner */}
      <div className="mb-[16px] flex items-center justify-between rounded-[8px] border border-amber/30 bg-amber-soft p-[14px_18px]">
        <div className="text-[13px] font-[500] text-amber">
          <strong className="font-[700]">{s.verifyBanner.text1}</strong> {s.verifyBanner.text2}
        </div>
        <button className="whitespace-nowrap rounded-[6px] border-none bg-accent px-[16px] py-[7px] font-sans text-[12px] font-[700] text-accent-ink cursor-pointer hover:opacity-90">
          {s.verifyBanner.btn}
        </button>
      </div>

      {/* Profile */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-rule bg-surface">
        <div className="flex items-center justify-between border-b border-rule p-[18px_22px]">
          <div>
            <div className="text-[14px] font-[700] text-ink">{s.profile.title}</div>
            <div className="mt-[2px] text-[12px] text-ink-3">{s.profile.sub}</div>
          </div>
          <button className="cursor-pointer rounded-[6px] border border-rule-strong bg-surface px-[14px] py-[6px] font-sans text-[12px] font-[600] text-ink-2 hover:border-ink-3 transition-colors">
            {s.profile.edit}
          </button>
        </div>
        <div className="flex items-center justify-between border-b border-rule p-[14px_22px]">
          <div className="text-[13px] font-[500] text-ink">{s.profile.name}</div>
          <div className="text-[13px] text-ink-3">{user?.name || "John Smith"}</div>
        </div>
        <div className="flex items-center justify-between border-b border-rule p-[14px_22px]">
          <div className="text-[13px] font-[500] text-ink">{s.profile.email}</div>
          <div className="text-[13px] text-ink-3">{user?.email || "john@example.com"}</div>
        </div>
        <div className="flex items-center justify-between border-b border-rule p-[14px_22px]">
          <div className="text-[13px] font-[500] text-ink">{s.profile.pass}</div>
          <div className="text-[13px] text-ink-3">••••••••</div>
        </div>
        <div className="flex items-center justify-between p-[14px_22px]">
          <div className="text-[13px] font-[500] text-ink">{s.profile.phone}</div>
          <div className="text-[13px] text-ink-3">{user?.phone || s.profile.unassigned}</div>
        </div>
      </div>

      {/* Verification */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-rule bg-surface">
        <div className="flex items-center justify-between border-b border-rule p-[18px_22px]">
          <div>
            <div className="text-[14px] font-[700] text-ink">{s.verification.title}</div>
            <div className="mt-[2px] text-[12px] text-ink-3">{s.verification.sub}</div>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-rule p-[14px_22px]">
          <div className="text-[13px] font-[500] text-ink">{s.verification.biz}</div>
          <div className="text-[13px] font-[600] text-amber">{s.verification.unverified}</div>
        </div>
        <div className="flex items-center justify-between p-[14px_22px]">
          <div className="text-[13px] font-[500] text-ink">{s.verification.id}</div>
          <div className="text-[13px] font-[600] text-amber">{s.verification.unverified}</div>
        </div>
      </div>

      {/* Notifications */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-rule bg-surface">
        <div className="flex items-center justify-between border-b border-rule p-[18px_22px]">
          <div>
            <div className="text-[14px] font-[700] text-ink">{s.notifs.title}</div>
            <div className="mt-[2px] text-[12px] text-ink-3">{s.notifs.sub}</div>
          </div>
        </div>
        
        {[s.notifs.offer, s.notifs.status, s.notifs.approved, s.notifs.news].map((label, i) => (
          <div key={i} className={`flex items-center justify-between p-[14px_22px] ${i !== 3 ? 'border-b border-rule' : ''}`}>
            <div className="text-[13px] font-[500] text-ink">{label}</div>
            <div 
              onClick={() => handleToggle(i)}
              className={`relative h-[20px] w-[36px] shrink-0 cursor-pointer rounded-[10px] transition-colors ${toggles[i] ? 'bg-accent' : 'bg-rule-strong'}`}
            >
              <div className={`absolute top-[3px] h-[14px] w-[14px] rounded-full bg-surface shadow-sm transition-all ${toggles[i] ? 'left-[19px]' : 'left-[3px]'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Billing */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-rule bg-surface">
        <div className="flex items-center justify-between border-b border-rule p-[18px_22px]">
          <div>
            <div className="text-[14px] font-[700] text-ink">{s.billing.title}</div>
            <div className="mt-[2px] text-[12px] text-ink-3">{s.billing.sub}</div>
          </div>
          <button className="cursor-pointer rounded-[6px] border border-rule-strong bg-surface px-[14px] py-[6px] font-sans text-[12px] font-[600] text-ink-2 hover:border-ink-3 transition-colors">
            {s.billing.manage}
          </button>
        </div>
        <div className="flex items-center justify-between border-b border-rule p-[14px_22px]">
          <div className="text-[13px] font-[500] text-ink">{s.billing.plan}</div>
          <div className="text-[13px] text-ink-3">
            <span className="inline-flex items-center gap-[5px] rounded-[20px] bg-surface-2 px-[10px] py-[3px] text-[11px] font-[700] text-ink-3 border border-rule">
              {s.billing.free}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-rule p-[14px_22px]">
          <div className="text-[13px] font-[500] text-ink">{s.billing.subPlan}</div>
          <div className="text-[13px] text-ink-3">{s.billing.notActive}</div>
        </div>
        <div className="flex items-center justify-between p-[14px_22px]">
          <div className="text-[13px] font-[500] text-ink">{s.billing.method}</div>
          <div className="text-[13px] text-ink-3">{s.billing.none}</div>
        </div>
      </div>

      {/* Security Actions (Boton Modal) */}
      <BorrowerAccountSecurityModal />

      {/* Danger zone */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-rule bg-surface">
        <div className="flex items-center justify-between border-b border-rule p-[18px_22px]">
          <div>
            <div className="text-[14px] font-[700] text-ink">{s.account.title}</div>
            <div className="mt-[2px] text-[12px] text-ink-3">{s.account.sub}</div>
          </div>
        </div>
        <div className="p-[14px_22px]">
          <button className="cursor-pointer rounded-[6px] border border-crit/30 bg-surface px-[14px] py-[7px] font-sans text-[12px] font-[600] text-crit hover:bg-crit-soft transition-colors">
            {s.account.close}
          </button>
        </div>
      </div>
    </div>
  );
}