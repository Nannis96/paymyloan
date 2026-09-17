"use client";

import { useSite } from "../layout/SiteShell";
import Link from "next/link";

export default function BorrowerLandingView() {
  const { t, activeTab } = useSite();
  const p = t.prototype;
  const d = p.borrowerMap;

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-start bg-bg mx-auto max-w-[1400px]">
      
      {/* Contenido Principal */}
      <div className="flex-1 px-4 py-8 lg:px-8 overflow-hidden min-w-0">
        
        {activeTab === 0 && (
          <div className="animate-in fade-in duration-300">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-accent">{d.eyebrow}</div>
            <h2 className="mb-2 text-[26px] font-black text-ink">{d.title}</h2>
            <p className="mb-6 max-w-[600px] text-sm text-ink-2">{d.subtitle}</p>

            {/* Barra de búsqueda */}
            <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-rule bg-surface p-4 shadow-sm">
              <select className="min-w-[120px] flex-1 appearance-none rounded-lg border border-rule bg-surface-2 px-3 py-2.5 text-xs text-ink outline-none focus:border-accent">
                <option>{d.search.type}</option>
                <option>Fix & Flip</option>
                <option>Rental/Hold</option>
                <option>Bridge</option>
              </select>
              <input type="text" placeholder={d.search.locationPh} className="min-w-[120px] flex-1 rounded-lg border border-rule bg-surface-2 px-3 py-2.5 text-xs text-ink outline-none focus:border-accent" />
              <select className="min-w-[120px] flex-1 appearance-none rounded-lg border border-rule bg-surface-2 px-3 py-2.5 text-xs text-ink outline-none focus:border-accent">
                <option>{d.search.amount}</option>
                <option>Under $100K</option>
                <option>$100K–$250K</option>
                <option>$250K–$500K</option>
                <option>$500K+</option>
              </select>
              <button className="whitespace-nowrap rounded-lg bg-accent px-5 py-2.5 text-xs font-bold text-accent-ink transition-opacity hover:opacity-90">
                {d.search.btn}
              </button>
            </div>

            {/* Grid de 2 Columnas */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
              
              {/* Columna Izquierda: Mapa y Fondeados */}
              <div>
                <h3 className="mb-3 text-sm font-bold text-ink-2">{d.mapTitle}</h3>
                
                {/* Mockup del Mapa CSS */}
                <div className="relative h-[240px] w-full overflow-hidden rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-900/30 dark:bg-[#0c1222]">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, #3b82f6 0, #3b82f6 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #3b82f6 0, #3b82f6 1px, transparent 1px, transparent 40px)" }}></div>
                  
                  {/* Pines simulados */}
                  <div className="absolute left-[25%] top-[50%] h-3.5 w-3.5 rounded-full bg-cyan-500 shadow-[0_0_0_3px_white] dark:shadow-[0_0_0_3px_#111]"></div>
                  <div className="absolute left-[55%] top-[30%] h-3.5 w-3.5 rounded-full bg-cyan-500 shadow-[0_0_0_3px_white] dark:shadow-[0_0_0_3px_#111]"></div>
                  <div className="absolute left-[35%] top-[70%] h-3 w-3 rounded-full bg-blue-300 shadow-[0_0_0_3px_white] dark:shadow-[0_0_0_3px_#111]"></div>
                  <div className="absolute left-[75%] top-[45%] h-3 w-3 rounded-full bg-blue-300 shadow-[0_0_0_3px_white] dark:shadow-[0_0_0_3px_#111]"></div>
                </div>

                <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-ink-3">
                  <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-cyan-500"></span> {d.legendActive}</div>
                  <div className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-300"></span> {d.legendPast}</div>
                </div>

                <h3 className="mt-8 mb-3 text-xs font-bold uppercase tracking-wide text-ink-3">{d.fundedTitle}</h3>
                
                {/* Prestamista Fondeado 1 */}
                <div className="mb-3 rounded-xl border border-rule bg-surface-2 p-5 opacity-70">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">Fix & Flip Lender</span>
                    <span className="rounded-full bg-ink-2 px-2.5 py-0.5 text-[10px] font-bold text-bg">3 DEALS FUNDED</span>
                  </div>
                  <div className="mb-1.5 text-[14px] font-bold text-ink">Lender #TN-0022 · Memphis area</div>
                  <div className="text-[11px] text-ink-3">Last funded Aug 2026 · Up to $250K · Max 70% LTV</div>
                </div>
              </div>

              {/* Columna Derecha: Prestamistas Activos */}
              <div>
                
                {/* Prestamista Activo 1 */}
                <div className="mb-4 rounded-xl border border-rule bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
                  <div className="mb-2 text-[15px] font-black text-ink">Lender #TN-0041</div>
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> Actively Lending
                  </div>
                  
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-ink-2">Fix & Flip</span>
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-ink-2">Memphis area</span>
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-ink-2">Up to $300K</span>
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-ink-2">Max 70% LTV</span>
                  </div>
                  
                  <div className="mb-4 text-[12px] text-ink-3">
                    <strong className="text-ink">4 deals funded</strong> · Avg rate 12% · 6–12 mo
                  </div>
                  <button className="w-full rounded-lg bg-accent py-2.5 text-xs font-bold text-accent-ink transition-opacity hover:opacity-90">{d.btnConnect}</button>
                </div>

                {/* Tarjeta Borrosa (Upsell) */}
                <div className="relative">
                  <div className="rounded-xl border border-rule bg-surface p-5 blur-[4px]">
                    <div className="mb-2 text-[15px] font-black text-ink">Lender #TN-0059</div>
                    <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> Actively Lending
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-ink-2">All Types</span>
                      <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] text-ink-2">Southeast US</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-surface/40">
                    <p className="mb-3 text-[13px] font-bold text-ink">{d.blurText}</p>
                    <button className="rounded-lg bg-accent px-5 py-2.5 text-xs font-bold text-accent-ink shadow-lg transition-opacity hover:opacity-90">
                      {d.blurBtn}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Placeholders Pestañas Restantes */}
        {activeTab === 1 && <div className="p-12 text-center text-ink-3 border border-dashed border-rule rounded-xl animate-in fade-in">{p.placeholders.demo}</div>}
        {activeTab === 2 && <div className="p-12 text-center text-ink-3 border border-dashed border-rule rounded-xl animate-in fade-in">{p.placeholders.problems}</div>}
        {activeTab === 3 && <div className="p-12 text-center text-ink-3 border border-dashed border-rule rounded-xl animate-in fade-in">{p.placeholders.who}</div>}
        {activeTab === 4 && <div className="p-12 text-center text-ink-3 border border-dashed border-rule rounded-xl animate-in fade-in">{p.placeholders.diff}</div>}
      </div>

      {/* Barra Lateral (Sticky) */}
      <aside className="sticky top-[80px] hidden w-[320px] shrink-0 py-8 pr-8 lg:block">
        <div className="rounded-2xl border border-rule bg-surface p-6 shadow-sm">
          <h3 className="mb-1 text-lg font-black text-ink">{p.sidebar.title}</h3>
          <p className="mb-5 text-[13px] text-ink-3">{p.sidebar.subBorrower}</p>
          
          <input type="email" placeholder={p.sidebar.emailPh} className="mb-3 w-full rounded-lg border border-rule bg-surface-2 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent" />
          <input type="password" placeholder={p.sidebar.passPh} className="mb-4 w-full rounded-lg border border-rule bg-surface-2 px-4 py-2.5 text-sm text-ink outline-none focus:border-accent" />
          
          <button className="mb-3 w-full rounded-lg bg-accent px-4 py-3 text-sm font-bold text-accent-ink hover:opacity-90 transition-opacity">
            {p.sidebar.btnCreate}
          </button>
          
          <div className="relative mb-3 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-rule"></div></div>
            <span className="relative bg-surface px-3 text-xs text-ink-3">{p.sidebar.or}</span>
          </div>
          
          <button className="mb-4 w-full rounded-lg border border-rule bg-surface-2 px-4 py-3 text-sm font-bold text-ink hover:bg-surface transition-colors">
            {p.sidebar.btnSignIn}
          </button>
          
          <p className="text-center text-[11px] text-ink-3 mb-6">{p.sidebar.noteBorrower}</p>
          
          <div className="border-t border-rule pt-5 text-center">
            <p className="mb-1 text-[13px] text-ink-2">{p.sidebar.postBorrowerQ}</p>
            <Link href="#" className="text-sm font-bold text-accent hover:text-ink transition-colors">
              {p.sidebar.postBorrowerA}
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}