"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FlowSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFlow = searchParams.get("flow") || "borrower";

  const handleToggle = (flow: "lender" | "borrower") => {
    // Preserva otros parámetros de la URL si existen, o simplemente cambia el flow
    router.push(`?flow=${flow}`);
  };

  return (
    <div className="fixed top-4 left-1/2 z-[100] -translate-x-1/2 flex items-center rounded-full bg-surface p-1 border border-rule shadow-sm">
      <div className="relative flex items-center bg-surface-2 rounded-full p-0.5">
        <button
          onClick={() => handleToggle("borrower")}
          className={`relative z-10 rounded-full px-5 py-1.5 text-xs font-bold transition-all duration-300 ${
            currentFlow !== "lender"
              ? "bg-accent text-white shadow-[0_0_12px_rgba(99,91,255,0.4)]"
              : "text-ink-3 hover:text-ink"
          }`}
        >
          Prestatario (Borrower)
        </button>
        <button
          onClick={() => handleToggle("lender")}
          className={`relative z-10 rounded-full px-5 py-1.5 text-xs font-bold transition-all duration-300 ${
            currentFlow === "lender"
              ? "bg-accent text-white shadow-[0_0_12px_rgba(99,91,255,0.4)]"
              : "text-ink-3 hover:text-ink"
          }`}
        >
          Prestamista (Lender)
        </button>
      </div>
    </div>
  );
}