"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";

function LeaveReviewContent() {
  const { t, lang } = useSite();
  const lr = t.leaveReview;
  const searchParams = useSearchParams();
  const router = useRouter();
  const contractId = searchParams?.get("contractId");

  const [contract, setContract] = useState<any>(null);
  
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (contractId) {
      const fetchContract = async () => {
        try {
          const token = localStorage.getItem("accessToken") || "";
          const res = await fetch(API_ROUTES.contracts.byId(contractId), {
            headers: { Authorization: `Bearer ${token}` }
          });
          const json = await res.json();
          if (json.success) setContract(json.data);
        } catch (e) {
          console.error("No se pudo cargar el contrato:", e);
        }
      };
      fetchContract();
    }
  }, [contractId]);

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 500) {
      setReviewText(val);
    }
  };

  const handleSubmit = async () => {
    if (!rating) {
      alert(lang === "es" ? "Por favor selecciona una calificación en estrellas." : "Please select a star rating.");
      return;
    }
    if (!reviewText.trim()) {
      alert(lang === "es" ? "Por favor escribe una breve reseña." : "Please write a brief review.");
      return;
    }
    
    // Verificación de información de contacto (mismas regex del HTML)
    const phoneRegex = /\d{7,}/;
    const emailRegex = /\S+@\S+\.\S+/;
    if (phoneRegex.test(reviewText) || emailRegex.test(reviewText)) {
      alert(lang === "es" ? "Por favor elimina la información de contacto de tu reseña." : "Please remove contact information from your review.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Mock de conexión a la API
      // await fetch(`/api/contracts/${contractId}/reviews`, { method: "POST", ... })
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extraer datos o usar mocks
  const address = contract?.property?.addressLine1 || "1847 Oak Ridge Ln, Memphis TN";
  const amount = contract?.currentTerms?.principalAmount ? `$${contract.currentTerms.principalAmount.toLocaleString()}` : "$185,000";
  const rate = contract?.currentTerms?.interestRate ? `${contract.currentTerms.interestRate}%` : "10%";
  const term = contract?.currentTerms?.amortizationTermMonths ? `${contract.currentTerms.amortizationTermMonths} ${t.contractDetail.months}` : "9 months";
  // Simular fecha de cierre (ya sea por el mock o un campo del contrato que marque el término real)
  const closedDate = contract?.paidOffAt ? new Date(contract.paidOffAt).toLocaleDateString() : "Sept 29, 2026";
  
  const lenderNameFull = contract?.lenderCompany?.companyName || "James R.";
  // Acortamos el nombre para la vista si es necesario, o usamos el mock
  const lenderName = contract ? lenderNameFull : "James R.";
  const lenderInitials = lenderName.substring(0,2).toUpperCase();
  const lenderRole = contract ? `Private Lender · ${contract.lenderCompany?.city || 'Memphis'}, ${contract.lenderCompany?.state || 'TN'}` : "Private Lender · Memphis, TN · 23 deals funded";

  return (
    <div className="max-w-[600px] mx-auto animate-in fade-in duration-300 font-sans pb-10">
      
      <div className="text-[24px] font-[800] text-[#0a2540] mb-[6px]">
        {lr.pageTitle}
      </div>
      <div className="text-[14px] text-[#8898aa] mb-[32px] leading-[1.6]">
        {lr.pageSub}
      </div>

      <div className="bg-white border border-[#e6ebf1] rounded-[10px] p-[16px_20px] mb-[28px] flex items-center justify-between shadow-sm">
        <div>
          <div className="text-[14px] font-[700] text-[#0a2540]">{address}</div>
          <div className="text-[12px] text-[#8898aa] mt-[2px]">{amount} · {rate} · {term} · Closed {closedDate}</div>
        </div>
        <span className="bg-[#e8f5e9] text-[#2e7d32] text-[11px] font-[700] p-[3px_10px] rounded-[10px] shrink-0">
          {lr.closedBadge}
        </span>
      </div>

      {!isSubmitted ? (
        <div className="bg-white border border-[#e6ebf1] rounded-[12px] p-[28px_32px] mb-[20px] shadow-sm animate-in fade-in zoom-in-95">
          <div className="text-[15px] font-[800] text-[#0a2540] mb-[6px]">{lr.rateTitle}</div>
          <div className="text-[13px] text-[#8898aa] mb-[20px]">{lr.rateSub}</div>

          <div className="flex items-center gap-[12px] mb-[20px]">
            <div className="w-[44px] h-[44px] rounded-full bg-[#0a2540] text-white text-[15px] font-[700] flex items-center justify-center shrink-0">
              {lenderInitials}
            </div>
            <div>
              <div className="text-[14px] font-[700] text-[#0a2540]">{lenderName}</div>
              <div className="text-[12px] text-[#8898aa]">{lenderRole}</div>
            </div>
          </div>

          <div className="flex gap-[8px] mb-[20px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <div 
                key={star}
                onClick={() => setRating(star)}
                className={`text-[32px] cursor-pointer user-select-none transition-colors duration-100 ${star <= rating ? "text-[#f59e0b]" : "text-[#e6ebf1] hover:text-[#f59e0b]"}`}
              >
                ★
              </div>
            ))}
          </div>
          <div className="text-[12px] text-[#8898aa] -mt-[14px] mb-[20px]">
            {rating === 0 ? lr.tapToRate : lr.labels[rating]}
          </div>

          <div className="mt-[20px]">
            <label className="text-[13px] font-[700] text-[#0a2540] block mb-[8px]">{lr.writeReview}</label>
            <textarea 
              value={reviewText}
              onChange={handleTextChange}
              placeholder={lr.reviewPh}
              className="w-full border-[1.5px] border-[#e6ebf1] rounded-[8px] p-[12px_14px] text-[14px] font-sans outline-none resize-y min-h-[100px] transition-colors focus:border-[#635bff] text-[#0a2540]"
            ></textarea>
            <div className="text-[11px] text-[#aab7c4] text-right mt-[4px]">
              {reviewText.length} / 500
            </div>
          </div>

          <div className="mt-[16px]">
            <div className="text-[12px] font-[700] text-[#8898aa] uppercase tracking-[0.4px] mb-[8px]">{lr.tagsTitle}</div>
            <div className="flex flex-wrap gap-[8px]">
              {lr.tags.map((tag: string, idx: number) => (
                <div 
                  key={idx}
                  onClick={() => handleTagToggle(tag)}
                  className={`border-[1.5px] rounded-[20px] p-[5px_14px] text-[12px] font-[600] cursor-pointer transition-all duration-100 select-none ${selectedTags.includes(tag) ? "bg-[#f0efff] border-[#635bff] text-[#635bff]" : "border-[#e6ebf1] text-[#425466] hover:border-[#635bff] hover:text-[#635bff]"}`}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f8f9ff] border border-[#e6ebf1] rounded-[8px] p-[12px_16px] text-[12px] text-[#8898aa] leading-[1.6] mt-[16px]">
            <strong className="text-[#0a2540]">{lr.importantNote.split(":")[0]}:</strong>{lr.importantNote.split(":")[1]}
          </div>

          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#635bff] text-white border-none rounded-[6px] p-[14px] text-[15px] font-[700] cursor-pointer mt-[24px] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? "..." : lr.submitBtn}
          </button>
          <button 
            onClick={() => router.push("/borrowerDashboard")}
            disabled={isSubmitting}
            className="w-full bg-white border-[1.5px] border-[#e6ebf1] text-[#425466] rounded-[6px] p-[13px] text-[14px] font-[600] cursor-pointer mt-[10px] transition-colors hover:border-[#aab7c4] disabled:opacity-50"
          >
            {lr.skipBtn}
          </button>
        </div>
      ) : (
        <div className="text-center p-[20px_0] animate-in fade-in zoom-in-95">
          <div className="text-[48px] mb-[16px]">🌟</div>
          <div className="text-[20px] font-[800] text-[#0a2540] mb-[8px]">{lr.submittedTitle}</div>
          <div className="text-[14px] text-[#8898aa] leading-[1.6] max-w-[400px] mx-auto">
            {lr.submittedSub.replace("{name}", lenderNameFull).replace("{name}", lenderNameFull)}
          </div>
          <button 
            onClick={() => router.push("/borrowerDashboard")}
            className="w-full max-w-[280px] bg-[#635bff] text-white border-none rounded-[6px] p-[14px] text-[15px] font-[700] cursor-pointer mt-[24px] mx-auto block transition-opacity hover:opacity-90"
          >
            {lr.backBtn}
          </button>
        </div>
      )}

    </div>
  );
}

export default function LeaveReviewPage() {
  return (
    <SiteShell isDashboard={true}>
      <Suspense fallback={<div className="p-8 text-[#8898aa]">Cargando vista...</div>}>
        <LeaveReviewContent />
      </Suspense>
    </SiteShell>
  );
}