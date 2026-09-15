"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { Building, X } from "lucide-react";

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Interfaces basadas en la respuesta de Prisma
interface FeeItem {
  id: string;
  category: string;
  code: string;
  label: string;
  computedAmount: number | string;
}

interface ContractData {
  id: string;
  contractNumber: string;
  currentTermsId: string | null;
  currentTerms: {
    id: string;
    principalAmount: number | string;
    feeItems: FeeItem[];
  } | null;
}

function CommitmentLetterContent() {
  const params = useParams();
  const contractId = params?.id as string;
  const router = useRouter();
  const { t } = useSite();
  const cl = t.commitmentLetter;
  const cd = t.contractDetail;

  const [contract, setContract] = useState<ContractData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("acc_1");

  const mockAccounts = [
    { id: "acc_1", bank: "Chase Bank", last4: "4589" }
  ];

  useEffect(() => {
    async function fetchContract() {
      if (!contractId) return;
      try {
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(`${API_URL}/api/contracts/${contractId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) throw new Error(cl.errorAuth);
          throw new Error(`HTTP ${response.status}: ${cl.errorFetch}`);
        }

        const json = await response.json();
        if (json.success) {
          setContract(json.data);
        } else {
          throw new Error(json.error?.message || cl.errorFetch);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : cl.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }
    fetchContract();
  }, [contractId, cl.errorAuth, cl.errorFetch, cl.errorNetwork]);

  const handleConfirmSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract?.currentTerms?.id) return;
    
    setIsSubmitting(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const termsId = contract.currentTerms.id;
      
      const response = await fetch(`${API_URL}/api/contracts/${contractId}/terms/${termsId}/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error?.message || cl.errorAccept);

      router.push(`/borrower`);
    } catch (err) {
      setError(err instanceof Error ? err.message : cl.errorNetwork);
      setIsSubmitting(false);
      setIsModalOpen(false);
    }
  };

  const handleReject = async () => {
    if (!contract?.currentTerms?.id) return;
    
    const comment = window.prompt(cl.rejectCommentPh);
    if (comment === null) return; // El usuario canceló el prompt

    setIsRejecting(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const termsId = contract.currentTerms.id;
      
      const response = await fetch(`${API_URL}/api/contracts/${contractId}/terms/${termsId}/reject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ comment })
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error?.message || cl.errorReject);

      router.push(`/borrower`);
    } catch (err) {
      setError(err instanceof Error ? err.message : cl.errorNetwork);
      setIsRejecting(false);
    }
  };

  const formatCurrency = (amount: number | string) => {
    return Number(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg p-6 lg:p-14 flex items-center justify-center">
        <p className="text-ink-3">{cl.loading}</p>
      </div>
    );
  }

  const feeItems = contract?.currentTerms?.feeItems || [];
  const totalFees = feeItems.reduce((sum, item) => sum + Number(item.computedAmount), 0);

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[800px]">
        <Link
          href={`/contracts/${contractId || ''}`}
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> {cd.back}
        </Link>
        <div className="rounded-2xl border border-rule bg-surface p-8 shadow-xl sm:p-12">
          <header className="mb-10 border-b border-rule pb-8 text-center">
            <h1 className="text-[28px] font-black tracking-tight text-ink">{cl.title}</h1>
            <p className="text-ink-2 mt-2">REF: {contract?.contractNumber || contractId}</p>
          </header>

          {error && (
            <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          <section className="mb-10">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">
              {cl.fees.title}
            </h2>
            <div className="overflow-hidden rounded-xl border border-rule">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-rule">
                  {feeItems.length === 0 ? (
                    <tr className="bg-bg">
                      <td colSpan={2} className="px-5 py-4 text-center text-ink-3">Sin tarifas registradas</td>
                    </tr>
                  ) : (
                    feeItems.map((fee) => (
                      <tr key={fee.id} className="bg-bg">
                        <td className="px-5 py-4 font-medium text-ink-2">
                          {fee.label || cl.customFeeFallback}
                          {fee.code === "MARKETPLACE_CONNECTION" && (
                            <div className="text-xs text-ink-3 mt-1">{cl.paidTo}</div>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right font-mono text-ink">
                          {formatCurrency(fee.computedAmount)}
                        </td>
                      </tr>
                    ))
                  )}
                  <tr className="bg-ink text-bg">
                    <td className="px-5 py-4 font-bold">{cl.fees.totalDue}</td>
                    <td className="px-5 py-4 text-right font-mono font-bold">
                      {formatCurrency(totalFees)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <p className="mb-8 text-xs leading-relaxed text-ink-3 text-center">
            {cl.disclaimer}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button 
              onClick={handleReject}
              disabled={isRejecting || isSubmitting}
              className="rounded-lg border border-rule-strong bg-surface px-6 py-3 text-sm font-bold text-ink transition-colors hover:border-crit hover:text-crit disabled:opacity-50"
            >
              {isRejecting ? cl.rejecting : cl.actions.decline}
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              disabled={isRejecting || isSubmitting || !contract?.currentTerms}
              className="rounded-lg bg-accent px-8 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 shadow-md disabled:opacity-50"
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
                    {isSubmitting ? cl.accepting : cl.achModal.confirmBtn}
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