"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSite } from "@/app/components/layout/SiteShell";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function CommitmentLetterDocView() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm text-[#8898aa]">Cargando documento...</div>}>
      <CommitmentLetterDocContent />
    </Suspense>
  );
}

function CommitmentLetterDocContent() {
  const { t, lang } = useSite();
  const isEs = lang === "es";
  const doc = t.commitmentLetterDoc;
  const searchParams = useSearchParams();
  const contractId = searchParams.get("contractId");

  const [contract, setContract] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contractId) {
      setError(doc.errorState?.reason2Title || "Falta el ID del contrato en la URL.");
      setIsLoading(false);
      return;
    }

    async function fetchContract() {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const res = await fetch(`${BASE_URL}/api/contracts/${contractId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();

        if (json.success && json.data) {
          setContract(json.data);
        } else {
          setError(json.error?.message || "No se pudo cargar el contrato.");
        }
      } catch (err) {
        console.error("Error fetching contract:", err);
        setError("Error de red al intentar cargar el documento.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchContract();
  }, [contractId, doc.errorState]);

  const formatCurrency = (val: number | string | null | undefined) => {
    if (!val) return "$0.00";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(val));
  };

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "TBD";
    const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
    const dateObj = new Date(`${cleanDate}T00:00:00`);
    return dateObj.toLocaleDateString(isEs ? "es-MX" : "en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  if (isLoading) {
    return <div className="p-10 text-center text-sm text-[#8898aa]">Generando Carta de Compromiso...</div>;
  }

  if (error || !contract) {
    return (
      <div className="mx-auto w-full max-w-[680px] p-[32px_16px] font-sans">
        <div className="rounded-[10px] border border-red-200 bg-red-50 p-8 text-center text-red-600">
          <h2 className="mb-2 text-lg font-bold">{doc.errorState?.title || "Error"}</h2>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Variables dinamicas extraidas del contrato
  const property = contract.property || {};
  const terms = contract.currentTerms || {};
  const fees = terms.feeItems || [];
  
  const principalAmount = Number(terms.principalAmount || 0);
  const interestRate = Number(terms.interestRate || 0);
  const monthlyPayment = terms.calculatedMonthlyPayment ? Number(terms.calculatedMonthlyPayment) : (principalAmount * (interestRate / 100) / 12);
  const perDiem = (principalAmount * (interestRate / 100)) / 360;
  
  // Calculo total de fees
  const totalFees = fees.reduce((sum: number, fee: any) => sum + Number(fee.computedAmount || fee.amountValue || 0), 0);

  // Datos simulados en caso de que la API no resuelva los nombres unidos (JOINs) todavia
  const lenderName = contract.lenderCompany?.companyName || "Lender Company LLC";
  const borrowerName = contract.borrowers?.[0]?.borrowerProfile?.user?.name || "Borrower Entity LLC";

  return (
    <div className="mx-auto w-full max-w-[680px] p-[32px_16px] font-sans">
      
      {/* Top Actions */}
      <div className="mb-[16px] flex items-center justify-between">
        <div className="text-[12px] font-[600] text-[#8898aa]">
          {doc.label}
        </div>
        <div className="flex gap-[8px]">
          <button className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[14px] py-[7px] text-[12px] font-[600] text-[#425466] hover:bg-gray-50">
            {doc.print}
          </button>
          <button className="cursor-pointer rounded-[6px] border-none bg-[#0a2540] px-[14px] py-[7px] text-[12px] font-[700] text-white hover:bg-[#1a365d]">
            {doc.download}
          </button>
        </div>
      </div>

      {/* Document Wrapper */}
      <div className="overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white shadow-sm">
        
        {/* Document Header */}
        <div className="flex items-center justify-between bg-[#0a2540] p-[28px_40px]">
          <div className="text-[18px] font-[800] tracking-[-0.3px] text-white">
            PayMy<span className="text-[#635bff]">Loan</span>.ai
          </div>
          <div className="text-[11px] font-[700] uppercase tracking-[0.8px] text-[#8898aa]">
            {doc.docType}
          </div>
        </div>

        {/* Document Body */}
        <div className="p-[40px]">
          <div className="mb-[6px] text-center text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">
            {doc.title}
          </div>
          <div className="mb-[32px] text-center text-[12px] text-[#8898aa]">
            {doc.subtitle}
          </div>

          {/* Section: Parties */}
          <div className="mb-[28px]">
            <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
              {doc.sections.parties}
            </div>
            <div className="grid grid-cols-2 gap-[10px]">
              <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px]">
                <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.lender}</div>
                <div className="text-[13px] font-[700] text-[#0a2540]">{lenderName}</div>
              </div>
              <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px]">
                <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.borrower}</div>
                <div className="text-[13px] font-[700] text-[#0a2540]">{borrowerName}</div>
              </div>
            </div>
          </div>

          {/* Section: Property */}
          <div className="mb-[28px]">
            <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
              {doc.sections.property}
            </div>
            <div className="grid grid-cols-2 gap-[10px]">
              <div className="col-span-2 rounded-[7px] bg-[#f6f9fc] p-[10px_14px]">
                <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.address}</div>
                <div className="text-[13px] font-[700] text-[#0a2540]">{property.addressLine1}, {property.city}, {property.state} {property.postalCode}</div>
              </div>
              <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px]">
                <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.propType}</div>
                <div className="text-[13px] font-[700] text-[#0a2540]">{property.propertyType?.replace(/_/g, " ") || "N/A"}</div>
              </div>
              <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px]">
                <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">Contract REF</div>
                <div className="text-[13px] font-[700] text-[#0a2540]">{contract.contractNumber}</div>
              </div>
            </div>
          </div>

          {/* Section: Loan Terms */}
          <div className="mb-[28px]">
            <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
              {doc.sections.terms}
            </div>
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-[#f0f4f8]">
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.loanAmount}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{formatCurrency(principalAmount)}</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.interestRate}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{interestRate}% {doc.values.perAnnum}</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.monthlyPayment}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{formatCurrency(monthlyPayment)} {terms.structure === "INTEREST_ONLY" && doc.values.io}</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.perDiem}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{formatCurrency(perDiem)}</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.term}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{terms.amortizationTermMonths} months</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.maturity}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{formatDate(terms.maturityDate)}</td>
                </tr>
                <tr>
                  <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.disbursement}</td>
                  <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{doc.values.drawBased}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section: Fees */}
          <div className="mb-[28px]">
            <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
              {doc.sections.fees}
            </div>
            
            {fees.length === 0 ? (
              <div className="py-[8px] text-[13px] italic text-[#8898aa]">Sin cargos registrados en este contrato.</div>
            ) : (
              <table className="w-full border-collapse">
                <tbody className="divide-y divide-[#f0f4f8]">
                  {fees.map((fee: any) => {
                    const codeKey = fee.code as keyof typeof doc.labels;
                    const label = doc.labels[codeKey] || fee.label || String(fee.code || "").replace(/_/g, " ");
                    const amount = Number(fee.computedAmount || fee.amountValue || 0);
                    return (
                      <tr key={fee.id}>
                        <td className="py-[8px] text-[13px] text-[#0a2540] capitalize">{label.toLowerCase()}</td>
                        <td className="py-[8px] text-right text-[13px] font-[700] text-[#0a2540]">{formatCurrency(amount)}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td className="pt-[12px] pb-[8px] text-[14px] font-[800] text-[#0a2540] border-none">{doc.labels.totalFees}</td>
                    <td className="pt-[12px] pb-[8px] text-right text-[14px] font-[800] text-[#0a2540] border-none">{formatCurrency(totalFees)}</td>
                  </tr>
                </tbody>
              </table>
            )}
            
            <div className="mt-[14px] rounded-[7px] border border-[#c7c4ff] bg-[#f0efff] p-[12px_14px] text-[12px] leading-[1.6] text-[#635bff]">
              {doc.pmlFeeNote}
            </div>
          </div>

          {/* Section: Conditions */}
          <div className="mb-[28px]">
            <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
              {doc.sections.conditions}
            </div>
            <ul className="list-none p-0">
              {doc.conditionsList.map((condition: string, i: number) => (
                <li key={i} className="flex gap-[8px] border-b border-[#f6f9fc] py-[6px] text-[13px] leading-[1.6] text-[#425466]">
                  <span className="shrink-0 font-[700] text-[#635bff]">✓</span>
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Agreement */}
          <div className="mb-[28px]">
            <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
              {doc.sections.agreement}
            </div>
            {doc.agreementTexts.map((text: string, i: number) => (
              <p key={i} className="mb-[10px] text-[13px] leading-[1.8] text-[#425466]">
                {text}
              </p>
            ))}
          </div>

          {/* Signatures */}
          <div className="mt-[32px] border-t-2 border-[#e6ebf1] pt-[28px]">
            <div className="grid grid-cols-1 gap-[32px] sm:grid-cols-2">
              <div>
                <div className="mb-[20px] text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4]">
                  {doc.labels.lenderSigRole}
                </div>
                <div className="relative mb-[6px] h-[40px] border-b-[1.5px] border-[#0a2540]">
                  {terms.status === "ACCEPTED" || contract.status === "ACTIVE" ? (
                    <span className="absolute bottom-[4px] left-0 text-[11px] font-[700] italic text-[#635bff]">
                      {doc.values.esignedBy} {lenderName}
                    </span>
                  ) : null}
                </div>
                <div className="text-[13px] font-[700] text-[#0a2540]">{lenderName}</div>
                <div className="text-[11px] text-[#8898aa]">Lender</div>
              </div>
              
              <div>
                <div className="mb-[20px] text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4]">
                  {doc.labels.borrowerSigRole}
                </div>
                <div className="relative mb-[6px] h-[40px] border-b-[1.5px] border-[#0a2540]">
                  {terms.status === "ACCEPTED" || contract.status === "ACTIVE" ? (
                    <span className="absolute bottom-[4px] left-0 text-[11px] font-[700] italic text-[#635bff]">
                      {doc.values.esignedBy} {borrowerName}
                    </span>
                  ) : null}
                </div>
                <div className="text-[13px] font-[700] text-[#0a2540]">{borrowerName}</div>
                <div className="text-[11px] text-[#8898aa]">Borrower</div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Footer */}
        <div className="border-t border-[#e6ebf1] bg-[#f6f9fc] p-[16px_40px] text-center text-[10px] leading-[1.8] text-[#aab7c4]">
          {doc.values.footerGen} • {doc.values.footerId} {contract.id} • {doc.values.footerLegal}<br />
          PayMyLoan LLC • {doc.values.footerTag} • paymyloan.ai
        </div>

      </div>
    </div>
  );
}