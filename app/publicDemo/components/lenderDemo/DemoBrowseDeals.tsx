"use client";
import React, { useState, useEffect } from "react";
import { useTour } from "@/app/publicDemo/context/lenderDemo/DemoTourProvider";
import { DEMO_MOCKS } from "./mockedThings";

export default function DemoBrowseDeals({ dictionary }: { dictionary: any }) {
  const m = dictionary.marketplace;
  const shared = dictionary.uiComponents;
  const { currentStep, nextStep } = useTour();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Escuchar el paso del tour para abrir el modal automaticamente
  useEffect(() => {
    if (currentStep >= 5) setIsModalOpen(true);
    if (currentStep < 5) setIsModalOpen(false);
  }, [currentStep]);

  return (
    <div className="p-6 lg:p-10 font-sans text-ink">
      <div className="mb-6 text-2xl font-bold tracking-tight">{m.title}</div>
      
      {/* ID: demo-filter-bar (Paso 2) */}
      <div id="demo-filter-bar" className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-rule bg-surface p-4 shadow-sm">
        <button className="rounded-full bg-accent-soft px-4 py-1.5 text-xs font-bold text-accent">{m.filters.all}</button>
        <button className="rounded-full border border-rule px-4 py-1.5 text-xs font-medium text-ink-2">{m.filters.bridge}</button>
        <button className="rounded-full border border-rule px-4 py-1.5 text-xs font-medium text-ink-2">{m.filters.slowFlip}</button>
        <div className="mx-2 h-5 w-px bg-rule"></div>
        <select className="rounded-md border border-rule px-3 py-1.5 text-xs text-ink-2 outline-none bg-white">
          <option>LTV &le; 75%</option>
          <option>LTV &le; 70%</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {DEMO_MOCKS.cards.map((card, index) => (
          <div key={index} id={card.id || undefined} className={`flex flex-col overflow-hidden rounded-xl border border-rule bg-surface hover:shadow-md transition-shadow ${card.opacity} ${card.hiddenOnMobile ? "hidden md:flex" : ""}`}>
            <div className="border-b border-rule p-5">
              <span className={`mb-3 inline-block rounded-lg px-2.5 py-1 text-[11px] font-bold ${card.type === "Slow flip" ? "bg-green-100 text-green-700" : "bg-accent-soft text-accent"}`}>
                {card.type === "Bridge" ? m.dealDetails.loanTypeStr : card.type}
              </span>
              <div className="text-sm font-bold text-ink">{card.address}</div>
              <div className="text-xs text-ink-3">{card.cityState}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-5 border-b border-rule bg-surface-2">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-3">{shared.dealCard.loanRequest}</div>
                <div className="text-sm font-bold text-ink">{card.loanRequest}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-3">{shared.dealCard.arv}</div>
                <div className="text-sm font-bold text-ink">{card.arv}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-3">{shared.dealCard.ltv}</div>
                <div className={`text-sm font-bold ${card.ltv === "75%" ? "text-red-500" : "text-accent"}`}>{card.ltv}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ink-3">{m.dealDetails.pmlRating}</div>
                <div className="text-sm font-bold text-ink">{card.rating}</div>
              </div>
            </div>
            <div className="p-4 flex justify-end bg-surface">
              <button 
                id={card.buttonId || undefined} 
                onClick={() => {
                  if (index === 0 && currentStep === 4) {
                    nextStep();
                  } else if (index === 0) {
                    setIsModalOpen(true);
                  }
                }} 
                className={`rounded-md px-5 py-2.5 text-xs font-bold text-white transition-colors shadow-sm ${index === 0 ? "bg-accent hover:bg-blue-700 cursor-pointer" : "bg-accent cursor-not-allowed"}`}
              >
                {m.dealDetails.submitOffer}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DEMO MODAL DE OFERTA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
          <div id="demo-offer-modal" className="w-full max-w-[500px] rounded-2xl bg-surface p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-ink">{m.dealDetails.submitOffer}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-ink-3 hover:text-ink transition-colors cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div id="demo-modal-entity">
                <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">
                  Lending Entity
                </label>
                <select className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none bg-surface-2 cursor-not-allowed" disabled>
                  <option>{DEMO_MOCKS.entity}</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.dealDetails.formLoanAmount}</label>
                <input type="text" value="115,000" readOnly className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none bg-surface-2 cursor-not-allowed" />
              </div>
              <div className="grid grid-cols-2 gap-3" id="demo-modal-terms">
                <div>
                  <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.dealDetails.formRate}</label>
                  <input type="number" defaultValue="12" className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none focus:border-accent" />
                </div>
                <div>
                 <label className="mb-1 block text-[11px] font-bold uppercase tracking-[0.5px] text-ink-2">{m.dealDetails.formTerm}</label>
                 <select defaultValue="12 mo" className="w-full rounded-md border border-rule px-3 py-2 text-[13px] text-ink outline-none focus:border-accent bg-white cursor-pointer">
                  <option value="6 mo">6 mo</option>
                  <option value="12 mo">12 mo</option>
              </select>
            </div>
              </div>
              <div className="rounded-lg border border-rule bg-surface-2 p-3 text-xs text-ink-2">
                <div className="flex justify-between font-semibold">
                  <span>{m.dealDetails.calcMoInt}</span>
                  <span>$1,150</span>
                </div>
              </div>
              <div className="mt-2 flex justify-end gap-2" id="demo-modal-submit">
                <button onClick={() => setIsModalOpen(false)} className="rounded-md border border-rule bg-surface px-4 py-2 text-sm font-semibold text-ink-2 hover:bg-surface-2 transition-colors cursor-pointer">
                  Cancel
                </button>
                <button className="rounded-md bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-sm cursor-pointer">
                  {m.dealDetails.btnSubmit}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}