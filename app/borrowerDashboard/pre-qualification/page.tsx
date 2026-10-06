"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

function PreQualificationContent() {
  const { t, lang } = useSite();
  const pq = t.preQualification;
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [exitStrategy, setExitStrategy] = useState(0);

  const [purchasePrice, setPurchasePrice] = useState("");
  const [arv, setArv] = useState("");
  const [rehab, setRehab] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [condition, setCondition] = useState("");

  const [experience, setExperience] = useState("");
  const [credit, setCredit] = useState("");
  const [entity, setEntity] = useState("");
  const [bankruptcy, setBankruptcy] = useState("");

  const nextStep = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        // Mock de conexión a tu API (ej. POST /api/borrowers/me/loan-requests u otra ruta)
        await new Promise((resolve) => setTimeout(resolve, 800));
        alert("Pre-qualification submitted successfully!");
        router.push("/borrowerDashboard");
      } catch (e) {
        console.error(e);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const progressPercentage = step * 25;

  return (
    <div className="flex flex-col min-h-[calc(100vh-68px)] -mx-[32px] -my-[28px] bg-[#f6f9fc] font-sans">
      
      {/* Progress bar */}
      <div className="h-[3px] bg-[#e6ebf1] shrink-0">
        <div 
          className="h-full bg-[#635bff] transition-all duration-300 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="flex-1 flex items-start justify-center p-[48px_24px]">
        <div className="bg-white border border-[#e6ebf1] rounded-[10px] w-full max-w-[560px] overflow-hidden shadow-sm">
          
          <div className="p-[28px_32px_0]">
            <div className="inline-flex items-center gap-[6px] bg-[#f0efff] rounded-[20px] p-[4px_12px] text-[11px] font-[700] text-[#635bff] mb-[12px]">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="5" fill="#635bff"/>
                <path d="M3 5l1.5 1.5L7 3.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {pq.badge}
            </div>
            <div className="text-[20px] font-[800] text-[#0a2540] tracking-[-0.3px] mb-[6px]">
              {pq.titles[step - 1]}
            </div>
            <div className="text-[13px] text-[#8898aa] leading-[1.5] mb-[24px]">
              {pq.subs[step - 1]}
            </div>

            <div className="flex border-b border-[#e6ebf1]">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`flex-1 p-[11px_0] text-center text-[11px] font-[600] border-b-2 transition-colors ${step === i ? "text-[#635bff] border-[#635bff]" : step > i ? "text-[#0a2540] border-transparent" : "text-[#aab7c4] border-transparent"}`}
                >
                  {pq.steps[i - 1]}
                </div>
              ))}
            </div>
          </div>

          <div className="p-[24px_32px]">
            
            {/* STEP 1: Deal Info */}
            {step === 1 && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-[16px]">
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step1.address}</label>
                  <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={pq.step1.addressPh} 
                    className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" 
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[16px]">
                  <div>
                    <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step1.amount}</label>
                    <div className="relative">
                      <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#8898aa] pointer-events-none">$</span>
                      <input 
                        type="text" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="150,000" 
                        className="w-full p-[9px_12px] pl-[22px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step1.term}</label>
                    <select 
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff] appearance-none cursor-pointer"
                    >
                      <option value="">{pq.step1.termSelect}</option>
                      <option>6 {t.marketplace.dealDetails.months}</option>
                      <option>9 {t.marketplace.dealDetails.months}</option>
                      <option>12 {t.marketplace.dealDetails.months}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step1.exit}</label>
                  <div className="flex flex-col gap-[8px] mt-[4px]">
                    {pq.step1.exits.map((exitOpt: any, i: number) => (
                      <label 
                        key={i} 
                        onClick={() => setExitStrategy(i)}
                        className={`flex items-center gap-[10px] p-[10px_12px] border rounded-[6px] cursor-pointer transition-colors ${exitStrategy === i ? "border-[#635bff] bg-[#f0efff]" : "border-[#e6ebf1] hover:border-[#635bff]"}`}
                      >
                        <input 
                          type="radio" 
                          checked={exitStrategy === i}
                          readOnly
                          className="w-[14px] h-[14px] accent-[#635bff] shrink-0" 
                        />
                        <div>
                          <div className="text-[13px] font-[500] text-[#0a2540]">{exitOpt.title}</div>
                          <div className="text-[11px] text-[#8898aa] mt-[1px]">{exitOpt.sub}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Financials */}
            {step === 2 && (
              <div className="animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[16px]">
                  <div>
                    <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step2.purchasePrice}</label>
                    <div className="relative">
                      <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#8898aa] pointer-events-none">$</span>
                      <input 
                        type="text" 
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                        placeholder="120,000" 
                        className="w-full p-[9px_12px] pl-[22px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step2.arv}</label>
                    <div className="relative">
                      <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#8898aa] pointer-events-none">$</span>
                      <input 
                        type="text" 
                        value={arv}
                        onChange={(e) => setArv(e.target.value)}
                        placeholder="200,000" 
                        className="w-full p-[9px_12px] pl-[22px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" 
                      />
                    </div>
                    <div className="text-[11px] text-[#aab7c4] mt-[4px]">{pq.step2.arvHint}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[16px]">
                  <div>
                    <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step2.rehab}</label>
                    <div className="relative">
                      <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#8898aa] pointer-events-none">$</span>
                      <input 
                        type="text" 
                        value={rehab}
                        onChange={(e) => setRehab(e.target.value)}
                        placeholder="30,000" 
                        className="w-full p-[9px_12px] pl-[22px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step2.downPayment}</label>
                    <div className="relative">
                      <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#8898aa] pointer-events-none">$</span>
                      <input 
                        type="text" 
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        placeholder="15,000" 
                        className="w-full p-[9px_12px] pl-[22px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff]" 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step2.condition}</label>
                  <select 
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff] appearance-none cursor-pointer"
                  >
                    <option value="">{pq.step2.conditionSelect}</option>
                    {pq.step2.conditions.map((c: string, idx: number) => (
                      <option key={idx} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3: Background */}
            {step === 3 && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-[16px]">
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step3.experience}</label>
                  <select 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff] appearance-none cursor-pointer"
                  >
                    <option value="">{pq.step3.expSelect}</option>
                    {pq.step3.exps.map((opt: string, idx: number) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-[16px]">
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step3.credit}</label>
                  <select 
                    value={credit}
                    onChange={(e) => setCredit(e.target.value)}
                    className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff] appearance-none cursor-pointer"
                  >
                    <option value="">{pq.step3.creditSelect}</option>
                    {pq.step3.credits.map((opt: string, idx: number) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <div className="text-[11px] text-[#aab7c4] mt-[4px]">{pq.step3.creditHint}</div>
                </div>
                <div className="mb-[16px]">
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step3.entity}</label>
                  <select 
                    value={entity}
                    onChange={(e) => setEntity(e.target.value)}
                    className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff] appearance-none cursor-pointer"
                  >
                    <option value="">{pq.step3.entitySelect}</option>
                    {pq.step3.entities.map((opt: string, idx: number) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-[600] text-[#425466] mb-[6px]">{pq.step3.bankruptcy}</label>
                  <select 
                    value={bankruptcy}
                    onChange={(e) => setBankruptcy(e.target.value)}
                    className="w-full p-[9px_12px] border border-[#e6ebf1] rounded-[6px] text-[14px] text-[#0a2540] outline-none focus:border-[#635bff] appearance-none cursor-pointer"
                  >
                    <option value="">{pq.step3.bankSelect}</option>
                    {pq.step3.bankruptcies.map((opt: string, idx: number) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* STEP 4: Review */}
            {step === 4 && (
              <div className="animate-in fade-in duration-300">
                <div className="text-[13px] text-[#425466] mb-[18px] leading-[1.6]">
                  {pq.step4.desc}
                </div>

                <div className="bg-[#f6f9fc] border border-[#e6ebf1] rounded-[8px] p-[16px_18px] mb-[12px]">
                  <div className="text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4] mb-[10px]">{pq.step4.blocks[0]}</div>
                  <div className="grid grid-cols-2 gap-[10px]">
                    <div><div className="text-[11px] text-[#8898aa]">{pq.step1.address}</div><div className="text-[13px] font-[600] text-[#0a2540] mt-[1px]">{address || "N/D"}</div></div>
                    <div><div className="text-[11px] text-[#8898aa]">{pq.step1.amount}</div><div className="text-[13px] font-[600] text-[#0a2540] mt-[1px]">{amount ? `$${amount}` : "N/D"}</div></div>
                    <div><div className="text-[11px] text-[#8898aa]">{pq.step1.term}</div><div className="text-[13px] font-[600] text-[#0a2540] mt-[1px]">{term || "N/D"}</div></div>
                    <div><div className="text-[11px] text-[#8898aa]">{pq.step1.exit}</div><div className="text-[13px] font-[600] text-[#0a2540] mt-[1px]">{pq.step1.exits[exitStrategy]?.title || "N/D"}</div></div>
                  </div>
                </div>

                <div className="bg-[#f6f9fc] border border-[#e6ebf1] rounded-[8px] p-[16px_18px] mb-[12px]">
                  <div className="text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4] mb-[10px]">{pq.step4.blocks[1]}</div>
                  <div className="grid grid-cols-2 gap-[10px]">
                    <div><div className="text-[11px] text-[#8898aa]">{pq.step2.purchasePrice}</div><div className="text-[13px] font-[600] text-[#0a2540] mt-[1px]">{purchasePrice ? `$${purchasePrice}` : "N/D"}</div></div>
                    <div><div className="text-[11px] text-[#8898aa]">ARV</div><div className="text-[13px] font-[600] text-[#0a2540] mt-[1px]">{arv ? `$${arv}` : "N/D"}</div></div>
                    <div><div className="text-[11px] text-[#8898aa]">{pq.step2.rehab}</div><div className="text-[13px] font-[600] text-[#0a2540] mt-[1px]">{rehab ? `$${rehab}` : "N/D"}</div></div>
                    <div><div className="text-[11px] text-[#8898aa]">{pq.step2.downPayment}</div><div className="text-[13px] font-[600] text-[#0a2540] mt-[1px]">{downPayment ? `$${downPayment}` : "N/D"}</div></div>
                  </div>
                </div>

                <div className="bg-[#f6f9fc] border border-[#e6ebf1] rounded-[8px] p-[16px_18px] mb-[12px]">
                  <div className="text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4] mb-[10px]">{pq.step4.blocks[2]}</div>
                  <div className="grid grid-cols-2 gap-[10px]">
                    <div><div className="text-[11px] text-[#8898aa]">{pq.step3.experience}</div><div className="text-[13px] font-[600] text-[#0a2540] mt-[1px]">{experience || "N/D"}</div></div>
                    <div><div className="text-[11px] text-[#8898aa]">{pq.step3.credit}</div><div className="text-[13px] font-[600] text-[#0a2540] mt-[1px]">{credit || "N/D"}</div></div>
                    <div><div className="text-[11px] text-[#8898aa]">{pq.step3.entity}</div><div className="text-[13px] font-[600] text-[#0a2540] mt-[1px]">{entity || "N/D"}</div></div>
                    <div><div className="text-[11px] text-[#8898aa]">{pq.step3.bankruptcy}</div><div className="text-[13px] font-[600] text-[#0a2540] mt-[1px]">{bankruptcy || "N/D"}</div></div>
                  </div>
                </div>

                <div className="flex items-center gap-[8px] bg-[#f0efff] border border-[#c7c4ff] rounded-[8px] p-[12px_16px] mt-[16px]">
                  <div className="w-[32px] h-[32px] bg-[#635bff] rounded-full flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 16 16" className="w-[16px] h-[16px] fill-white">
                      <path d="M8 1L9.8 5.8L15 6.3L11.2 9.7L12.4 15L8 12.3L3.6 15L4.8 9.7L1 6.3L6.2 5.8Z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[12px] font-[700] text-[#635bff]">{pq.step4.badgeTitle}</div>
                    <div className="text-[11px] text-[#8898aa] mt-[1px]">{pq.step4.badgeSub}</div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer Navigation */}
          <div className="p-[20px_32px] border-t border-[#e6ebf1] bg-[#fafbfc] flex justify-between items-center">
            <button 
              onClick={prevStep} 
              className={`p-[9px_18px] bg-white border border-[#e6ebf1] rounded-[6px] text-[13px] font-[600] text-[#425466] transition-colors hover:border-[#aab7c4] ${step === 1 ? 'invisible' : 'visible'}`}
            >
              {pq.buttons.back}
            </button>
            <span className="text-[12px] text-[#aab7c4]">
              {step} {lang === "es" ? "de" : "of"} 4
            </span>
            <button 
              onClick={nextStep} 
              disabled={isSubmitting}
              className="p-[9px_24px] bg-[#635bff] text-white border-none rounded-[6px] text-[13px] font-[700] cursor-pointer transition-colors hover:bg-[#524ddb] disabled:opacity-50"
            >
              {isSubmitting ? pq.buttons.submitting : (step === 4 ? pq.buttons.submit : pq.buttons.next)}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function PreQualificationPage() {
  return (
    <SiteShell isDashboard={true}>
      <Suspense fallback={<div className="p-8 text-[#8898aa]">Cargando vista...</div>}>
        <PreQualificationContent />
      </Suspense>
    </SiteShell>
  );
}