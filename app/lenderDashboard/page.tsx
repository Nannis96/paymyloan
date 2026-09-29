// app/lender/page.tsx
"use client";

import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import LogoutButton from "@/app/components/ambos/LogoutButton";
import LangToggle from "@/app/components/ambos/LangToggle";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";

import DashboardView from "./lenderViewsComponents/DashboardView";
import BrowseDealsView from "./lenderViewsComponents/BrowseDealsView";
import ActiveLoansView from "./lenderViewsComponents/ActiveLoansView";
import PaymentsView from "./lenderViewsComponents/PaymentsView";
import OffersSentView from "./lenderViewsComponents/OffersSentView";
import SettingsView from "./lenderViewsComponents/SettingsView";
import PreferencesView from "./lenderViewsComponents/PreferencesView";
import EntitiesView from "./lenderViewsComponents/EntitiesView";

type ViewState = "dashboard" | "browse" | "active" | "payments" | "offers" | "settings" | "preferences" | "entities";

function LenderDashboardContent() {
  const [currentView, setCurrentView] = useState<ViewState>("dashboard");
  const { t } = useSite();
  
  // Fallback bilingüe seguro por si estos textos aún no están en el diccionario
  const sb = (t.dashboardLender.mimic as any).sidebar || {
    menu: "Menu",
    dashboard: "Dashboard",
    browse: "Browse deals",
    active: "Active loans",
    payments: "Payments",
    offers: "Offers sent",
    settings: "Settings",
    preferences: "Preferences",
    entities: "Entities"
  };

  const navItemBase = "flex items-center gap-[9px] px-[18px] py-[8px] text-[13px] font-[500] text-[#425466] cursor-pointer relative no-underline hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors w-full text-left";
  const navItemActive = "text-[#635bff] bg-[#f0efff] font-[600] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#635bff] before:rounded-r-[2px]";

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f9fc] font-sans text-[#0a2540]">
        
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 flex h-[52px] items-center justify-between border-b border-[#e6ebf1] bg-white px-[28px]">
          <div className="text-[16px] font-[800] tracking-[-0.3px] text-[#635bff]">
            PayMy<span className="text-[#0a2540]">Loan</span>.ai
          </div>
          <div className="flex items-center gap-[14px]">
            <LangToggle className="h-[30px] rounded-[4px] px-2 text-[11px] font-[700] text-[#aab7c4] hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors" />
            <ThemeToggle className="h-[30px] w-[30px] rounded-[4px] text-[#aab7c4] hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors" iconSize={15} />
            <LogoutButton className="h-[30px] rounded-[4px] px-2 text-[11px] font-[700] text-[#aab7c4] hover:bg-[#f6f9fc] hover:text-[#c62626] transition-colors" iconSize={15} />
            <div className="relative cursor-pointer ml-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 00-6 6v3l-1.5 2h15L16 11V8a6 6 0 00-6-6z" stroke="#425466" strokeWidth="1.4"/><path d="M8 16a2 2 0 004 0" stroke="#425466" strokeWidth="1.4" strokeLinecap="round"/></svg>
              <div className="absolute -right-[2px] -top-[2px] h-[8px] w-[8px] rounded-full border-2 border-white bg-[#635bff]"></div>
            </div>
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#635bff] text-[12px] font-[700] text-white">
              WM
            </div>
          </div>
        </nav>

        {/* LAYOUT */}
        <div className="flex flex-1">
          {/* SIDEBAR */}
          <div className="flex w-[200px] shrink-0 flex-col border-r border-[#e6ebf1] bg-white py-[16px]">
            <div className="px-[18px] pb-[6px] pt-[14px] text-[10px] font-[700] uppercase tracking-[0.8px] text-[#aab7c4]">
              {sb.menu}
            </div>
            <button onClick={() => setCurrentView("dashboard")} className={`${navItemBase} ${currentView === "dashboard" ? navItemActive : ""}`}>
              {sb.dashboard}
            </button>
            <button onClick={() => setCurrentView("browse")} className={`${navItemBase} ${currentView === "browse" ? navItemActive : ""}`}>
              {sb.browse} <span className="ml-auto rounded-[10px] bg-[#635bff] px-[7px] py-[1px] text-[10px] font-[700] text-white">12</span>
            </button>
            <button onClick={() => setCurrentView("active")} className={`${navItemBase} ${currentView === "active" ? navItemActive : ""}`}>
              {sb.active}
            </button>
            <button onClick={() => setCurrentView("payments")} className={`${navItemBase} ${currentView === "payments" ? navItemActive : ""}`}>
              {sb.payments}
            </button>
            <button onClick={() => setCurrentView("offers")} className={`${navItemBase} ${currentView === "offers" ? navItemActive : ""}`}>
              {sb.offers} <span className="ml-auto rounded-[10px] bg-[#635bff] px-[7px] py-[1px] text-[10px] font-[700] text-white">2</span>
            </button>

            <div className="px-[18px] pb-[6px] pt-[14px] text-[10px] font-[700] uppercase tracking-[0.8px] text-[#aab7c4]">
              {sb.settings}
            </div>
            <button onClick={() => setCurrentView("settings")} className={`${navItemBase} ${currentView === "settings" ? navItemActive : ""}`}>
              {sb.settings}
            </button>
            <button onClick={() => setCurrentView("preferences")} className={`${navItemBase} ${currentView === "preferences" ? navItemActive : ""}`}>
              {sb.preferences}
            </button>
            <button onClick={() => setCurrentView("entities")} className={`${navItemBase} ${currentView === "entities" ? navItemActive : ""}`}>
              {sb.entities}
            </button>

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
            {currentView === "dashboard" && <DashboardView />}
            {currentView === "browse" && <BrowseDealsView />}
            {currentView === "active" && <ActiveLoansView />}
            {currentView === "payments" && <PaymentsView />}
            {currentView === "offers" && <OffersSentView />}
            {currentView === "settings" && <SettingsView />}
            {currentView === "preferences" && <PreferencesView />}
            {currentView === "entities" && <EntitiesView />}
          </div>
        </div>
  </div>
  );
}

export default function LenderDashboardMimic() {
  return (
    <SiteShell isMinimal={true}>
      <LenderDashboardContent />
    </SiteShell>
  );
}