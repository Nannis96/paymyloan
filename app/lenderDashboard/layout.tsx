"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import LogoutButton from "@/app/components/ambos/LogoutButton";
import LangToggle from "@/app/components/ambos/LangToggle";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";
import { useUnreadMessages } from "@/app/lib/useUnreadMessages";
import { useUnreadNotifications } from "@/app/lib/useUnreadNotifications";

export default function LenderDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  /* Si estamos en la ruta de verificacion, devolvemos a los hijos sin la barra lateral */
  if (pathname.includes("/verify")) {
    return <>{children}</>;
  }

  return (
    <SiteShell isMinimal={true}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SiteShell>
  );
}

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t, lang } = useSite();
  const unreadMsgs = useUnreadMessages("lender");
  const unreadNotifs = useUnreadNotifications();
  const sb = (t.dashboardLender.mimic as any).sidebar;

  const [browseCount, setBrowseCount] = useState(0);
  const [offersCount, setOffersCount] = useState(0);
  // Inicializamos en true para evitar que el banner parpadee antes de que responda la API
  const [isVerified, setIsVerified] = useState(true);
  const [userInitials, setUserInitials] = useState("?");

  useEffect(() => {
    async function fetchLayoutData() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        if (!token) return;
        
        const headers = { Authorization: `Bearer ${token}` };
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

        // 1. Tratos y Ofertas
        fetch(`${BASE_URL}/api/marketplace/loan-requests`, { headers })
          .then(res => res.json())
          .then(json => {
            if (json.success && json.data) {
              setBrowseCount(json.data.total || json.data.items?.length || 0);
              const sentOffers = (json.data.items || []).filter((deal: any) => deal.quotes && deal.quotes.length > 0);
              setOffersCount(sentOffers.length);
            }
          })
          .catch(console.error);

        // 2. Verificacion de entidad
        const meRes = await fetch(`${BASE_URL}/api/lenders/me`, { headers });
        const meJson = await meRes.json();
        
        if (meJson.success && meJson.data?.user?.name) {
          const nameParts = meJson.data.user.name.trim().split(" ");
          const initials = nameParts.length > 1 
            ? nameParts[0][0] + nameParts[nameParts.length - 1][0] 
            : nameParts[0].substring(0, 2);
          setUserInitials(initials.toUpperCase());
        }

        if (meJson.success && meJson.data?.lenderCompanies?.length > 0) {
          const companyId = meJson.data.lenderCompanies[0].id;
          const verifRes = await fetch(`${BASE_URL}/api/lenders/me/companies/${companyId}/verification`, { headers });
          const verifJson = await verifRes.json();
          if (verifJson.success && verifJson.data) {
            setIsVerified(verifJson.data.status === "APPROVED");
          } else {
            setIsVerified(false);
          }
        } else {
          setIsVerified(false);
        }
      } catch (err) {
        console.error("Error obteniendo datos del layout", err);
      }
    }
    fetchLayoutData();
  }, []);
  const navItemBase = "flex items-center gap-2 sm:gap-[10px] px-4 sm:px-[20px] py-2.5 sm:py-[10px] text-[13px] sm:text-[14px] font-[500] text-[#425466] cursor-pointer relative no-underline hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors w-full text-left";
  const navItemActive = "text-[#635bff] bg-[#f0efff] font-[600] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#635bff] before:rounded-r-[2px]";

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f9fc] font-sans text-[#0a2540]">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex h-14 sm:h-[60px] items-center justify-between border-b border-[#e6ebf1] bg-white px-4 sm:px-6 lg:px-[32px]">
        <Link href="/" className="text-[16px] sm:text-[18px] font-[800] tracking-[-0.3px] text-[#635bff] no-underline">
          PayMy<span className="text-[#0a2540]">Loan</span>.ai
        </Link>
        <div className="flex items-center gap-2 sm:gap-[16px]">
          <LangToggle className="h-[30px] sm:h-[34px] rounded-[4px] px-2 sm:px-3 text-[11px] sm:text-[12px] font-[700] text-[#aab7c4] hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors" />
          <ThemeToggle className="h-[30px] sm:h-[34px] w-[30px] sm:w-[34px] rounded-[4px] text-[#aab7c4] hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors" iconSize={16} />
          <LogoutButton className="hidden sm:flex h-[34px] rounded-[4px] px-3 text-[12px] font-[700] text-[#aab7c4] hover:bg-[#f6f9fc] hover:text-[#c62626] transition-colors" iconSize={16} />
          
          <Link href="/lenderDashboard/messages" className="relative cursor-pointer ml-1 sm:ml-3 block hover:text-[#0a2540] transition-colors text-[#425466]">
            <svg width="20" height="20" className="sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            {unreadMsgs > 0 && (
              <div className="absolute -right-[6px] -top-[6px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#635bff] text-[9px] font-bold text-white">
                {unreadMsgs}
              </div>
            )}
          </Link>
          <Link href="/lenderDashboard/notifications" className="relative cursor-pointer ml-3 sm:ml-4 block">
            <svg width="20" height="20" className="sm:w-[22px] sm:h-[22px]" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 00-6 6v3l-1.5 2h15L16 11V8a6 6 0 00-6-6z" stroke="#425466" strokeWidth="1.4"/><path d="M8 16a2 2 0 004 0" stroke="#425466" strokeWidth="1.4" strokeLinecap="round"/></svg>
            {unreadNotifs > 0 && (
              <div className="absolute -right-[6px] -top-[6px] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#635bff] text-[9px] font-bold text-white">
                {unreadNotifs}
              </div>
            )}
          </Link>

          <div className="flex h-[30px] w-[30px] sm:h-[34px] sm:w-[34px] items-center justify-center rounded-full bg-[#635bff] text-[12px] sm:text-[13px] font-[700] text-white ml-1 sm:ml-0">
            {userInitials}
          </div>
        </div>
      </nav>

      {/* LAYOUT PRINCIPAL */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* SIDEBAR */}
        <div className="flex w-full md:w-1/4 lg:w-1/5 md:max-w-[260px] md:min-w-[220px] shrink-0 flex-col border-b md:border-b-0 md:border-r border-[#e6ebf1] bg-white py-4 md:py-[20px]">
          <div className="px-4 md:px-[20px] pb-2 md:pb-[8px] pt-2 md:pt-[16px] text-[10px] md:text-[11px] font-[700] uppercase tracking-[0.8px] text-[#aab7c4]">
            {sb.menu}
          </div>
          {!isVerified && (
            <Link href="/lenderDashboard/verification" className={`flex items-center gap-[10px] mx-4 md:mx-[14px] mb-3 md:mb-[12px] rounded-[6px] px-3 md:px-[12px] py-2 md:py-[10px] text-[12px] md:text-[13px] font-[700] text-[#b45309] bg-[#fff8e1] border border-[#fcd34d] transition-all hover:bg-[#ffecb3] ${pathname.includes("verification") ? "bg-[#ffecb3] shadow-sm" : "animate-pulse shadow-sm"}`}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0"><path d="M8 1.5L1.5 13h13L8 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 6v3M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              {sb.verifyMsg}
            </Link>
          )}
          <Link href="/lenderDashboard" className={`${navItemBase} ${pathname === "/lenderDashboard" ? navItemActive : ""}`}>
            {sb.dashboard}
          </Link>
          <Link href="/lenderDashboard/browse-deals" className={`${navItemBase} ${pathname.includes("browse-deals") ? navItemActive : ""}`}>
            {sb.browse}
            {browseCount > 0 && (
              <span className="ml-auto rounded-[10px] bg-[#635bff] px-[7px] py-[1px] text-[10px] font-[700] text-white">{browseCount}</span>
            )}
          </Link>
          <Link href="/lenderDashboard/active-loans" className={`${navItemBase} ${pathname.includes("active-loans") ? navItemActive : ""}`}>
            {sb.active}
          </Link>
          <Link href="/lenderDashboard/payments" className={`${navItemBase} ${pathname.includes("payments") ? navItemActive : ""}`}>
            {sb.payments}
          </Link>
          <Link href="/lenderDashboard/offers-sent" className={`${navItemBase} ${pathname.includes("offers-sent") ? navItemActive : ""}`}>
            {sb.offers}
            {offersCount > 0 && (
              <span className="ml-auto rounded-[10px] bg-[#635bff] px-[7px] py-[1px] text-[10px] font-[700] text-white">{offersCount}</span>
            )}
          </Link>
          <Link 
            href="/lenderDashboard/contacts" 
            className={`${navItemBase} ${pathname.includes("contacts") ? navItemActive : ""}`}
          >
            {sb.contacts || (lang === "es" ? "Contactos" : "Contacts")}
          </Link>
          <Link href="/lenderDashboard/messages" className={`${navItemBase} ${pathname.includes("messages") ? navItemActive : ""}`}>
            {t.messaging?.title || "Mensajes"}
            {unreadMsgs > 0 && (
              <span className="ml-auto rounded-[10px] bg-[#635bff] px-[7px] py-[1px] text-[10px] font-[700] text-white">{unreadMsgs}</span>
            )}
          </Link>
          <Link href="/lenderDashboard/notifications" className={`${navItemBase} ${pathname.includes("notifications") ? navItemActive : ""}`}>
            {t.notifications?.title || "Notificaciones"}
            {unreadNotifs > 0 && (
              <span className="ml-auto rounded-[10px] bg-[#635bff] px-[7px] py-[1px] text-[10px] font-[700] text-white">{unreadNotifs}</span>
            )}
          </Link>
          
          <div className="px-4 md:px-[20px] pb-2 md:pb-[8px] pt-4 md:pt-[16px] text-[10px] md:text-[11px] font-[700] uppercase tracking-[0.8px] text-[#aab7c4]">
            {sb.settings}
          </div>
          <Link href="/lenderDashboard/settings" className={`${navItemBase} ${pathname.includes("settings") ? navItemActive : ""}`}>
            {sb.settings}
          </Link>
          <Link href="/lenderDashboard/preferences" className={`${navItemBase} ${pathname.includes("preferences") ? navItemActive : ""}`}>
            {sb.preferences}
          </Link>
          <Link href="/lenderDashboard/entities" className={`${navItemBase} ${pathname.includes("entities") ? navItemActive : ""}`}>
            {sb.entities}
          </Link>
          <Link 
            href="/affiliate-dashboard" 
            className={`${navItemBase} ${pathname.includes("affiliate") ? navItemActive : ""}`}
          >
            {sb.affiliates || (lang === "es" ? "Afiliados" : "Affiliates")}
          </Link>
          {/* BOTON DE LOGOUT */}
          <div className="mt-4 md:mt-auto border-t border-[#e6ebf1] pt-4 md:pt-5 px-4 md:px-[20px]">
            <LogoutButton
              className="w-full flex items-center gap-2 md:gap-[10px] py-2 md:py-[10px] text-[13px] md:text-[14px] font-[500] text-[#425466] hover:text-[#c62626] transition-colors"
              iconSize={18}
            />
          </div>
        </div>
        {/* MAIN CONTENT */}
        <div className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-[32px] lg:py-[28px]">
          {children}
        </div>
      </div>
    </div>
  );
}