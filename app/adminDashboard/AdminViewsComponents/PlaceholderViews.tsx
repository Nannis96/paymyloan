"use client";
import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import TwoFactorSetupModal from "@/app/components/dashboards/settings/TwoFactorSetupModal";
export function PlaceholderView() {
  const { t } = useSite();
  const v = t.dashboardAdmin.views.placeholder;
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-rule bg-surface-2 text-center">
      <div className="text-[13px] text-ink-3">{v.subtitle}</div>
    </div>
  );
}

export function RevenueView() {
  const { t } = useSite();
  const v = t.dashboardAdmin.views.revenue;
  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="mb-1 text-[22px] font-extrabold text-ink">{v.title}</h1>
      <p className="mb-6 text-[13px] text-ink-3">{v.subtitle}</p>
      <PlaceholderView />
    </div>
  );
}

export function AffiliatesView() {
  const { t } = useSite();
  const v = t.dashboardAdmin.views.affiliates;
  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="mb-1 text-[22px] font-extrabold text-ink">{v.title}</h1>
      <p className="mb-6 text-[13px] text-ink-3">{v.subtitle}</p>
      <PlaceholderView />
    </div>
  );
}

export function PromoCodesView() {
  const { t } = useSite();
  const v = t.dashboardAdmin.views.promoCodes;
  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="mb-1 text-[22px] font-extrabold text-ink">{v.title}</h1>
      <p className="mb-6 text-[13px] text-ink-3">{v.subtitle}</p>
      <PlaceholderView />
    </div>
  );
}

export function SettingsView() {
  const { t, lang } = useSite();
  const isEs = lang === "es";
  const v = t.dashboardAdmin.views.settings;
  
  const [user, setUser] = useState<any>(null);
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/auth/me`, {
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
    fetchUser();
  }, []);

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="mb-1 text-[22px] font-extrabold text-ink">{v.title}</h1>
      <p className="mb-6 text-[13px] text-ink-3">{v.subtitle}</p>

      <div className="mb-[16px] max-w-[720px] rounded-xl border border-rule bg-surface p-7 shadow-sm transition-colors">
        <div className="mb-4 flex items-center gap-2.5 text-[15px] font-extrabold text-ink">
          <div className="h-2 w-2 shrink-0 rounded-full bg-accent"></div>
          {isEs ? "Seguridad de la cuenta" : "Account Security"}
        </div>

        <div className="flex items-center justify-between border-b border-rule py-3">
          <div>
            <strong className="block text-[14px] font-bold text-ink">
              {isEs ? "Autenticación de Dos Factores (2FA)" : "Two-Factor Authentication (2FA)"}
            </strong>
            <span className="text-[12px] text-ink-3">
              {user?.isTwoFactorEnabled 
                ? (isEs ? "Activo" : "Enabled") 
                : (isEs ? "Inactivo" : "Disabled")}
            </span>
          </div>
          
          {!user?.isTwoFactorEnabled && user !== null && (
            <button 
              onClick={() => setIsTwoFactorModalOpen(true)}
              className="cursor-pointer rounded-md border-none bg-accent px-4 py-2 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
            >
              {isEs ? "Configurar 2FA ahora" : "Set up 2FA now"}
            </button>
          )}
        </div>

        <div className="mt-4 rounded-lg bg-accent-soft px-4 py-3.5 text-[13px] leading-relaxed text-ink-2">
          <strong className="text-accent">{isEs ? "Todos los cambios requieren 2FA." : "All account changes require 2FA."}</strong> {isEs ? "Recibirás un código para verificar tu identidad antes de que cualquier cambio se aplique." : "You'll receive a code to verify your identity before any change goes live."}
        </div>
      </div>

      <TwoFactorSetupModal
        isOpen={isTwoFactorModalOpen}
        onClose={() => setIsTwoFactorModalOpen(false)}
        onSuccess={fetchUser}
      />
    </div>
  );
}