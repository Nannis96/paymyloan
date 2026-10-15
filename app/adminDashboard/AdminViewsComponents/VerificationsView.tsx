"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";
import { BASE_URL } from "@/app/lib/endpoints";
import { apiFetch } from "@/app/lib/apiFetch";

export function VerificationsView() {
  const { t, lang } = useSite();
  const v = t.dashboardAdmin.views.verifications;

  const [verifications, setVerifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("PENDING");

  const fetchVerifications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await apiFetch(`${BASE_URL}/api/admin/verifications?status=${statusFilter}`);
      if (!res.ok) {
        throw new Error("Error al cargar las verificaciones");
      }
      const json = await res.json();
      if (json.success) {
        setVerifications(json.data.items || []);
      } else {
        throw new Error(json.error?.message || "Error al cargar las verificaciones");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de red");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, [statusFilter]);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    if (!confirm(`¿Estás seguro de ${action === 'approve' ? 'aprobar' : 'rechazar'} esta entidad?`)) return;
    
    try {
      // El backend exige un "reason" al rechazar
      const body = action === "reject" ? JSON.stringify({ reason: "Rechazado por el administrador" }) : undefined;
      const res = await apiFetch(`${BASE_URL}/api/admin/verifications/${id}/${action}`, {
        method: "POST",
        body
      });
      
      if (res.ok) {
        fetchVerifications();
      } else {
        const json = await res.json();
        alert(json.error?.message || "Error al procesar la solicitud");
      }
    } catch (err) {
      alert("Error de red al procesar la solicitud");
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="mb-1 text-[22px] font-extrabold text-ink">{v.title}</h1>
          <p className="text-[13px] text-ink-3">{v.subtitle}</p>
        </div>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="cursor-pointer rounded-lg border border-rule bg-surface-2 px-4 py-2 text-[13px] font-bold text-ink outline-none transition-colors focus:border-accent focus:bg-surface"
        >
          <option value="PENDING">Pendientes</option>
          <option value="APPROVED">Aprobadas</option>
          <option value="REJECTED">Rechazadas</option>
        </select>
      </div>
      
      {error && (
        <div className="mb-4 rounded-lg bg-crit-soft p-4 text-sm font-medium text-crit">{error}</div>
      )}

      <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-2 text-[10px] font-bold uppercase tracking-[0.4px] text-ink-3">
              <tr>
                <th className="px-4 py-3">Entidad</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Rol</th>
                <th className="px-4 py-3">Solicitante</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule text-[12px] text-ink-2">
              {isLoading ? (
                <tr><td colSpan={6} className="p-6 text-center text-ink-3">Cargando solicitudes...</td></tr>
              ) : verifications.length > 0 ? (
                verifications.map((req) => (
                  <tr key={req.id} className="transition-colors hover:bg-surface-2">
                    <td className="px-4 py-3 font-bold text-ink">
                      {req.entityName}
                      <span className="mt-0.5 block text-[10px] font-normal text-ink-3">EIN: {req.ein || "N/A"}</span>
                    </td>
                    <td className="px-4 py-3">{req.entityType}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold ${req.subject === 'LENDER' ? 'bg-amber-soft text-amber' : 'bg-success-soft text-success'}`}>
                        {req.subject}
                      </span>
                    </td>
                    <td className="px-4 py-3">{req.submittedByUser?.name || "N/A"}</td>
                    <td className="px-4 py-3">
                      {new Date(req.createdAt).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "short", day: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {req.status === "PENDING" ? (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => handleAction(req.id, "reject")} className="rounded border border-crit px-3 py-1 text-[11px] font-bold text-crit transition-colors hover:bg-crit hover:text-white">
                            Rechazar
                          </button>
                          <button onClick={() => handleAction(req.id, "approve")} className="rounded bg-success px-3 py-1 text-[11px] font-bold text-white transition-opacity hover:opacity-90">
                            Aprobar
                          </button>
                        </div>
                      ) : (
                        <span className={`font-bold ${req.status === 'APPROVED' ? 'text-success' : 'text-crit'}`}>
                          {req.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="p-6 text-center text-ink-3">No hay solicitudes en este estado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}