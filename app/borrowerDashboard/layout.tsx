"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import LogoutButton from "@/app/components/ambos/LogoutButton";
import LangToggle from "@/app/components/ambos/LangToggle";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";

export default function BorrowerDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell isMinimal={true}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SiteShell>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { lang } = useSite();
  const isEs = lang === "es";

  // Textos para la sidebar
  const sb = {
    dashboard: "Dashboard",
    deals: isEs ? "Tratos" : "Deals",
    notifications: isEs ? "Notificaciones" : "Notifications",
    messages: isEs ? "Mensajes" : "Messages",
    payments: isEs ? "Pagos" : "Payments",
    settings: isEs ? "Configuración" : "Settings",
    postDeal: isEs ? "+ Analizar y Publicar" : "+ Analyze & Post a Deal",
  };

  const navItemBase = "flex items-center gap-[10px] px-[18px] py-[10px] text-[13px] font-[500] text-ink-2 cursor-pointer relative no-underline hover:bg-surface-2 hover:text-ink transition-all w-full text-left";
  const navItemActive = "text-accent bg-accent-soft font-[700] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-accent before:rounded-r-[2px]";

  return (
    <div className="flex flex-col min-h-screen bg-bg font-sans text-ink">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex h-[52px] items-center justify-between border-b border-rule bg-surface px-[28px]">
        <Link href="/" className="text-[16px] font-[800] tracking-[-0.3px] text-accent no-underline">
          PayMy<span className="text-ink">Loan</span>.ai
        </Link>
        <div className="flex items-center gap-[16px]">
          <LangToggle className="h-[30px] rounded-[4px] px-2 text-[11px] font-[700] text-ink-3 hover:bg-surface-2 hover:text-ink transition-colors" />
          <ThemeToggle className="h-[30px] w-[30px] rounded-[4px] text-ink-3 hover:bg-surface-2 hover:text-ink transition-colors" iconSize={15} />
          
          {/* Mensajes */}
          <Link href="/borrowerDashboard/messages" className="relative cursor-pointer block hover:text-ink transition-colors text-ink-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <div className="absolute -right-[2px] -top-[2px] h-[8px] w-[8px] rounded-full border-2 border-surface bg-accent"></div>
          </Link>

          {/* Notificaciones */}
          <Link href="/borrowerDashboard/notifications" className="relative cursor-pointer block hover:text-ink transition-colors text-ink-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 00-6 6v3l-1.5 2h15L16 11V8a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            <div className="absolute -right-[2px] -top-[2px] h-[8px] w-[8px] rounded-full border-2 border-surface bg-accent"></div>
          </Link>

          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-brand-dark text-[12px] font-[700] text-white cursor-pointer select-none">
            MJ
          </div>
          <LogoutButton className="h-[30px] rounded-[4px] px-2 text-[11px] font-[700] text-ink-3 hover:bg-surface-2 hover:text-crit transition-colors" iconSize={15} />
        </div>
      </nav>

      {/* LAYOUT PRINCIPAL */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <div className="flex w-[200px] shrink-0 flex-col border-r border-rule bg-surface py-[16px]">
          <Link href="/borrowerDashboard" className={`${navItemBase} ${pathname === "/borrowerDashboard" ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname === "/borrowerDashboard" ? "opacity-100" : "opacity-50"}`} viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>
            {sb.dashboard}
          </Link>
          <Link href="/borrowerDashboard/deals" className={`${navItemBase} ${pathname.includes("/deals") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/deals") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 7h14" stroke="currentColor" strokeWidth="1.4"/><path d="M6 1v4M12 1v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            {sb.deals}
            <span className="ml-auto rounded-[10px] bg-accent px-[7px] py-[1px] text-[10px] font-[700] text-accent-ink">3</span>
          </Link>
          <Link href="/borrowerDashboard/notifications" className={`${navItemBase} ${pathname.includes("/notifications") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/notifications") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 18 18" fill="none"><path d="M9 2l1.6 3.3 3.6.5-2.6 2.6.6 3.6L9 10.3l-3.2 1.7.6-3.6L3.8 5.8l3.6-.5L9 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
            {sb.notifications}
            <span className="ml-auto rounded-[10px] bg-accent px-[7px] py-[1px] text-[10px] font-[700] text-accent-ink">2</span>
          </Link>
          <Link href="/borrowerDashboard/messages" className={`${navItemBase} ${pathname.includes("/messages") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/messages") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 18 18" fill="none"><path d="M3 4h12a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 2V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
            {sb.messages}
            <span className="ml-auto rounded-[10px] bg-accent px-[7px] py-[1px] text-[10px] font-[700] text-accent-ink">1</span>
          </Link>
          <Link href="/borrowerDashboard/payments" className={`${navItemBase} ${pathname.includes("/payments") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/payments") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 8h14" stroke="currentColor" strokeWidth="1.4"/><circle cx="6" cy="12" r="1" fill="currentColor"/></svg>
            {sb.payments}
          </Link>
          <Link href="/borrowerDashboard/settings" className={`${navItemBase} ${pathname.includes("/settings") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/settings") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            {sb.settings}
          </Link>
          
          <Link href="/submit-deal" className="mx-[14px] mt-[12px] block rounded-[7px] bg-accent p-[10px] text-center font-sans text-[13px] font-[700] text-accent-ink no-underline transition-colors hover:bg-blue-700">
            {sb.postDeal}
          </Link>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-[28px_32px] max-w-[820px]">
          {children}
        </div>
      </div>
    </div>
  );
}