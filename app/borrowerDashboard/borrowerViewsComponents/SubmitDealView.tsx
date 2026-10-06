"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

export default function SubmitDealView() {
  const { t } = useSite();
  const sd = t.submitDeal;
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados del Formulario Combinado
  const [formData, setFormData] = useState({
    loanType: sd.loanType.bridge,
    address: "",
    city: "",
    state: "TN",
    zip: "",
    propertyType: sd.property.propTypes[0],
    occupancy: sd.property.occupancies[0],
    beds: "",
    baths: "",
    sqft: "",
    condition: sd.property.conditions[1],
    description: "",
    purchasePrice: "",
    loanAmount: "",
    arv: "",
    rehab: "",
    term: sd.financials.terms[2],
    rate: sd.financials.maxRates[1],
    exitStrategy: sd.financials.exits[0]
  });

  // Estados de Simulación RentCast
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupMessage, setLookupMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const lookupTimer = useRef<NodeJS.Timeout | null>(null);

  // Funciones de actualización de estado
  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Simulación de RentCast Auto-fill
  const handleAddressInput = (val: string) => {
    updateField("address", val);
    if (lookupTimer.current) clearTimeout(lookupTimer.current);
    
    if (val.length < 10) {
      setLookupMessage(null);
      return;
    }

    setIsLookingUp(true);
    setLookupMessage(null);

    lookupTimer.current = setTimeout(() => {
      setIsLookingUp(false);
      // Simulamos que encuentra la propiedad si escriben "Memphis"
      if (val.toLowerCase().includes("memphis")) {
        setFormData(prev => ({
          ...prev,
          city: "Memphis",
          state: "TN",
          zip: "38127",
          beds: "3",
          baths: "2",
          sqft: "1400",
          arv: "185000"
        }));
        setLookupMessage({ text: `${sd.property.addressSuccess} · 3bd/2ba · 1,400 sqft · ARV est. $185,000`, isError: false });
      } else {
        setLookupMessage({ text: sd.property.addressFail, isError: true });
      }
    }, 1200);
  };

  // Cálculos en vivo (Live Calc y LTV)
  const parseNum = (val: string) => parseFloat(val.replace(/,/g, "")) || 0;
  const numPurchase = parseNum(formData.purchasePrice);
  const numLoan = parseNum(formData.loanAmount);
  const numArv = parseNum(formData.arv);
  const numRehab = parseNum(formData.rehab);
  
  const ltv = numArv > 0 ? Math.round((numLoan / numArv) * 100) : 0;
  // Calculamos interés estimado usando 12% como referencia estándar de mercado
  const estimatedMonthly = (numLoan * 0.12) / 12;

  let ltvColor = "bg-accent";
  let ltvText = sd.financials.ltvGood;
  if (ltv > 75) {
    ltvColor = "bg-crit";
    ltvText = sd.financials.ltvHigh;
  } else if (ltv > 65) {
    ltvColor = "bg-amber";
    ltvText = sd.financials.ltvMod;
  }

  const formatCurrency = (val: number) => {
    return val > 0 ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val) : "—";
  };

  // Navegación
  const handleNext = () => { if (step < 4) setStep(step + 1); };
  const handlePrev = () => { if (step > 1) setStep(step - 1); };

  // Envío al Backend
  const handlePostDeal = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("accessToken") || "";
      
      // Mapeo al estándar de backend (API_REFERENCE.md)
      const projectTypeMapping: Record<string, string> = {
        [sd.loanType.bridge]: "FIX_AND_FLIP",
        [sd.loanType.slowFlip]: "SLOW_FLIP",
        [sd.loanType.rental]: "RENTAL"
      };

      const payload = {
        property: {
          addressLine1: formData.address || "Dirección no especificada",
          city: formData.city || "Ciudad",
          state: formData.state || "Estado",
          postalCode: formData.zip || "00000",
          propertyType: "SINGLE_FAMILY", // Podria mapearse desde formData.propertyType
          bedrooms: parseInt(formData.beds) || null,
          bathrooms: parseInt(formData.baths) || null,
          squareFootage: parseInt(formData.sqft) || null,
          afterRepairValue: numArv || null
        },
        projectType: projectTypeMapping[formData.loanType] || "FIX_AND_FLIP",
        purchasePrice: numPurchase || null,
        rehabAmount: numRehab || null,
        totalLoanAmountRequested: numLoan || 100000,
        requestedClosingDate: new Date(Date.now() + 30 * 86400000).toISOString(),
        requestedTimelineNotes: formData.description,
        visibility: "PUBLIC"
      };

      const createRes = await fetch(API_ROUTES.borrowers.meLoanRequests, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (createRes.ok) {
        const createJson = await createRes.json();
        const dealId = createJson.data?.id;

        if (dealId) {
          await fetch(API_ROUTES.borrowers.publishLoanRequest(dealId), {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
          });
        }
      } else {
        // Fallback visual si el backend no está conectado
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      router.push("/borrowerDashboard");
    } catch (error) {
      console.error(error);
      alert("Error al publicar el trato.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clases compartidas
  const LABEL = "mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.4px] text-ink-2";
  const INPUT = "w-full rounded-md border border-rule bg-surface px-3 py-2.5 text-[14px] text-ink outline-none transition-colors focus:border-accent focus:ring-[3px] focus:ring-accent/10";
  const SELECT = `${INPUT} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238898aa%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-8`;

  return (
    <div className="flex flex-1 flex-col pb-[80px]">
      <main className="flex flex-1 items-start justify-center p-6 sm:p-9">
        <div className="w-full max-w-[620px]">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-1 text-[22px] font-bold tracking-tight text-ink">{sd.title}</h1>
            <p className="text-[14px] text-ink-3">{sd.subtitle}</p>
          </div>

          {/* Steps Bar */}
          <div className="mb-8 flex items-center">
            {sd.steps.map((stepName, idx) => {
              const sNum = idx + 1;
              const isActive = sNum === step;
              const isPast = sNum < step;
              return (
                <div key={idx} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[12px] font-bold transition-all ${
                      isActive ? "border-accent bg-accent text-white shadow-[0_0_0_4px_rgba(99,91,255,.15)]" 
                      : isPast ? "border-accent bg-accent text-white" 
                      : "border-rule bg-surface text-ink-3"
                    }`}>
                      {isPast ? "✓" : sNum}
                    </div>
                    <div className={`whitespace-nowrap text-[11px] ${isActive ? "font-semibold text-accent" : isPast ? "text-accent" : "text-ink-3"}`}>
                      {stepName}
                    </div>
                  </div>
                  {idx < 3 && (
                    <div className={`mx-2 h-[2px] flex-1 ${sNum < step ? "bg-accent" : "bg-rule"}`}></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Badge Resumen si no estamos en paso 1 */}
          {step > 1 && (
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent-soft px-3 py-2 text-[12px] text-accent">
              ⚡ {formData.loanType} seleccionado <span className="ml-1 cursor-pointer font-semibold underline" onClick={() => setStep(1)}>{sd.review.edit}</span>
            </div>
          )}

          {/* PASO 1: Tipo de Préstamo */}
          {step === 1 && (
            <div className="animate-in fade-in duration-300">
              <div className="rounded-xl border border-rule bg-surface p-7 sm:p-8">
                <h2 className="mb-1 text-[18px] font-bold tracking-tight text-ink">{sd.loanType.title}</h2>
                <p className="mb-6 text-[13px] text-ink-3">{sd.loanType.sub}</p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { title: sd.loanType.bridge, sub: sd.loanType.bridgeSub, icon: "⚡" },
                    { title: sd.loanType.slowFlip, sub: sd.loanType.slowFlipSub, icon: "🤝" },
                    { title: sd.loanType.rental, sub: sd.loanType.rentalSub, icon: "🏠" }
                  ].map((type, i) => {
                    const isActive = formData.loanType === type.title;
                    return (
                      <div 
                        key={i} 
                        onClick={() => updateField("loanType", type.title)}
                        className={`cursor-pointer rounded-lg border-[1.5px] p-4 transition-all ${
                          isActive ? "border-accent bg-accent-soft" : "border-rule bg-surface hover:border-ink-3"
                        }`}
                      >
                        <div className="mb-2 text-[20px]">{type.icon}</div>
                        <div className={`mb-1 text-[13px] font-bold ${isActive ? "text-accent" : "text-ink"}`}>
                          {type.title}
                          {isActive && <span className="float-right text-[14px]">✓</span>}
                        </div>
                        <div className="text-[11px] leading-[1.5] text-ink-3">{type.sub}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* PASO 2: Property Details */}
          {step === 2 && (
            <div className="animate-in fade-in duration-300">
              <div className="rounded-xl border border-rule bg-surface p-7 sm:p-8">
                <h2 className="mb-1 text-[18px] font-bold tracking-tight text-ink">{sd.property.title}</h2>
                <p className="mb-6 text-[13px] text-ink-3">{sd.property.sub}</p>

                <div className="mb-4">
                  <label className={LABEL}>{sd.property.address}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={formData.address}
                      onChange={(e) => handleAddressInput(e.target.value)}
                      placeholder={sd.property.addressPh}
                      className={INPUT}
                    />
                    {isLookingUp && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-accent animate-pulse">
                        {sd.property.addressLookup}
                      </div>
                    )}
                  </div>
                  {!lookupMessage && !isLookingUp && <div className="mt-1 text-[11px] text-ink-3">{sd.property.addressHint}</div>}
                  {lookupMessage && (
                    <div className={`mt-2 rounded-md border p-2 text-[12px] font-semibold ${
                      lookupMessage.isError ? "border-red-200 bg-red-50 text-red-600" : "border-accent/20 bg-accent-soft text-accent"
                    }`}>
                      {lookupMessage.text}
                    </div>
                  )}
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className={LABEL}>{sd.property.city}</label>
                    <input type="text" value={formData.city} onChange={(e) => updateField("city", e.target.value)} className={INPUT} />
                  </div>
                  <div>
                    <label className={LABEL}>{sd.property.state}</label>
                    <input type="text" value={formData.state} onChange={(e) => updateField("state", e.target.value)} className={INPUT} />
                  </div>
                  <div>
                    <label className={LABEL}>{sd.property.zip}</label>
                    <input type="text" value={formData.zip} onChange={(e) => updateField("zip", e.target.value)} className={INPUT} />
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={LABEL}>{sd.property.propType}</label>
                    <select value={formData.propertyType} onChange={(e) => updateField("propertyType", e.target.value)} className={SELECT}>
                      {sd.property.propTypes.map((opt, i) => <option key={i}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={LABEL}>{sd.property.occupancy}</label>
                    <select value={formData.occupancy} onChange={(e) => updateField("occupancy", e.target.value)} className={SELECT}>
                      {sd.property.occupancies.map((opt, i) => <option key={i}>{opt}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-3 gap-4">
                  <div>
                    <label className={LABEL}>{sd.property.beds}</label>
                    <input type="number" value={formData.beds} onChange={(e) => updateField("beds", e.target.value)} placeholder="3" className={INPUT} />
                  </div>
                  <div>
                    <label className={LABEL}>{sd.property.baths}</label>
                    <input type="number" value={formData.baths} onChange={(e) => updateField("baths", e.target.value)} placeholder="2" className={INPUT} />
                  </div>
                  <div>
                    <label className={LABEL}>{sd.property.sqft}</label>
                    <input type="number" value={formData.sqft} onChange={(e) => updateField("sqft", e.target.value)} placeholder="1500" className={INPUT} />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={LABEL}>{sd.property.condition}</label>
                  <div className="flex gap-2">
                    {sd.property.conditions.map((cond, i) => (
                      <button 
                        key={i} 
                        onClick={() => updateField("condition", cond)}
                        className={`flex-1 rounded-md border p-2.5 text-center text-[12px] font-semibold transition-colors ${
                          formData.condition === cond ? "border-accent bg-accent-soft text-accent" : "border-rule bg-surface text-ink-2 hover:border-ink-3"
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={LABEL}>{sd.property.desc}</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder={sd.property.descPh} 
                    className={`${INPUT} min-h-[80px] resize-y`}
                  ></textarea>
                </div>

              </div>
            </div>
          )}

          {/* PASO 3: Financials */}
          {step === 3 && (
            <div className="animate-in fade-in duration-300">
              <div className="rounded-xl border border-rule bg-surface p-7 sm:p-8">
                <h2 className="mb-1 text-[18px] font-bold tracking-tight text-ink">{sd.financials.title}</h2>
                <p className="mb-6 text-[13px] text-ink-3">{sd.financials.sub}</p>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>{sd.financials.purchasePrice}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-3">$</span>
                      <input type="text" value={formData.purchasePrice} onChange={(e) => updateField("purchasePrice", e.target.value)} placeholder="85,000" className={`${INPUT} pl-7`} />
                    </div>
                  </div>
                  <div>
                    <label className={LABEL}>{sd.financials.loanAmount}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-3">$</span>
                      <input type="text" value={formData.loanAmount} onChange={(e) => updateField("loanAmount", e.target.value)} placeholder="110,000" className={`${INPUT} pl-7`} />
                    </div>
                    <div className="mt-1 text-[11px] text-ink-3">{sd.financials.loanHint}</div>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>{sd.financials.arv}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-3">$</span>
                      <input type="text" value={formData.arv} onChange={(e) => updateField("arv", e.target.value)} placeholder="165,000" className={`${INPUT} pl-7`} />
                    </div>
                    <div className="mt-1 text-[11px] text-ink-3">{sd.financials.arvHint}</div>
                  </div>
                  <div>
                    <label className={LABEL}>{sd.financials.rehab}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-ink-3">$</span>
                      <input type="text" value={formData.rehab} onChange={(e) => updateField("rehab", e.target.value)} placeholder="30,000" className={`${INPUT} pl-7`} />
                    </div>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>{sd.financials.desiredTerm}</label>
                    <select value={formData.term} onChange={(e) => updateField("term", e.target.value)} className={SELECT}>
                      {sd.financials.terms.map((opt, i) => <option key={i}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={LABEL}>{sd.financials.maxRate}</label>
                    <select value={formData.rate} onChange={(e) => updateField("rate", e.target.value)} className={SELECT}>
                      {sd.financials.maxRates.map((opt, i) => <option key={i}>{opt}</option>)}
                    </select>
                  </div>
                </div>

                {/* LTV Indicator Visual */}
                <div className="mt-4 rounded-lg border border-rule bg-surface-2 p-3.5 sm:p-4">
                  <div className="mb-2 flex justify-between text-[12px] text-ink-2">
                    <span>{sd.financials.ltvLabel}</span>
                    <span className={`font-bold ${ltv > 75 ? "text-crit" : "text-accent"}`}>{ltv}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-rule">
                    <div className={`h-full rounded-full transition-all duration-300 ${ltvColor}`} style={{ width: `${Math.min(ltv, 100)}%` }} />
                  </div>
                  <div className="mt-2 text-[11px] text-ink-3">{ltvText}</div>
                </div>

                <div className="my-5 h-px bg-rule"></div>

                <div className="mb-5">
                  <label className={LABEL}>{sd.financials.exitLabel}</label>
                  <div className="mt-1.5 grid grid-cols-2 gap-2.5">
                    {sd.financials.exits.map((exit, i) => (
                      <div 
                        key={i} 
                        onClick={() => updateField("exitStrategy", exit)}
                        className={`cursor-pointer rounded-md border-[1.5px] p-2.5 text-center text-[13px] font-semibold transition-colors ${
                          formData.exitStrategy === exit ? "border-accent bg-accent-soft text-accent" : "border-rule bg-surface text-ink-2 hover:border-accent hover:text-accent"
                        }`}
                      >
                        {exit}
                      </div>
                    ))}
                  </div>
                </div>

                {/* LIVE CALC BOX */}
                <div className="rounded-lg border border-rule bg-surface-2 p-5">
                  <div className="mb-3 text-[12px] font-bold uppercase tracking-wide text-ink-2">{sd.liveCalc.title}</div>
                  <div className="flex items-center justify-between py-1.5 text-[13px]">
                    <span className="text-ink-3">{sd.liveCalc.purchase}</span>
                    <span className="font-semibold text-ink">{formatCurrency(numPurchase)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 text-[13px]">
                    <span className="text-ink-3">{sd.liveCalc.loan}</span>
                    <span className="font-semibold text-ink">{formatCurrency(numLoan)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 text-[13px]">
                    <span className="text-ink-3">{sd.liveCalc.rehab}</span>
                    <span className="font-semibold text-ink">{formatCurrency(numRehab)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 text-[13px]">
                    <span className="text-ink-3">{sd.liveCalc.arv}</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(numArv)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5 text-[13px]">
                    <span className="text-ink-3">{sd.liveCalc.ltv}</span>
                    <span className="font-semibold text-ink">{ltv > 0 ? `${ltv}%` : "—"}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-rule pt-3 text-[13px]">
                    <span className="font-bold text-ink">{sd.liveCalc.monthly.replace("{rate}", "12%")}</span>
                    <span className="text-[15px] font-bold text-accent">{formatCurrency(estimatedMonthly)}</span>
                  </div>
                  {ltv > 75 && (
                    <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-2.5 text-[12px] font-semibold text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
                      {sd.liveCalc.warning}
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* PASO 4: Review & Post */}
          {step === 4 && (
            <div className="animate-in fade-in duration-300">
              
              <div className="mb-4 flex items-start gap-3 rounded-lg border border-accent/30 bg-accent-soft p-3.5 sm:p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-white">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3C4.5 3 1.5 8 1.5 8s3 5 6.5 5 6.5-5 6.5-5-3-5-6.5-5z" stroke="#fff" strokeWidth="1.3"/><circle cx="8" cy="8" r="2" fill="#fff"/></svg>
                </div>
                <div className="text-[13px] leading-[1.6] text-ink">
                  <strong className="font-bold">{sd.review.visTitle}</strong><br/>
                  <span className="text-[11px] text-accent">{sd.review.visSub}</span>
                </div>
              </div>

              <div className="rounded-xl border border-rule bg-surface p-7 sm:p-8">
                <h2 className="mb-1 text-[18px] font-bold tracking-tight text-ink">{sd.review.title}</h2>
                <p className="mb-5 text-[13px] text-ink-3">{sd.review.sub}</p>

                <div className="mb-5">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.7px] text-ink-3">{sd.review.secType}</div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">Type</span>
                    <span className="text-[13px] font-semibold text-ink">{formData.loanType} <span className="ml-2 cursor-pointer text-[11px] font-semibold text-accent hover:underline" onClick={() => setStep(1)}>{sd.review.edit}</span></span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[13px] text-ink-3">Term</span>
                    <span className="text-[13px] font-semibold text-ink">{formData.term}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.7px] text-ink-3">{sd.review.secProp}</div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">Address</span>
                    <span className="text-[13px] font-semibold text-ink">{formData.address || "N/A"}, {formData.city} {formData.state} <span className="ml-2 cursor-pointer text-[11px] font-semibold text-accent hover:underline" onClick={() => setStep(2)}>{sd.review.edit}</span></span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">Type</span>
                    <span className="text-[13px] font-semibold text-ink">{formData.propertyType}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[13px] text-ink-3">Condition</span>
                    <span className="text-[13px] font-semibold text-ink">{formData.condition}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.7px] text-ink-3">{sd.review.secFin}</div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.financials.purchasePrice}</span>
                    <span className="text-[13px] font-semibold text-ink">{formatCurrency(numPurchase)} <span className="ml-2 cursor-pointer text-[11px] font-semibold text-accent hover:underline" onClick={() => setStep(3)}>{sd.review.edit}</span></span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.financials.loanAmount}</span>
                    <span className="text-[13px] font-semibold text-ink">{formatCurrency(numLoan)}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.financials.arv}</span>
                    <span className="text-[13px] font-semibold text-ink">{formatCurrency(numArv)}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">{sd.financials.rehab}</span>
                    <span className="text-[13px] font-semibold text-ink">{formatCurrency(numRehab)}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">LTV</span>
                    <span className="text-[13px] font-semibold text-ink">{ltv}%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">Max rate</span>
                    <span className="text-[13px] font-semibold text-ink">{formData.rate}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[13px] text-ink-3">Exit strategy</span>
                    <span className="text-[13px] font-semibold text-ink">{formData.exitStrategy}</span>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.7px] text-ink-3">{sd.review.secBiz}</div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">Entity</span>
                    <span className="text-[13px] font-semibold text-ink">Memphis Realty LLC</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-surface-2 py-2">
                    <span className="text-[13px] text-ink-3">States</span>
                    <span className="text-[13px] font-semibold text-ink">TN, MS, AR</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[13px] text-ink-3">Verification</span>
                    <span className="text-[13px] font-semibold text-amber">Unverified</span>
                  </div>
                </div>

                <button 
                  onClick={handlePostDeal}
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-accent p-3.5 text-[15px] font-extrabold tracking-tight text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Procesando..." : sd.review.btnPost}
                </button>
                <div className="mt-2.5 text-center text-[11px] leading-[1.6] text-ink-3 whitespace-pre-line">
                  {sd.review.postNote}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Bottom Fixed Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] flex items-center justify-between border-t border-rule bg-white px-8 py-3.5 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        <button 
          onClick={handlePrev} 
          className={`rounded-md border border-rule bg-surface px-4 py-2 text-[13px] font-semibold text-ink-2 transition-colors hover:border-ink-3 hover:text-ink ${step === 1 ? "invisible" : ""}`}
        >
          {sd.actions.back}
        </button>
        <span className="text-[12px] font-medium text-ink-3">
          {sd.stepHint.replace("{current}", step.toString()).replace("{total}", "4").replace("{stepName}", sd.steps[step - 1])}
        </span>
        <button 
          onClick={handleNext} 
          className={`rounded-md bg-accent px-6 py-2 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-blue-700 ${step === 4 ? "hidden" : ""}`}
        >
          {step === 3 ? sd.actions.review : sd.actions.continue}
        </button>
      </div>
    </div>
  );
}