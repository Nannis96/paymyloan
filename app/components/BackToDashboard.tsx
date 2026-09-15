"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

export default function BackToDashboard() {
  const { t } = useSite();
  const [dashboardUrl, setDashboardUrl] = useState("/");

  useEffect(() => {
    // Decodificar el token para saber a donde regresar
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role === "ADMIN") setDashboardUrl("/admin");
        else if (payload.role === "LENDER") setDashboardUrl("/lender");
        else if (payload.role === "BORROWER") setDashboardUrl("/borrower");
        else if (payload.role === "BOOKKEEPER") setDashboardUrl("/bookkeeper");
      } catch (e) {
        console.error("Error al decodificar token", e);
      }
    }
  }, []);

  return (
    <Link
      href={dashboardUrl}
      className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
    >
      <span>&larr;</span> {t.nav.backToDashboard}
    </Link>
  );
}