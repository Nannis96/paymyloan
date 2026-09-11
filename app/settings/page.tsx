"use client";

import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <SiteShell isDashboard={true}>
      <SettingsContent />
    </SiteShell>
  );
}

function SettingsContent() {
  const { t } = useSite();
  const s = t.settings;

  // TODO: MOCK TEMPORAL. 
  // En produccion, este estado se definira por la sesion del usuario activo.
  const [activeTab, setActiveTab] = useState<"lender" | "borrower">("lender");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const LABEL = "mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3";
  const INPUT = "w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 outline-none transition-colors focus:border-accent";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    // TODO: BACKEND - Enviar payload a la API para actualizar el perfil del usuario.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[700px]">
        <header className="mb-10">
          <h1 className="text-[32px] font-black tracking-tight text-ink">{s.title}</h1>
          <p className="text-ink-2">{s.subtitle}</p>
        </header>

        {/* TABS DE SIMULACION (Para revisar ambos perfiles) */}
        <div className="mb-8 flex border-b border-rule">
          <button
            className={`px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === "lender"
                ? "border-b-2 border-accent text-accent"
                : "text-ink-3 hover:text-ink"
            }`}
            onClick={() => setActiveTab("lender")}
          >
            {s.tabs.lender}
          </button>
          <button
            className={`px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
              activeTab === "borrower"
                ? "border-b-2 border-accent text-accent"
                : "text-ink-3 hover:text-ink"
            }`}
            onClick={() => setActiveTab("borrower")}
          >
            {s.tabs.borrower}
          </button>
        </div>

        <form onSubmit={handleSave} className="rounded-2xl border border-rule bg-surface p-6 shadow-xl sm:p-10">
          
          {/* SECCION PRESTAMISTA */}
          {activeTab === "lender" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div>
                <label className={LABEL}>{s.lender.entities}</label>
                <input type="text" placeholder={s.lender.entitiesPh} className={INPUT} />
              </div>
              <div>
                <label className={LABEL}>{s.lender.geography}</label>
                <input type="text" placeholder={s.lender.geographyPh} className={INPUT} />
              </div>
              <div>
                <label className={LABEL}>{s.lender.availableCapital}</label>
                <input type="number" min="0" placeholder={s.lender.availableCapitalPh} className={INPUT} />
              </div>
              <div>
                <label className={LABEL}>{s.lender.loanTypes}</label>
                <select className={`${INPUT} cursor-pointer appearance-none`}>
                  <option value="io_short">{t.loanTypes.interestOnlyShort}</option>
                  <option value="io_long">{t.loanTypes.interestOnlyLong}</option>
                  <option value="amortized">{t.loanTypes.fullyAmortized}</option>
                  <option value="construction">{t.loanTypes.constructionDraw}</option>
                </select>
              </div>

              <div className="border-t border-rule pt-6 mt-2">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">{s.lender.achTitle}</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className={LABEL}>{s.lender.routingNum}</label>
                    <input type="text" className={INPUT} />
                  </div>
                  <div>
                    <label className={LABEL}>{s.lender.accountNum}</label>
                    <input type="password" placeholder="••••••••" className={INPUT} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCION PRESTATARIO */}
          {activeTab === "borrower" && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="border-b border-rule pb-6">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">{s.borrower.attorneyTitle}</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className={LABEL}>{s.borrower.attorneyName}</label>
                    <input type="text" className={INPUT} />
                  </div>
                  <div>
                    <label className={LABEL}>{s.borrower.attorneyEmail}</label>
                    <input type="email" className={INPUT} />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">{s.borrower.insuranceTitle}</h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className={LABEL}>{s.borrower.insuranceName}</label>
                    <input type="text" className={INPUT} />
                  </div>
                  <div>
                    <label className={LABEL}>{s.borrower.insuranceEmail}</label>
                    <input type="email" className={INPUT} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {isSuccess && (
            <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-bold text-green-700 border border-green-200 dark:border-green-900/40 dark:bg-green-900/10 dark:text-green-400">
              <CheckCircle2 size={18} />
              {s.success}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-lg bg-accent px-5 py-3.5 text-[15px] font-bold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? s.saving : s.saveBtn}
          </button>
        </form>
      </div>
    </div>
  );
}