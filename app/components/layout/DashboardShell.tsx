"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, LayoutDashboard, Wallet, CreditCard, Users, FileText, Send, Building, FileSignature, Settings, FileBarChart, LogOut } from "lucide-react";
import { useSite } from "./SiteShell";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const { t, lang, setLang, resolvedTheme, toggleTheme } = useSite();
  const pathname = usePathname();
  const l = t.dashboardLayout;

  // Helpers para clases activas en el sidebar
  const isActive = (path: string) => pathname === path ? "bg-accent/10 text-accent font-bold" : "text-ink-2 hover:bg-surface-2 hover:text-ink font-medium";
  const iconClass = (path: string) => pathname === path ? "text-accent" : "text-ink-3";

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 flex h-[68px] items-center justify-between border-b border-rule bg-surface px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-ink font-black text-lg">
            P
          </div>
          <Link href="/borrower" className="text-[18px] font-black tracking-tight text-ink no-underline">
            PayMyLoan<span className="text-accent">.ai</span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="rounded-full border border-rule bg-surface-2 px-3 py-1.5 text-[11px] font-bold text-ink-2 transition-colors hover:border-accent hover:text-ink"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-rule bg-surface-2 text-ink-2 transition-colors hover:border-accent hover:text-ink"
          >
            {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <div className="ml-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-accent text-xs font-black text-accent-ink">
            AG
          </div>
        </div>
      </nav>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[240px] flex-shrink-0 flex-col overflow-y-auto border-r border-rule bg-surface py-5 px-3 hidden md:flex">
          
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-ink-3">
            {l.overview}
          </div>
          
          {/* LENDER MENU */}
          {pathname.startsWith("/lender") && (
            <>
              <Link href="/lender" className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${isActive("/lender")}`}>
                <LayoutDashboard size={16} className={iconClass("/lender")} /> {l.nav.home}
              </Link>
              <Link href="/lender/deals" className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${isActive("/lender/deals")}`}>
                <Wallet size={16} className={iconClass("/lender/deals")} /> {l.nav.myDeals}
              </Link>
              <Link href="/marketplace" className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${isActive("/marketplace")}`}>
                <Building size={16} className={iconClass("/marketplace")} /> Marketplace
              </Link>
            </>
          )}

          {/* BORROWER MENU */}
          {pathname.startsWith("/borrower") && (
            <>
              <Link href="/borrower" className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${isActive("/borrower")}`}>
                <LayoutDashboard size={16} className={iconClass("/borrower")} /> {l.nav.home}
              </Link>
              <Link href="/borrower/balances" className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${isActive("/borrower/balances")}`}>
                <Wallet size={16} className={iconClass("/borrower/balances")} /> {l.nav.balances}
              </Link>
              <Link href="/borrower/payments" className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${isActive("/borrower/payments")}`}>
                <CreditCard size={16} className={iconClass("/borrower/payments")} /> {l.nav.payments}
              </Link>
              <Link href="/borrower/lenders" className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${isActive("/borrower/lenders")}`}>
                <Users size={16} className={iconClass("/borrower/lenders")} /> {l.nav.lenders}
              </Link>

              <div className="mt-4 mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-ink-3">
                {l.products}
              </div>
              <Link href="/apply" className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${isActive("/apply")}`}>
                <Send size={16} className={iconClass("/apply")} /> {l.nav.submitDeal}
              </Link>
              <Link href="/contracts" className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${isActive("/contracts")}`}>
                <Building size={16} className={iconClass("/contracts")} /> {l.nav.bridgeLoans}
              </Link>
              <Link href="/term-sheets" className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${isActive("/term-sheets")}`}>
                <FileSignature size={16} className={iconClass("/term-sheets")} /> {l.nav.termSheets}
              </Link>
            </>
          )}

          <div className="mt-4 mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-ink-3">
            {l.account}
          </div>
          <Link href="/settings" className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${isActive("/settings")}`}>
            <Settings size={16} className={iconClass("/settings")} /> {l.nav.settings}
          </Link>

          <div className="mt-auto pt-6 border-t border-rule px-3">
            <Link href="/" className="flex items-center gap-2 text-[12px] text-ink-3 hover:text-crit transition-colors">
              <LogOut size={14} /> Log out
            </Link>
          </div>
        </aside>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto bg-bg p-6 lg:p-10">
          <div className="mx-auto max-w-[1000px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}