"use client";

import { apiFetch } from "@/app/lib/apiFetch";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";
import { API_ROUTES } from "@/app/lib/endpoints";
import { ChevronLeft } from "lucide-react";

export default function LenderDrawsPage() {
  return <LenderDrawsContent />;
}

function LenderDrawsContent() {
  const { t, lang } = useSite();
  const isEs = lang === "es";
  const params = useParams();
  const router = useRouter();
  const contractId = params?.id as string;

  const [contract, setContract] = useState<any>(null);
  
  // Estados para el formulario de registro del Draw
  const [drawAmount, setDrawAmount] = useState("");
  const [drawDate, setDrawDate] = useState("");
  const [workDesc, setWorkDesc] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (contractId) {
      const fetchContract = async () => {
        try {
          const res = await apiFetch(API_ROUTES.contracts.byId(contractId));
          const json = await res.json();
          if (json.success) setContract(json.data);
        } catch (e) {
          console.error("No se pudo cargar el contrato:", e);
        } finally {
          setIsLoading(false);
        }
      };
      fetchContract();
    }
  }, [contractId]);

  const handleLogDraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!drawAmount || !drawDate || !workDesc.trim()) return;
    
    setIsLogging(true);
    try {
      // Mock log action (Aquí iría la llamada POST real a la API en el futuro)
      await new Promise(resolve => setTimeout(resolve, 800));
      alert(isEs ? "¡Retiro registrado exitosamente!" : "Draw logged successfully!");
      setDrawAmount("");
      setDrawDate("");
      setWorkDesc("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLogging(false);
    }
  };

  if (isLoading) {
    return <div className="p-10 text-center text-[#8898aa]">{isEs ? "Cargando..." : "Loading..."}</div>;
  }

  if (!contract) {
    return <div className="p-10 text-center text-red-500">{isEs ? "Contrato no encontrado" : "Contract not found"}</div>;
  }

  // Datos extraidos del contrato
  const address = contract?.property?.addressLine1 || "Dirección no disponible";
  const primaryBorrower = contract.borrowers?.find((b: any) => b.isPrimary)?.borrowerProfile?.user || {};
  const borrowerName = primaryBorrower.name || (isEs ? "Prestatario" : "Borrower");
  const borrowerEmail = primaryBorrower.email || (isEs ? "Sin correo" : "No email");
  const borrowerPhone = primaryBorrower.phone || (isEs ? "Sin teléfono" : "No phone");
  const balance = contract?.currentPrincipalBalance ? `$${contract.currentPrincipalBalance.toLocaleString()}` : (isEs ? "No disponible" : "Not available");
  
  // Textos bilingües dinámicos
  const text = {
    title: isEs ? "Gestión de Retiros (Draws)" : "Draw Management",
    sub: isEs ? "Administra los desembolsos de remodelación para este contrato." : "Manage rehab disbursements for this contract.",
    noticeTitle: isEs ? "Cómo funcionan los retiros en la Versión 1.0" : "How draws work in Version 1.0",
    noticeBody: isEs 
      ? "Como prestamista, recibirás las solicitudes de retiro por fuera de la plataforma (teléfono/correo). Una vez que inspecciones, apruebes y transfieras los fondos al prestatario, <strong>registra el movimiento aquí</strong> para mantener el saldo del préstamo actualizado."
      : "As a lender, you will receive draw requests off-platform (phone/email). Once you inspect, approve, and wire the funds to the borrower, <strong>log the disbursement here</strong> to keep the loan balance accurate.",
    summaryTitle: isEs ? "Préstamo puente activo — rastreo de retiros" : "Active bridge loan — draw tracking",
    drawsUsed: isEs ? "Retiros usados" : "Draws used",
    drawsRemaining: isEs ? "Retiros restantes" : "Draws remaining",
    holdbackReleased: isEs ? "Fondo liberado" : "Holdback released",
    holdbackRemaining: isEs ? "Fondo restante" : "Holdback remaining",
    borrowerLabel: isEs ? "Prestatario" : "Borrower",
    contactLabel: isEs ? "Contacto del prestatario" : "Borrower contact",
    loanBalance: isEs ? "Saldo del préstamo" : "Loan balance",
    totalHoldback: isEs ? "Total retenido (rehab)" : "Total rehab holdback",
    maxDraws: isEs ? "Máx retiros permitidos" : "Max draws allowed",
    formTitle: isEs ? "Registrar un retiro fondeado" : "Log a funded draw",
    formSub: isEs ? "¿Ya transferiste los fondos al prestatario? Regístralo aquí." : "Already wired the funds to the borrower? Log it here.",
    amount: isEs ? "Monto transferido ($)" : "Amount wired ($)",
    date: isEs ? "Fecha de transferencia" : "Date wired",
    workDesc: isEs ? "Trabajo verificado (descripción breve)" : "Verified work (brief description)",
    cancel: isEs ? "Cancelar" : "Cancel",
    submit: isEs ? "Registrar retiro" : "Log draw",
    submitting: isEs ? "Registrando..." : "Logging...",
    historyTitle: isEs ? "Historial de retiros" : "Draw history",
    contactTitle: isEs ? "¿Dudas sobre el avance de obra?" : "Questions about rehab progress?",
    contactSub: isEs ? "Contacta directamente a tu prestatario." : "Contact your borrower directly."
  };

  return (
    <div className="max-w-[760px] animate-in fade-in duration-300 font-sans mx-auto py-6">
      
      <Link
        href={`/lenderDashboard/contracts/${contractId}`}
        className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#8898aa] transition-colors hover:text-[#635bff]"
      >
        <ChevronLeft size={16} />
        {isEs ? "Volver al contrato" : "Back to contract"}
      </Link>

      <div className="text-[22px] font-[800] text-[#0a2540] mb-[4px]">
        {text.title}
      </div>
      <div className="text-[13px] text-[#8898aa] mb-[28px]">
        {text.sub}
      </div>

      <div className="inline-block bg-[#fff3cd] border border-[#fbbf24] rounded-[6px] px-[12px] py-[4px] text-[11px] font-[700] text-[#b45309] mb-[20px]">
        Versión 1.0 — Proceso Manual
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-[#f0efff] border border-[#c7c4ff] rounded-[10px] p-[18px_20px] mb-[20px]">
        <div className="text-[13px] font-[800] text-[#635bff] mb-[6px]">{text.noticeTitle}</div>
        <div 
          className="text-[13px] text-[#425466] leading-[1.6]" 
          dangerouslySetInnerHTML={{ __html: text.noticeBody }} 
        />
      </div>

      {/* LOAN SUMMARY */}
      <div className="bg-white border border-[#e6ebf1] rounded-[10px] p-[24px_28px] mb-[16px]">
        <div className="text-[15px] font-[800] text-[#0a2540] mb-[4px]">{address}</div>
        <div className="text-[13px] text-[#8898aa] mb-[20px]">{text.summaryTitle}</div>

        <div className="flex flex-wrap md:flex-nowrap gap-[6px] mb-[20px]">
          <div className="flex-1 min-w-[100px] bg-white border border-[#e6ebf1] rounded-[8px] p-[14px] text-center">
            <div className="text-[22px] font-[800] text-[#0a2540]">0</div>
            <div className="text-[11px] text-[#8898aa] mt-[3px]">{text.drawsUsed}</div>
          </div>
          <div className="flex-1 min-w-[100px] bg-white border border-[#e6ebf1] rounded-[8px] p-[14px] text-center">
            <div className="text-[22px] font-[800] text-[#635bff]">4</div>
            <div className="text-[11px] text-[#8898aa] mt-[3px]">{text.drawsRemaining}</div>
          </div>
          <div className="flex-1 min-w-[100px] bg-white border border-[#e6ebf1] rounded-[8px] p-[14px] text-center">
            <div className="text-[22px] font-[800] text-[#0a2540]">$0</div>
            <div className="text-[11px] text-[#8898aa] mt-[3px]">{text.holdbackReleased}</div>
          </div>
          <div className="flex-1 min-w-[100px] bg-white border border-[#e6ebf1] rounded-[8px] p-[14px] text-center">
            <div className="text-[22px] font-[800] text-[#0a2540]">$30,000</div>
            <div className="text-[11px] text-[#8898aa] mt-[3px]">{text.holdbackRemaining}</div>
          </div>
        </div>

        <div className="flex justify-between items-center py-[9px] border-b border-[#f0f4f8] text-[13px]">
          <span className="text-[#8898aa]">{text.borrowerLabel}</span>
          <span className="font-[600] text-[#0a2540]">{borrowerName}</span>
        </div>
        <div className="flex justify-between items-center py-[9px] border-b border-[#f0f4f8] text-[13px]">
          <span className="text-[#8898aa]">{text.loanBalance}</span>
          <span className="font-[600] text-[#0a2540]">{balance}</span>
        </div>
        <div className="flex justify-between items-center py-[9px] border-b border-[#f0f4f8] text-[13px]">
          <span className="text-[#8898aa]">{text.totalHoldback}</span>
          <span className="font-[600] text-[#0a2540]">$30,000</span>
        </div>
        <div className="flex justify-between items-center py-[9px] text-[13px]">
          <span className="text-[#8898aa]">{text.maxDraws}</span>
          <span className="font-[600] text-[#0a2540]">4</span>
        </div>
      </div>

      {/* LOG A DRAW */}
      <div className="bg-white border border-[#e6ebf1] rounded-[10px] p-[24px_28px] mb-[16px]">
        <div className="text-[15px] font-[800] text-[#0a2540] mb-[4px]">{text.formTitle}</div>
        <div className="text-[13px] text-[#8898aa] mb-[20px]">{text.formSub}</div>

        <form onSubmit={handleLogDraw}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px] mb-[16px]">
            <div>
              <label className="block text-[11px] font-[700] text-[#8898aa] mb-[6px] uppercase tracking-[0.4px]">Draw #</label>
              <select className="w-full p-[10px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] font-sans text-[#0a2540] bg-white outline-none focus:border-[#635bff] cursor-pointer">
                <option>Draw 1 of 4</option>
                <option>Draw 2 of 4</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-[700] text-[#8898aa] mb-[6px] uppercase tracking-[0.4px]">{text.amount}</label>
              <input 
                type="number" 
                value={drawAmount}
                onChange={(e) => setDrawAmount(e.target.value)}
                placeholder="Ej. 5000" 
                className="w-full p-[10px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] font-sans text-[#0a2540] bg-white outline-none focus:border-[#635bff]"
              />
            </div>
          </div>

          <div className="mb-[16px]">
            <label className="block text-[11px] font-[700] text-[#8898aa] mb-[6px] uppercase tracking-[0.4px]">{text.date}</label>
            <input 
              type="date" 
              value={drawDate}
              onChange={(e) => setDrawDate(e.target.value)}
              className="w-full p-[10px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] font-sans text-[#0a2540] bg-white outline-none focus:border-[#635bff]"
            />
          </div>

          <div className="mb-[16px]">
            <label className="block text-[11px] font-[700] text-[#8898aa] mb-[6px] uppercase tracking-[0.4px]">{text.workDesc}</label>
            <textarea 
              value={workDesc}
              onChange={(e) => setWorkDesc(e.target.value)}
              placeholder={isEs ? "Breve descripción de lo inspeccionado y fondeado..." : "Brief description of inspected and funded work..."} 
              className="w-full p-[10px_12px] border border-[#e6ebf1] rounded-[6px] text-[13px] font-sans text-[#0a2540] bg-white h-[90px] resize-none outline-none focus:border-[#635bff]"
            ></textarea>
          </div>

          <div className="flex gap-[10px] mt-4">
            <button 
              type="button"
              onClick={() => router.push(`/lenderDashboard/contracts/${contractId}`)}
              className="p-[11px_24px] bg-white text-[#425466] border border-[#e6ebf1] rounded-[6px] text-[14px] font-[600] cursor-pointer transition-colors hover:bg-surface-2"
            >
              {text.cancel}
            </button>
            <button 
              type="submit"
              disabled={isLogging || !drawAmount || !drawDate || !workDesc.trim()}
              className="p-[11px_28px] bg-[#635bff] text-white border-none rounded-[6px] text-[14px] font-[700] cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isLogging ? text.submitting : text.submit}
            </button>
          </div>
        </form>
      </div>

      {/* DRAW HISTORY */}
      <div className="bg-white border border-[#e6ebf1] rounded-[10px] p-[24px_28px] mb-[16px]">
        <div className="text-[15px] font-[800] text-[#0a2540] mb-[16px]">{text.historyTitle}</div>
        
        <div className="flex flex-col gap-[10px]">
          <div className="p-6 text-center text-[13px] text-[#8898aa] border border-dashed border-[#e6ebf1] rounded-[8px]">
            {isEs ? "Aún no se han registrado retiros." : "No draws logged yet."}
          </div>
        </div>
      </div>

      {/* BORROWER CONTACT */}
      <div className="bg-[#fafafe] border border-[#635bff] rounded-[10px] p-[24px_28px]">
        <div className="text-[15px] font-[800] text-[#0a2540] mb-[4px]">{text.contactTitle}</div>
        <div className="text-[13px] text-[#8898aa] mb-[20px]">{text.contactSub}</div>
        
        <div className="flex justify-between items-center py-[9px] border-b border-[#f0f4f8] text-[13px]">
          <span className="text-[#8898aa]">{text.borrowerLabel}</span>
          <span className="font-[600] text-[#0a2540]">{borrowerName}</span>
        </div>
        <div className="flex justify-between items-center py-[9px] border-b border-[#f0f4f8] text-[13px]">
          <span className="text-[#8898aa]">Email</span>
          <span className="font-[600] text-[#0a2540]">{borrowerEmail}</span>
        </div>
        <div className="flex justify-between items-center py-[9px] text-[13px]">
          <span className="text-[#8898aa]">Tel / Phone</span>
          <span className="font-[600] text-[#0a2540]">{borrowerPhone}</span>
        </div>
        
        <div className="mt-[16px]">
          <a 
            href={`mailto:${borrowerEmail}`}
            className="inline-block w-full sm:w-auto text-center p-[11px_28px] bg-[#635bff] text-white border-none rounded-[6px] text-[14px] font-[700] cursor-pointer transition-opacity hover:opacity-90 no-underline"
          >
            {isEs ? "Enviar Correo" : "Send Email"}
          </a>
        </div>
      </div>

    </div>
  );
}