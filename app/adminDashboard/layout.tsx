"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import LogoutButton from "@/app/components/ambos/LogoutButton";
import LangToggle from "@/app/components/ambos/LangToggle";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";
import { useState, useEffect } from "react";
import { API_ROUTES } from "@/app/lib/endpoints";
import { api } from "@/app/lib/apiFetch";
import type { Paginated, SafeUser } from "@/app/types/api";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell isMinimal={true}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SiteShell>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useSite();
  const nav = t.dashboardAdmin.nav;
  const router = useRouter();
  const [admin, setAdmin] = useState<SafeUser | null>(null);
  const [pendingCount, setPendingCount] = useState(0);

  // Guardia de todo /adminDashboard: sin sesion o sin rol ADMIN se manda al login
  // (apiFetch ya limpia la sesion en 401).
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) return router.push("/login");
    api<{ user: SafeUser }>(API_ROUTES.auth.me)
      .then(({ user }) => (user?.role === "ADMIN" ? setAdmin(user) : router.push("/login")))
      .catch(() => router.push("/login"));
  }, [router]);

  // Se vuelve a pedir al cambiar de ruta para que el contador no quede viejo tras aprobar/rechazar.
  useEffect(() => {
    api<Paginated<unknown>>(`${API_ROUTES.admin.verifications}?status=PENDING&pageSize=1`)
      .then((data) => setPendingCount(data.total ?? 0))
      .catch(() => setPendingCount(0));
  }, [pathname]);

  // Clases base compartidas para los enlaces del sidebar
  const navItemBase = "flex items-center gap-[9px] px-[18px] py-[8px] text-[13px] font-[500] text-[#425466] cursor-pointer relative no-underline hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors w-full text-left";
  const navItemActive = "text-[#635bff] bg-[#f0efff] font-[600] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#635bff] before:rounded-r-[2px]";

  // Ayudante para marcar la seccion activa segun la URL
  const checkActive = (path: string) => {
    if (path === "/adminDashboard") {
      return pathname === "/adminDashboard" ? navItemActive : "";
    }
    return pathname.startsWith(path) ? navItemActive : "";
  };

  if (!admin) {
    return <div className="flex min-h-screen items-center justify-center bg-bg text-ink-3">{t.dashboardAdmin.loading}</div>;
  }

  const initials = admin.name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="flex h-screen flex-col bg-[#f6f9fc] font-sans text-[#0a2540]">
      {/* NAVBAR SUPERIOR */}
      <nav className="sticky top-0 z-50 flex h-[52px] items-center justify-between border-b border-[#e6ebf1] bg-white px-[28px]">
        <Link href="/" className="text-[16px] font-[800] tracking-[-0.3px] text-[#635bff] no-underline flex items-center">
          PayMy<span className="text-[#0a2540]">Loan</span>.ai 
          <span className="ml-3 rounded-md bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-widest border border-red-200 dark:border-red-800">
            Admin
          </span>
        </Link>
        <div className="flex items-center gap-[14px]">
          <LangToggle className="h-[30px] rounded-[4px] px-2 text-[11px] font-[700] text-[#aab7c4] hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors" />
          <ThemeToggle className="h-[30px] w-[30px] rounded-[4px] text-[#aab7c4] hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors" iconSize={15} />
          <LogoutButton className="h-[30px] rounded-[4px] px-2 text-[11px] font-[700] text-[#aab7c4] hover:bg-[#f6f9fc] hover:text-[#c62626] transition-colors" iconSize={15} />
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#0a2540] text-[12px] font-[700] text-white ml-2">
            {initials}
          </div>
        </div>
      </nav>

      {/* LAYOUT PRINCIPAL (SIDEBAR + CONTENIDO) */}
      <div className="flex min-h-0 flex-1">
        {/* SIDEBAR LATERAL */}
        <div className="flex w-[200px] shrink-0 flex-col border-r border-[#e6ebf1] bg-white py-[16px] overflow-y-auto scrollbar-thin">
          <div className="px-[18px] pb-[6px] pt-[6px] text-[10px] font-[700] uppercase tracking-[0.8px] text-[#aab7c4]">
            Plataforma
          </div>
          <Link href="/adminDashboard" className={`${navItemBase} ${checkActive("/adminDashboard")}`}>
            {nav.overview}
          </Link>
          <Link href="/adminDashboard/deals" className={`${navItemBase} ${checkActive("/adminDashboard/deals")}`}>
            {nav.allDeals}
          </Link>
          <Link href="/adminDashboard/lenders" className={`${navItemBase} ${checkActive("/adminDashboard/lenders")}`}>
            {nav.lenders}
          </Link>
          <Link href="/adminDashboard/borrowers" className={`${navItemBase} ${checkActive("/adminDashboard/borrowers")}`}>
            {nav.borrowers}
          </Link>
          <Link href="/adminDashboard/verifications" className={`${navItemBase} ${checkActive("/adminDashboard/verifications")}`}>
            {nav.verifications} 
            {pendingCount > 0 && (
              <span className="ml-auto rounded-[10px] bg-[#c62626] px-[7px] py-[1px] text-[10px] font-[700] text-white">{pendingCount}</span>
            )}
          </Link>

          <div className="px-[18px] pb-[6px] pt-[14px] text-[10px] font-[700] uppercase tracking-[0.8px] text-[#aab7c4]">
            Negocio
          </div>
          <Link href="/adminDashboard/revenue" className={`${navItemBase} ${checkActive("/adminDashboard/revenue")}`}>
            {nav.revenue}
          </Link>
          <Link href="/adminDashboard/affiliates" className={`${navItemBase} ${checkActive("/adminDashboard/affiliates")}`}>
            {nav.affiliates}
          </Link>
          <Link href="/adminDashboard/catalog" className={`${navItemBase} ${checkActive("/adminDashboard/catalog")}`}>
            {nav.catalog}
          </Link>
          <Link href="/adminDashboard/promo-codes" className={`${navItemBase} ${checkActive("/adminDashboard/promo-codes")}`}>
            {nav.promoCodes}
          </Link>

          <div className="px-[18px] pb-[6px] pt-[14px] text-[10px] font-[700] uppercase tracking-[0.8px] text-[#aab7c4]">
            Sistema
          </div>
          <Link href="/adminDashboard/users" className={`${navItemBase} ${checkActive("/adminDashboard/users")} ${pathname.startsWith("/adminDashboard/add-user") ? navItemActive : ""}`}>
            {t.adminUsersList.title}
          </Link>
          <Link href="/adminDashboard/audit-logs" className={`${navItemBase} ${checkActive("/adminDashboard/audit-logs")}`}>
            {nav.auditLogs}
          </Link>
          <Link href="/adminDashboard/settings" className={`${navItemBase} ${checkActive("/adminDashboard/settings")}`}>
            {nav.settings}
          </Link>

          {/* BOTON DE LOGOUT ABAJO */}
          <div className="mt-auto border-t border-[#e6ebf1] pt-4 px-[18px]">
            <LogoutButton
              className="w-full flex items-center gap-[9px] py-[8px] text-[13px] font-[500] text-[#425466] hover:text-[#c62626] transition-colors"
              iconSize={16}
            />
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL (Se inyecta automáticamente aquí) */}
        <div className="flex-1 bg-[#f6f9fc] px-[32px] py-[28px] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}