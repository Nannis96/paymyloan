"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function PayoffRequestContent() {
  const params = useParams();
  const contractId = params?.id as string;
  const router = useRouter();
  
  const { t } = useSite();
  const po = t.payoff;
  const cd = t.contractDetail;

  const [expectedDate, setExpectedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestPayoff = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: BACKEND - Enviar peticion a la API. Esto debe disparar un correo al prestamista
      // con la fecha de cierre esperada para que el sistema auto-genere la carta.
      // const token = localStorage.getItem("accessToken") || "";
      // const response = await fetch(`${API_URL}/api/contracts/${contractId}/payoff`, { ... })
      
      // Simulacion temporal de la peticion
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(po.successAlert);
      router.push(`/contracts/${contractId || ''}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : po.errorNetwork);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[600px]">
        <Link
          href={`/contracts/${contractId || ''}`}
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> {cd.back}
        </Link>
        <div className="rounded-2xl border border-rule bg-surface p-8 shadow-xl">
          <header className="mb-8 border-b border-rule pb-6 text-center">
            <h1 className="text-[28px] font-black tracking-tight text-ink">{po.title}</h1>
            <p className="text-ink-2 mt-2">REF: {contractId || 'CTR-001'}</p>
          </header>

          {error && (
            <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500 text-center">
              {error}
            </div>
          )}

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
              {isSubmitting ? po.processing : po.requestBtn}
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