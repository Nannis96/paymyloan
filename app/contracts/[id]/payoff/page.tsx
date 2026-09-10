"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

function PayoffRequestContent() {
  const params = useParams();
  const { t } = useSite();
  const po = t.payoff;
  const cd = t.contractDetail;

  const [expectedDate, setExpectedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRequestPayoff = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: BACKEND - Enviar peticion a la API. Esto debe disparar un correo al prestamista
    // con la fecha de cierre esperada para que el sistema auto-genere la carta.
    console.log("Solicitando payoff para:", params?.id || 'CTR-001', "Fecha:", expectedDate);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(po.successAlert);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[600px]">
        <button
          onClick={() => window.history.back()}
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> {cd.back}
        </button>

        <div className="rounded-2xl border border-rule bg-surface p-8 shadow-xl">
          <header className="mb-8 border-b border-rule pb-6 text-center">
            <h1 className="text-[28px] font-black tracking-tight text-ink">{po.title}</h1>
            <p className="text-ink-2 mt-2">REF: {params?.id || 'CTR-001'}</p>
          </header>

          <form onSubmit={handleRequestPayoff} className="flex flex-col gap-6">
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3">
                {po.expectedDate}
              </label>
              <input
                type="date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                required
                className="w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[15px] text-ink outline-none transition-colors focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-lg bg-accent px-5 py-3.5 text-[15px] font-bold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "..." : po.requestBtn}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function PayoffRequestPage() {
  return (
    <SiteShell isDashboard={true}>
      <PayoffRequestContent />
    </SiteShell>
  );
}