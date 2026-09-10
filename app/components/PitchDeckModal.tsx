"use client";

import { useState } from "react";
import { X, UploadCloud, CheckCircle2, Home, DollarSign } from "lucide-react";
import { useSite } from "./layout/SiteShell";

const LABEL = "mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3";
const INPUT = "w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 outline-none transition-colors focus:border-accent";

interface PitchDeckModalProps {
  onClose: () => void;
}

export default function PitchDeckModal({ onClose }: PitchDeckModalProps) {
  const { t } = useSite();
  const p = t.pitchDeckModal;

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [purchasePrice, setPurchasePrice] = useState("");
  const [rehabAmount, setRehabAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyType, setPropertyType] = useState("residential");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: BACKEND - Llamada API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  // TODO: MOCK TEMPORAL
  const mockRentComps = [
    { address: "125 Main St", rent: "$2,100", distance: "0.2 mi" },
    { address: "40 Oak Ave", rent: "$2,250", distance: "0.4 mi" },
    { address: "88 Maple Dr", rent: "$1,950", distance: "0.5 mi" },
  ];
  const mockSaleComps = [
    { address: "130 Main St", price: "$345,000", dom: "12d" },
    { address: "22 Pine Ln", price: "$360,000", dom: "24d" },
    { address: "105 Maple Dr", price: "$335,000", dom: "8d" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto rounded-2xl border border-rule bg-surface shadow-2xl">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-crit hover:text-white"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
            <h2 className="mb-2 text-2xl font-black text-ink">{p.successTitle}</h2>
            <p className="mb-8 text-ink-2">{p.successDesc}</p>
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-accent px-5 py-3 font-bold text-accent-ink hover:opacity-90 transition-opacity"
            >
              {p.backToDash}
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">
              {p.step} {step} {p.of} 3
            </div>
            <h2 className="mb-6 text-2xl font-black tracking-tight text-ink">
              {p.title}
            </h2>

            <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }}>
              
              {step === 1 && (
                <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>{p.purchasePrice}</label>
                      <input type="number" min="0" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder={p.purchasePricePh} className={INPUT} required />
                    </div>
                    <div>
                      <label className={LABEL}>{p.rehabAmount}</label>
                      <input type="number" min="0" value={rehabAmount} onChange={(e) => setRehabAmount(e.target.value)} placeholder={p.rehabAmountPh} className={INPUT} required />
                    </div>
                  </div>
                  <div>
                    <label className={LABEL}>{p.loanAmount}</label>
                    <input type="number" min="0" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder={p.loanAmountPh} className={INPUT} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>{p.loanTerm}</label>
                      <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className={`${INPUT} cursor-pointer appearance-none`} required>
                        <option value="" disabled>{p.loanTermSelect}</option>
                        <option value="12">{p.term12}</option>
                        <option value="24">{p.term24}</option>
                        <option value="36">{p.term36}</option>
                      </select>
                    </div>
                    <div>
                      <label className={LABEL}>{p.privacyLabel}</label>
                      <select value={isPublic ? "public" : "private"} onChange={(e) => setIsPublic(e.target.value === "public")} className={`${INPUT} cursor-pointer appearance-none`}>
                        <option value="public">{p.public}</option>
                        <option value="private">{p.private}</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div>
                    <label className={LABEL}>{p.address}</label>
                    <input type="text" value={propertyAddress} onChange={(e) => setPropertyAddress(e.target.value)} placeholder={p.addressPh} className={INPUT} required />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 border-b border-rule pb-5">
                    <div>
                      <label className={LABEL}>{p.type}</label>
                      <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className={`${INPUT} cursor-pointer appearance-none`}>
                        <option value="residential">{p.typeRes}</option>
                        <option value="commercial">{p.typeCom}</option>
                        <option value="land">{p.typeLand}</option>
                      </select>
                    </div>
                    <div>
                      <label className={LABEL}>{p.arvLabel}{p.value}</label>
                      <input type="number" min="0" value={estimatedValue} onChange={(e) => setEstimatedValue(e.target.value)} placeholder={p.valuePh} className={INPUT} required />
                    </div>
                  </div>

                  <div className="rounded-xl bg-surface-2 p-5 border border-rule-strong">
                    <div className="mb-4 flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-ink-2 m-0">{p.rentcastTitle}</label>
                      <span className="text-[10px] bg-accent/10 text-accent font-bold px-2 py-0.5 rounded">{p.aiEvaluated}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-bold text-ink mb-3 flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-accent"/> {p.saleComps}</h4>
                        <div className="flex flex-col gap-2">
                          {mockSaleComps.map((comp, idx) => (
                            <div key={idx} className="bg-surface rounded-lg p-2.5 border border-rule text-xs flex justify-between items-center">
                              <div>
                                <div className="font-bold text-ink">{comp.price}</div>
                                <div className="text-ink-3 text-[10px]">{comp.address}</div>
                              </div>
                              <div className="text-right text-ink-2 font-medium">{comp.dom}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-bold text-ink mb-3 flex items-center gap-1.5"><Home className="w-3.5 h-3.5 text-green-500"/> {p.rentComps}</h4>
                        <div className="flex flex-col gap-2">
                          {mockRentComps.map((comp, idx) => (
                            <div key={idx} className="bg-surface rounded-lg p-2.5 border border-rule text-xs flex justify-between items-center">
                              <div>
                                <div className="font-bold text-ink">{comp.rent}</div>
                                <div className="text-ink-3 text-[10px]">{comp.address}</div>
                              </div>
                              <div className="text-right text-ink-2 font-medium">{comp.distance}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div>
                    <label className={LABEL}>{p.photos}</label>
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-rule bg-surface-2 py-10 transition-colors hover:border-accent hover:bg-accent-soft/10">
                      <UploadCloud className="mb-2 h-8 w-8 text-ink-3" />
                      <span className="text-sm font-medium text-ink">{p.dragDrop}</span>
                      <span className="text-xs text-ink-3 mt-1">{p.photoGuidelines}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between border-t border-rule pt-6">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1 || isSubmitting}
                  className="rounded-lg px-4 py-2 text-sm font-bold text-ink transition-colors hover:text-accent disabled:invisible"
                >
                  &larr; {p.back}
                </button>
                                  
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? p.processing : step === 3 ? p.publish : p.next}
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
}