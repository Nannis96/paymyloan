// app/contracts/[id]/page.tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

// TODO: BACKEND - Próximos pasos cuando esté la API
// 1. Extraer el ID de los params de la URL (ya lo hacemos abajo con useParams).
// 2. Hacer un fetch a la API: GET /api/contracts/{params.id}
// 3. Hacer otro fetch (o usar la misma API) para obtener el historial de pagos: GET /api/contracts/{params.id}/payments?page=1
// 4. Conectar los botones de paginación para que hagan un refetch pidiendo la siguiente página al backend en lugar de hacerlo local.

function ContractDetailContent() {
  const params = useParams();
  const { t } = useSite();
  const cd = t.contractDetail;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock de datos del contrato (Se sustituirá por la respuesta de la API)
  const mockContract = {
    id: params.id as string,
    lender: "NextGen Growth LLC",
    borrower: "John Smith",
    amount: "$250,000",
    term: "24 meses",
    interest: "11%",
    downPayment: "$50,000",
    monthlyRent: "$2,500"
  };

  // Mock de 25 pagos para probar la paginación (Se sustituirá por respuesta del back)
  const mockPayments = Array.from({ length: 25 }, (_, i) => ({
    id: `pay_${i + 1}`,
    date: `2026-0${(i % 9) + 1}-01`,
    status: i === 0 ? "pending" : (i % 7 === 0 ? "late" : (i % 5 === 0 ? "partial" : "paid")),
    total: "$2,500.00",
    principal: "$500.00",
    interest: "$2,000.00",
    escrow: "$0.00",
    balance: `$${(250000 - (i * 500)).toLocaleString()}.00`
  }));

  // Lógica simple de paginación frontend (Idealmente el back debe devolver la página exacta)
  const totalPages = Math.ceil(mockPayments.length / itemsPerPage);
  const currentPayments = mockPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'paid': return 'text-green-600 dark:text-green-400';
      case 'pending': return 'text-amber';
      case 'late': return 'text-red-500';
      case 'partial': return 'text-blue-500';
      default: return 'text-ink';
    }
  };

  return (
      <div className="min-h-screen bg-bg p-6 lg:p-14">
        <div className="mx-auto max-w-[1100px]">
          
          <Link
             href="/contracts"
             className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
          >
            <span>&larr;</span> {cd.back}
          </Link>

          <header className="mb-10">
            <h1 className="text-[32px] font-black tracking-tight text-ink">{cd.title}: {mockContract.id}</h1>
            <p className="text-ink-2">{cd.subtitle}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Box Partes Involucradas */}
            <div className="rounded-xl border border-rule bg-surface p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">{cd.parties}</h2>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between border-b border-rule pb-2">
                  <span className="text-ink-3">{cd.labels.lender}</span>
                  <span className="font-bold text-ink">{mockContract.lender}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-ink-3">{cd.labels.borrower}</span>
                  <span className="font-bold text-ink">{mockContract.borrower}</span>
                </div>
              </div>
            </div>

            {/* Box Términos Financieros */}
            <div className="rounded-xl border border-rule bg-surface p-6">
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">{cd.financials}</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div>
                  <div className="text-ink-3 mb-1">{cd.labels.amount}</div>
                  <div className="font-bold text-ink">{mockContract.amount}</div>
                </div>
                <div>
                  <div className="text-ink-3 mb-1">{cd.labels.term}</div>
                  <div className="font-bold text-ink">{mockContract.term}</div>
                </div>
                <div>
                  <div className="text-ink-3 mb-1">{cd.labels.interest}</div>
                  <div className="font-bold text-ink">{mockContract.interest}</div>
                </div>
                <div>
                  <div className="text-ink-3 mb-1">{cd.labels.rent}</div>
                  <div className="font-bold text-accent">{mockContract.monthlyRent}</div>
                </div>
              </div>
            </div>
          </div>

          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-ink-3">{cd.breakdownTitle}</h2>
            <div className="overflow-x-auto rounded-t-xl border border-rule bg-surface">
              <table className="w-full min-w-[800px] border-collapse text-left text-[14px]">
                <thead className="border-b border-rule bg-surface-2">
                  <tr>
                    <th className="px-5 py-4 font-bold text-ink-3">{cd.table.date}</th>
                    <th className="px-5 py-4 font-bold text-ink-3">{cd.table.status}</th>
                    <th className="px-5 py-4 font-bold text-ink-3">{cd.table.totalOwed}</th>
                    <th className="px-5 py-4 font-bold text-ink-3">{cd.table.principal}</th>
                    <th className="px-5 py-4 font-bold text-ink-3">{cd.table.interest}</th>
                    <th className="px-5 py-4 font-bold text-ink-3">{cd.table.escrow}</th>
                    <th className="px-5 py-4 font-bold text-ink-3">{cd.table.balance}</th>
                  </tr>
                </thead>
                <tbody className="text-ink-2">
                  {currentPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-rule hover:bg-surface-2 transition-colors">
                      <td className="px-5 py-4">{payment.date}</td>
                      <td className={`px-5 py-4 font-bold uppercase text-[11px] tracking-wider ${getStatusStyle(payment.status)}`}>
                        {cd.paymentStatus[payment.status as keyof typeof cd.paymentStatus]}
                      </td>
                      <td className="px-5 py-4 font-mono font-bold text-ink">{payment.total}</td>
                      <td className="px-5 py-4 font-mono">{payment.principal}</td>
                      <td className="px-5 py-4 font-mono text-amber">{payment.interest}</td>
                      <td className="px-5 py-4 font-mono">{payment.escrow}</td>
                      <td className="px-5 py-4 font-mono font-bold text-ink">{payment.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Paginación */}
            <div className="flex items-center justify-between border-x border-b border-rule bg-surface-2 p-4 rounded-b-xl">
              <span className="text-sm text-ink-3">
                {cd.pagination.page} {currentPage} {cd.pagination.of} {totalPages}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded border border-rule bg-surface px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-surface-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cd.pagination.prev}
                </button>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded border border-rule bg-surface px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-surface-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cd.pagination.next}
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
  );
}

export default function ContractDetailPage() {
  return (
    <SiteShell isDashboard={true}>
      <ContractDetailContent />
    </SiteShell>
  );
}