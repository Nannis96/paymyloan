"use client";

import { useState } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

export default function CounterOfferView() {
  const { t } = useSite();
  const co = t.counterOffer;

  const [isCountering, setIsCountering] = useState(false);

  return (
    <div className="animate-in fade-in duration-300 max-w-[800px]">
      <div className="mb-[4px] text-[22px] font-[800] tracking-[-0.3px] text-[#0a2540]">
        {co.title}
      </div>
      <div className="mb-[28px] text-[13px] text-[#8898aa]">
        {co.subtitle}
      </div>

      {/* Deal summary bar */}
      <div className="mb-[24px] flex flex-col justify-between gap-[16px] rounded-[10px] border border-[#e6ebf1] bg-white p-[16px_22px] sm:flex-row sm:items-center">
        <div>
          <div className="text-[14px] font-[700] text-[#0a2540]">
            3802 University Cove, Memphis TN 38127
          </div>
          <div className="mt-[2px] text-[12px] text-[#8898aa]">
            Memphis Realty LLC · $115,000 {co.deal.requested} · 12 {co.deal.months}
          </div>
        </div>
        <div className="flex gap-[24px]">
          <div>
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">
              {co.deal.arv}
            </div>
            <div className="mt-[2px] text-[14px] font-[800] text-[#0a2540]">$165,000</div>
          </div>
          <div>
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">
              {co.deal.ltv}
            </div>
            <div className="mt-[2px] text-[14px] font-[800] text-[#0a2540]">69.7%</div>
          </div>
          <div>
            <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">
              {co.deal.rehab}
            </div>
            <div className="mt-[2px] text-[14px] font-[800] text-[#0a2540]">$30,000</div>
          </div>
        </div>
      </div>

      {/* Counter thread */}
      <div className="mb-[24px] flex flex-col gap-[16px]">
        
        {/* Original Request (Borrower) */}
        <div className="overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white">
          <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[14px_20px]">
            <div className="flex items-center gap-[10px]">
              <span className="rounded-[10px] border border-[#e6ebf1] bg-[#f6f9fc] px-[10px] py-[3px] text-[11px] font-[700] text-[#8898aa]">
                {co.thread.original}
              </span>
              <span className="text-[13px] font-[600] text-[#0a2540]">Memphis Realty LLC</span>
            </div>
            <span className="text-[11px] text-[#aab7c4]">Sep 19 at 10:14 AM</span>
          </div>
          <div className="p-[18px_20px]">
            <div className="mb-[14px] grid grid-cols-2 gap-[12px] sm:grid-cols-4">
              <div>
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{co.terms.amount}</div>
                <div className="mt-[3px] text-[16px] font-[800] text-[#0a2540]">$115,000</div>
              </div>
              <div>
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{co.terms.rate}</div>
                <div className="mt-[3px] text-[16px] font-[800] text-[#0a2540]">10%</div>
              </div>
              <div>
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{co.terms.term}</div>
                <div className="mt-[3px] text-[16px] font-[800] text-[#0a2540]">12 mo</div>
              </div>
            </div>
            <div className="rounded-[6px] border-l-[3px] border-[#e6ebf1] bg-[#f6f9fc] p-[10px_12px] text-[12px] text-[#425466]">
              Looking to fund a standard bridge loan on this property. Great exit potential.
            </div>
          </div>
        </div>

        {/* Your Offer (Lender) */}
        <div className="overflow-hidden rounded-[10px] border border-[#635bff] bg-white">
          <div className="flex items-center justify-between border-b border-[#c7c4ff] bg-[#f0efff] p-[14px_20px]">
            <div className="flex items-center gap-[10px]">
              <span className="rounded-[10px] bg-[#635bff] px-[10px] py-[3px] text-[11px] font-[700] text-white">
                {co.thread.yourOffer}
              </span>
              <span className="text-[13px] font-[600] text-[#0a2540]">Moore Capital LLC (You)</span>
            </div>
            <span className="text-[11px] text-[#aab7c4]">Sep 19 at 2:14 PM</span>
          </div>
          <div className="p-[18px_20px]">
            <div className="mb-[14px] grid grid-cols-2 gap-[12px] sm:grid-cols-4">
              <div>
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{co.terms.amount}</div>
                <div className="mt-[3px] text-[16px] font-[800] text-[#0a2540]">$115,000</div>
                <div className="mt-[2px] text-[11px] text-[#8898aa]">{co.thread.noChange}</div>
              </div>
              <div>
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{co.terms.rate}</div>
                <div className="mt-[3px] text-[16px] font-[800] text-[#0a2540]">12%</div>
                <div className="mt-[2px] text-[11px] text-[#dc2626]">{co.thread.reqHigher}</div>
              </div>
              <div>
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{co.terms.term}</div>
                <div className="mt-[3px] text-[16px] font-[800] text-[#0a2540]">12 mo</div>
                <div className="mt-[2px] text-[11px] text-[#8898aa]">{co.thread.noChange}</div>
              </div>
              <div>
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{co.terms.points}</div>
                <div className="mt-[3px] text-[16px] font-[800] text-[#0a2540]">1.0</div>
              </div>
            </div>
            <div className="rounded-[6px] border-l-[3px] border-[#635bff] bg-[#f6f9fc] p-[10px_12px] text-[12px] text-[#425466]">
              Happy to fund this deal. Standard terms — 1 point at closing, IO monthly, full balloon at maturity.
            </div>
          </div>
        </div>

        {/* Counter from borrower */}
        <div className="overflow-hidden rounded-[10px] border border-[#635bff] bg-white">
          <div className="flex items-center justify-between border-b border-[#c7c4ff] bg-[#f0efff] p-[14px_20px]">
            <div className="flex items-center gap-[10px]">
              <span className="rounded-[10px] bg-[#635bff] px-[10px] py-[3px] text-[11px] font-[700] text-white">
                {co.thread.borrowerCounter}
              </span>
              <span className="text-[13px] font-[600] text-[#0a2540]">Memphis Realty LLC</span>
            </div>
            <span className="text-[11px] text-[#aab7c4]">
              Sep 20 at 10:31 AM · <strong className="text-[#635bff]">{co.thread.awaiting}</strong>
            </span>
          </div>
          <div className="p-[18px_20px]">
            <div className="mb-[14px] grid grid-cols-2 gap-[12px] sm:grid-cols-4">
              <div>
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{co.terms.amount}</div>
                <div className="mt-[3px] text-[16px] font-[800] text-[#0a2540]">$115,000</div>
                <div className="mt-[2px] text-[11px] text-[#8898aa]">{co.thread.noChange}</div>
              </div>
              <div>
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{co.terms.rate}</div>
                <div className="mt-[3px] text-[16px] font-[800] text-[#0a2540]">11%</div>
                <div className="mt-[2px] text-[11px] text-[#dc2626]">{co.thread.reqLower}</div>
              </div>
              <div>
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{co.terms.term}</div>
                <div className="mt-[3px] text-[16px] font-[800] text-[#0a2540]">12 mo</div>
                <div className="mt-[2px] text-[11px] text-[#8898aa]">{co.thread.noChange}</div>
              </div>
              <div>
                <div className="text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{co.terms.points}</div>
                <div className="mt-[3px] text-[16px] font-[800] text-[#0a2540]">0.5</div>
                <div className="mt-[2px] text-[11px] text-[#dc2626]">{co.thread.reqLower}</div>
              </div>
            </div>
            <div className="rounded-[6px] border-l-[3px] border-[#635bff] bg-[#f6f9fc] p-[10px_12px] text-[12px] text-[#425466]">
              This is a strong deal with 69.7% LTV and a solid exit. Asking for 11% and half a point given the low risk.
            </div>
          </div>
        </div>

      </div>

      {/* Action panel */}
      <div className="rounded-[10px] border border-[#e6ebf1] bg-white p-[24px]">
        <div className="mb-[6px] text-[15px] font-[700] text-[#0a2540]">
          {co.actions.title} Memphis Realty LLC
        </div>
        <div className="mb-[20px] text-[13px] text-[#8898aa]">
          11% · 0.5 points · 12 {co.deal.months} · $115,000 — {co.actions.sub}
        </div>
        
        <div className="mb-[20px] flex flex-col gap-[12px] sm:flex-row">
          <button className="flex-1 cursor-pointer rounded-[6px] border-none bg-[#2e7d32] p-[13px] font-sans text-[14px] font-[700] text-white transition-opacity hover:opacity-90">
            {co.actions.accept}
          </button>
          <button 
            onClick={() => setIsCountering(!isCountering)}
            className="flex-1 cursor-pointer rounded-[6px] border-none bg-[#635bff] p-[13px] font-sans text-[14px] font-[700] text-white transition-opacity hover:opacity-90"
          >
            {co.actions.counter}
          </button>
          <button className="flex-1 cursor-pointer rounded-[6px] border-[2px] border-[#fecaca] bg-white p-[13px] font-sans text-[14px] font-[700] text-[#dc2626] transition-colors hover:bg-[#fef2f2]">
            {co.actions.decline}
          </button>
        </div>

        {isCountering && (
          <div className="animate-in slide-in-from-top-2 mt-[18px] border-t border-[#e6ebf1] pt-[18px]">
            <div className="mb-[12px] text-[12px] font-[700] uppercase tracking-[0.4px] text-[#0a2540]">
              {co.actions.formTitle}
            </div>
            <div className="mb-[14px] grid grid-cols-1 gap-[12px] sm:grid-cols-2">
              <div>
                <label className="mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
                  {co.terms.amount}
                </label>
                <input 
                  type="text" 
                  defaultValue="$115,000" 
                  className="w-full rounded-[6px] border border-[#e6ebf1] bg-white p-[9px_12px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]"
                />
              </div>
              <div>
                <label className="mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
                  {co.terms.rate} (%)
                </label>
                <input 
                  type="text" 
                  placeholder="ej. 11.5" 
                  className="w-full rounded-[6px] border border-[#e6ebf1] bg-white p-[9px_12px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]"
                />
              </div>
              <div>
                <label className="mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
                  {co.terms.term} ({co.deal.months})
                </label>
                <select className="w-full rounded-[6px] border border-[#e6ebf1] bg-white p-[9px_12px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]">
                  <option>6</option>
                  <option>9</option>
                  <option selected>12</option>
                  <option>18</option>
                </select>
              </div>
              <div>
                <label className="mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
                  {co.terms.points}
                </label>
                <input 
                  type="text" 
                  placeholder="ej. 0.75" 
                  className="w-full rounded-[6px] border border-[#e6ebf1] bg-white p-[9px_12px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-[5px] block text-[11px] font-[700] uppercase tracking-[0.4px] text-[#8898aa]">
                  {co.actions.noteLabel}
                </label>
                <textarea 
                  placeholder={co.actions.notePh}
                  className="h-[80px] w-full resize-none rounded-[6px] border border-[#e6ebf1] bg-white p-[10px_12px] font-sans text-[13px] text-[#0a2540] outline-none focus:border-[#635bff]"
                ></textarea>
              </div>
            </div>
            <button className="mt-[12px] w-full cursor-pointer rounded-[6px] border-none bg-[#635bff] p-[12px] font-sans text-[14px] font-[700] text-white transition-opacity hover:opacity-90">
              {co.actions.sendBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}