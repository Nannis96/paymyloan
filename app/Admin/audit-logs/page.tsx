import SiteShell from "@/app/components/layout/SiteShell";
import { AuditLogsClient, LogItem } from "./AuditLogsClient";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    actorRole?: string;
    search?: string;
  }>;
}

export default async function AuditLogsPage({ searchParams }: PageProps) {
  // En Next.js 15+ es buena práctica hacer await de searchParams
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  
  // Aquí construirías la URL para tu API real
  /*
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: "15",
    role: params.actorRole || "",
    search: params.search || "",
  });
  
  const res = await fetch(`https://api.paymyloan.ai/v1/admin/logs?${queryParams}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store" // Para que siempre traiga los datos frescos
  });
  const { data: logs, totalCount } = await res.json();
  */

  // --- DATOS SIMULADOS PARA EL DISEÑO ---
  const totalCount = 45;
  const totalPages = Math.ceil(totalCount / 15);
  const logs: LogItem[] = [
    {
      id: "log_1",
      actorRole: "SYSTEM",
      actorName: "Webhook LeadConnector",
      action: "CRM_SYNC_SUCCESS",
      entityType: "INTEGRATION",
      description: "Sincronización exitosa del prospecto Spencer Shadrach hacia GoHighLevel.",
      createdAt: new Date().toISOString(),
    },
    {
      id: "log_2",
      actorRole: "ADMIN",
      actorName: "Andrés García",
      action: "USER_VERIFIED",
      entityType: "USER",
      description: "Aprobación manual de documentos KYC (Know Your Customer).",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    }
  ];
  // ----------------------------------------

  return (
    <SiteShell isDashboard={true}>
      <div className="min-h-screen bg-bg p-6 lg:p-14">
        <div className="mx-auto max-w-[1200px] space-y-8">
          <div>
            <h1 className="text-[32px] font-black tracking-tight text-ink">
              Registro de Auditoría
            </h1>
            <p className="text-ink-2 mt-1">
              Trazabilidad en tiempo real de acciones ejecutadas por Webhooks, Usuarios y Administradores.
            </p>
          </div>

          <AuditLogsClient
            logs={logs}
            currentPage={page}
            totalPages={totalPages}
            totalCount={totalCount}
            currentFilters={{
              actorRole: params.actorRole || "",
              search: params.search || "",
            }}
          />
        </div>
      </div>
    </SiteShell>
  );
}