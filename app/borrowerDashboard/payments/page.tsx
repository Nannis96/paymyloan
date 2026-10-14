"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { CreditCard, CalendarClock, Building } from "lucide-react";
import AddAccountModal from "@/app/components/borrower/AddAccountModal";
import { API_ROUTES } from "@/app/lib/endpoints";

function ManagePaymentsContent() {
  const { t, lang } = useSite();
  const mp = t.managePayments;
  const isEs = lang === "es";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [upcomingPayments, setUpcomingPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cuentas bancarias se mantienen estaticas por ahora 
  // (La integracion de metodos de pago con Stripe esta en pausa segun API_REFERENCE.md)
  const mockAccounts = [
    { id: "acc_1", entity: "Texas Properties LLC", bank: "Chase Bank", last4: "4589", status: "Activa (Stripe ACH)" },
    { id: "acc_2", entity: "NextGen Growth Corp", bank: "Wells Fargo", last4: "1234", status: "Pendiente de Verificacion" }
  ];

  useEffect(() => {
    async function fetchUpcomingPayments() {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };
        
        // 1. Obtener contratos activos
        const resContracts = await fetch(API_ROUTES.contracts.base, { headers });
        if (!resContracts.ok) return;
        
        const jsonContracts = await resContracts.json();
        if (!jsonContracts.success) return;

        const activeContracts = jsonContracts.data.items.filter((c: any) => 
          c.status === "ACTIVE" || c.status === "DELINQUENT"
        );

        let upcoming: any[] = [];

        // 2. Obtener schedule por cada contrato
        for (const contract of activeContracts) {
          const resSched = await fetch(API_ROUTES.contracts.schedule(contract.id), { headers });
          if (resSched.ok) {
            const jsonSched = await resSched.json();
            if (jsonSched.success) {
              const schedule = jsonSched.data || [];
              schedule.forEach((p: any) => {
                if (p.status === "PENDING" || p.status === "PARTIALLY_PAID") {
                  upcoming.push({
                    id: p.id,
                    property: contract.property?.addressLine1 || "Propiedad",
                    amount: p.totalDue || contract.currentTerms?.calculatedMonthlyPayment || 0,
                    date: p.dueDate,
                    type: isEs ? "Pago Mensual" : "Monthly Payment",
                    contractId: contract.id
                  });
                }
              });
            }
          }
        }

        // Ordenar por fecha mas proxima
        upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setUpcomingPayments(upcoming);

      } catch (error) {
        console.error("Error fetching upcoming payments", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUpcomingPayments();
  }, [isEs]);

  const formatCurrency = (val: any) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "$0";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(num);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString(isEs ? "es-MX" : "en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  };

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14 animate-in fade-in duration-300">
      <div className="mx-auto max-w-[900px]">
        
        <Link
          href="/borrowerDashboard"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
        >
          <span>&larr;</span> {mp.back}
        </Link>

        <header className="mb-10">
          <h1 className="text-[32px] font-black tracking-tight text-ink">{mp.title}</h1>
          <p className="text-ink-2 mt-1">{mp.subtitle}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna Izquierda: Metodos de Pago */}
          <div className="md:col-span-1 space-y-6">
            <div className="rounded-xl border border-rule bg-surface p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3 flex items-center gap-2">
                <Building className="w-4 h-4" /> Cuentas Bancarias
              </h2>
              
              <div className="space-y-3 mb-6">
                {mockAccounts.map(acc => (
                  <div key={acc.id} className="p-4 rounded-lg bg-surface-2 border border-rule-strong flex flex-col relative">
                    <div className="mb-3 border-b border-rule pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-ink-3 block mb-0.5">{mp.entityLabel}</span>
                      <span className="text-xs font-bold text-ink">{acc.entity}</span>
                    </div>
                    <div className="font-bold text-ink">{acc.bank}</div>
                    <div className="text-sm font-mono text-ink-2 mt-1">**** **** {acc.last4}</div>
                    <div className={`mt-3 text-[10px] font-bold uppercase tracking-widest ${acc.status.includes('Activa') ? 'text-green-600' : 'text-amber'}`}>
                      {acc.status}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-rule-strong bg-surface-2 px-4 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent shadow-sm"
              >
                <CreditCard className="w-4 h-4" /> + {mp.addAccount}
              </button>
            </div>

            <div className="rounded-xl border border-amber/30 bg-amber-soft p-6">
              <h3 className="text-sm font-bold text-amber mb-2">{mp.autopay}</h3>
              <p className="text-xs text-ink-2 leading-relaxed">{mp.autopayDesc}</p>
            </div>
          </div>

          {/* Columna Derecha: Cargos Programados */}
          <div className="md:col-span-2">
            <div className="rounded-xl border border-rule bg-surface shadow-sm overflow-hidden">
              <div className="p-6 border-b border-rule bg-surface-2 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-widest text-ink-3">{mp.upcomingTitle}</h2>
                <CalendarClock className="w-5 h-5 text-ink-3" />
              </div>
              
              <table className="w-full text-left text-[14px]">
                <thead className="border-b border-rule bg-bg">
                  <tr>
                    <th className="px-6 py-4 font-bold text-ink-3">{isEs ? "Concepto" : "Concept"}</th>
                    <th className="px-6 py-4 font-bold text-ink-3">{isEs ? "Fecha de Cobro" : "Charge Date"}</th>
                    <th className="px-6 py-4 font-bold text-ink-3 text-right">{isEs ? "Monto" : "Amount"}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule bg-surface">
                  {isLoading ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-ink-3">
                        {isEs ? "Cargando cargos programados..." : "Loading upcoming charges..."}
                      </td>
                    </tr>
                  ) : upcomingPayments.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-ink-3">
                        {isEs ? "No hay cargos programados proximos." : "No upcoming scheduled charges."}
                      </td>
                    </tr>
                  ) : (
                    upcomingPayments.map((item) => (
                      <tr key={item.id} className="hover:bg-surface-2 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-ink">{item.property}</div>
                          <div className="text-xs text-ink-3 mt-0.5">{item.type}</div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">{formatDate(item.date)}</td>
                        <td className="px-6 py-4 font-mono font-bold text-accent text-right">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <AddAccountModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default function ManagePaymentsPage() {
  return (
    <SiteShell isDashboard={true}>
      <ManagePaymentsContent />
    </SiteShell>
  );
}