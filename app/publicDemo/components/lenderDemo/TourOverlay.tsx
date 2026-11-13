"use client";
import { useEffect, useState } from "react";
import { useTour } from "@/app/publicDemo/context/lenderDemo/DemoTourProvider";
import { useSite } from "@/app/components/layout/SiteShell";
import Link from "next/link";

export default function TourOverlay() {
  const { currentStep, nextStep, prevStep, endDemo, closeDemo, restartDemo } = useTour();
  const [bounds, setBounds] = useState<DOMRect | null>(null);
  const { t, lang } = useSite();
  const m = t.marketplace; 
  const d = t.dashboardLender.mimic;
  const isEs = lang === "es";

  const TOUR_STEPS = [
    {
      id: "demo-nav-toggles",
      title: isEs ? "Paso 1: Personaliza tu experiencia" : "Step 1: Customize your experience",
      desc: isEs ? "Bienvenido a PayMyLoan! Antes de empezar, puedes cambiar el idioma y activar el Modo Oscuro." : "Welcome to PayMyLoan! Before we start, you can switch the platform to Spanish and toggle Dark Mode using these controls."
    },
    {
      id: "demo-sidebar-browse",
      title: isEs ? "Paso 2: Encuentra el Marketplace" : "Step 2: Find the Marketplace",
      desc: isEs ? `Navega a "${d.sidebar.browse}" para ver todas las solicitudes de prestamo publicas en tu area.` : `Navigate to "${d.sidebar.browse}" to see all public loan requests looking for funding in your area.`
    },
    {
      id: "demo-filter-bar",
      title: isEs ? "Paso 3: Filtra oportunidades" : "Step 3: Filter opportunities",
      desc: isEs ? "Usa la barra para filtrar tratos por LTV maximo, monto o tipo de proyecto (Bridge o Slow Flip)." : "Use the filter bar to narrow down deals by Max LTV, Loan Amount, or Project Type (like Bridge or Slow Flip)."
    },
    {
      id: "demo-deal-card-1",
      title: isEs ? "Paso 4: Evalúa el trato" : "Step 4: Evaluate the deal",
      desc: isEs ? "Revisa las métricas críticas: ARV, monto solicitado, LTV y la calificación PML del prestatario." : "Review critical metrics at a glance: ARV, requested amount, LTV, and the borrower's PML Rating."
    },
    {
      id: "demo-btn-offer",
      title: isEs ? "Paso 5: Da el siguiente paso" : "Step 5: Take the next step",
      desc: isEs ? `Haz clic en Siguiente para simular el envío de una oferta, o presiona manualmente el botón de "${m.dealDetails.submitOffer}".` : `Click Next to simulate sending an offer, or manually press the "${m.dealDetails.submitOffer}" button.`
    },
    {
      id: "demo-offer-modal",
      title: isEs ? "Paso 6: Prepara tu Hoja de Términos" : "Step 6: Prepare your Term Sheet",
      desc: isEs ? "Elige con qué entidad prestarás. La información del prestatario permanece anónima hasta que ambas partes conecten." : "Choose which entity you will lend from. The borrower's information remains anonymous until both parties connect."
    },
    {
      id: "demo-modal-terms",
      title: isEs ? "Paso 7: Establece tus términos" : "Step 7: Set your terms",
      desc: isEs ? "Ingresa la tasa de interés y el plazo que prefieras. El sistema calculará automáticamente el interés mensual esperado." : "Enter your preferred interest rate and term. The system will automatically calculate the expected monthly interest."
    },
    {
      id: "demo-modal-submit",
      title: isEs ? "Paso 8: Envía la oferta" : "Step 8: Submit the offer",
      desc: isEs ? "Al enviar, el prestatario recibirá tu hoja de términos y podrá aceptarla, rechazarla o enviar una contraoferta." : "Upon submission, the borrower will receive your term sheet and can accept, decline, or counter-offer."
    }
  ];

  const stepData = TOUR_STEPS[currentStep];

  useEffect(() => {
    if (!stepData) return;
    const updateBounds = () => {
      const el = document.getElementById(stepData.id);
      if (el) {
        setBounds(el.getBoundingClientRect());
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };
    // Pequeño retraso para asegurar que el DOM cargó los IDs (especialmente el sidebar)
    setTimeout(updateBounds, 100);
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [currentStep, stepData]);

  if (currentStep === -1) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm pointer-events-auto">
        <div className="w-full max-w-[400px] rounded-xl bg-surface p-6 shadow-xl border border-rule text-center animate-in zoom-in-95 duration-200">
          <div className="mb-4 text-4xl">🎉</div>
          <h3 className="mb-2 text-xl font-black tracking-tight text-ink">
            {isEs ? "¡Demo Completado!" : "Demo Completed!"}
          </h3>
          <p className="mb-6 text-sm text-ink-2">
            {isEs ? "Has simulado cómo navegar el mercado y enviar una hoja de términos exitosamente." : "You've successfully simulated how to browse the market and submit a term sheet."}
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={closeDemo} className="w-full flex items-center justify-center rounded-md bg-accent px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-sm cursor-pointer">
              {isEs ? "Finalizar guía" : "Finish guide"}
            </button>
            <button onClick={restartDemo} className="w-full rounded-md bg-surface-2 border border-rule px-4 py-2.5 text-sm font-bold text-ink hover:bg-surface-3 transition-colors cursor-pointer">
              {isEs ? "Volver a empezar la guía" : "Restart guide"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep < 0 || currentStep >= TOUR_STEPS.length || !bounds) return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none transition-all duration-500">
      <div 
        className="absolute rounded-xl shadow-[0_0_0_9999px_rgba(10,37,64,0.7)] transition-all duration-500"
        style={{
          top: bounds.top - 8, left: bounds.left - 8,
          width: bounds.width + 16, height: bounds.height + 16,
        }}
      />
      <div 
        className="absolute z-[9999] w-[320px] rounded-xl bg-surface p-6 shadow-xl border border-rule pointer-events-auto transition-all duration-500"
        style={{ top: bounds.bottom + 20, left: Math.max(20, bounds.left + bounds.width / 2 - 160) }}
      >
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          Step {currentStep + 1} of {TOUR_STEPS.length}
        </div>
        <h3 className="mb-2 text-lg font-bold text-ink">{stepData.title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-ink-2">{stepData.desc}</p>
        
        <div className="flex justify-between items-center border-t border-rule pt-4">
          <button onClick={endDemo} className="text-xs font-semibold text-ink-3 hover:text-ink transition-colors">
            Exit Tour
          </button>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button onClick={prevStep} className="rounded-md border border-rule px-3 py-1.5 text-xs font-bold text-ink-2 hover:bg-surface-2">
                Back
              </button>
            )}
            <button onClick={currentStep === TOUR_STEPS.length - 1 ? endDemo : nextStep} className="rounded-md bg-accent px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow-sm">
              {currentStep === TOUR_STEPS.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}