"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

export default function IssueCommitmentPage() {
  return (
    <SiteShell isDashboard={true}>
      <IssueCommitmentContent />
    </SiteShell>
  );
}

function IssueCommitmentContent() {
  const params = useParams();
  const router = useRouter();
  const { t } = useSite();
  const cd = t.contractDetail; 
  const ic = t.issueCommitment;

  const [originationPoints, setOriginationPoints] = useState("2");
  const [processingFee, setProcessingFee] = useState("500");
  const [underwritingFee, setUnderwritingFee] = useState("500");
  const [docPrepFee, setDocPrepFee] = useState("250");
  const [customFeeName, setCustomFeeName] = useState("");
  const [customFeeAmount, setCustomFeeAmount] = useState("");
  const [latePenalty, setLatePenalty] = useState("");
  const [prePayPenalty, setPrePayPenalty] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const LABEL = "mb-2 block text-[11px] font-bold uppercase tracking-widest text-ink-3";
  const INPUT = "w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 outline-none transition-colors focus:border-accent";

  const handleIssueLetter = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: BACKEND - Enviar payload
    const contractId = params?.id || 'CTR-001';
    setTimeout(() => {
      setIsSubmitting(false);
      router.push(`/contracts/${contractId}/commitment`);
    }, 1200);
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

        <div className="rounded-2xl border border-rule bg-surface p-8 shadow-xl sm:p-10">
          <header className="mb-8 border-b border-rule pb-6">
            <h1 className="text-[28px] font-black tracking-tight text-ink">{ic.title}</h1>
            <p className="text-ink-2 mt-2">{ic.subtitle} {params?.id || 'CTR-001'}</p>
          </header>

          <form onSubmit={handleIssueLetter} className="flex flex-col gap-6">
            
            <h3 className="text-sm font-bold text-ink">{ic.closingFeesTitle}</h3>
            <div>
              <label className={LABEL}>{ic.originationPoints}</label>
              <input type="number" step="0.1" min="0" value={originationPoints} onChange={(e) => setOriginationPoints(e.target.value)} placeholder={ic.phPoints} className={INPUT} required />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={LABEL}>{ic.processingFee}</label>
                <input type="number" min="0" value={processingFee} onChange={(e) => setProcessingFee(e.target.value)} placeholder={ic.phFee} className={INPUT} />
              </div>
              <div>
                <label className={LABEL}>{ic.underwritingFee}</label>
                <input type="number" min="0" value={underwritingFee} onChange={(e) => setUnderwritingFee(e.target.value)} placeholder={ic.phFee} className={INPUT} />
              </div>
              <div>
                <label className={LABEL}>{ic.docPrepFee}</label>
                <input type="number" min="0" value={docPrepFee} onChange={(e) => setDocPrepFee(e.target.value)} placeholder="0" className={INPUT} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 border-t border-rule pt-6">
              <div>
                <label className={LABEL}>{ic.customFeeName}</label>
                <input type="text" value={customFeeName} onChange={(e) => setCustomFeeName(e.target.value)} placeholder={ic.customFeeNamePh} className={INPUT} />
              </div>
              <div>
                <label className={LABEL}>{ic.customFeeAmount}</label>
                <input type="number" min="0" value={customFeeAmount} onChange={(e) => setCustomFeeAmount(e.target.value)} placeholder="0" className={INPUT} />
              </div>
            </div>

            <h3 className="text-sm font-bold text-ink border-t border-rule pt-6 mt-2">{ic.penaltiesTitle}</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={LABEL}>{ic.latePenalty}</label>
                <input type="text" value={latePenalty} onChange={(e) => setLatePenalty(e.target.value)} placeholder={ic.latePenaltyPh} className={INPUT} />
              </div>
              <div>
                <label className={LABEL}>{ic.prePayPenalty}</label>
                <input type="text" value={prePayPenalty} onChange={(e) => setPrePayPenalty(e.target.value)} placeholder={ic.prePayPenaltyPh} className={INPUT} />
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-surface-2 p-4 border border-rule-strong">
              <p className="text-xs text-ink-3">
                <strong className="text-ink-2">{ic.systemNoteTitle}</strong> {ic.systemNote}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-lg bg-accent px-5 py-3.5 text-[15px] font-bold text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? ic.submitting : ic.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}