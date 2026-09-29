"use client";

import { useState, useEffect } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { MetricCard } from "@/app/components/ui";
import Link from "next/link";
import { Download } from "lucide-react";

// URL base de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function BookkeeperDashboardContent() {
  const { t } = useSite();
  // Se asume que actualizaste el archivo copy.ts
  const b = (t as any).dashboardBookkeeper;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // MOCK DATA: En producción esto vendría de un endpoint tipo GET /api/bookkeeper/records
  const mockData = {
    activeLoans: 24,
    totalInterestYTD: "$45,230.00",
    totalPrincipalYTD: "$120,500.00"
  };

  const mockRecords = [
    { id: "CTR-001", property: "123 Main St, Austin", borrower: "Liam Brown", lender: "NextGen Growth LLC", interest: "$1,200.00", principal: "$0.00" },
    { id: "CTR-002", property: "456 Oak Ave, Dallas", borrower: "Jane Doe", lender: "Private Capital Group", interest: "$850.00", principal: "$150.00" }
  ];

  useEffect(() => {
    // Simulación de carga (reemplazar con el fetch real al backend)
    const fetchAccountingData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error(b.errorAuth);
        
        // Simulación de demora
        await new Promise(resolve => setTimeout(resolve, 800));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : b.errorNetwork);
        setIsLoading(false);
      }
    };
    fetchAccountingData();
  }, [b.errorAuth, b.errorNetwork]);

  const handleExport = () => {
    // TODO: Llamada a la API para generar y descargar el CSV/PDF
    alert("Generando reporte de fin de año (CSV)...");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg p-6 lg:p-14 flex items-center justify-center">
        <p className="text-ink-3">{b.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-6 lg:p-14">
      <div className="mx-auto max-w-[1100px]">
        
        <header className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="text-[32px] font-black tracking-tight text-ink">{b.title}</h1>
            <p className="text-ink-2 mt-1">{b.subtitle}</p>
          </div>
          
          <button 
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 shadow-sm"
          >
            <Download className="w-4 h-4" />
            {b.exportBtn}
          </button>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Métricas Contables */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
          <MetricCard label={b.metrics.activeLoans} value={mockData.activeLoans.toString()} />
          <MetricCard label={b.metrics.totalInterest} value={mockData.totalInterestYTD} accent />
          <MetricCard label={b.metrics.totalPrincipal} value={mockData.totalPrincipalYTD} />
        </div>

        {/* Tabla de registros (Capital vs Interés) */}
        <div className="overflow-x-auto rounded-xl border border-rule bg-surface shadow-sm">
          <table className="w-full text-left text-[14px]">
            <thead className="border-b border-rule bg-surface-2">
              <tr>
                <th className="px-5 py-4 font-bold text-ink-3">{b.tableHeaders.property}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{b.tableHeaders.borrower}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{b.tableHeaders.lender}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{b.tableHeaders.interest}</th>
                <th className="px-5 py-4 font-bold text-ink-3">{b.tableHeaders.principal}</th>
                <th className="px-5 py-4 font-bold text-ink-3"></th>
              </tr>
            </thead>
            <tbody className="text-ink-2 divide-y divide-rule">
              {mockRecords.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-8 text-center text-ink-3">{b.empty}</td></tr>
              ) : (
                mockRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-surface-2 transition-colors">
                    <td className="px-5 py-4 font-medium text-ink">{record.property}</td>
                    <td className="px-5 py-4">{record.borrower}</td>
                    <td className="px-5 py-4">{record.lender}</td>
                    <td className="px-5 py-4 font-mono font-bold text-amber">{record.interest}</td>
                    <td className="px-5 py-4 font-mono text-ink">{record.principal}</td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/contracts/${record.id}`} className="text-sm font-bold text-accent hover:underline">
                        Ver Detalles &rarr;
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default function BookkeeperPage() {
  return (
    <SiteShell isDashboard={true}>
      <BookkeeperDashboardContent />
    </SiteShell>
  );
}