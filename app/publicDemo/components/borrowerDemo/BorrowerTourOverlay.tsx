"use client";

import { useEffect, useState } from "react";
import { useBorrowerTour } from "@/app/publicDemo/context/borrowerDemo/BorrowerTourProvider";
import { useSite } from "@/app/components/layout/SiteShell";

export default function BorrowerTourOverlay() {
  const { currentStep, nextStep, prevStep, endDemo } = useBorrowerTour();
  const [bounds, setBounds] = useState<DOMRect | null>(null);
  const { lang } = useSite();
  const isEs = lang === "es";

  const TOUR_STEPS = [
    {
      id: "demo-header-toggles",
      title: isEs ? "Personalización" : "Personalization",
      desc: isEs ? "Cambia el idioma y el modo claro/oscuro en cualquier momento." : "Switch the language and toggle dark/light mode at any time."
    },
    {
      id: "demo-post-deal",
      title: isEs ? "Inicia tu solicitud" : "Start your request",
      desc: isEs ? "Haz clic aquí para analizar y publicar tu primer trato." : "Click here to analyze and post your first deal."
    },
    {
      id: "demo-loan-type",
      title: isEs ? "Tipo de préstamo" : "Loan type",
      desc: isEs ? "Selecciona el financiamiento que mejor se adapte a tu proyecto." : "Select the financing that best fits your project."
    },
    {
      id: "demo-form-address",
      title: isEs ? "Detalles de la propiedad" : "Property details",
      desc: isEs ? "Ingresa la dirección y dejaremos que llenes el resto de la solicitud." : "Enter the address and fill out the rest of the application."
    },
    {
      id: "demo-form-prop-specs",
      title: isEs ? "Especificaciones" : "Property specs",
      desc: isEs ? "Completa las características, como recámaras, baños y condición actual." : "Fill in the features like beds, baths, and current condition."
    },
    {
      id: "demo-form-financials",
      title: isEs ? "Finanzas del trato" : "Deal financials",
      desc: isEs ? "Una vez que ingreses los números, la plataforma calculará el LTV y tu pago mensual." : "Once you enter the numbers, the platform will calculate LTV and your monthly payment."
    },
    {
      id: "demo-review-post",
      title: isEs ? "Revisa tu trato" : "Review your deal",
      desc: isEs ? "Verifica que todos los números sean correctos." : "Double-check all numbers are correct before sending it to the market."
    },
    {
      id: "demo-accept-btn",
      title: isEs ? "¡Estás listo!" : "You're ready!",
      desc: isEs ? "Termina la simulación y regístrate para fondear tus proyectos reales." : "Finish the simulation and register to fund your real projects."
    }
  ];

  const stepData = TOUR_STEPS[currentStep];

  useEffect(() => {
    if (!stepData) return;
    const updateBounds = () => {
      setTimeout(() => {
        const el = document.getElementById(stepData.id);
        if (el) {
          setBounds(el.getBoundingClientRect());
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 50);
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [currentStep, stepData]);

  if (currentStep < 0 || currentStep >= TOUR_STEPS.length || !bounds) return null;

  let topPos = bounds.bottom + 20;
  let leftPos = Math.max(20, bounds.left + bounds.width / 2 - 160);

  // Prevenir que se salga de la pantalla (overflow vertical)
  if (topPos + 220 > window.innerHeight) {
    topPos = Math.max(20, bounds.top - 240); // Colocar arriba si no cabe abajo
  }
  // Prevenir que se salga por la derecha
  if (leftPos + 340 > window.innerWidth) {
    leftPos = window.innerWidth - 340;
  }

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none transition-all duration-500">
      <div
        className="absolute rounded-xl shadow-[0_0_0_9999px_rgba(10,37,64,0.7)] transition-all duration-500"
        style={{
          top: bounds.top - 8,
          left: bounds.left - 8,
          width: bounds.width + 16,
          height: bounds.height + 16,
        }}
      />
      
      <div
        className="absolute z-[101] w-[320px] rounded-xl bg-surface p-6 shadow-xl border border-rule pointer-events-auto transition-all duration-500"
        style={{
          top: topPos,
          left: leftPos
        }}
      >
        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
          {isEs ? "Paso" : "Step"} {currentStep + 1} {isEs ? "de" : "of"} {TOUR_STEPS.length}
        </div>
        <h3 className="mb-2 text-lg font-bold text-ink">{stepData.title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-ink-2">{stepData.desc}</p>
        
        <div className="flex justify-between items-center border-t border-rule pt-4">
          <button onClick={endDemo} className="cursor-pointer text-xs font-semibold text-ink-3 hover:text-ink transition-colors">
            {isEs ? "Salir" : "Exit"}
          </button>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button onClick={prevStep} className="cursor-pointer rounded-md border border-rule px-3 py-1.5 text-xs font-bold text-ink-2 hover:bg-surface-2 transition-colors">
                {isEs ? "Atras" : "Back"}
              </button>
            )}
            <button onClick={currentStep === TOUR_STEPS.length - 1 ? endDemo : nextStep} className="cursor-pointer rounded-md bg-accent px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow-sm transition-colors">
              {currentStep === TOUR_STEPS.length - 1 ? (isEs ? "Finalizar" : "Finish") : (isEs ? "Siguiente" : "Next")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}