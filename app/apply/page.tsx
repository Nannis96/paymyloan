// app/apply/page.tsx
"use client";

import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { UploadCloud, Save } from "lucide-react";
import BackToDashboard from "@/app/components/ambos/BackToDashboard";

const LABEL = "mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3";
const INPUT = "w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 outline-none transition-colors focus:border-accent";

function VettingApplicationContent() {
  const { t } = useSite();
  const v = t.vetting;

  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState<string[]>([""]);
  const [consentCredit, setConsentCredit] = useState(false);
  const [consentBackground, setConsentBackground] = useState(false);

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  const handleAddAddress = () => {
    if (addresses.length < 5) {
      setAddresses([...addresses, ""]);
    }
  };

  const handleSaveProgress = async () => {
    // TODO: BACKEND - Se requiere crear un endpoint para guardar el progreso parcial de esta aplicacion.
    // Sugerencia: POST /api/borrowers/me/vetting/draft (Guarda el estado actual del formulario).
    // Actualmente se esta simulando el comportamiento.
    
    console.log("Mock: Guardando progreso parcial de la aplicacion...", { step, addresses });
    alert(v.form.savedAlert);
  };

  const handlePaymentAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentCredit || !consentBackground) {
      alert(v.form.consentAlert);
      return;
    }
    // TODO: BACKEND - Integrar Stripe Checkout (o componente similar)
    console.log("Mock: Iniciando pago y finalizando aplicacion con direcciones:", addresses);
  };

  const UploadBox = ({ label }: { label: string }) => (
    <div className="flex flex-col gap-2">
      <label className={LABEL}>{label}</label>
      <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-rule bg-surface-2 py-8 transition-colors hover:border-accent hover:bg-accent-soft/10">
        <UploadCloud className="mb-2 h-6 w-6 text-ink-3" />
        <span className="text-xs text-ink-3">{v.form.selectFile}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14 flex items-center justify-center">
      <div className="w-full max-w-[650px]">
        <BackToDashboard />
        <div className="rounded-2xl border border-rule bg-surface p-8 shadow-xl sm:p-12">
          
          <header className="mb-8 text-center border-b border-rule pb-6">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">
              {v.form.step} {step} {v.form.of} 3
            </div>
            <h1 className="text-[28px] font-black tracking-tight text-ink">{v.title}</h1>
            <p className="text-ink-2 mt-2">{v.subtitle}</p>
          </header>

          <form onSubmit={step === 3 ? handlePaymentAndSubmit : (e) => { e.preventDefault(); setStep(step + 1); }}>
            
            {/* PASO 1: Historial de Proyectos */}
            {step === 1 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-ink">{v.form.dealHistory}</h3>
                  <span className="text-xs text-ink-3">{v.form.dealHistoryDesc}</span>
                </div>
                
                {addresses.map((address, index) => (
                  <div key={index}>
                    <label className={LABEL}>{v.form.addressLabel} {index + 1}</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => handleAddressChange(index, e.target.value)}
                      placeholder={v.form.addressPh}
                      className={INPUT}
                      required={index === 0} // Al menos una es requerida
                    />
                  </div>
                ))}
                
                {addresses.length < 5 && (
                  <button
                    type="button"
                    onClick={handleAddAddress}
                    className="self-start text-xs font-bold text-accent hover:text-ink transition-colors"
                  >
                    {v.form.addAddress}
                  </button>
                )}
              </div>
            )}

            {/* PASO 2: Documentos (Omitiendo Entity Docs) */}
            {step === 2 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <UploadBox label={v.form.bankStatements} />
                <UploadBox label={v.form.idUpload} />
              </div>
            )}

            {/* PASO 3: Consentimientos y Pago */}
            {step === 3 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex flex-col gap-3 rounded-lg border border-rule bg-surface-2 p-5">
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-2">
                    <input
                      type="checkbox"
                      checked={consentCredit}
                      onChange={(e) => setConsentCredit(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-rule text-accent focus:ring-accent"
                    />
                    <span dangerouslySetInnerHTML={{ __html: v.form.consentCredit.replace('Credit Pull', '<strong>Credit Pull</strong>').replace('verificación de crédito', '<strong>verificación de crédito</strong>') }} />
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-2">
                    <input
                      type="checkbox"
                      checked={consentBackground}
                      onChange={(e) => setConsentBackground(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-rule text-accent focus:ring-accent"
                    />
                    <span dangerouslySetInnerHTML={{ __html: v.form.consentBackground.replace('Background Check', '<strong>Background Check</strong>').replace('verificación de antecedentes', '<strong>verificación de antecedentes</strong>') }} />
                  </label>
                </div>
                
                <div className="mt-2 flex flex-col items-center gap-3">
                  <span className="text-sm font-bold text-ink-2">{v.feeNotice}: <span className="text-accent text-lg">$99.00</span></span>
                </div>
              </div>
            )}

            {/* CONTROLES DE NAVEGACION */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-rule pt-6">
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  className="rounded-lg px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-surface-2 disabled:invisible"
                >
                  &larr; {v.form.back}
                </button>
                
                <button
                  type="button"
                  onClick={handleSaveProgress}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold text-ink-3 transition-colors hover:text-ink"
                >
                  <Save className="h-4 w-4" /> {v.form.saveAndContinueLater}
                </button>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-accent px-8 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 shadow-md"
              >
                {step === 3 ? v.form.submitAndPay : v.form.next}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function VettingApplicationPage() {
  return (
    <SiteShell isDashboard={true}>
      <VettingApplicationContent />
    </SiteShell>
  );
}