"use client";

import { useSite } from "@/app/components/layout/SiteShell";

export default function AuditLogsPage() {
  const { t } = useSite();
  const logs = t.auditLogs;

  return (
    <div className="animate-in fade-in duration-300 max-w-[1200px]">
      {/* Encabezado */}
      <div className="mb-[24px]">
        <h1 className="text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">
          {t.dashboardAdmin.nav.auditLogs}
        </h1>
        <p className="mt-[2px] text-[13px] text-[#8898aa]">
          {t.dashboardAdmin.views.auditLogs?.subtitle || "Historial completo de acciones y eventos del sistema."}
        </p>
      </div>

      {/* Controles de filtro */}
      <div className="mb-[20px] flex flex-col gap-[12px] sm:flex-row sm:items-center">
        <input 
          type="text" 
          placeholder={logs.searchPlaceholder} 
          className="flex-1 rounded-[6px] border border-[#e6ebf1] bg-white px-[14px] py-[9px] text-[13px] text-[#0a2540] outline-none transition-colors focus:border-[#635bff]" 
        />
        <select className="min-w-[180px] cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[14px] py-[9px] text-[13px] font-[500] text-[#425466] outline-none transition-colors focus:border-[#635bff]">
          <option>{logs.allRoles}</option>
          <option>{logs.system}</option>
          <option>{logs.admins}</option>
          <option>{logs.lenders}</option>
          <option>{logs.borrowers}</option>
        </select>
      </div>

      {/* Tabla de auditoria */}
      <div className="overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#f6f9fc]">
              <tr>
                <th className="p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{logs.dateHour}</th>
                <th className="p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{logs.actor}</th>
                <th className="p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{logs.action}</th>
                <th className="p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{logs.description}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="p-[60px] text-center text-[13px] text-[#8898aa]">
                  {logs.noRecords}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Footer de Paginacion */}
        <div className="flex items-center justify-between border-t border-[#e6ebf1] bg-[#fafbfd] p-[12px_20px]">
          <div className="text-[12px] font-[500] text-[#8898aa]">
            {logs.totalRecords} 0
          </div>
          <div className="flex items-center gap-[12px]">
            <button className="cursor-not-allowed text-[12px] font-[600] text-[#aab7c4]">{logs.prev}</button>
            <span className="text-[12px] text-[#425466]">{logs.page} 1 {logs.of} 1</span>
            <button className="cursor-not-allowed text-[12px] font-[600] text-[#aab7c4]">{logs.next}</button>
          </div>
        </div>
      </div>
    </div>
  );
}