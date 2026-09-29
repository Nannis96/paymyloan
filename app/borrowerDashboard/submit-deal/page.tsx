"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

const LABEL = "mb-1.5 block text-[12px] font-semibold uppercase tracking-wider text-ink-2";
const INPUT = "w-full rounded-md border border-rule bg-surface-2 px-3 py-2.5 text-[14px] text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/10";
const PREFIX_INPUT = "w-full rounded-md border border-rule bg-surface-2 py-2.5 pl-7 pr-3 text-[14px] text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/10";
const HINT = "mt-1.5 text-[11px] text-ink-3";

export default function SubmitDealPage() {
  return (
    <SiteShell isDashboard={true}>
      <SubmitDealContent />
    </SiteShell>
  );
}

function SubmitDealContent() {
  const { t } = useSite();
  const sd = t.submitDeal;
  const router = useRouter();

  // Estados del formulario y calculadora
  const [step, setStep] = useState(2); // Inicia en 2 porque "Loan Type" ya está seleccionado en el flujo demo
  const [condition, setCondition] = useState(1);
  const [loanAmount, setLoanAmount] = useState("100000");
  const [rate, setRate] = useState("12");

  const totalSteps = 5;

  // Lógica de la calculadora en vivo
  const numericLoan = Number(loanAmount) || 0;
  const numericRate = Number(rate) || 0;
  const monthlyInterest = (numericLoan * (numericRate / 100)) / 12;
  const originationPoints = numericLoan * 0.01;
  const totalMonthly = monthlyInterest + 99 + 83.33; // Interés + Membresía + Servicing

  const formatCurrency = (val: number) =>
    val.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // POST al backend y redirección
      router.push("/borrower");
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-68px)] max-w-[800px] flex-col pb-24 pt-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-1.5 text-[22px] font-bold tracking-tight text-ink">{sd.title}</h1>
        <p className="text-[14px] text-ink-3">{sd.subtitle}</p>
      </div>

      {/* Steps Bar (Custom component for this specific flow) */}
      <div className="mb-10 flex items-center justify-between">
        {sd.steps.map((label, index) => {
          const sNum = index + 1;
          const isDone = sNum < step;
          const isActive = sNum === step;
          const isPending = sNum > step;

          return (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    isActive
                      ? "bg-accent text-white ring-4 ring-accent/15"
                      : isDone
                      ? "bg-accent text-white"
                      : "bg-surface-2 text-ink-3 border border-rule-strong"
                  }`}
                >
                  {isDone ? <Check size={14} strokeWidth={3} /> : sNum}
                </div>
                <span
                  className={`absolute mt-9 hidden text-[11px] font-semibold sm:block ${
                    isActive ? "text-ink" : isDone ? "text-accent" : "text-ink-3"
                  }`}
                >
                  {label}
                </span>
              </div>
              {/* Línea conectora */}
              {sNum < totalSteps && (
                <div className={`mx-2 h-[2px] flex-1 rounded-full sm:mx-4 ${isDone ? "bg-accent" : "bg-rule"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Info Badge (Loan Type Selected) */}
      <div className="mb-6 inline-flex items-center gap-2 self-start rounded-md border border-accent/20 bg-accent-soft px-3 py-2 text-[12px] font-medium text-accent">
        <Check size={14} />
        {sd.loanTypeBadge}
        <button className="ml-2 font-semibold underline hover:text-ink">{sd.actions.change}</button>
      </div>

      {/* PROPERTY CARD */}
      <div className="mb-6 rounded-xl border border-rule bg-surface p-7 shadow-sm">
        <div className="mb-1 text-[15px] font-bold text-ink">{sd.property.title}</div>
        <div className="mb-6 text-[13px] text-ink-3">{sd.property.sub}</div>

        <div className="mb-4">
          <label className={LABEL}>{sd.property.address}</label>
          <input type="text" placeholder={sd.property.addressPh} className={INPUT} />
          <div className={HINT}>{sd.property.addressHint}</div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <label className={LABEL}>{sd.property.city}</label>
            <input type="text" placeholder="Memphis" className={INPUT} />
          </div>
          <div className="col-span-1">
            <label className={LABEL}>{sd.property.state}</label>
            <select className={`${INPUT} appearance-none cursor-pointer`}>
              <option>TN</option><option>MS</option><option>AR</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className={LABEL}>{sd.property.zip}</label>
            <input type="text" placeholder="38127" className={INPUT} />
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>{sd.property.propType}</label>
            <select className={`${INPUT} appearance-none cursor-pointer`}>
              <option>Single family</option>
              <option>Multi-family (2-4 units)</option>
              <option>Commercial</option>
            </select>
          </div>
          <div>
            <label className={LABEL}>{sd.property.occupancy}</label>
            <select className={`${INPUT} appearance-none cursor-pointer`}>
              <option>Vacant</option>
              <option>Owner occupied</option>
              <option>Tenant occupied</option>
            </select>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-4">
          <div><label className={LABEL}>{sd.property.beds}</label><input type="number" placeholder="3" className={INPUT} /></div>
          <div><label className={LABEL}>{sd.property.baths}</label><input type="number" placeholder="2" className={INPUT} /></div>
          <div><label className={LABEL}>{sd.property.sqft}</label><input type="number" placeholder="1,400" className={INPUT} /></div>
        </div>

        <div className="mb-4">
          <label className={LABEL}>{sd.property.condition}</label>
          <div className="flex gap-2">
            {sd.property.conditions.map((cond, i) => (
              <button
                key={cond}
                onClick={() => setCondition(i)}
                className={`flex-1 rounded-md border py-2.5 text-[13px] font-medium transition-colors ${
                  condition === i ? "border-accent bg-accent-soft text-accent font-semibold" : "border-rule bg-surface text-ink-2 hover:border-ink-3"
                }`}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={LABEL}>{sd.property.desc}</label>
          <textarea placeholder={sd.property.descPh} className={`${INPUT} min-h-[80px] resize-y`} />
        </div>
      </div>

      {/* FINANCIALS CARD */}
      <div className="mb-6 rounded-xl border border-rule bg-surface p-7 shadow-sm">
        <div className="mb-1 text-[15px] font-bold text-ink">{sd.financials.title}</div>
        <div className="mb-6 text-[13px] text-ink-3">{sd.financials.sub}</div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>{sd.financials.purchasePrice}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-3">$</span>
              <input type="number" placeholder="120,000" className={PREFIX_INPUT} />
            </div>
          </div>
          <div>
            <label className={LABEL}>{sd.financials.loanAmount}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-3">$</span>
              <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="100,000" className={PREFIX_INPUT} />
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>{sd.financials.arv}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-3">$</span>
              <input type="number" placeholder="185,000" className={PREFIX_INPUT} />
            </div>
          </div>
          <div>
            <label className={LABEL}>{sd.financials.rehab}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-3">$</span>
              <input type="number" placeholder="25,000" className={PREFIX_INPUT} />
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>{sd.financials.desiredTerm}</label>
            <select className={`${INPUT} appearance-none cursor-pointer`}>
              <option>6 months</option>
              <option>9 months</option>
              <option>12 months</option>
            </select>
          </div>
          <div>
            <label className={LABEL}>{sd.financials.maxRate}</label>
            <select value={rate} onChange={(e) => setRate(e.target.value.replace('%', ''))} className={`${INPUT} appearance-none cursor-pointer`}>
              {sd.financials.maxRateOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {/* Live Calculator Box */}
        <div className="rounded-lg border border-rule-strong bg-surface-2 p-5">
          <div className="mb-3 text-[12px] font-bold uppercase tracking-widest text-ink-2">
            {sd.financials.calcTitle}
          </div>
          <div className="flex flex-col gap-2.5 text-[13px]">
            <div className="flex justify-between"><span className="text-ink-3">{sd.financials.calcInterest} ({rate}% on ${Number(loanAmount).toLocaleString()})</span><span className="font-semibold text-ink">{formatCurrency(monthlyInterest)} {sd.financials.mo}</span></div>
            <div className="flex justify-between"><span className="text-ink-3">{sd.financials.calcMembership}</span><span className="font-semibold text-ink">{formatCurrency(99.00)} {sd.financials.mo}</span></div>
            <div className="flex justify-between"><span className="text-ink-3">{sd.financials.calcServicing}</span><span className="font-semibold text-ink">{formatCurrency(83.33)} {sd.financials.mo}</span></div>
            <div className="flex justify-between"><span className="text-ink-3">{sd.financials.calcOrigination}</span><span className="font-semibold text-ink">{formatCurrency(originationPoints)} {sd.financials.oneTime}</span></div>
            
            <div className="mt-2 flex justify-between border-t border-rule pt-3">
              <span className="font-bold text-ink">{sd.financials.calcTotal}</span>
              <span className="text-[15px] font-bold text-accent">{formatCurrency(totalMonthly)} {sd.financials.mo}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between border-t border-rule bg-surface px-6 py-3.5 shadow-[0_-4px_24px_rgba(0,0,0,0.04)] md:px-12">
        <button
          onClick={handlePrev}
          className={`rounded-md border border-rule-strong bg-surface px-4 py-2.5 text-[13px] font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink ${step === 1 ? 'invisible' : ''}`}
        >
          {sd.actions.back}
        </button>
        
        <span className="text-[12px] text-ink-3">
          {sd.stepHint.replace('{current}', step.toString()).replace('{total}', totalSteps.toString()).replace('{stepName}', sd.steps[step - 1])}
        </span>
        
        <button
          onClick={handleNext}
          className="rounded-md bg-accent px-6 py-2.5 text-[13px] font-bold text-white transition-opacity hover:bg-blue-700"
        >
          {step === totalSteps ? sd.actions.submit : sd.actions.continue}
        </button>
      </div>

    </div>
  );
}