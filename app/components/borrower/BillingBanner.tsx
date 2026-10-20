"use client";

import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";

export default function BillingBanner() {
  const { t } = useSite();

  return (
    <div className="flex h-full flex-col items-start justify-between gap-4 rounded-xl border border-amber/30 bg-amber-soft p-5 sm:flex-row sm:items-center">
      <div>
        <div className="text-[11px] font-bold uppercase tracking-widest text-amber">
          {t.billing?.bannerTitle || "Prueba Gratuita"}
        </div>
        <div className="mt-1 text-sm font-medium text-ink-2">
          {t.billing?.bannerText || "Te quedan X dias de prueba."}
        </div>
      </div>
      <Link href="/billing" className="shrink-0 rounded-lg bg-amber px-4 py-2 text-xs font-bold text-bg shadow-sm transition-opacity hover:opacity-90">
        {t.billing?.bannerCta || "Activar Suscripcion"}
      </Link>
    </div>
  );
}