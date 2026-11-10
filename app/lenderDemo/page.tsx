"use client";
import React from "react";
import { DemoTourProvider } from "./context/DemoTourProvider";
import TourOverlay from "./components/TourOverlay";
import DemoBrowseDeals from "./components/DemoBrowseDeals";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import LangToggle from "@/app/components/ambos/LangToggle";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";

export default function LenderDemoPage() {
  return (
    <SiteShell isMinimal={true}>
      <LenderDemoContent />
    </SiteShell>
  );
}

function LenderDemoContent() {
  const { t } = useSite();

  return (
    <DemoTourProvider>
      <div className="flex flex-col min-h-screen bg-bg font-sans text-ink">
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-rule bg-surface px-6">
          <div className="text-lg font-extrabold tracking-tight text-accent">
            PayMy<span className="text-ink">Loan</span>.ai 
            <span className="ml-2 text-xs text-ink-3 font-normal uppercase tracking-widest">(Demo Mode)</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* ID: demo-nav-toggles para el Paso 0 */}
            <div id="demo-nav-toggles" className="flex items-center gap-2 rounded-lg p-1 bg-surface-2">
              <LangToggle className="h-[28px] rounded px-2 text-xs font-bold text-ink-2 hover:bg-white transition-colors" />
              <ThemeToggle className="h-[28px] w-[28px] rounded text-ink-2 hover:bg-white transition-colors" iconSize={14} />
            </div>
            <button className="text-xs font-bold text-ink-2 hover:text-ink">Exit Demo</button>
          </div>
        </nav>

        {/* MAIN LAYOUT */}
        <div className="flex flex-1 flex-col md:flex-row">
          {/* SIDEBAR MOCK */}
          <div className="w-full md:w-1/4 lg:w-1/5 md:min-w-[220px] flex-col border-r border-rule bg-surface py-6 hidden md:flex">
            <div className="px-5 pb-2 text-[11px] font-bold uppercase tracking-widest text-ink-3">
              {t.dashboardLender.mimic.sidebar.menu}
            </div>
            <div className="px-5 py-2 text-sm font-medium text-ink-2 opacity-50 cursor-not-allowed">
              {t.dashboardLender.mimic.sidebar.dashboard}
            </div>
            
            {/* ID: demo-sidebar-browse para el Paso 1 */}
            <div id="demo-sidebar-browse" className="px-5 py-2 text-sm font-bold text-accent bg-accent-soft border-l-4 border-accent cursor-pointer">
              {t.dashboardLender.mimic.sidebar.browse}
            </div>
            
            <div className="px-5 py-2 text-sm font-medium text-ink-2 opacity-50 cursor-not-allowed">
              {t.dashboardLender.mimic.sidebar.active}
            </div>
          </div>

          {/* CONTENT AREA */}
          <main className="flex-1 relative">
            <TourOverlay />
            <DemoBrowseDeals dictionary={t} />
          </main>
        </div>
      </div>
    </DemoTourProvider>
  );
}