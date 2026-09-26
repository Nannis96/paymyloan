// app/lender/lenderViewsComponents/SettingsView.tsx
"use client";
import { useEffect, useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

export default function SettingsView() {
  const { t } = useSite();
  const s = (t.dashboardLender.mimic as any).settings;

  // Estado del usuario traido de la API real
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
        console.error("Error fetching user data for settings mimic", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, []);

  if (isLoading) {
    return <div className="text-[13px] text-[#8898aa]">Cargando configuracion...</div>;
  }

  return (
    <div className="animate-in fade-in duration-300 max-w-[720px]">
      <div className="mb-[4px] text-[22px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {s.title}
      </div>
      <div className="mb-[28px] text-[13px] text-[#8898aa]">
        {s.sub}
      </div>

      {/* Verification banner */}
      <div className="mb-[16px] flex items-center justify-between rounded-[8px] border border-[#fcd34d] bg-[#fffbeb] p-[14px_18px]">
        <div className="text-[13px] font-[500] text-[#b45309]">
          <strong className="font-[700]">{s.verifyBanner.text1}</strong> {s.verifyBanner.text2}
        </div>
        <button className="whitespace-nowrap rounded-[6px] border-none bg-[#635bff] px-[16px] py-[7px] font-sans text-[12px] font-[700] text-white cursor-pointer hover:opacity-90">
          {s.verifyBanner.btn}
        </button>
      </div>

      {/* Profile */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
        <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[18px_22px]">
          <div>
            <div className="text-[14px] font-[700] text-[#0a2540]">{s.profile.title}</div>
            <div className="mt-[2px] text-[12px] text-[#8898aa]">{s.profile.sub}</div>
          </div>
          <button className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[14px] py-[6px] font-sans text-[12px] font-[600] text-[#425466] hover:border-[#aab7c4]">
            {s.profile.edit}
          </button>
        </div>
        <div className="flex items-center justify-between border-b border-[#f0f4f8] p-[14px_22px]">
          <div className="text-[13px] font-[500] text-[#0a2540]">{s.profile.name}</div>
          <div className="text-[13px] text-[#8898aa]">{user?.name || "John Smith"}</div>
        </div>
        <div className="flex items-center justify-between border-b border-[#f0f4f8] p-[14px_22px]">
          <div className="text-[13px] font-[500] text-[#0a2540]">{s.profile.email}</div>
          <div className="text-[13px] text-[#8898aa]">{user?.email || "john@example.com"}</div>
        </div>
        <div className="flex items-center justify-between border-b border-[#f0f4f8] p-[14px_22px]">
          <div className="text-[13px] font-[500] text-[#0a2540]">{s.profile.pass}</div>
          <div className="text-[13px] text-[#8898aa]">••••••••</div>
        </div>
        <div className="flex items-center justify-between p-[14px_22px]">
          <div className="text-[13px] font-[500] text-[#0a2540]">{s.profile.phone}</div>
          <div className="text-[13px] text-[#8898aa]">{user?.phone || s.profile.unassigned}</div>
        </div>
      </div>

      {/* Verification */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
        <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[18px_22px]">
          <div>
            <div className="text-[14px] font-[700] text-[#0a2540]">{s.verification.title}</div>
            <div className="mt-[2px] text-[12px] text-[#8898aa]">{s.verification.sub}</div>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-[#f0f4f8] p-[14px_22px]">
          <div className="text-[13px] font-[500] text-[#0a2540]">{s.verification.biz}</div>
          <div className="text-[13px] font-[600] text-[#b45309]">{s.verification.unverified}</div>
        </div>
        <div className="flex items-center justify-between p-[14px_22px]">
          <div className="text-[13px] font-[500] text-[#0a2540]">{s.verification.id}</div>
          <div className="text-[13px] font-[600] text-[#b45309]">{s.verification.unverified}</div>
        </div>
      </div>

      {/* Notifications */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
        <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[18px_22px]">
          <div>
            <div className="text-[14px] font-[700] text-[#0a2540]">{s.notifs.title}</div>
            <div className="mt-[2px] text-[12px] text-[#8898aa]">{s.notifs.sub}</div>
          </div>
        </div>
        
        {[s.notifs.offer, s.notifs.status, s.notifs.approved, s.notifs.news].map((label, i) => (
          <div key={i} className={`flex items-center justify-between p-[14px_22px] ${i !== 3 ? 'border-b border-[#f0f4f8]' : ''}`}>
            <div className="text-[13px] font-[500] text-[#0a2540]">{label}</div>
            <div 
              onClick={() => handleToggle(i)}
              className={`relative h-[20px] w-[36px] shrink-0 cursor-pointer rounded-[10px] transition-colors ${toggles[i] ? 'bg-[#635bff]' : 'bg-[#e6ebf1]'}`}
            >
              <div className={`absolute top-[3px] h-[14px] w-[14px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-all ${toggles[i] ? 'left-[19px]' : 'left-[3px]'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Billing */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
        <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[18px_22px]">
          <div>
            <div className="text-[14px] font-[700] text-[#0a2540]">{s.billing.title}</div>
            <div className="mt-[2px] text-[12px] text-[#8898aa]">{s.billing.sub}</div>
          </div>
          <button className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[14px] py-[6px] font-sans text-[12px] font-[600] text-[#425466] hover:border-[#aab7c4]">
            {s.billing.manage}
          </button>
        </div>
        <div className="flex items-center justify-between border-b border-[#f0f4f8] p-[14px_22px]">
          <div className="text-[13px] font-[500] text-[#0a2540]">{s.billing.plan}</div>
          <div className="text-[13px] text-[#8898aa]">
            <span className="inline-flex items-center gap-[5px] rounded-[20px] bg-[#f0f4f8] px-[10px] py-[3px] text-[11px] font-[700] text-[#8898aa]">
              {s.billing.free}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-[#f0f4f8] p-[14px_22px]">
          <div className="text-[13px] font-[500] text-[#0a2540]">{s.billing.subPlan}</div>
          <div className="text-[13px] text-[#8898aa]">{s.billing.notActive}</div>
        </div>
        <div className="flex items-center justify-between p-[14px_22px]">
          <div className="text-[13px] font-[500] text-[#0a2540]">{s.billing.method}</div>
          <div className="text-[13px] text-[#8898aa]">{s.billing.none}</div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="mb-[16px] overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
        <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[18px_22px]">
          <div>
            <div className="text-[14px] font-[700] text-[#0a2540]">{s.account.title}</div>
            <div className="mt-[2px] text-[12px] text-[#8898aa]">{s.account.sub}</div>
          </div>
        </div>
        <div className="p-[14px_22px]">
          <button className="cursor-pointer rounded-[6px] border border-[#fca5a5] bg-white px-[14px] py-[7px] font-sans text-[12px] font-[600] text-[#dc2626] hover:bg-[#fef2f2]">
            {s.account.close}
          </button>
        </div>
      </div>

    </div>
  );
}