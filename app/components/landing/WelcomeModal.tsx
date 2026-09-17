"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSite } from "@/app/components/layout/SiteShell";

export default function WelcomeModal() {
  const { t, setAppMode } = useSite();
  const m = t.welcomeModal;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("pml-welcome-seen");
    if (!seen) {
      setIsOpen(true);
    }
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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[600px] rounded-2xl border border-rule bg-surface px-6 py-12 text-center shadow-2xl sm:px-12 animate-in fade-in zoom-in-95 duration-300">
        <div className="mb-1 text-[26px] font-black text-accent">
          {m.brand}<span className="text-ink">{m.brandSuffix}</span>
        </div>
        <div className="mb-8 text-sm text-ink-3">{m.tagline}</div>

        <div className="mb-8 text-[22px] font-black text-ink">{m.question}</div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {/* Boton Lender */}
          <button
            onClick={() => handleChoice("lender")}
            className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-accent bg-accent p-4 text-accent-ink shadow-[0_4px_14px_rgba(29,78,216,0.3)] transition-transform hover:-translate-y-1"
          >
            <span className="mb-2 block text-3xl">{m.lender.icon}</span>
            <span className="font-black text-[15px]">{m.lender.title}</span>
            <span className="mt-1 block text-[11px] font-medium opacity-80">{m.lender.sub}</span>
          </button>

          {/* Boton Borrower */}
          <button
            onClick={() => handleChoice("borrower")}
            className="flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-rule-strong bg-surface p-4 text-ink transition-all hover:-translate-y-1 hover:border-accent"
          >
            <span className="mb-2 block text-3xl">{m.borrower.icon}</span>
            <span className="font-black text-[15px]">{m.borrower.title}</span>
            <span className="mt-1 block text-[11px] font-medium text-ink-3">{m.borrower.sub}</span>
          </button>

          {/* Boton Sign In */}
          <button
            onClick={() => handleChoice("signin")}
            className="flex flex-none flex-col items-center justify-center rounded-xl border-2 border-ink bg-ink p-4 text-bg transition-transform hover:-translate-y-1 sm:max-w-[160px]"
          >
            <span className="mb-2 block text-3xl">{m.signin.icon}</span>
            <span className="font-black text-[15px]">{m.signin.title}</span>
            <span className="mt-1 block text-[11px] font-medium opacity-70">{m.signin.sub}</span>
          </button>
        </div>
      </div>
    </div>
  );
}