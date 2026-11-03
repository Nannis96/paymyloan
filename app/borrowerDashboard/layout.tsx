"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import LogoutButton from "@/app/components/ambos/LogoutButton";
import LangToggle from "@/app/components/ambos/LangToggle";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";
import { useUnreadMessages } from "@/app/lib/useUnreadMessages";
import { useUnreadNotifications } from "@/app/lib/useUnreadNotifications";
import { api, toList } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";
import type { LoanRequest } from "@/app/types/api";

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
  const unreadMessages = useUnreadMessages("borrower");
  const unreadNotifications = useUnreadNotifications();
  const isEs = lang === "es";

  // Tratos abiertos = solicitudes PUBLISHED (esperando ofertas). Se recarga al navegar.
  const [openDeals, setOpenDeals] = useState(0);
  useEffect(() => {
    api(API_ROUTES.borrowers.meLoanRequests)
      .then((d) => setOpenDeals(toList<LoanRequest>(d).filter((r) => r.status === "PUBLISHED").length))
      .catch(() => {});
  }, [pathname]);

  const sb = {
    dashboard: "Dashboard",
    deals: isEs ? "Tratos" : "Deals",
    contracts: isEs ? "Contratos" : "Contracts",
    notifications: isEs ? "Notificaciones" : "Notifications",
    messages: isEs ? "Mensajes" : "Messages",
    contacts: isEs ? "Contactos" : "Contacts",
    payments: isEs ? "Pagos" : "Payments",
    documents: isEs ? "Documentos" : "Documents",
    affiliates: isEs ? "Afiliados" : "Affiliates",
    entities: isEs ? "Entidades" : "Entities",
    settings: isEs ? "Configuracion" : "Settings",
    postDeal: isEs ? "+ Analizar y Publicar" : "+ Analyze & Post a Deal",
    inviteLender: isEs ? "Invita a tu Prestamista" : "Invite your Lender",
    support: isEs ? "Soporte" : "Support",
    faqHelp: isEs ? "Preguntas Frecuentes" : "Faq/Help",
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
            {unreadMessages > 0 && <div className="absolute -right-[2px] -top-[2px] h-[8px] w-[8px] rounded-full border-2 border-surface bg-accent"></div>}
          </Link>

          {/* Notificaciones */}
          <Link href="/borrowerDashboard/notifications" className="relative cursor-pointer block hover:text-ink transition-colors text-ink-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 00-6 6v3l-1.5 2h15L16 11V8a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            {unreadNotifications > 0 && <div className="absolute -right-[2px] -top-[2px] h-[8px] w-[8px] rounded-full border-2 border-surface bg-accent"></div>}
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
        <div className="sticky top-[52px] flex h-[calc(100vh-52px)] w-[200px] shrink-0 flex-col overflow-y-auto border-r border-rule bg-surface py-[16px]">
          <Link href="/borrowerDashboard" className={`${navItemBase} ${pathname === "/borrowerDashboard" ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname === "/borrowerDashboard" ? "opacity-100" : "opacity-50"}`} viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>
            {sb.dashboard}
          </Link>
          <Link href="/borrowerDashboard/deals" className={`${navItemBase} ${pathname.includes("/deals") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/deals") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 7h14" stroke="currentColor" strokeWidth="1.4"/><path d="M6 1v4M12 1v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            {sb.deals}
            {openDeals > 0 && <span className="ml-auto rounded-[10px] bg-accent px-[7px] py-[1px] text-[10px] font-[700] text-accent-ink">{openDeals}</span>}
          </Link>
          <Link href="/borrowerDashboard/contracts" className={`${navItemBase} ${pathname.includes("/contracts") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/contracts") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            {sb.contracts}
          </Link>
          <Link href="/borrowerDashboard/notifications" className={`${navItemBase} ${pathname.includes("/notifications") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/notifications") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 00-6 6v3l-1.5 2h15L16 11V8a6 6 0 00-6-6z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 16a2 2 0 004 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            {sb.notifications}
            {unreadNotifications > 0 && <span className="ml-auto rounded-[10px] bg-accent px-[7px] py-[1px] text-[10px] font-[700] text-accent-ink">{unreadNotifications}</span>}
          </Link>
          <Link href="/borrowerDashboard/messages" className={`${navItemBase} ${pathname.includes("/messages") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/messages") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 18 18" fill="none"><path d="M3 4h12a1 1 0 011 1v7a1 1 0 01-1 1H5l-3 2V5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
            {sb.messages}
            {unreadMessages > 0 && <span className="ml-auto rounded-[10px] bg-accent px-[7px] py-[1px] text-[10px] font-[700] text-accent-ink">{unreadMessages}</span>}
          </Link>
          <Link href="/borrowerDashboard/contacts" className={`${navItemBase} ${pathname.includes("/contacts") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/contacts") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 18 18" fill="none"><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.4"/><path d="M3 15a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4" stroke="currentColor" strokeWidth="1.4"/></svg>
            {sb.contacts}
          </Link>

          <Link href="/borrowerDashboard/payments" className={`${navItemBase} ${pathname.includes("/payments") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/payments") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 8h14" stroke="currentColor" strokeWidth="1.4"/><circle cx="6" cy="12" r="1" fill="currentColor"/></svg>
            {sb.payments}
          </Link>
          <Link href="/borrowerDashboard/documents" className={`${navItemBase} ${pathname.includes("/documents") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/documents") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 8h14" stroke="currentColor" strokeWidth="1.4"/><circle cx="6" cy="12" r="1" fill="currentColor"/></svg>
            {sb.documents}
          </Link>

          <Link href="/borrowerDashboard/settings" className={`${navItemBase} ${pathname.includes("/settings") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/settings") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            {sb.settings}
          </Link>
          
          <Link href="/borrowerDashboard/invite-flow" className="mx-[14px] mt-[16px] block rounded-[7px] border-[1.5px] border-accent bg-accent-soft p-[10px] text-center font-sans text-[13px] font-[700] text-accent no-underline transition-colors hover:bg-accent hover:text-white">
            {sb.inviteLender}
          </Link>

          <Link href="/borrowerDashboard/submit-deal" className="mx-[14px] mt-[12px] block rounded-[7px] bg-accent p-[10px] text-center font-sans text-[13px] font-[700] text-accent-ink no-underline transition-colors hover:bg-blue-700">
            {sb.postDeal}
          </Link>
          
          <Link href="/borrowerDashboard/affiliates" className={`${navItemBase} mt-4 ${pathname.includes("/affiliates") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/affiliates") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            {sb.affiliates}
          </Link>
          <Link href="/borrowerDashboard/entities" className={`${navItemBase} ${pathname.includes("/entities") ? navItemActive : ""}`}>
            <svg className={`w-[18px] h-[18px] shrink-0 ${pathname.includes("/entities") ? "opacity-100" : "opacity-50"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            {sb.entities}
          </Link>

          {/* Enlaces inferiores empujados hacia abajo con mt-auto */}
          <div className="mt-auto flex flex-col gap-1 pt-8 pb-4">
            <Link href="/borrowerDashboard/support" className={`${navItemBase} ${pathname.includes("/support") ? navItemActive : ""}`}>
              {sb.support}
            </Link>
            <Link href="/borrowerDashboard/faq" className={`${navItemBase} ${pathname.includes("/faq") ? navItemActive : ""}`}>
              {sb.faqHelp}
            </Link>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-[28px_32px]">
          {children}
        </div>
      </div>
    </div>
  );
}