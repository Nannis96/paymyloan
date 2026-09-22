"use client";

import { useState } from "react";
import { X, ShieldCheck, Landmark, CheckCircle2 } from "lucide-react";
import { useSite } from "@/app/components/layout/SiteShell";

export default function AddBankModal({ onClose }: { onClose: () => void }) {
  const { t } = useSite();
  const b = t.bankModal;

  const [tab, setTab] = useState<"instant" | "manual">("instant");
  const [isSuccess, setIsSuccess] = useState(false);

  // Estilos base para inputs
  const LABEL = "mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-ink-3";
  const INPUT = "w-full rounded-lg border border-rule bg-bg px-3.5 py-2.5 text-[13px] text-ink placeholder:text-ink-3 outline-none transition-colors focus:border-accent";

  const handleSimulateSubmit = () => {
    // POST /api/borrowers/me/banks (Futuro backend)
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-2xl border border-rule bg-surface shadow-2xl animate-in zoom-in-95 duration-200">
        
        {!isSuccess && (
          <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-crit hover:text-white">
            <X size={16} />
          </button>
        )}

        {isSuccess ? (
          <div className="p-10 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" />
            <h3 className="mb-2 text-[20px] font-black text-ink">{b.success.title}</h3>
            <p className="mb-6 text-[13px] leading-relaxed text-ink-2">{b.success.desc}</p>
            
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-rule bg-bg p-4 text-left">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-ink">
                <Landmark size={18} />
              </div>
              <div>
                <div className="text-[13px] font-bold text-ink">First Tennessee Bank</div>
                <div className="text-[11px] text-ink-3">Checking ••••4821</div>
              </div>
            </div>

            <button onClick={onClose} className="w-full rounded-xl bg-accent px-4 py-3.5 text-[14px] font-black text-accent-ink transition-opacity hover:opacity-90">
              {b.success.doneBtn}
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-rule bg-bg p-6">
              <h2 className="mb-1 text-[18px] font-black text-ink">{b.title}</h2>
              <p className="text-[12px] leading-relaxed text-ink-3">{b.subtitle}</p>
            </div>

            <div className="mx-6 mt-4 flex items-start gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-[11px] text-green-500">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              {b.securityNote}
            </div>

            <div className="mx-6 mt-4 flex border-b border-rule">
              <button
                onClick={() => setTab("instant")}
                className={`flex-1 border-b-2 py-3 text-center text-[12px] font-bold transition-colors ${tab === "instant" ? "border-accent text-ink" : "border-transparent text-ink-3 hover:text-ink-2"}`}
              >
                {b.tabs.instant}
              </button>
              <button
                onClick={() => setTab("manual")}
                className={`flex-1 border-b-2 py-3 text-center text-[12px] font-bold transition-colors ${tab === "manual" ? "border-accent text-ink" : "border-transparent text-ink-3 hover:text-ink-2"}`}
              >
                {b.tabs.manual}
              </button>
            </div>

            <div className="p-6">
              {tab === "instant" && (
                <div className="animate-in fade-in">
                  <p className="mb-5 text-[13px] leading-relaxed text-ink-2">{b.instant.desc}</p>
                  <button onClick={handleSimulateSubmit} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00c244] px-4 py-3.5 text-[14px] font-black text-white transition-opacity hover:opacity-90">
                    <Landmark size={18} /> {b.instant.plaidBtn}
                  </button>
                  <div className="my-4 text-center text-[11px] text-ink-3">{b.instant.orManual}</div>
                  <button onClick={() => setTab("manual")} className="w-full rounded-xl border border-rule bg-surface-2 px-4 py-3 text-[13px] font-bold text-ink-2 transition-colors hover:text-ink">
                    {b.instant.manualBtn}
                  </button>
                </div>
              )}

              {tab === "manual" && (
                <div className="animate-in fade-in flex flex-col gap-4">
                  <div>
                    <label className={LABEL}>{b.manual.holder}</label>
                    <input type="text" placeholder="John Doe" className={INPUT} />
                  </div>
                  <div>
                    <label className={LABEL}>{b.manual.bankName}</label>
                    <input type="text" placeholder="First Tennessee Bank" className={INPUT} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LABEL}>{b.manual.routing}</label>
                      <input type="text" maxLength={9} placeholder="9 digits" className={INPUT} />
                    </div>
                    <div>
                      <label className={LABEL}>{b.manual.account}</label>
                      <input type="text" placeholder="Account number" className={INPUT} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={LABEL}>{b.manual.confirmAccount}</label>
                      <input type="text" placeholder="Re-enter number" className={INPUT} />
                    </div>
                    <div>
                      <label className={LABEL}>{b.manual.type}</label>
                      <select className={INPUT}>
                        {b.manual.types.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  
                  <p className="mt-2 text-[11px] leading-relaxed text-ink-3">
                    {b.manual.microNote}
                  </p>
                  
                  <button onClick={handleSimulateSubmit} className="mt-2 w-full rounded-xl bg-accent px-4 py-3.5 text-[14px] font-black text-accent-ink transition-opacity hover:opacity-90">
                    {b.manual.submitBtn}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}