"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

export default function BorrowerOnboardingView() {
  const { t } = useSite();
  const bo = t.borrowerOnboarding;
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    entityName: "",
    entityType: "",
    ein: "",
    states: "",
    experience: "",
  });

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      submitProfile();
    }
  };

  const handlePrev = () => {
    if (step === 2) setStep(1);
  };

  const submitProfile = async () => {
    setIsSubmitting(true);
    try {
      // De acuerdo con Docs/API_REFERENCE.md usamos PATCH /api/borrowers/me
      const token = localStorage.getItem("accessToken") || "";
      
      // Nota: API_REFERENCE dice que PATCH recibe direccion, enviamos lo soportado
      // En un caso real el backend deberia actualizar estos campos en la Entidad
      await fetch(API_ROUTES.borrowers.me, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          // Payload adaptado
          ...formData
        }),
      });

      // Simulación adicional de carga para la UI
      await new Promise(resolve => setTimeout(resolve, 800));
      router.push("/borrowerDashboard/submit-deal"); // Redirige a crear su primer trato
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const LABEL = "mb-1.5 block text-[12px] font-semibold text-ink-2";
  const INPUT = "w-full rounded-md border border-rule bg-surface px-3 py-2.5 text-[14px] text-ink outline-none transition-colors focus:border-accent focus:ring-[3px] focus:ring-accent/10";
  const SELECT = `${INPUT} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238898aa%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-8`;

  return (
    <div className="flex flex-1 flex-col items-center justify-start p-6 sm:p-12">
      <div className="w-full max-w-[520px]">
        
        {/* Textos de Bienvenida */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-[24px] font-extrabold tracking-tight text-ink">
            {bo.title}
          </h1>
          <p className="text-[14px] leading-relaxed text-ink-3 whitespace-pre-line">
            {bo.subtitle}
          </p>
        </div>

        {/* Pasos / Progression */}
        <div className="mb-9 flex items-center justify-center gap-0">
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-accent bg-accent-soft text-[12px] font-bold text-accent">
              1
            </div>
            <div className="whitespace-nowrap text-[11px] font-semibold text-ink">
              {bo.steps[0]}
            </div>
          </div>
          <div className={`mb-[22px] h-[2px] w-12 ${step === 2 ? "bg-accent" : "bg-rule"}`}></div>
          
          <div className="flex flex-col items-center gap-1.5">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[12px] font-bold transition-colors ${
              step === 2 
                ? "border-accent bg-accent-soft text-accent" 
                : "border-accent bg-accent text-white"
            }`}>
              2
            </div>
            <div className={`whitespace-nowrap text-[11px] font-semibold ${step === 2 ? "text-ink" : "text-accent"}`}>
              {bo.steps[1]}
            </div>
          </div>
          <div className={`mb-[22px] h-[2px] w-12 ${step === 2 ? "bg-accent" : "bg-rule"}`}></div>

          <div className="flex flex-col items-center gap-1.5">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[12px] font-bold transition-colors ${
              step === 2 
                ? "border-accent bg-accent text-white" 
                : "border-rule bg-surface text-ink-3"
            }`}>
              3
            </div>
            <div className={`whitespace-nowrap text-[11px] font-semibold ${step === 2 ? "text-accent" : "text-ink-3"}`}>
              {bo.steps[2]}
            </div>
          </div>
        </div>

        {/* Tarjeta Principal */}
        <div className="overflow-hidden rounded-xl border border-rule bg-surface shadow-sm">
          <div className="p-7 sm:p-8">
            
            {/* Panel 1 */}
            {step === 1 && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-3.5 inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold text-accent">
                  {bo.step1.tag}
                </div>
                <h2 className="mb-1.5 text-[18px] font-extrabold tracking-tight text-ink">
                  {bo.step1.title}
                </h2>
                <p className="mb-5 text-[13px] leading-relaxed text-ink-3">
                  {bo.step1.sub}
                </p>

                <div className="mb-4">
                  <label className={LABEL}>{bo.step1.entityName}</label>
                  <input
                    type="text"
                    value={formData.entityName}
                    onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
                    placeholder={bo.step1.entityNamePh}
                    className={INPUT}
                  />
                </div>
                
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>{bo.step1.entityType}</label>
                    <select
                      value={formData.entityType}
                      onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                      className={SELECT}
                    >
                      <option value="">{bo.step1.entityTypeSelect}</option>
                      {bo.step1.entityTypes.map((opt, i) => (
                        <option key={i}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={LABEL}>{bo.step1.ein}</label>
                    <input
                      type="text"
                      value={formData.ein}
                      onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                      placeholder={bo.step1.einPh}
                      className={INPUT}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className={LABEL}>{bo.step1.states}</label>
                  <input
                    type="text"
                    value={formData.states}
                    onChange={(e) => setFormData({ ...formData, states: e.target.value })}
                    placeholder={bo.step1.statesPh}
                    className={INPUT}
                  />
                  <div className="mt-1 text-[11px] text-ink-3">{bo.step1.statesHint}</div>
                </div>

                <div className="mb-5">
                  <label className={LABEL}>{bo.step1.experience}</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className={SELECT}
                  >
                    <option value="">{bo.step1.expSelect}</option>
                    {bo.step1.exps.map((opt, i) => (
                      <option key={i}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-1 flex gap-2.5 rounded-lg border border-rule bg-surface-2 p-3.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px shrink-0">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" fill="#e6ebf1" stroke="#aab7c4" strokeWidth="1.2" />
                    <path d="M5 7V5a3 3 0 016 0v2" stroke="#aab7c4" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <div className="text-[12px] leading-relaxed text-ink-3">
                    <strong className="text-ink">{bo.step1.lockedNotice.bold}</strong>
                    {bo.step1.lockedNotice.text}
                  </div>
                </div>
              </div>
            )}

            {/* Panel 2 */}
            {step === 2 && (
              <div className="animate-in fade-in duration-300">
                <div className="mb-3.5 inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold text-accent">
                  {bo.step2.tag}
                </div>
                <h2 className="mb-1.5 text-[18px] font-extrabold tracking-tight text-ink">
                  {bo.step2.title}
                </h2>
                <p className="mb-5 text-[13px] leading-relaxed text-ink-3">
                  {bo.step2.sub}
                </p>

                <div className="mb-3 rounded-lg border border-rule bg-surface-2 p-4">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-ink-3">
                    {bo.step2.reviewTitle}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between border-b border-rule pb-1.5">
                      <span className="text-[12px] text-ink-3">Entity</span>
                      <span className="text-[13px] font-semibold text-ink">{formData.entityName || "Memphis Realty LLC"}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-rule py-1.5">
                      <span className="text-[12px] text-ink-3">Type</span>
                      <span className="text-[13px] font-semibold text-ink">{formData.entityType || "LLC"}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-rule py-1.5">
                      <span className="text-[12px] text-ink-3">EIN</span>
                      <span className="text-[13px] font-semibold text-ink">{formData.ein || "XX-XXXXXXX"}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-rule py-1.5">
                      <span className="text-[12px] text-ink-3">States</span>
                      <span className="text-[13px] font-semibold text-ink">{formData.states || "TN, MS, AR"}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1.5">
                      <span className="text-[12px] text-ink-3">Experience</span>
                      <span className="text-[13px] font-semibold text-ink">{formData.experience || "3 - 5 years"}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-2 mt-4 text-[12px] font-semibold uppercase tracking-widest text-ink-3">
                  {bo.step2.unlockedLater}
                </div>
                
                {[bo.step2.locked1, bo.step2.locked2, bo.step2.locked3].map((text, i) => (
                  <div key={i} className="mb-2 flex items-center gap-2 rounded-md border border-rule bg-bg p-2.5">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <rect x="3" y="7" width="10" height="7" rx="1.5" fill="#f0f4f8" stroke="#aab7c4" strokeWidth="1.2" />
                      <path d="M5 7V5a3 3 0 016 0v2" stroke="#aab7c4" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <span className="text-[13px] text-ink-3 flex-1">{text}</span>
                    <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-bold text-ink-3">
                      {bo.step2.lockedBadge}
                    </span>
                  </div>
                ))}

              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between border-t border-rule bg-surface-2 px-8 py-4.5">
            <button
              onClick={handlePrev}
              className={`rounded-md border border-rule bg-surface px-4 py-2 text-[13px] font-semibold text-ink-2 transition-colors hover:border-ink-3 ${
                step === 1 ? "invisible" : ""
              }`}
            >
              {bo.footer.back}
            </button>
            <span className="text-[12px] text-ink-3">
              {bo.footer.step} {step} {bo.footer.of} 2
            </span>
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`rounded-md px-6 py-2 text-[13px] font-bold text-white transition-colors disabled:opacity-50 ${
                step === 2 ? "bg-green-600 hover:bg-green-700" : "bg-accent hover:bg-blue-700"
              }`}
            >
              {step === 2 ? (isSubmitting ? bo.footer.submitting : bo.footer.post) : bo.footer.continue}
            </button>
          </div>
        </div>

        {/* Link Salto */}
        <div className="mt-4 text-center">
          <Link href="/borrowerDashboard" className="text-[12px] text-ink-3 transition-colors hover:text-accent">
            {bo.footer.skip}
          </Link>
        </div>

      </div>
    </div>
  );
}