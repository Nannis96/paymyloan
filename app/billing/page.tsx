"use client";

import { useState } from "react";
import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { Lock, CreditCard } from "lucide-react";

export default function BillingPage() {
  return (
    <SiteShell isDashboard={true}>
      <BillingContent />
    </SiteShell>
  );
}

function BillingContent() {
  const { t } = useSite();
  const b = t.billing;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: BACKEND - Integracion real con Stripe Elements.
    // Aqui se crearia el PaymentMethod y se enviaria al backend para crear la Subscription.
    console.log("Procesando pago de $9/mes...");

    setTimeout(() => {
      setIsSubmitting(false);
      // Redirigir al dashboard de borrower tras el exito
      window.location.href = "/borrower";
    }, 1500);
  };

  const INPUT = "w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-accent";

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14 flex items-center justify-center">
      <div className="w-full max-w-[500px]">
        
        <Link
          href="/borrower"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> Volver
        </Link>

        <div className="rounded-2xl border border-rule bg-surface p-8 shadow-xl sm:p-10">
          <header className="mb-8 text-center border-b border-rule pb-6">
            <h1 className="text-[28px] font-black tracking-tight text-ink">{b.title}</h1>
            <p className="text-ink-2 mt-2 text-sm leading-relaxed">{b.subtitle}</p>
          </header>

          <div className="mb-6 flex items-center justify-between rounded-xl bg-surface-2 p-5 border border-rule">
            <div>
              <div className="text-[13px] font-bold text-ink">{b.planName}</div>
              <div className="text-[11px] text-ink-3 mt-1">Facturado mensualmente</div>
            </div>
            <div className="text-lg font-black text-accent">{b.planPrice}</div>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3">
                {b.cardLabel}
              </label>
              
              {/* Elemento falso simulando Stripe Elements para el diseño UI */}
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000" 
                  className={`${INPUT} pl-10 font-mono`} 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input type="text" placeholder="MM/YY" className={`${INPUT} font-mono`} required />
                <input type="text" placeholder="CVC" className={`${INPUT} font-mono`} required />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-lg bg-accent px-5 py-4 text-[15px] font-bold text-accent-ink transition-opacity hover:opacity-90 shadow-md disabled:opacity-50"
            >
              {isSubmitting ? b.processing : b.payBtn}
            </button>
          </form>

          <p className="mt-6 flex items-start justify-center gap-2 text-center text-[11px] leading-relaxed text-ink-3">
            <Lock className="mt-[2px] h-3 w-3 shrink-0" />
            {b.secureNote}
          </p>
        </div>
      </div>
    </div>
  );
}