"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import LogoutButton from "@/app/components/ambos/LogoutButton";
import LangToggle from "@/app/components/ambos/LangToggle";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";
import { LayoutGrid, Clock, Users, Share2, User, CreditCard } from "lucide-react";

export default function AffiliateDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell isMinimal={true}>
      <AffiliateLayoutContent>{children}</AffiliateLayoutContent>
    </SiteShell>
  );
}

function AffiliateLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useSite();
  const sb = t.affiliateDashboard.sidebar;

  const navItemBase = "flex items-center gap-[10px] px-[20px] py-[10px] text-[13px] text-ink-2 cursor-pointer relative no-underline hover:bg-surface-2 hover:text-ink transition-all border-l-[3px] border-transparent";
  const navItemActive = "text-accent font-[700] border-l-accent bg-accent-soft";
  const iconBase = "w-[16px] h-[16px] opacity-60";
  const iconActive = "opacity-100";

  return (
    <div className="flex flex-col min-h-screen bg-bg font-sans text-ink">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-[52px] items-center justify-between border-b border-rule bg-surface px-[28px]">
        <Link href="/" className="text-[17px] font-[800] tracking-[-0.3px] text-ink no-underline">
          PayMy<span className="text-accent">Loan</span>.ai
        </Link>
        <div className="flex items-center gap-[16px]">
          <div className="text-[12px] text-ink-3 hidden sm:block">{sb.portalName}</div>
          <LangToggle className="h-[30px] rounded-[4px] px-2 text-[11px] font-[700] text-ink-3 hover:bg-surface-2 hover:text-ink transition-colors" />
          <ThemeToggle className="h-[30px] w-[30px] rounded-[4px] text-ink-3 hover:bg-surface-2 hover:text-ink transition-colors" iconSize={15} />
          
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-accent text-[13px] font-[700] text-white">
            JD
          </div>
          <div className="text-[13px] font-[600] text-ink hidden sm:block">James Davis</div>
        </div>
      </nav>

      {/* LAYOUT PRINCIPAL */}
      <div className="flex flex-1 pt-[52px]">
        {/* SIDEBAR */}
        <div className="fixed top-[52px] bottom-0 left-0 flex w-[200px] flex-col border-r border-rule bg-surface py-[20px]">
          
          <Link href="/affiliate-dashboard" className={`${navItemBase} ${pathname === "/affiliate-dashboard" ? navItemActive : ""}`}>
            <LayoutGrid className={`${iconBase} ${pathname === "/affiliate-dashboard" ? iconActive : ""}`} />
            {sb.dashboard}
          </Link>
          <Link href="/affiliate-dashboard/earningsHistory" className={`${navItemBase} ${pathname.includes("earningsHistory") ? navItemActive : ""}`}>
            <Clock className={`${iconBase} ${pathname.includes("earningsHistory") ? iconActive : ""}`} />
            {sb.earnings}
          </Link>
          <Link href="/affiliate-dashboard/myReferrals" className={`${navItemBase} ${pathname.includes("myReferrals") ? navItemActive : ""}`}>
            <Users className={`${iconBase} ${pathname.includes("myReferrals") ? iconActive : ""}`} />
            {sb.referrals}
          </Link>
          <Link href="/affiliate-dashboard/shareTools" className={`${navItemBase} ${pathname.includes("shareTools") ? navItemActive : ""}`}>
            <Share2 className={`${iconBase} ${pathname.includes("shareTools") ? iconActive : ""}`} />
            {sb.shareTools}
          </Link>
          <Link href="/affiliate-dashboard/account" className={`${navItemBase} ${pathname.includes("account") ? navItemActive : ""}`}>
            <User className={`${iconBase} ${pathname.includes("account") ? iconActive : ""}`} />
            {sb.account}
          </Link>
          <Link href="/affiliate-dashboard/payouts" className={`${navItemBase} ${pathname.includes("payouts") ? navItemActive : ""}`}>
            <CreditCard className={`${iconBase} ${pathname.includes("payouts") ? iconActive : ""}`} />
            {sb.payouts}
          </Link>

          {/* BOTON DE LOGOUT */}
          <div className="mt-auto border-t border-rule pt-4 px-[20px]">
            <LogoutButton
              className="w-full flex items-center gap-[10px] py-[8px] text-[13px] font-[500] text-ink-2 hover:text-crit transition-colors"
              iconSize={16}
            />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="ml-[200px] flex-1 p-[32px]">
          {children}
        </div>
      </div>
    </div>
  );
}