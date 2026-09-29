"use client";

import { useState } from "react";
import { Package, Search, SlidersHorizontal, LayoutGrid, List, Plus, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";
import { FilterChip, StatusPill } from "@/app/components/ui";

export default function CatalogPage() {
  return (
    <SiteShell isDashboard={true}>
      <CatalogContent />
    </SiteShell>
  );
}

function CatalogContent() {
  const { t } = useSite();
  const c = t.catalog;

  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "archived">("active");

  // Mock data representing the products in the catalog
  const mockProducts = [
    {
      id: "prod_1",
      name: "Bridge Loan - Standard",
      subName: "6-18 month • interest only",
      updated: "Sep 17, 2026",
      category: c.categories.loan,
      price: "$99.00 / mo",
      priceSub: "+ 1% at closing",
      created: "Sep 1, 2026",
      status: "active"
    },
    {
      id: "prod_2",
      name: "Slow Flip - Owner Finance",
      subName: "15 / 20 / 30 year • fully amortized",
      updated: "Sep 17, 2026",
      category: c.categories.loan,
      price: "$39.00 / mo",
      priceSub: "no origination fee",
      created: "Sep 1, 2026",
      status: "active"
    },
    {
      id: "prod_3",
      name: "PML Membership - Borrower",
      subName: "Monthly subscription to post deals",
      updated: "Sep 17, 2026",
      category: c.categories.sub,
      price: "$99.00 / mo",
      priceSub: null,
      created: "Sep 3, 2026",
      status: "active"
    },
    {
      id: "prod_4",
      name: "Affiliate Referral Program",
      subName: "25% of all borrower fees • $250 at close + $45.58/mo residual",
      updated: "Sep 17, 2026",
      category: c.categories.affiliate,
      price: "Revenue share",
      priceSub: "25% of borrower fees",
      created: "Sep 17, 2026",
      status: "active"
    },
    {
      id: "prod_5",
      name: "DAD Community Membership",
      subName: "OwnerToDueno operator training + access",
      updated: "Jun 3, 2026",
      category: c.categories.edu,
      price: "$99.00 / mo",
      priceSub: null,
      created: "Jun 3, 2026",
      status: "active"
    },
    {
      id: "prod_6",
      name: "The DAD Method Course",
      subName: "Owner-finance investing training program",
      updated: "Jun 3, 2026",
      category: c.categories.edu,
      price: "$999.00 USD",
      priceSub: null,
      created: "Jun 3, 2026",
      status: "active"
    },
    {
      id: "prod_7",
      name: "Dueño a Dueño Property Deposit",
      subName: "Non-refundable deposit to reserve a DAD property",
      updated: "Jun 29, 2026",
      category: c.categories.deposit,
      price: "$2,500.00 USD",
      priceSub: null,
      created: "Jun 29, 2026",
      status: "active"
    }
  ];

  return (
    <div className="mx-auto max-w-[1100px] pb-24 pt-6">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-[22px] font-bold tracking-tight text-ink">{c.title}</h1>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-rule bg-surface text-ink-2 transition-colors hover:border-ink-3">
            <MoreHorizontal size={16} />
          </button>
          <button className="flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-1.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90">
            <Plus size={14} strokeWidth={3} /> {c.createBtn}
            <span className="ml-1 rounded border border-white/20 px-1.5 py-0.5 font-mono text-[9px] text-white/80">N</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex overflow-x-auto border-b border-rule">
        {c.tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`whitespace-nowrap border-b-2 px-3.5 py-2.5 text-[13px] font-medium transition-colors ${
              activeTab === idx 
                ? "border-ink font-semibold text-ink" 
                : "border-transparent text-ink-3 hover:text-ink"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter Row */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5">
          <FilterChip 
            label={c.filters.all} 
            isActive={activeFilter === "all"} 
            onClick={() => setActiveFilter("all")} 
          />
          <FilterChip 
            label={c.filters.active} 
            isActive={activeFilter === "active"} 
            onClick={() => setActiveFilter("active")} 
          />
          <FilterChip 
            label={c.filters.archived} 
            isActive={activeFilter === "archived"} 
            onClick={() => setActiveFilter("archived")} 
          />
        </div>

        <div className="h-5 w-px bg-rule" />

        <div className="relative w-full max-w-[320px] flex-1">
          <Search className="absolute left-3 top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-ink-3" />
          <input 
            type="text" 
            placeholder={c.filters.search} 
            className="w-full rounded-md border border-rule bg-surface px-3 py-1.5 pl-8 text-[13px] text-ink outline-none transition-colors focus:border-accent"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-md border border-rule bg-surface px-3 py-1.5 text-[13px] font-medium text-ink-2 transition-colors hover:border-ink-3 hover:text-ink">
            <SlidersHorizontal size={14} />
            {c.filters.filterBtn}
          </button>
          
          <div className="flex overflow-hidden rounded-md border border-rule">
            <button className="flex h-8 w-8 items-center justify-center bg-surface-2 text-ink">
              <List size={14} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center bg-surface text-ink-3 transition-colors hover:bg-surface-2">
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-rule bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-[13px]">
            <thead className="border-b border-rule bg-bg">
              <tr>
                <th className="w-10 px-4 py-3"><input type="checkbox" className="accent-accent" /></th>
                <th className="px-4 py-3 font-medium text-ink-3">{c.table.name}</th>
                <th className="px-4 py-3 font-medium text-ink-3">{c.table.updated}</th>
                <th className="px-4 py-3 font-medium text-ink-3">{c.table.category}</th>
                <th className="px-4 py-3 font-medium text-ink-3">{c.table.pricing}</th>
                <th className="px-4 py-3 font-medium text-ink-3">{c.table.created}</th>
                <th className="px-4 py-3 font-medium text-ink-3">{c.table.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule text-ink">
              {mockProducts.map((prod) => (
                <tr key={prod.id} className="transition-colors hover:bg-surface-2">
                  <td className="px-4 py-3.5"><input type="checkbox" className="accent-accent" /></td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-rule bg-surface-2 text-ink-3">
                        <Package size={14} />
                      </div>
                      <div>
                        <div className="font-semibold text-accent hover:underline cursor-pointer">{prod.name}</div>
                        <div className="mt-0.5 text-[11px] text-ink-3">{prod.subName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-ink-3">{prod.updated}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-block rounded-lg bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-ink-2 border border-rule">
                      {prod.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-ink">{prod.price}</div>
                    {prod.priceSub && <div className="mt-0.5 text-[11px] text-ink-3">{prod.priceSub}</div>}
                  </td>
                  <td className="px-4 py-3.5 text-ink-3">{prod.created}</td>
                  <td className="px-4 py-3.5">
                    <StatusPill status="success" label={t.uiComponents.status.active} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-rule bg-bg px-4 py-3 text-[13px] text-ink-3">
          <span>{c.pagination.showing}</span>
          <div className="flex gap-1.5">
            <button disabled className="flex h-7 w-7 items-center justify-center rounded border border-rule bg-surface opacity-50">
              <ChevronLeft size={14} />
            </button>
            <button disabled className="flex h-7 w-7 items-center justify-center rounded border border-rule bg-surface opacity-50">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}