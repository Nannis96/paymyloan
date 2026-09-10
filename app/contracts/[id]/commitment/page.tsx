"use client";

import { useParams } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

function CommitmentLetterContent() {
  const params = useParams();
  const { t } = useSite();
  const cl = t.commitmentLetter;
  const cd = t.contractDetail;

  // TODO: MOCK TEMPORAL. 
  // Obtener los fees desglosados desde la API cuando este lista.
  // CRITICO: El Connection Fee de PML debe calcularse dinamicamente en el backend
  // (1 punto del loan amount, min $999) SOLO si el trato provino del Marketplace 
  // publico. Si fue invitacion directa, el costo es $0 (segun specs).
  const mockFees = {
    loanAmount: "$100,000.00",
    origination: "$2,000.00", // 2 pts
    processing: "$500.00",
    underwriting: "$500.00",
    platformFee: "$1,000.00", // 1 pt (min $999)
    totalDue: "$4,000.00"
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[800px]">
        <button
          onClick={() => window.history.back()}
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> {cd.back}
        </button>

        <div className="rounded-2xl border border-rule bg-surface p-8 shadow-xl sm:p-12">
          <header className="mb-10 border-b border-rule pb-8 text-center">
            <h1 className="text-[28px] font-black tracking-tight text-ink">{cl.title}</h1>
            <p className="text-ink-2 mt-2">REF: {params?.id || 'CTR-001'}</p>
          </header>

          <section className="mb-10">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">
              {cl.fees.title}
            </h2>
            <div className="overflow-hidden rounded-xl border border-rule">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-rule">
                  <tr className="bg-bg">
                    <td className="px-5 py-4 font-medium text-ink-2">{cl.fees.origination}</td>
                    <td className="px-5 py-4 text-right font-mono text-ink">{mockFees.origination}</td>
                  </tr>
                  <tr className="bg-bg">
                    <td className="px-5 py-4 font-medium text-ink-2">{cl.fees.processing}</td>
                    <td className="px-5 py-4 text-right font-mono text-ink">{mockFees.processing}</td>
                  </tr>
                  <tr className="bg-bg">
                    <td className="px-5 py-4 font-medium text-ink-2">{cl.fees.underwriting}</td>
                    <td className="px-5 py-4 text-right font-mono text-ink">{mockFees.underwriting}</td>
                  </tr>
                  <tr className="bg-surface-2">
                    <td className="px-5 py-4 font-medium text-ink-2">
                      {cl.fees.platform}
                      <div className="text-xs text-ink-3 mt-1">Paid to Dueño a Dueño LLC</div>
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-ink">{mockFees.platformFee}</td>
                  </tr>
                  <tr className="bg-ink text-bg">
                    <td className="px-5 py-4 font-bold">{cl.fees.totalDue}</td>
                    <td className="px-5 py-4 text-right font-mono font-bold">{mockFees.totalDue}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <p className="mb-8 text-xs leading-relaxed text-ink-3 text-center">
            {cl.disclaimer}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-lg border border-rule-strong bg-surface px-6 py-3 text-sm font-bold text-ink transition-colors hover:border-crit hover:text-crit">
              {cl.actions.decline}
            </button>
            <button className="rounded-lg bg-accent px-8 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 shadow-md">
              {cl.actions.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CommitmentLetterPage() {
  return (
    <SiteShell isDashboard={true}>
      <CommitmentLetterContent />
    </SiteShell>
  );
}