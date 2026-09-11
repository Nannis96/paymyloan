"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { Building, X } from "lucide-react";

function CommitmentLetterContent() {
  const params = useParams();
  const router = useRouter();
  const { t } = useSite();
  const cl = t.commitmentLetter;
  const cd = t.contractDetail;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("acc_1");

  const mockAccounts = [
    { id: "acc_1", bank: "Chase Bank", last4: "4589" }
  ];

  const handleConfirmSign = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: BACKEND - Enviar aceptacion y vincular ACH.
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/borrower`); // Redirigir al dashboard tras firmar
    }, 1500);
  };

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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-accent px-8 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 shadow-md"
            >
              {cl.actions.accept}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de ACH */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[500px] overflow-hidden rounded-2xl border border-rule bg-surface shadow-2xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-ink transition-colors hover:bg-crit hover:text-white"
            >
              <X size={18} />
            </button>
            
            <div className="p-6 sm:p-8">
              <h2 className="mb-2 text-2xl font-black tracking-tight text-ink">
                {cl.achModal.title}
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-ink-2">
                {cl.achModal.subtitle}
              </p>
              
              <form onSubmit={handleConfirmSign} className="flex flex-col gap-6">
                <div>
                  <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3">
                    {cl.achModal.selectAccount}
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
                    <select 
                      value={selectedAccount}
                      onChange={(e) => setSelectedAccount(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-rule bg-surface-2 py-3 pl-10 pr-4 text-[14px] text-ink outline-none transition-colors focus:border-accent cursor-pointer"
                    >
                      {mockAccounts.map(acc => (
                        <option key={acc.id} value={acc.id}>
                          {acc.bank} (**** {acc.last4})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 sm:flex-row mt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg border border-rule-strong bg-surface px-5 py-3.5 text-[15px] font-bold text-ink transition-colors hover:bg-surface-2 disabled:opacity-50"
                  >
                    {cl.achModal.cancel}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-lg bg-accent px-5 py-3.5 text-[15px] font-bold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {isSubmitting ? "..." : cl.achModal.confirmBtn}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
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