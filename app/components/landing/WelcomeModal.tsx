"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSite } from "@/app/components/layout/SiteShell";
import { Landmark } from "lucide-react";

export default function WelcomeModal() {
  const { t, setAppMode, lang, setLang } = useSite();
  const m = t.welcomeModal;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("pml-welcome-seen");
    if (!seen) {
      // Forzamos el idioma inicial en ingles si es la primera visita
      setLang("en");
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChoice = (choice: "lender" | "borrower" | "signin") => {
    localStorage.setItem("pml-welcome-seen", "true");

    if (choice !== "signin") {
      localStorage.setItem("pml-intent", choice);
    }
    setIsOpen(false);
    if (choice === "signin") {
      router.push("/login");
    } else {
      setAppMode(choice);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0a2540]/60 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-[480px] animate-in fade-in zoom-in-95 duration-300 rounded-2xl bg-surface px-6 py-10 text-center shadow-[0_20px_60px_rgba(10,37,64,0.18)] sm:px-12">
        
        {/* Toggle de Idioma */}
        <button
          type="button"
          onClick={() => setLang(lang === "es" ? "en" : "es")}
          className="absolute right-5 top-5 flex h-8 min-w-8 items-center justify-center rounded-md border border-rule bg-surface-2 px-2 text-[11px] font-bold text-ink-3 transition-colors hover:border-accent hover:text-ink"
        >
          {lang === "es" ? "EN" : "ES"}
        </button>

        {/* Icono Principal */}
        <div className="mx-auto mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Landmark size={24} />
        </div>

        {/* Titulo y Subtitulo */}
        <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">
          {m.brand}{m.brandSuffix}
        </div>
        <h2 className="mb-2 text-[26px] font-extrabold leading-[1.2] tracking-tight text-ink">
          {m.question}
        </h2>
        <p className="mb-8 text-[14px] text-ink-3">
          {m.tagline}
        </p>

        {/* Opciones Principales */}
        <div className="mb-6 flex flex-col gap-3">
          {/* Opcion Prestamista */}
          <button
            onClick={() => handleChoice("lender")}
            className="group flex w-full items-center gap-4 rounded-xl border-2 border-rule bg-bg p-4 text-left transition-all hover:border-accent hover:bg-accent-soft/40"
          >
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-accent-soft text-xl transition-colors group-hover:bg-accent group-hover:text-white">
              {m.lender.icon}
            </div>
            <div className="flex-1">
              <div className="mb-0.5 text-[15px] font-bold text-ink">{m.lender.title}</div>
              <div className="text-[12px] text-ink-2">{m.lender.sub}</div>
            </div>
            <div className="text-lg text-accent transition-transform group-hover:translate-x-1">&rarr;</div>
          </button>

          {/* Opcion Prestatario */}
          <button
            onClick={() => handleChoice("borrower")}
            className="group flex w-full items-center gap-4 rounded-xl border-2 border-rule bg-bg p-4 text-left transition-all hover:border-accent hover:bg-accent-soft/40"
          >
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-accent-soft text-xl transition-colors group-hover:bg-accent group-hover:text-white">
              {m.borrower.icon}
            </div>
            <div className="flex-1">
              <div className="mb-0.5 text-[15px] font-bold text-ink">{m.borrower.title}</div>
              <div className="text-[12px] text-ink-2">{m.borrower.sub}</div>
            </div>
            <div className="text-lg text-accent transition-transform group-hover:translate-x-1">&rarr;</div>
          </button>
        </div>

        {/* Boton Iniciar Sesion */}
        <div className="border-t border-rule pt-5">
          <button
            onClick={() => handleChoice("signin")}
            className="text-[13px] font-semibold text-accent transition-colors hover:text-ink"
          >
            {t.form.haveAccount} {m.signin.title} &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}