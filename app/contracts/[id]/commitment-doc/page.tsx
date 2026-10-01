"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import LangToggle from "@/app/components/ambos/LangToggle";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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
  status: string;
  property: {
    addressLine1: string;
    city: string;
    state: string;
    postalCode: string;
    propertyType: string;
    afterRepairValue?: number;
  };
  currentTerms: {
    id: string;
    principalAmount: number | string;
    interestRate: number | string;
    amortizationTermMonths: number;
    structure: string;
    calculatedMonthlyPayment: number | string | null;
    maturityDate?: string;
    feeItems: FeeItem[];
  } | null;
  borrowers?: {
    borrowerProfileId: string;
    isPrimary: boolean;
    borrowerProfile?: {
      user?: {
        name: string;
      }
    }
  }[];
}

export default function CommitmentLetterDocPage() {
  return (
    <SiteShell isMinimal={true}>
      <CommitmentLetterDocContent />
    </SiteShell>
  );
}

function CommitmentLetterDocContent() {
  const params = useParams();
  const contractId = params?.id as string;
  const { t, lang } = useSite();
  const doc = t.commitmentLetterDoc;

  const [contract, setContract] = useState<ContractData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  
  // Referencia al contenedor del documento para generar el PDF
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchContract() {
      if (!contractId) return;
      try {
        const token = localStorage.getItem("accessToken") || "";
        const response = await fetch(`${API_URL}/api/contracts/${contractId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: Error al cargar contrato`);
        }

        const json = await response.json();
        if (json.success) {
          setContract(json.data);
        } else {
          throw new Error(json.error?.message || "Error al cargar contrato");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error de red desconocido");
      } finally {
        setIsLoading(false);
      }
    }
    fetchContract();
  }, [contractId]);

  // Manejador para impresion nativa del navegador
  const handlePrint = () => {
    window.print();
  };

  // Manejador para descarga de PDF
  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    setIsGeneratingPDF(true);
    
    try {
      // Importacion dinamica para evitar errores con SSR en Next.js
      // @ts-ignore
      const html2pdf = (await import("html2pdf.js")).default;
      
      const opt = {
        margin: [10, 0, 10, 0] as [number, number, number, number], // Margenes: top, right, bottom, left
        filename: `${doc.title}_${contract?.contractNumber || contractId}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          unit: 'mm' as const,
          format: 'letter' as const,
          orientation: 'portrait' as const,
        },
      };
      
      await html2pdf().set(opt).from(contentRef.current).save();
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Hubo un error al generar el PDF. Por favor, intenta de nuevo.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Formateadores
  const formatCurrency = (amount: number | string | null | undefined) => {
    if (amount == null) return "N/D";
    return Number(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/D";
    return new Date(dateString).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });
  };

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-bg"><p className="text-ink-3">Cargando documento...</p></div>;
  }

  if (error || !contract || !contract.currentTerms) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg p-6">
        <div className="w-full max-w-md rounded-2xl border border-rule bg-surface p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-soft text-amber">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold tracking-tight text-ink">{doc.errorState.title}</h2>
          <p className="mb-6 text-sm text-ink-3">
            {error || doc.errorState.desc}
          </p>
          
          <div className="mb-8 flex flex-col gap-3 text-left">
            <div className="rounded-xl border border-rule bg-surface-2 p-4 text-sm text-ink-2">
              <strong className="mb-1 block text-ink">{doc.errorState.reason1Title}</strong>
              {doc.errorState.reason1Desc}
            </div>
            <div className="rounded-xl border border-rule bg-surface-2 p-4 text-sm text-ink-2">
              <strong className="mb-1 block text-ink">{doc.errorState.reason2Title}</strong>
              {doc.errorState.reason2Desc}
            </div>
          </div>

          <Link 
            href={contract ? `/contracts/${contractId}` : "/contracts"} 
            className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-5 py-3.5 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 shadow-sm"
          >
            {contract ? doc.errorState.btnContract : doc.errorState.btnAll}
          </Link>
        </div>
      </div>
    );
  }

  // Datos calculados
  const primaryBorrower = contract.borrowers?.find(b => b.isPrimary) || contract.borrowers?.[0];
  const borrowerName = primaryBorrower?.borrowerProfile?.user?.name || "Prestatario";
  const propertyAddress = `${contract.property.addressLine1}, ${contract.property.city}, ${contract.property.state} ${contract.property.postalCode || ""}`;
  
  const feeItems = contract.currentTerms.feeItems || [];
  const totalFees = feeItems.reduce((sum, item) => sum + Number(item.computedAmount), 0);
  
  const arv = contract.property.afterRepairValue;
  const principal = Number(contract.currentTerms.principalAmount);
  const ltv = arv && arv > 0 ? ((principal / arv) * 100).toFixed(1) : "N/D";

  return (
    // Agregamos clases de impresion (print:*) para limpiar la vista en papel/PDF nativo
    <div className="min-h-screen bg-bg p-[32px_16px] font-sans print:bg-white print:p-0">
      <div className="mx-auto w-full max-w-[680px] print:max-w-full">
        
        {/* Top Actions - Ocultos al imprimir */}
        <div className="mb-[16px] flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center print:hidden">
          <div className="flex w-full items-center justify-between sm:w-auto sm:justify-start sm:gap-4">
            <Link href={`/contracts/${contractId}`} className="text-[12px] font-[600] text-[#8898aa] hover:text-[#635bff] transition-colors">
              &larr; Volver al contrato
            </Link>
            <div className="hidden h-5 w-px bg-rule sm:block"></div>
            <div className="flex items-center gap-2">
              <LangToggle className="h-8 min-w-8 rounded-md border border-rule-strong bg-surface px-2 text-xs font-bold text-ink-2 transition-colors hover:border-accent hover:text-accent" />
              <ThemeToggle className="h-8 w-8 rounded-md border border-rule-strong bg-surface text-ink-2 transition-colors hover:border-accent hover:text-accent" iconSize={14} />
            </div>
          </div>
          <div className="flex w-full gap-[8px] sm:w-auto">
            <button onClick={handlePrint} className="flex-1 cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[14px] py-[7px] text-[12px] font-[600] text-[#425466] transition-colors hover:bg-[#f6f9fc] sm:flex-none">
              {doc.print}
            </button>
            <button onClick={handleDownloadPDF} disabled={isGeneratingPDF} className="flex-1 cursor-pointer rounded-[6px] border-none bg-[#0a2540] px-[14px] py-[7px] text-[12px] font-[700] text-white transition-colors hover:bg-[#153457] disabled:opacity-50 sm:flex-none">
              {isGeneratingPDF ? "Procesando..." : doc.download}
            </button>
          </div>
        </div>

        {/* Document Wrapper - Este es el contenedor que se capturara para el PDF */}
        <div ref={contentRef} className="overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white shadow-sm print:border-none print:shadow-none">
          
          {/* Document Header */}
          <div className="flex items-center justify-between bg-[#0a2540] p-[28px_40px] print:!bg-[#0a2540]">
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
                <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px] print:bg-[#f6f9fc]">
                  <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.lender}</div>
                  <div className="text-[13px] font-[700] text-[#0a2540]">Entidad Prestamista LLC</div>
                </div>
                <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px] print:bg-[#f6f9fc]">
                  <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.lenderSig}</div>
                  <div className="text-[13px] font-[700] text-[#0a2540]">Representante Legal</div>
                </div>
                <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px] print:bg-[#f6f9fc]">
                  <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.borrower}</div>
                  <div className="text-[13px] font-[700] text-[#0a2540]">{borrowerName}</div>
                </div>
                <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px] print:bg-[#f6f9fc]">
                  <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.borrowerSig}</div>
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
                <div className="col-span-2 rounded-[7px] bg-[#f6f9fc] p-[10px_14px] print:bg-[#f6f9fc]">
                  <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.address}</div>
                  <div className="text-[13px] font-[700] text-[#0a2540]">{propertyAddress}</div>
                </div>
                <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px] print:bg-[#f6f9fc]">
                  <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.propType}</div>
                  <div className="text-[13px] font-[700] text-[#0a2540] capitalize">{contract.property.propertyType.replace(/_/g, " ")}</div>
                </div>
                <div className="rounded-[7px] bg-[#f6f9fc] p-[10px_14px] print:bg-[#f6f9fc]">
                  <div className="mb-[3px] text-[10px] font-[700] uppercase tracking-[0.4px] text-[#aab7c4]">{doc.labels.exit}</div>
                  <div className="text-[13px] font-[700] text-[#0a2540]">Standard</div>
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
                    <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{formatCurrency(principal)}</td>
                  </tr>
                  <tr>
                    <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.interestRate}</td>
                    <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{contract.currentTerms.interestRate}% {doc.values.perAnnum}</td>
                  </tr>
                  <tr>
                    <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.monthlyPayment}</td>
                    <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{formatCurrency(contract.currentTerms.calculatedMonthlyPayment)} {doc.values.io}</td>
                  </tr>
                  <tr>
                    <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.term}</td>
                    <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{contract.currentTerms.amortizationTermMonths} meses</td>
                  </tr>
                  <tr>
                    <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.maturity}</td>
                    <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{formatDate(contract.currentTerms.maturityDate)}</td>
                  </tr>
                  <tr>
                    <td className="w-[45%] py-[9px] text-[13px] align-top text-[#8898aa]">{doc.labels.ltv}</td>
                    <td className="py-[9px] text-[13px] font-[700] align-top text-[#0a2540]">{ltv}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section: Fees */}
            <div className="mb-[28px]">
              <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
                {doc.sections.fees}
              </div>
              <table className="w-full border-collapse">
                <tbody className="divide-y divide-[#f0f4f8]">
                  {feeItems.map((fee) => (
                    <tr key={fee.id}>
                      <td className="py-[8px] text-[13px] text-[#0a2540]">{fee.label}</td>
                      <td className="py-[8px] text-right text-[13px] font-[700] text-[#0a2540]">{formatCurrency(fee.computedAmount)}</td>
                    </tr>
                  ))}
                  {feeItems.length === 0 && (
                    <tr>
                      <td colSpan={2} className="py-[8px] text-[13px] text-[#8898aa] text-center">No hay tarifas registradas</td>
                    </tr>
                  )}
                  <tr>
                    <td className="pt-[12px] pb-[8px] text-[14px] font-[800] text-[#0a2540] border-none">{doc.labels.totalFees}</td>
                    <td className="pt-[12px] pb-[8px] text-right text-[14px] font-[800] text-[#0a2540] border-none">{formatCurrency(totalFees)}</td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-[14px] rounded-[7px] border border-[#c7c4ff] bg-[#f0efff] p-[12px_14px] text-[12px] leading-[1.6] text-[#635bff] print:bg-[#f0efff]">
                {doc.pmlFeeNote}
              </div>
            </div>

            {/* Section: Conditions */}
            <div className="mb-[28px]">
              <div className="mb-[14px] border-b-2 border-[#f0efff] pb-[6px] text-[11px] font-[700] uppercase tracking-[0.7px] text-[#635bff]">
                {doc.sections.conditions}
              </div>
              <ul className="list-none p-0">
                {doc.conditionsList.map((condition, i) => (
                  <li key={i} className="flex gap-[8px] border-b border-[#f6f9fc] py-[6px] text-[13px] leading-[1.6] text-[#425466]">
                    <span className="shrink-0 font-[700] text-[#635bff]">·</span>
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
              {doc.agreementTexts.map((text, i) => (
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
                    <span className="absolute bottom-[4px] left-0 text-[11px] font-[700] italic text-[#635bff]">
                      {doc.values.esignedBy} Entidad Prestamista LLC
                    </span>
                  </div>
                  <div className="text-[13px] font-[700] text-[#0a2540]">Entidad Prestamista LLC</div>
                  <div className="text-[11px] text-[#8898aa]">Lender</div>
                </div>
                <div>
                  <div className="mb-[20px] text-[10px] font-[700] uppercase tracking-[0.6px] text-[#aab7c4]">
                    {doc.labels.borrowerSigRole}
                  </div>
                  <div className="relative mb-[6px] h-[40px] border-b-[1.5px] border-[#0a2540]">
                    {contract.status === "ACTIVE" || contract.status === "DELINQUENT" ? (
                      <span className="absolute bottom-[4px] left-0 text-[11px] font-[700] italic text-[#635bff]">
                        {doc.values.esignedBy} {borrowerName}
                      </span>
                    ) : (
                      <span className="absolute bottom-[4px] left-0 text-[11px] italic text-[#aab7c4]">
                        Pendiente de firma
                      </span>
                    )}
                  </div>
                  <div className="text-[13px] font-[700] text-[#0a2540]">{borrowerName}</div>
                  <div className="text-[11px] text-[#8898aa]">Prestatario principal</div>
                </div>
              </div>
            </div>

          </div>

          {/* Document Footer */}
          <div className="border-t border-[#e6ebf1] bg-[#f6f9fc] p-[16px_40px] text-center text-[10px] leading-[1.8] text-[#aab7c4] print:bg-[#f6f9fc]">
            {doc.values.footerGen} · {doc.values.footerId} {contract.contractNumber} · {doc.values.footerLegal}<br />
            PayMyLoan LLC · {doc.values.footerTag} · paymyloan.ai
          </div>

        </div>
      </div>
    </div>
  );
}