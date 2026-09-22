"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { ProgressBar, StepsNav, StatusPill } from "@/app/components/ui";

const LABEL = "mb-1.5 block text-[12px] font-semibold text-ink-2";
const INPUT = "w-full rounded-md border border-rule bg-surface-2 px-3 py-2 text-[14px] text-ink outline-none transition-colors focus:border-accent";
const HINT = "mt-1.5 text-[11px] text-ink-3";
const CHECKBOX_LABEL = "text-[13px] font-medium text-ink";

export default function LenderVerifyPage() {
  return (
    <SiteShell isMinimal={true}>
      <LenderVerifyContent />
    </SiteShell>
  );
}

function LenderVerifyContent() {
  const { t } = useSite();
  const lv = t.lenderVerify;
  const router = useRouter();

  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  // Estados simulados para la vista de "Review"
  const [prefs, setPrefs] = useState({ min: "50,000", max: "500,000", range: "$250K - $500K" });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // POST al backend (ej. /api/lenders/me/criteria)
      router.push("/lender");
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      {/* Top Navbar */}
      <nav className="flex h-[52px] shrink-0 items-center justify-between border-b border-rule bg-surface px-8">
        <Link href="/" className="font-serif text-[16px] font-extrabold tracking-tight text-accent no-underline">
          PayMy<span className="text-ink">Loan</span>.ai
        </Link>
        <button
          onClick={() => router.push("/marketplace")}
          className="text-xs font-medium text-ink-3 transition-colors hover:text-accent hover:underline"
        >
          {lv.topSkip}
        </button>
      </nav>

      <ProgressBar progress={progress} />

      {/* Main Container */}
      <main className="flex flex-1 items-start justify-center p-6 sm:p-12">
        <div className="w-full max-w-[560px] overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
          
          {/* Header */}
          <div className="p-7 pb-0 sm:p-8 sm:pb-0">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold text-accent">
              <span className="flex h-2 w-2 rounded-full bg-accent" />
              {lv.badge}
            </div>
            <h1 className="mb-1.5 text-[20px] font-black tracking-tight text-ink">
              {lv.stepTitles[step - 1]}
            </h1>
            <p className="mb-6 text-[13px] leading-relaxed text-ink-3">
              {lv.stepSubs[step - 1]}
            </p>

            <StepsNav steps={lv.steps} currentStep={step} />
          </div>

          {/* Form Body Panels */}
          <div className="p-7 sm:p-8">
            
            {/* PANEL 1: Preferences */}
            {step === 1 && (
              <div className="flex animate-in fade-in flex-col gap-5 duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>{lv.form.minLoan}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-3">$</span>
                      <input type="text" placeholder="50,000" defaultValue={prefs.min} className={`${INPUT} pl-7`} />
                    </div>
                  </div>
                  <div>
                    <label className={LABEL}>{lv.form.maxLoan}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-3">$</span>
                      <input type="text" placeholder="500,000" defaultValue={prefs.max} className={`${INPUT} pl-7`} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={LABEL}>{lv.form.fundsAvailable}</label>
                  <select className={`${INPUT} appearance-none cursor-pointer`}>
                    <option value="">{lv.form.selectRange}</option>
                    {lv.form.fundsOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={LABEL}>{lv.form.prefTerms}</label>
                  <div className="flex flex-col gap-2.5 mt-1">
                    {["6 months", "9 months", "12 months"].map((term) => (
                      <label key={term} className="flex cursor-pointer items-center gap-2.5 rounded-md border border-rule px-3 py-2.5 transition-colors hover:border-accent">
                        <input type="checkbox" className="h-3.5 w-3.5 accent-accent" />
                        <span className={CHECKBOX_LABEL}>{term}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 2: Criteria */}
            {step === 2 && (
              <div className="flex animate-in fade-in flex-col gap-5 duration-300">
                <div>
                  <label className={LABEL}>{lv.form.maxLtv}</label>
                  <select className={`${INPUT} appearance-none cursor-pointer`}>
                    <option value="">{lv.form.selectLtv}</option>
                    <option>60% LTV</option>
                    <option>65% LTV</option>
                    <option>70% LTV</option>
                    <option>75% LTV</option>
                    <option>80% LTV</option>
                  </select>
                  <div className={HINT}>{lv.form.ltvHint}</div>
                </div>

                <div>
                  <label className={LABEL}>{lv.form.geoPref}</label>
                  <input type="text" placeholder={lv.form.geoPrefPh} className={INPUT} />
                  <div className={HINT}>{lv.form.geoHint}</div>
                </div>

                <div>
                  <label className={LABEL}>{lv.form.propTypes}</label>
                  <div className="flex flex-col gap-2.5 mt-1">
                    {lv.form.propOptions.map((prop) => (
                      <label key={prop} className="flex cursor-pointer items-center gap-2.5 rounded-md border border-rule px-3 py-2.5 transition-colors hover:border-accent">
                        <input type="checkbox" className="h-3.5 w-3.5 accent-accent" />
                        <span className={CHECKBOX_LABEL}>{prop}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 3: Experience */}
            {step === 3 && (
              <div className="flex animate-in fade-in flex-col gap-5 duration-300">
                <div>
                  <label className={LABEL}>{lv.form.loansFunded}</label>
                  <select className={`${INPUT} appearance-none cursor-pointer`}>
                    <option value="">{lv.form.selectExp}</option>
                    {lv.form.loansOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={LABEL}>{lv.form.fundSource}</label>
                  <select className={`${INPUT} appearance-none cursor-pointer`}>
                    <option value="">{lv.form.selectSource}</option>
                    {lv.form.sourceOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={LABEL}>{lv.form.entityType}</label>
                  <select className={`${INPUT} appearance-none cursor-pointer`}>
                    <option value="">{lv.form.selectEntity}</option>
                    {lv.form.entityOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className={HINT}>{lv.form.entityHint}</div>
                </div>
              </div>
            )}

            {/* PANEL 4: Review */}
            {step === 4 && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-4 text-[13px] leading-relaxed text-ink-2">
                  {lv.review.alert}
                </div>

                {/* Review Blocks (Mocked for UI) */}
                <div className="mb-3 rounded-lg border border-rule bg-surface-2 p-4">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-ink-3">
                    {lv.steps[0]}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <ReviewItem label={lv.form.fundsAvailable} value="$250K - $500K" />
                    <ReviewItem label="Terms" value="6, 9, 12 months" />
                  </div>
                </div>

                <div className="mb-3 rounded-lg border border-rule bg-surface-2 p-4">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-ink-3">
                    {lv.steps[1]}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <ReviewItem label={lv.form.maxLtv} value="70%" />
                    <ReviewItem label={lv.form.geoPref} value="TN, MS, AR" />
                  </div>
                </div>

                <div className="mb-4 rounded-lg border border-rule bg-surface-2 p-4">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-ink-3">
                    {lv.steps[2]}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <ReviewItem label={lv.form.loansFunded} value="4 - 10 loans" />
                    <ReviewItem label="Entity" value="LLC" />
                  </div>
                </div>

                {/* Badge Preview */}
                <div className="mt-5 flex items-center gap-3 rounded-lg border border-accent/30 bg-accent-soft p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-accent">{lv.review.badgeTitle}</div>
                    <div className="mt-0.5 text-[11px] leading-relaxed text-ink-2">{lv.review.badgeDesc}</div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between border-t border-rule bg-bg p-5 sm:px-8">
            <button
              onClick={handlePrev}
              className={`rounded-md border border-rule-strong bg-surface px-4 py-2 text-xs font-semibold text-ink-2 transition-colors hover:border-ink-3 hover:text-ink ${
                step === 1 ? "invisible" : ""
              }`}
            >
              {lv.actions.back}
            </button>

            <span className="text-[12px] font-medium text-ink-3">
              {step} / {totalSteps}
            </span>

            <button
              onClick={handleNext}
              className="rounded-md bg-accent px-5 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              {step === totalSteps ? lv.actions.submit : lv.actions.continue}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

// Mini helper component for the review grid
function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] text-ink-3">{label}</div>
      <div className="mt-0.5 text-[13px] font-semibold text-ink">{value}</div>
    </div>
  );
}