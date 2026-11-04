"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSite } from "@/app/components/layout/SiteShell";
import { apiFetch } from "@/app/lib/apiFetch";
import { API_ROUTES } from "@/app/lib/endpoints";
import { ToDo } from './BorrowerMainDashboard/ToDo';
import { PaymentsTable } from './BorrowerMainDashboard/PaymentsTable';
import { BorrowerCard } from './BorrowerMainDashboard/BorrowerCard';
import { BorrowerWaitingOnYou } from './BorrowerMainDashboard/BorrowerWaitingOnYou';

export default function BorrowerDashboardView() {
  const { t, lang } = useSite();
  const dict = t;
  const isEs = lang === "es";
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        // Consulta de perfil y contratos al backend usando la API de referencia
        const [meRes, contractsRes] = await Promise.all([
          apiFetch(API_ROUTES.auth.me).catch(() => null),
          apiFetch(API_ROUTES.contracts.base).catch(() => null)
        ]);

        let userInitials = "US";
        let dealsClosed = 0;
        let activeLoans = 0;
        let totalBorrowed = 0;

        if (meRes && meRes.ok) {
          const meJson = await meRes.json();
          const name = meJson.data?.user?.name || "Usuario";
          userInitials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
        }

        if (contractsRes && contractsRes.ok) {
          const cJson = await contractsRes.json();
          const items = cJson.data?.items || [];
          dealsClosed = items.filter((c: any) => c.status === "PAID_OFF").length;
          activeLoans = items.filter((c: any) => c.status === "ACTIVE" || c.status === "DELINQUENT").length;
          totalBorrowed = items.reduce((acc: number, c: any) => acc + Number(c.currentTerms?.principalAmount || 0), 0);
        }

        setData({
          user: { initials: userInitials, level: "PML Rookie" },
          stats: {
            dealsClosed,
            totalBorrowed: "$" + (totalBorrowed > 0 ? (totalBorrowed / 1000).toFixed(1) + "K" : "0"),
            onTimePayments: "100%",
            activeLoans,
            reportStatus: isEs ? "No iniciado" : "Not started"
          },
          todoTasks: [
            { label: isEs ? "Publica tu primer trato" : "Post your first deal", done: true },
            { label: isEs ? "Agrega tu entidad" : "Add your entity", done: false },
            { label: isEs ? "Vincula tu banco" : "Link a bank account", done: true },
            { label: isEs ? "Puntaje de Credito" : "Credit Score", done: false }
          ],
          payments: { upcoming: [], recent: [] },
          alerts: [
            { message: isEs ? "Verifica tu entidad para publicar." : "Verify entity to post deals.", actionText: isEs ? "Verificar" : "Verify" }
          ]
        });
      } catch (error) {
        console.error("Error fetching dashboard", error);
      }
    }
    fetchDashboard();
  }, [isEs]);

  if (!data) return <div className="p-8 text-ink-3">{dict.dashboardBorrower.loading}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Columna Principal (Izquierda) */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-ink mb-2">
          {isEs ? "Es hora de " : "It's time to "}<span className="text-brand-purple">{isEs ? "arrancar." : "get fired."}</span>
        </h1>

        <ToDo dict={dict} tasks={data.todoTasks} />

        {/* Banner estatico: Got a new deal? */}
        <div className="bg-surface border border-rule-strong rounded-xl p-6 flex justify-between items-center shadow-card">
          <div className="w-2/3">
            <h3 className="font-bold text-ink mb-1">{isEs ? "¿Tienes un trato nuevo?" : "Got a new deal?"}</h3>
            <p className="text-sm text-ink-2">{isEs ? "Ingresa la direccion y los numeros. PML los evalua y crea una presentacion para los prestamistas que elijas. Nada se envia sin tu aprobacion." : "Enter the address and the numbers. PML runs them and drafts a pitch for the lenders you pick. Nothing goes out until you approve."}</p>
          </div>
          <Link href="/borrowerDashboard/submit-deal" className="bg-accent text-accent-ink px-4 py-2 rounded-md font-bold text-sm hover:opacity-90 no-underline">
            {isEs ? "Analizar Trato" : "Analyze Deal"}
          </Link>
        </div>
        <PaymentsTable dict={dict} upcoming={data.payments.upcoming} recent={data.payments.recent} />
        
        {/* Footer widgets */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface border border-rule rounded-xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:border-rule-strong transition-colors">
            <div className="flex gap-3 items-center">
              <span className="text-ink-2">🎓</span>
              <div>
                <p className="font-bold text-sm text-ink">{dict.dashboardBorrower.widgets.education.title}</p>
                <p className="text-xs text-ink-2">{dict.dashboardBorrower.widgets.education.sub}</p>
              </div>
            </div>
            <span className="text-ink-3">➔</span>
          </div>
          <div className="bg-surface border border-rule rounded-xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:border-rule-strong transition-colors">
            <div className="flex gap-3 items-center">
              <span className="text-ink-2">🛡️</span>
              <div>
                <p className="font-bold text-sm text-ink">{dict.dashboardBorrower.widgets.insurance.title}</p>
              </div>
            </div>
            <span className="text-ink-3">➔</span>
          </div>
        </div>
      </div>

      {/* Sidebar (Derecha) */}
      <div className="flex flex-col gap-6 mt-14">
        <BorrowerCard dict={dict} user={data.user} stats={data.stats} />
        <BorrowerWaitingOnYou dict={dict} alerts={data.alerts} />
      </div>
    </div>
  );
}