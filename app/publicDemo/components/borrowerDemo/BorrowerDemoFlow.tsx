// app/publicDemo/components/borrowerDemo/BorrowerDemoFlow.tsx
"use client";

import React from "react";
import Link from "next/link";
import { BorrowerTourProvider, useBorrowerTour } from "../../context/borrowerDemo/BorrowerTourProvider";
import BorrowerTourOverlay from "./BorrowerTourOverlay";
import DemoBorrowerFlowComponent from "./DemoBorrowerFlow";
import { useSite } from "@/app/components/layout/SiteShell";
import LangToggle from "@/app/components/ambos/LangToggle";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";

// Separamos el contenido para poder usar el hook useBorrowerTour (que requiere estar dentro del Provider)
function FlowContent() {
  const { lang } = useSite();
  const isEs = lang === "es";
  const { currentStep, nextStep } = useBorrowerTour();
  
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

  return (
    <div className="flex flex-col min-h-screen bg-bg font-sans text-ink">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex h-[52px] items-center justify-between border-b border-rule bg-surface px-[28px]">
        <div className="text-[16px] font-[800] tracking-[-0.3px] text-accent no-underline">
          PayMy<span className="text-ink">Loan</span>.ai
        </div>
        <div className="flex items-center gap-[16px]">
          <div id="demo-header-toggles" className="flex items-center gap-[16px] rounded-md p-1">
            <LangToggle className="h-[30px] rounded-[4px] px-2 text-[11px] font-[700] text-ink-3 hover:bg-surface-2 hover:text-ink transition-colors" />
            <ThemeToggle className="h-[30px] w-[30px] rounded-[4px] text-ink-3 hover:bg-surface-2 hover:text-ink transition-colors" iconSize={15} />
          </div>
          
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-brand-dark text-[12px] font-[700] text-white cursor-pointer select-none">
            MJ
          </div>
          <Link href="/" className="h-[30px] flex items-center rounded-[4px] px-2 text-[11px] font-[700] text-ink-3 hover:bg-surface-2 hover:text-crit transition-colors no-underline">
            Exit Demo
          </Link>
        </div>
      </nav>
      
      {/* LAYOUT PRINCIPAL */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <div className="sticky top-[52px] flex h-[calc(100vh-52px)] w-[200px] shrink-0 flex-col overflow-y-auto border-r border-rule bg-surface py-[16px]">
          <div className={`${navItemBase}`}>
            <svg className="w-[18px] h-[18px] shrink-0 opacity-50" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>
            {sb.dashboard}
          </div>
          <div className={`${navItemBase}`}>
            <svg className="w-[18px] h-[18px] shrink-0 opacity-50" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M2 7h14" stroke="currentColor" strokeWidth="1.4"/><path d="M6 1v4M12 1v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            {sb.deals}
          </div>
          <div className={`${navItemBase}`}>
            <svg className="w-[18px] h-[18px] shrink-0 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            {sb.contracts}
          </div>
          
          <div className="mx-[14px] mt-[16px] block rounded-[7px] border-[1.5px] border-accent bg-accent-soft p-[10px] text-center font-sans text-[13px] font-[700] text-accent transition-colors opacity-50">
            {sb.inviteLender}
          </div>
          
          {/* EL ID demo-post-deal INICIA EL TOUR APUNTANDO AQUI */}
          <div 
            id="demo-post-deal" 
            onClick={() => { if (currentStep === 1) nextStep(); }}
            className="mx-[14px] mt-[12px] block rounded-[7px] bg-accent p-[10px] text-center font-sans text-[13px] font-[700] text-accent-ink cursor-pointer transition-colors hover:bg-blue-700 relative z-[110]"
          >
            {sb.postDeal}
          </div>
        </div>
        
        {/* MAIN CONTENT */}
        <div className="flex-1">
          <BorrowerTourOverlay />
          <DemoBorrowerFlowComponent />
        </div>
      </div>
    </div>
  );
}

export default function BorrowerDemoFlow() {
  return (
    <BorrowerTourProvider>
      <FlowContent />
    </BorrowerTourProvider>
  );
}