// app/contracts/page.tsx
"use client";

import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { useEffect, useState } from "react";

// TODO: BACKEND - Próximos pasos cuando esté la API
// 1. Quitar los mockContracts.
// 2. Usar un useEffect para hacer un fetch a la API (ej. GET /api/contracts).
// 3. El backend leerá la cookie o token de sesión, sabrá quién es y regresará SOLO los contratos pertinentes.
// 4. Guardar la respuesta del fetch en un state: const [contracts, setContracts] = useState([])

function ContractsContent() {
  const { t } = useSite();
  const c = t.contractsList;

  // Mock temporal para simular respuesta del backend
  const [contracts] = useState([
    {
      id: "CTR-001",
      concept: "Préstamo Comercial",
      property: "123 Main St, Memphis",
      clientName: "John Smith",
      clientPhone: "555-0101",
      monthlyPayment: "$2,500",
      totalAmount: "$250,000",
      downPayment: "$50,000",
      status: "active"
    },
    {
      id: "CTR-002",
      concept: "Renovación Residencial",
      property: "456 Oak Dr, Nashville",
      clientName: "Jane Doe",
      clientPhone: "555-0202",
      monthlyPayment: "$1,200",
      totalAmount: "$85,000",
      downPayment: "$15,000",
      status: "inactive"
    }
  ]);

  return (
      <div className="min-h-screen bg-bg p-6 lg:p-14">
        <div className="mx-auto max-w-[1200px]">
          
          <button
             onClick={() => window.history.back()}
             className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-ink-3 transition-colors hover:text-accent"
          >
            <span>&larr;</span> {c.back}
          </button>

          <header className="mb-10">
            <h1 className="text-[32px] font-black tracking-tight text-ink">{c.title}</h1>
            <p className="text-ink-2">{c.subtitle}</p>
          </header>

          <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
            <table className="w-full min-w-[900px] border-collapse text-left text-[14px]">
              <thead className="border-b border-rule bg-surface-2">
                <tr>
                  <th className="px-5 py-4 font-bold text-ink-3">{c.table.id}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{c.table.concept}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{c.table.property}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{c.table.client}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{c.table.financials}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{c.table.status}</th>
                  <th className="px-5 py-4 font-bold text-ink-3">{c.table.actions}</th>
                </tr>
              </thead>
              <tbody className="text-ink-2">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="border-b border-rule hover:bg-surface-2 transition-colors">
                    <td className="px-5 py-4 font-bold text-ink">{contract.id}</td>
                    <td className="px-5 py-4">{contract.concept}</td>
                    <td className="px-5 py-4 font-medium text-ink">{contract.property}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-ink">{contract.clientName}</div>
                      <div className="text-xs text-ink-3">{contract.clientPhone}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-accent">{contract.monthlyPayment}/mes</div>
                      <div className="text-xs text-ink-3">Total: {contract.totalAmount} (Eng: {contract.downPayment})</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-[4px] border px-2.5 py-1 text-xs font-bold ${contract.status === 'active' ? 'bg-green-100 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400' : 'bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'}`}>
                        {contract.status === 'active' ? c.status.active : c.status.inactive}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/contracts/${contract.id}`} className="text-sm font-bold text-accent hover:underline">
                        {c.viewDetails} &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
  );
}

export default function ContractsPage() {
  return (
    <SiteShell isDashboard={true}>
      <ContractsContent />
    </SiteShell>
  );
}