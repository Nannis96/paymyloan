"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import LogoutButton from "@/app/components/ambos/LogoutButton";
import LangToggle from "@/app/components/ambos/LangToggle";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";

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
  
  const isVerified = false; // Mock para mostrar el menu llamativo
  const sb = (t.dashboardLender.mimic as any).sidebar;
  const navItemBase = "flex items-center gap-[9px] px-[18px] py-[8px] text-[13px] font-[500] text-[#425466] cursor-pointer relative no-underline hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors w-full text-left";
  const navItemActive = "text-[#635bff] bg-[#f0efff] font-[600] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#635bff] before:rounded-r-[2px]";

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f9fc] font-sans text-[#0a2540]">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex h-[52px] items-center justify-between border-b border-[#e6ebf1] bg-white px-[28px]">
        <Link href="/" className="text-[16px] font-[800] tracking-[-0.3px] text-[#635bff] no-underline">
          PayMy<span className="text-[#0a2540]">Loan</span>.ai
        </Link>
        <div className="flex items-center gap-[14px]">
          <LangToggle className="h-[30px] rounded-[4px] px-2 text-[11px] font-[700] text-[#aab7c4] hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors" />
          <ThemeToggle className="h-[30px] w-[30px] rounded-[4px] text-[#aab7c4] hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors" iconSize={15} />
          <LogoutButton className="h-[30px] rounded-[4px] px-2 text-[11px] font-[700] text-[#aab7c4] hover:bg-[#f6f9fc] hover:text-[#c62626] transition-colors" iconSize={15} />
          <Link href="/lenderDashboard/messages" className="relative cursor-pointer ml-2 block hover:text-[#0a2540] transition-colors text-[#425466]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <div className="absolute -right-[2px] -top-[2px] h-[8px] w-[8px] rounded-full border-2 border-white bg-[#635bff]"></div>
          </Link>
          <Link href="/lenderDashboard/notifications" className="relative cursor-pointer ml-3 block">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 00-6 6v3l-1.5 2h15L16 11V8a6 6 0 00-6-6z" stroke="#425466" strokeWidth="1.4"/><path d="M8 16a2 2 0 004 0" stroke="#425466" strokeWidth="1.4" strokeLinecap="round"/></svg>
            <div className="absolute -right-[2px] -top-[2px] h-[8px] w-[8px] rounded-full border-2 border-white bg-[#635bff]"></div>
          </Link>
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#635bff] text-[12px] font-[700] text-white">
            WM
          </div>
        </div>
      </nav>

      {/* LAYOUT PRINCIPAL */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <div className="flex w-[200px] shrink-0 flex-col border-r border-[#e6ebf1] bg-white py-[16px]">
          <div className="px-[18px] pb-[6px] pt-[14px] text-[10px] font-[700] uppercase tracking-[0.8px] text-[#aab7c4]">
            {sb.menu}
          </div>

          {!isVerified && (
            <Link href="/lenderDashboard/verification" className={`flex items-center gap-[8px] mx-[12px] mb-[10px] rounded-[6px] px-[10px] py-[8px] text-[12px] font-[700] text-[#b45309] bg-[#fff8e1] border border-[#fcd34d] transition-all hover:bg-[#ffecb3] ${pathname.includes("verification") ? "bg-[#ffecb3] shadow-sm" : "animate-pulse shadow-sm"}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0"><path d="M8 1.5L1.5 13h13L8 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 6v3M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              {sb.verifyMsg}
            </Link>
          )}

          <Link href="/lenderDashboard" className={`${navItemBase} ${pathname === "/lenderDashboard" ? navItemActive : ""}`}>
            {sb.dashboard}
          </Link>
          <Link href="/lenderDashboard/browse-deals" className={`${navItemBase} ${pathname.includes("browse-deals") ? navItemActive : ""}`}>
            {sb.browse} <span className="ml-auto rounded-[10px] bg-[#635bff] px-[7px] py-[1px] text-[10px] font-[700] text-white">12</span>
          </Link>
          <Link href="/lenderDashboard/active-loans" className={`${navItemBase} ${pathname.includes("active-loans") ? navItemActive : ""}`}>
            {sb.active}
          </Link>
          <Link href="/lenderDashboard/payments" className={`${navItemBase} ${pathname.includes("payments") ? navItemActive : ""}`}>
            {sb.payments}
          </Link>
          <Link href="/lenderDashboard/offers-sent" className={`${navItemBase} ${pathname.includes("offers-sent") ? navItemActive : ""}`}>
            {sb.offers} <span className="ml-auto rounded-[10px] bg-[#635bff] px-[7px] py-[1px] text-[10px] font-[700] text-white">2</span>
          </Link>

          <div className="px-[18px] pb-[6px] pt-[14px] text-[10px] font-[700] uppercase tracking-[0.8px] text-[#aab7c4]">
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

          {/* BOTON DE LOGOUT */}
          <div className="mt-auto border-t border-[#e6ebf1] pt-4 px-[18px]">
            <LogoutButton
              className="w-full flex items-center gap-[9px] py-[8px] text-[13px] font-[500] text-[#425466] hover:text-[#c62626] transition-colors"
              iconSize={16}
            />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 px-[32px] py-[28px]">
          {children}
        </div>
      </div>
    </div>
  );
}