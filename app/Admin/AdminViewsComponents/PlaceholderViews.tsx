"use client";

import { useSite } from "@/app/components/layout/SiteShell";

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

export function VerificationsView() {
  const { t } = useSite();
  const v = t.dashboardAdmin.views.verifications;
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
  const { t } = useSite();
  const v = t.dashboardAdmin.views.settings;
  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="mb-1 text-[22px] font-extrabold text-ink">{v.title}</h1>
      <p className="mb-6 text-[13px] text-ink-3">{v.subtitle}</p>
      <PlaceholderView />
    </div>
  );
}