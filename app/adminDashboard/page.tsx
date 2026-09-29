// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import ThemeToggle from "@/app/components/ambos/ThemeToggle";
import LangToggle from "@/app/components/ambos/LangToggle";
import LogoutButton from "@/app/components/ambos/LogoutButton";
import { API_ROUTES } from "@/app/lib/endpoints";

// Vistas individuales importadas
import { OverviewView } from "./AdminViewsComponents/OverviewView";
import { AllDealsView } from "./AdminViewsComponents/AllDealsView";
import { LendersView } from "./AdminViewsComponents/LendersView";
import { BorrowersView } from "./AdminViewsComponents/BorrowersView";
import {
  RevenueView,
  AffiliatesView,
  VerificationsView,
  PromoCodesView,
  SettingsView
} from "./AdminViewsComponents/PlaceholderViews";

export default function AdminDashboardPage() {
  return (
    <SiteShell isMinimal={true}>
      <AdminDashboardContent />
    </SiteShell>
  );
}

function AdminDashboardContent() {
  const { t } = useSite();
  const d = t.dashboardAdmin;
  const router = useRouter();

  // Estados
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [contracts, setContracts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // Array para iterar el menu lateral facilmente
  const navItems = [
    { id: "overview", label: d.nav.overview },
    { id: "allDeals", label: d.nav.allDeals },
    { id: "lenders", label: d.nav.lenders },
    { id: "borrowers", label: d.nav.borrowers },
    { id: "revenue", label: d.nav.revenue },
    { id: "affiliates", label: d.nav.affiliates },
    { id: "verifications", label: d.nav.verifications },
    { id: "promoCodes", label: d.nav.promoCodes },
    { id: "settings", label: d.nav.settings }
  ];

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const token = localStorage.getItem("accessToken");
        
        // Si no hay token en el almacenamiento local, expulsar inmediatamente
        if (!token) {
          router.push("/login");
          return;
        }

        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };

        const [meRes, contractsRes, usersRes] = await Promise.all([
          fetch(API_ROUTES.auth.me, { headers }),
          fetch(API_ROUTES.contracts.base, { headers }),
          fetch(API_ROUTES.users.base, { headers })
        ]);

        // Si el token es invalido o expiro
        if (!meRes.ok) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          router.push("/login");
          return;
        }

        const meJson = await meRes.json();
        const user = meJson.data?.user;

        // Validar que el rol sea especificamente ADMIN
        if (user?.role !== "ADMIN") {
          router.push("/login");
          return;
        }

        setCurrentUser(user);

        if (contractsRes.ok) {
          const cJson = await contractsRes.json();
          setContracts(Array.isArray(cJson.data) ? cJson.data : (cJson.data?.items || []));
        }

        if (usersRes.ok) {
          const uJson = await usersRes.json();
          setUsers(Array.isArray(uJson.data) ? uJson.data : (uJson.data?.items || []));
        }
      } catch (err) {
        setError(d.errorNetwork);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAdminData();
  }, [d.errorNetwork, router]);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-bg text-ink-3">{d.loading}</div>;
  }

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Topbar */}
      <div className="fixed left-0 right-0 top-0 z-[100] flex h-[52px] items-center justify-between border-b border-rule bg-brand-dark px-7">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-[17px] font-extrabold tracking-[-0.3px] text-white no-underline">
            PayMy<span className="text-accent">Loan</span>.ai
          </Link>
          <div className="rounded-[10px] bg-accent px-2.5 py-1 text-[10px] font-bold tracking-[0.4px] text-white">
            ADMIN
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-ink-3">
          <span className="hidden sm:inline">{d.systemStatus} · {currentUser?.name || "Admin"}</span>
          <div className="flex items-center gap-3 border-l border-rule-strong pl-4">
            <LangToggle className="h-6 min-w-6 rounded px-1 font-bold transition-colors hover:text-white" />
            <ThemeToggle iconSize={14} className="h-6 w-6 rounded transition-colors hover:text-white" />
            <LogoutButton iconSize={14} className="ml-1 font-bold transition-colors hover:text-crit" />
          </div>
        </div>
      </div>

      {/* Sidebar (Dinamico segun estado) */}
      <div className="fixed bottom-0 left-0 top-[52px] hidden w-[200px] flex-col border-r border-rule bg-brand-dark py-5 md:flex">
        {navItems.map(item => (
          <div 
            key={item.id} 
            onClick={() => setActiveTab(item.id)}
            className={`cursor-pointer border-l-4 px-5 py-2.5 text-[13px] transition-colors ${
              activeTab === item.id 
                ? "border-accent bg-accent/10 font-bold text-white" 
                : "border-transparent text-ink-3 hover:text-white"
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* Main Content (Se renderiza la vista correspondiente al Tab Activo) */}
      <div className="mt-[52px] flex-1 p-6 md:ml-[200px] md:p-8">
        {error && (
          <div className="mb-6 rounded-lg bg-crit-soft p-4 text-sm font-medium text-crit">{error}</div>
        )}
        
        {/* Renderizado de Vistas dinamico */}
        {(() => {
          const VIEW_MAP: Record<string, any> = {
            overview: OverviewView,
            allDeals: AllDealsView,
            lenders: LendersView,
            borrowers: BorrowersView,
            revenue: RevenueView,
            affiliates: AffiliatesView,
            verifications: VerificationsView,
            promoCodes: PromoCodesView,
            settings: SettingsView
          };
          const ActiveComponent = VIEW_MAP[activeTab] || VIEW_MAP.overview;
          return <ActiveComponent contracts={contracts} users={users} setActiveTab={setActiveTab} />;
        })()}
      </div>
    </div>
  );
}