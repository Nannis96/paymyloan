"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { apiFetch } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";

export default function DealView() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { lang } = useSite();
  const isEs = lang === "es";

  const [deal, setDeal] = useState<any>(null);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSelecting, setIsSelecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Evita hacer fetch si Next.js aún no extrae el ID de la URL
    if (!id) return;

    async function fetchDealData() {
      try {
        console.log(`Solicitando detalles del Deal ID: ${id}...`);
        
        // Construimos la URL basados en tus endpoints existentes
        const dealUrl = `${API_ROUTES.borrowers.meLoanRequests}/${id}`;
        const quotesUrl = `${API_ROUTES.borrowers.meLoanRequests}/${id}/quotes`;

        const [dealRes, quotesRes] = await Promise.all([
          apiFetch(dealUrl),
          apiFetch(quotesUrl)
        ]);

        if (dealRes.ok) {
          const dJson = await dealRes.json();
          if (dJson.success) {
            setDeal(dJson.data);
          } else {
            console.error("Error lógico en la API de Deal:", dJson);
            setErrorMsg(dJson.error?.message || "Error al cargar el trato");
          }
        } else {
          console.error(`Error HTTP ${dealRes.status} al pedir el trato:`, await dealRes.text());
          setErrorMsg(`Error HTTP ${dealRes.status}`);
        }
        
        if (quotesRes.ok) {
          const qJson = await quotesRes.json();
          if (qJson.success) {
            setQuotes(qJson.data.items || qJson.data || []);
          }
        } else {
           console.warn(`Error HTTP ${quotesRes.status} al pedir quotes. Puede ser normal si no hay.`);
        }

      } catch (error) {
        console.error("Excepción en fetchDealData:", error);
        setErrorMsg("Fallo de red al conectar con el servidor.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchDealData();
  }, [id]);

  const handleSelectQuote = async (quoteId: string) => {
    if (!confirm(isEs ? "¿Estás seguro de aceptar esta oferta? Esto creará el contrato formal automáticamente." : "Are you sure you want to accept this offer? This will automatically create the formal contract.")) return;
    
    setIsSelecting(true);
    try {
      const selectUrl = `${API_ROUTES.borrowers.meLoanRequests}/${id}/quotes/${quoteId}/select`;
      const res = await apiFetch(selectUrl, { method: "POST" });
      
      if (res.ok) {
        alert(isEs ? "¡Oferta aceptada con éxito! Redirigiendo a tus contratos..." : "Offer accepted successfully! Redirecting to your contracts...");
        router.push("/borrowerDashboard");
      } else {
        const err = await res.json();
        alert(err.error?.message || "Error al aceptar la oferta");
      }
    } catch (error) {
      console.error("Error seleccionando la oferta:", error);
    } finally {
      setIsSelecting(false);
    }
  };

  const formatCurrency = (val: any) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "$0";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
  };

  if (isLoading) {
    return <div className="p-10 text-[14px] text-ink-3 text-center">{isEs ? "Cargando detalles del trato..." : "Loading deal details..."}</div>;
  }

  // Muestra visualmente el error específico en la UI
  if (errorMsg || !deal) {
    return (
      <div className="p-10 text-center max-w-[500px] mx-auto">
        <div className="text-[18px] font-bold text-crit mb-2">{isEs ? "No se encontró el trato." : "Deal not found."}</div>
        <div className="text-[14px] text-ink-3">
          {errorMsg || "La petición devolvió nulo. Revisa la consola del navegador (F12) para ver los detalles exactos del rechazo del backend."}
        </div>
        <Link href="/borrowerDashboard/deals" className="mt-6 inline-block rounded-md bg-surface-2 border border-rule px-4 py-2 text-[13px] font-semibold text-ink-2 hover:bg-rule transition-colors">
          {isEs ? "Volver a mis tratos" : "Back to my deals"}
        </Link>
      </div>
    );
  }

  const renderProgressBar = (status: string, quotesCount: number = 0) => {
    let step = 1;
    const isAborted = status === "WITHDRAWN" || status === "CANCELLED";

    if (status === "DRAFT") step = 1;
    if (status === "PUBLISHED") step = quotesCount > 0 ? 3 : 2;
    if (status === "WITHDRAWN") step = quotesCount > 0 ? 3 : 2;
    if (status === "MATCHED") step = 4;

    const Circle = ({ sNum, label }: { sNum: number; label: string }) => {
      const isPast = step > sNum && !isAborted;
      const isActive = step === sNum && !isAborted;
      const isError = isAborted && step === sNum;

      if (isError) {
        return (
          <div className="flex flex-col items-center relative z-10 shrink-0">
            <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-[2px] border-crit bg-crit text-[8px] font-[700] text-white">X</div>
            <div className="absolute top-[20px] whitespace-nowrap text-[8px] font-[700] text-crit">{isEs ? "Retirado" : "Withdrawn"}</div>
          </div>
        );
      }
      
      if (isPast) {
        return (
          <div className="flex flex-col items-center relative z-10 shrink-0">
            <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-[2px] border-success bg-success text-[8px] font-[700] text-white">✓</div>
            <div className="absolute top-[20px] whitespace-nowrap text-[8px] text-success">{label}</div>
          </div>
        );
      }
      if (isActive) {
        return (
          <div className="flex flex-col items-center relative z-10 shrink-0">
            <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-[2px] border-accent bg-accent text-[8px] font-[700] text-white shadow-[0_0_0_2px_rgba(99,91,255,0.15)]">{sNum}</div>
            <div className="absolute top-[20px] whitespace-nowrap text-[8px] font-[700] text-accent">{label}</div>
          </div>
        );
      }
      return (
        <div className="flex flex-col items-center relative z-10 shrink-0">
          <div className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-[2px] border-rule bg-surface text-[8px] font-[700] text-ink-3">{sNum}</div>
          <div className="absolute top-[20px] whitespace-nowrap text-[8px] text-ink-3">{label}</div>
        </div>
      );
    };

    const Line = ({ sNum }: { sNum: number }) => (
      <div className={`h-[2px] flex-1 mx-[2px] ${step > sNum && !isAborted ? "bg-success" : "bg-rule"}`}></div>
    );

    return (
      <div className="flex w-full items-center justify-between pb-[18px] pt-[4px] px-[4px]">
        <Circle sNum={1} label={isEs ? "Borrador" : "Draft"} />
        <Line sNum={1} />
        <Circle sNum={2} label={isEs ? "Listado" : "Listed"} />
        <Line sNum={2} />
        <Circle sNum={3} label={isEs ? "Ofertas" : "Offers"} />
        <Line sNum={3} />
        <Circle sNum={4} label={isEs ? "Aceptado" : "Accepted"} />
        <Line sNum={4} />
        <Circle sNum={5} label={isEs ? "Fondeado" : "Funded"} />
        <Line sNum={5} />
        <Circle sNum={6} label={isEs ? "Cerrado" : "Closed"} />
      </div>
    );
  };

  const prop = deal.property || {};
  const ltv = prop.afterRepairValue ? Math.round((deal.totalLoanAmountRequested / prop.afterRepairValue) * 100) : 0;

  return (
    <div className="animate-in fade-in duration-300 w-full pb-12">
      <Link href="/borrowerDashboard/deals" className="mb-[20px] inline-flex items-center gap-[8px] text-[12px] font-[700] uppercase tracking-wide text-ink-3 transition-colors hover:text-accent no-underline">
        <span>&larr;</span> {isEs ? "Volver a mis tratos" : "Back to my deals"}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Columna Izquierda: Header + Detalles del Trato */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header del Trato */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-2">
            <div className="flex flex-1 gap-6 items-start w-full">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <div className="text-[28px] font-[900] text-ink leading-tight">{prop.addressLine1 || "Propiedad"}</div>
                  <div className="flex gap-2 mt-1 md:mt-0">
                    <span className="rounded-[10px] bg-surface-2 border border-rule px-[12px] py-[4px] text-[11px] font-[700] text-ink-2">
                      {deal.visibility}
                    </span>
                  </div>
                </div>
                <div className="text-[14px] text-ink-3 mb-4">
                  {prop.city}, {prop.state} {prop.postalCode} • {deal.projectType}
                </div>
                
                {/* Entity Details (Solo Borrower) */}
                <div className="flex flex-col gap-1 text-[13px] text-ink-2">
                  <div>
                    <span className="font-[700] text-ink uppercase tracking-[0.5px] text-[11px] mr-2">{isEs ? "Prestatario:" : "Borrower:"}</span> 
                    <span className="font-semibold text-ink">{isEs ? "Tu Entidad (Verificada)" : "Your Entity (Verified)"}</span> • LLC • {prop.state || "TN"}
                  </div>
                </div>
              </div>

              {/* Property Photo (Condicional) */}
              {prop.imageUrl && (
                <div className="w-[140px] h-[90px] shrink-0 rounded-[10px] border border-rule bg-surface-2 overflow-hidden shadow-sm">
                  <img src={prop.imageUrl} alt="Property" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Tarjeta de Finanzas */}
          <div className="rounded-[12px] border border-rule bg-surface p-[24px] shadow-sm">
            <h2 className="mb-[16px] text-[16px] font-[800] text-ink">{isEs ? "Finanzas del trato" : "Deal Financials"}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-[11px] font-[700] uppercase tracking-[0.4px] text-ink-3 mb-1">{isEs ? "Solicitado" : "Requested"}</div>
                <div className="text-[18px] font-[800] text-ink">{formatCurrency(deal.totalLoanAmountRequested)}</div>
              </div>
              <div>
                <div className="text-[11px] font-[700] uppercase tracking-[0.4px] text-ink-3 mb-1">ARV</div>
                <div className="text-[18px] font-[800] text-ink">{formatCurrency(prop.afterRepairValue)}</div>
              </div>
              <div>
                <div className="text-[11px] font-[700] uppercase tracking-[0.4px] text-ink-3 mb-1">LTV</div>
                <div className={`text-[18px] font-[800] ${ltv > 75 ? 'text-crit' : 'text-success'}`}>{ltv}%</div>
              </div>
              <div>
                <div className="text-[11px] font-[700] uppercase tracking-[0.4px] text-ink-3 mb-1">{isEs ? "Compra" : "Purchase"}</div>
                <div className="text-[15px] font-[700] text-ink">{formatCurrency(deal.purchasePrice)}</div>
              </div>
              <div>
                <div className="text-[11px] font-[700] uppercase tracking-[0.4px] text-ink-3 mb-1">{isEs ? "Remodelación" : "Rehab"}</div>
                <div className="text-[15px] font-[700] text-ink">{formatCurrency(deal.rehabAmount)}</div>
              </div>
            </div>
          </div>

          {/* Tarjeta de Detalles de Propiedad */}
          <div className="rounded-[12px] border border-rule bg-surface p-[24px] shadow-sm">
            <h2 className="mb-[16px] text-[16px] font-[800] text-ink">{isEs ? "Detalles de la propiedad" : "Property Details"}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border-b border-surface-2 pb-2">
                <span className="block text-[11px] text-ink-3">{isEs ? "Tipo" : "Type"}</span>
                <span className="text-[13px] font-[600] text-ink">{prop.propertyType || "N/D"}</span>
              </div>
              <div className="border-b border-surface-2 pb-2">
                <span className="block text-[11px] text-ink-3">{isEs ? "Hab / Baños" : "Beds / Baths"}</span>
                <span className="text-[13px] font-[600] text-ink">{prop.bedrooms || "-"} / {prop.bathrooms || "-"}</span>
              </div>
              <div className="border-b border-surface-2 pb-2">
                <span className="block text-[11px] text-ink-3">{isEs ? "Pies Cuadrados" : "Sqft"}</span>
                <span className="text-[13px] font-[600] text-ink">{prop.squareFootage ? `${prop.squareFootage} sqft` : "N/D"}</span>
              </div>
              <div className="border-b border-surface-2 pb-2">
                <span className="block text-[11px] text-ink-3">{isEs ? "Cierre solicitado" : "Requested close"}</span>
                <span className="text-[13px] font-[600] text-ink">{deal.requestedClosingDate ? new Date(deal.requestedClosingDate).toLocaleDateString() : "N/D"}</span>
              </div>
            </div>
            {deal.requestedTimelineNotes && (
              <div className="mt-4">
                <span className="block text-[11px] text-ink-3 mb-1">{isEs ? "Notas del proyecto" : "Project Notes"}</span>
                <p className="text-[13px] text-ink-2 leading-relaxed">{deal.requestedTimelineNotes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Columna Central: Ofertas / Quotes */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Deal Analyzer Snapshot */}
          <div className="rounded-[12px] border border-rule bg-surface p-[16px] shadow-sm text-center flex flex-col justify-center min-h-[80px]">
            <div className="text-[11px] font-[800] uppercase tracking-[0.5px] text-ink-3 mb-3">
              {isEs ? "Estado del Trato" : "Deal Snapshot"}
            </div>
            {renderProgressBar(deal.status, quotes.length)}
          </div>

          {/* Ofertas Recibidas */}
          <div className="rounded-[12px] border border-accent bg-accent-soft p-[20px] shadow-sm">
            <h2 className="mb-[4px] text-[15px] font-[800] text-accent">{isEs ? "Ofertas recibidas" : "Offers received"}</h2>
            <p className="mb-[16px] text-[12px] text-accent/80">
              {quotes.length} {isEs ? "oferta(s) en este trato." : "offer(s) on this deal."}
            </p>

            <div className="space-y-4">
              {quotes.length === 0 ? (
                <div className="text-center p-4 bg-white/50 rounded-lg border border-accent/20 text-[12px] text-accent">
                  {isEs ? "Esperando ofertas de prestamistas..." : "Waiting for lender offers..."}
                </div>
              ) : (
                quotes.map((quote) => (
                  <div key={quote.id} className="bg-white rounded-[10px] p-[16px] border border-accent/20 shadow-sm relative overflow-hidden">
                    {quote.status === 'SELECTED' && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-success"></div>
                    )}
                    <div className="mb-3">
                      <div className="text-[10px] font-[700] uppercase tracking-[0.5px] text-ink-3">{isEs ? "Prestamista" : "Lender"}</div>
                      <div className="text-[13px] font-[800] text-ink">{quote.lenderCompanyId || "Inversor Privado"}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <div className="text-[10px] font-[700] uppercase tracking-[0.5px] text-ink-3">Monto</div>
                        <div className="text-[14px] font-[700] text-ink">{formatCurrency(quote.principalAmount)}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-[700] uppercase tracking-[0.5px] text-ink-3">Tasa / Plazo</div>
                        <div className="text-[14px] font-[700] text-ink">{quote.interestRate}% / {quote.amortizationTermMonths}m</div>
                      </div>
                    </div>

                    {/* Botón de Aceptar Oferta (Oculto si el trato ya fue concretado) */}
                    {deal.status !== 'MATCHED' && quote.status === 'SUBMITTED' ? (
                      <button 
                        onClick={() => handleSelectQuote(quote.id)}
                        disabled={isSelecting}
                        className="w-full py-[8px] bg-accent text-white text-[12px] font-[700] rounded-[6px] hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {isSelecting ? "..." : (isEs ? "Aceptar Oferta" : "Accept Offer")}
                      </button>
                    ) : (
                      <div className={`text-center py-[6px] rounded-[6px] text-[11px] font-[700] ${quote.status === 'SELECTED' ? 'bg-success-soft text-success' : 'bg-surface-2 text-ink-3'}`}>
                        {quote.status}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Lender Feedback */}
          <div className="rounded-[12px] border border-rule bg-surface p-[20px] shadow-sm min-h-[120px]">
            <h2 className="mb-[8px] text-[14px] font-[800] text-ink">{isEs ? "Comentarios del Prestamista" : "Lender Feedback"}</h2>
            <div className="text-[12px] text-ink-3 leading-[1.6]">
              {isEs ? "El feedback, condiciones iniciales y mensajes sobre este trato aparecerán aquí." : "Feedback, initial conditions, and messages regarding this deal will appear here."}
            </div>
          </div>
        </div>

        {/* Columna Derecha: Documentos y Actividad */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* Documentos */}
          <details className="group rounded-[12px] border border-rule bg-surface shadow-sm open:bg-surface-2 transition-colors">
            <summary className="flex cursor-pointer items-center justify-between p-[16px] text-[14px] font-[800] text-ink list-none [&::-webkit-details-marker]:hidden">
              {isEs ? "Documentos" : "Documents"}
              <span className="transition-transform duration-200 group-open:rotate-180">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </summary>
            <div className="flex flex-col gap-3 p-[0_16px_16px_16px] text-[13px] text-ink-2">
              <div className="cursor-default hover:text-accent">{isEs ? "Contrato" : "Contract"}</div>
              <div className="cursor-default hover:text-accent">{isEs ? "Carta de Compromiso" : "Commitment Letter"}</div>
              <div className="cursor-default hover:text-accent">{isEs ? "Prueba de Seguro" : "Evidence of Insurance"}</div>
              <div className="cursor-default hover:text-accent">{isEs ? "Escritura de Garantía" : "Warranty Deed"}</div>
              <div className="cursor-default hover:text-accent">{isEs ? "Escritura de Fideicomiso" : "Deed of Trust"}</div>
              <div className="cursor-default hover:text-accent">{isEs ? "Estado de Liquidación" : "Settlement Statement"}</div>
            </div>
          </details>

          {/* Comunicación / Actividad */}
          <details className="group rounded-[12px] border border-rule bg-surface shadow-sm open:bg-surface-2 transition-colors">
            <summary className="flex cursor-pointer items-center justify-between p-[16px] text-[14px] font-[800] text-ink list-none [&::-webkit-details-marker]:hidden">
              {isEs ? "Comunicación / Actividad" : "Communication / Activity"}
              <span className="transition-transform duration-200 group-open:rotate-180">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </summary>
            <div className="flex flex-col gap-3 p-[0_16px_16px_16px] text-[13px] text-ink-2">
              <div className="cursor-default hover:text-accent">{isEs ? "Textos" : "Texts"}</div>
              <div className="cursor-default hover:text-accent">{isEs ? "Ofertas" : "Offers"}</div>
              <div className="cursor-default hover:text-accent">{isEs ? "Correos" : "Mails"}</div>
            </div>
          </details>

          {/* Contactos del Trato */}
          <details className="group rounded-[12px] border border-rule bg-surface shadow-sm open:bg-surface-2 transition-colors">
            <summary className="flex cursor-pointer items-center justify-between p-[16px] text-[14px] font-[800] text-ink list-none [&::-webkit-details-marker]:hidden">
              {isEs ? "Contactos del Trato" : "Deal Contacts"}
              <span className="transition-transform duration-200 group-open:rotate-180">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </summary>
            <div className="flex flex-col gap-3 p-[0_16px_16px_16px] text-[13px] text-ink-2">
              <div className="cursor-default hover:text-accent">{isEs ? "Seguro" : "Insurance"}</div>
              <div className="cursor-default hover:text-accent">{isEs ? "Título" : "Title"}</div>
              <div className="cursor-default hover:text-accent">{isEs ? "Contador" : "Bookkeeper"}</div>
            </div>
          </details>

        </div>
      </div>
    </div>
  );
}