// app/admin/AdminViewsComponents/CatalogView.tsx
"use client";

import { useSite } from "@/app/components/layout/SiteShell";

export function CatalogView() {
  const { t } = useSite();
  const cat = t.catalog;

  return (
    <div className="animate-in fade-in duration-300">
      {/* Encabezado */}
      <div className="mb-[24px] flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-extrabold text-ink">
            {cat.title}
          </h1>
          <p className="mt-[2px] text-[13px] text-ink-3">
            {t.dashboardAdmin.views.catalog.subtitle}
          </p>
        </div>
        <button className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-[13px] font-bold text-accent-ink transition-colors hover:opacity-90">
          + {cat.createBtn}
        </button>
      </div>

      {/* Pestanas (Tabs) */}
      <div className="mb-[20px] flex gap-[8px] border-b border-rule pb-[12px] overflow-x-auto scrollbar-none">
        {cat.tabs.map((tab: string, idx: number) => (
          <button
            key={idx}
            className={`whitespace-nowrap px-[14px] py-[6px] text-[13px] font-bold rounded-lg transition-colors ${
              idx === 0 ? 'bg-accent/10 text-accent' : 'bg-transparent text-ink-3 hover:bg-surface-2 hover:text-ink'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contenedor de la tabla y filtros */}
      <div className="overflow-hidden rounded-[10px] border border-rule bg-surface shadow-sm">
        {/* Barra de busqueda */}
        <div className="flex items-center justify-between border-b border-rule p-4">
          <input
            type="text"
            placeholder={cat.filters.search}
            className="w-[300px] rounded-lg border border-rule bg-surface-2 px-4 py-2 text-[13px] text-ink outline-none transition-colors focus:border-accent focus:bg-surface"
          />
          <button className="cursor-pointer rounded-lg border border-rule bg-surface px-4 py-2 text-[13px] font-bold text-ink-2 transition-colors hover:bg-surface-2">
            {cat.filters.filterBtn}
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-surface-2">
              <tr>
                <th className="p-[12px_20px] text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{cat.table.name}</th>
                <th className="p-[12px_20px] text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{cat.table.category}</th>
                <th className="p-[12px_20px] text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{cat.table.pricing}</th>
                <th className="p-[12px_20px] text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{cat.table.status}</th>
                <th className="p-[12px_20px] text-[10px] font-bold uppercase tracking-[0.5px] text-ink-3">{cat.table.created}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="p-[60px] text-center text-[13px] text-ink-3">
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