"use client";

import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { CreditCard, CalendarClock, Building } from "lucide-react";

function ManagePaymentsContent() {
  const { t } = useSite();
  const mp = t.managePayments;

  // Mock de datos de pagos
  const mockAccounts = [
    { id: "acc_1", bank: "Chase Bank", last4: "4589", status: "Activa (Stripe ACH)" }
  ];

  const mockUpcoming = [
    { id: "up_1", property: "123 Main St", amount: "$2,500.00", date: "Oct 1, 2026", type: "Interés Mensual" },
    { id: "up_2", property: "456 Oak Ave", amount: "$9.00", date: "Oct 5, 2026", type: "Suscripción PML" }
  ];

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[900px]">
        
        <Link 
          href="/borrower"
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
                  <div key={acc.id} className="p-4 rounded-lg bg-surface-2 border border-rule-strong">
                    <div className="font-bold text-ink">{acc.bank}</div>
                    <div className="text-sm font-mono text-ink-2 mt-1">**** **** {acc.last4}</div>
                    <div className="mt-3 text-[10px] font-bold uppercase tracking-widest text-green-600">
                      {acc.status}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-rule-strong bg-bg px-4 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent">
                <CreditCard className="w-4 h-4" /> {mp.addAccount}
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
                    <th className="px-6 py-4 font-bold text-ink-3">Concepto</th>
                    <th className="px-6 py-4 font-bold text-ink-3">Fecha de Cobro</th>
                    <th className="px-6 py-4 font-bold text-ink-3 text-right">Monto</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2 divide-y divide-rule bg-surface">
                  {mockUpcoming.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-2 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-ink">{item.property}</div>
                        <div className="text-xs text-ink-3 mt-0.5">{item.type}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{item.date}</td>
                      <td className="px-6 py-4 font-mono font-bold text-accent text-right">{item.amount}</td>
                    </tr>
                  ))}
                  {mockUpcoming.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-ink-3">
                        No hay cargos programados próximos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
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