"use client";

import { useState } from "react";
import { X, UploadCloud, CheckCircle2 } from "lucide-react";

// Estilos base reutilizados del sistema de diseño
const LABEL = "mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3";
const INPUT = "w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 outline-none transition-colors focus:border-accent";

interface PitchDeckModalProps {
  onClose: () => void;
}

export default function PitchDeckModal({ onClose }: PitchDeckModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- VARIABLES LOCALES (ESTADO DEL FORMULARIO) ---
  // Listas para enviar al backend cuando la API esté conectada
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyType, setPropertyType] = useState("residential");
  const [estimatedValue, setEstimatedValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: BACKEND - Sustituir este bloque con la llamada a la API de Daniela
    // Ejemplo: await fetch('/api/pitch-deck', { method: 'POST', body: JSON.stringify({ loanAmount, ... }) })
    const payload = {
      loanAmount,
      loanTerm,
      propertyAddress,
      propertyType,
      estimatedValue,
    };
    console.log("Datos listos para enviar al back:", payload);

    // Simulamos el tiempo de espera del servidor
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl border border-rule bg-surface shadow-2xl">
        
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
            <h2 className="mb-2 text-2xl font-black text-ink">¡Pitch Deck Publicado!</h2>
            <p className="mb-8 text-ink-2">
              Tu solicitud ha sido enviada al Marketplace. Los prestamistas ahora pueden ver tu trato y enviar ofertas.
            </p>
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-accent px-5 py-3 font-bold text-accent-ink hover:opacity-90 transition-opacity"
            >
              Volver al Dashboard
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">
              Paso {step} de 3
            </div>
            <h2 className="mb-6 text-2xl font-black tracking-tight text-ink">
              Crear Nuevo Pitch Deck
            </h2>

            <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }}>
              {/* PASO 1: Detalles del Préstamo */}
              {step === 1 && (
                <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div>
                    <label className={LABEL}>Monto Solicitado ($)</label>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Ej. 250000"
                      className={INPUT}
                      required
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Plazo del Préstamo (Meses)</label>
                    <select
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      className={`${INPUT} cursor-pointer appearance-none`}
                      required
                    >
                      <option value="" disabled>Selecciona el plazo</option>
                      <option value="12">12 Meses</option>
                      <option value="24">24 Meses</option>
                      <option value="36">36 Meses</option>
                    </select>
                  </div>
                </div>
              )}

              {/* PASO 2: Detalles de la Propiedad */}
              {step === 2 && (
                <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div>
                    <label className={LABEL}>Dirección de la Propiedad</label>
                    <input
                      type="text"
                      value={propertyAddress}
                      onChange={(e) => setPropertyAddress(e.target.value)}
                      placeholder="Ej. 123 Main St, Austin, TX"
                      className={INPUT}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={LABEL}>Tipo</label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className={`${INPUT} cursor-pointer appearance-none`}
                      >
                        <option value="residential">Residencial</option>
                        <option value="commercial">Comercial</option>
                        <option value="land">Terreno</option>
                      </select>
                    </div>
                    <div>
                      <label className={LABEL}>Valor Estimado ($)</label>
                      <input
                        type="number"
                        value={estimatedValue}
                        onChange={(e) => setEstimatedValue(e.target.value)}
                        placeholder="Ej. 350000"
                        className={INPUT}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 3: Fotos y Documentos */}
              {step === 3 && (
                <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div>
                    <label className={LABEL}>Fotos de la Propiedad</label>
                    {/* Placeholder visual para carga de archivos */}
                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-rule bg-surface-2 py-10 transition-colors hover:border-accent hover:bg-accent-soft/10">
                      <UploadCloud className="mb-2 h-8 w-8 text-ink-3" />
                      <span className="text-sm font-medium text-ink">Arrastra tus fotos aquí</span>
                      <span className="text-xs text-ink-3 mt-1">Soporta JPG, PNG (Max 5MB)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Controles de Navegación */}
              <div className="mt-8 flex items-center justify-between border-t border-rule pt-6">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1 || isSubmitting}
                  className="rounded-lg px-4 py-2 text-sm font-bold text-ink transition-colors hover:text-accent disabled:invisible"
                >
                  &larr; Atrás
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-2.5 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {isSubmitting ? "Procesando..." : step === 3 ? "Publicar Pitch Deck" : "Siguiente"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}