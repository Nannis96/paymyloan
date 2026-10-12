"use client";

import { useSite } from "@/app/components/layout/SiteShell";

export default function CatalogPage() {
  const { t } = useSite();
  const cat = t.catalog;

  return (
    <div className="animate-in fade-in duration-300 max-w-[1200px]">
      {/* Encabezado */}
      <div className="mb-[24px] flex items-center justify-between">
        <div>
          <h1 className="text-[20px] font-[800] tracking-[-0.3px] text-[#0a2540]">
            {cat.title}
          </h1>
          <p className="mt-[2px] text-[13px] text-[#8898aa]">
            {t.dashboardAdmin.views.catalog.subtitle}
          </p>
        </div>
        <button className="cursor-pointer rounded-[6px] bg-[#635bff] px-[16px] py-[8px] text-[13px] font-[700] text-white transition-colors hover:bg-[#524ddb]">
          + {cat.createBtn}
        </button>
      </div>

      {/* Pestañas (Tabs) */}
      <div className="mb-[20px] flex gap-[8px] border-b border-[#e6ebf1] pb-[12px] overflow-x-auto scrollbar-none">
        {cat.tabs.map((tab: string, idx: number) => (
          <button 
            key={idx} 
            className={`whitespace-nowrap px-[14px] py-[6px] text-[13px] font-[600] rounded-[6px] transition-colors ${
              idx === 0 ? 'bg-[#f0efff] text-[#635bff]' : 'bg-transparent text-[#8898aa] hover:bg-[#f6f9fc] hover:text-[#0a2540]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contenedor de la tabla y filtros */}
      <div className="overflow-hidden rounded-[10px] border border-[#e6ebf1] bg-white shadow-sm">
        {/* Barra de busqueda */}
        <div className="flex items-center justify-between border-b border-[#e6ebf1] p-[16px_20px]">
          <input 
            type="text" 
            placeholder={cat.filters.search} 
            className="w-[300px] rounded-[6px] border border-[#e6ebf1] bg-[#f6f9fc] px-[14px] py-[8px] text-[13px] text-[#0a2540] outline-none transition-colors focus:border-[#635bff] focus:bg-white" 
          />
          <button className="cursor-pointer rounded-[6px] border border-[#e6ebf1] bg-white px-[14px] py-[8px] text-[13px] font-[600] text-[#425466] transition-colors hover:bg-[#f6f9fc]">
            {cat.filters.filterBtn}
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#f6f9fc]">
              <tr>
                <th className="p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{cat.table.name}</th>
                <th className="p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{cat.table.category}</th>
                <th className="p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{cat.table.pricing}</th>
                <th className="p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{cat.table.status}</th>
                <th className="p-[12px_20px] text-[10px] font-[700] uppercase tracking-[0.5px] text-[#aab7c4]">{cat.table.created}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="p-[60px] text-center text-[13px] text-[#8898aa]">
                  {t.dashboardAdmin.views.placeholder.subtitle}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}