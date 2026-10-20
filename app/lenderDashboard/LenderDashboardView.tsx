// app/lender/lenderViewsComponents/LenderDashboardView.tsx
"use client";

import { useSite } from "@/app/components/layout/SiteShell";

export default function LenderDashboardView() {
  const { t } = useSite();
  const d = t.dashboardLender.mimic;

  // icono SVG extraido del html
  const AlertIcon = (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-[2px] shrink-0">
      <path d="M8 1.5L1.5 13h13L8 1.5z" stroke="#b45309" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 6v3.5M8 11v.5" stroke="#b45309" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );

  return (
    <div className="flex-1 pb-10 pt-4">
      {/* Encabezado */}
      <div className="mb-1 text-[20px] font-[800] tracking-[-0.3px] text-ink">
        {d.greeting.replace("{name}", "Wilson")}
      </div>
      <div className="mb-6 text-[13px] text-ink-3">
        {d.portfolioSub.replace("{company}", "Moore Capital LLC")}
      </div>

      {/* Fila de Estadisticas */}
      <div className="mb-6 grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[10px] border border-rule bg-surface p-[18px_20px]">
          <div className="mb-1.5 text-[11px] font-[700] uppercase tracking-[0.5px] text-ink-3">
            {d.stats.capitalDeployed}
          </div>
          <div className="text-[24px] font-[800] tracking-[-0.5px] text-ink">$340K</div>
          <div className="mt-[3px] text-[11px] text-ink-3">
            {d.stats.acrossActive.replace("{n}", "3")}
          </div>
        </div>
        <div className="rounded-[10px] border border-rule bg-surface p-[18px_20px]">
          <div className="mb-1.5 text-[11px] font-[700] uppercase tracking-[0.5px] text-ink-3">
            {d.stats.monthlyIncome}
          </div>
          <div className="text-[24px] font-[800] tracking-[-0.5px] text-[#2e7d32]">$3,400</div>
          <div className="mt-[3px] text-[11px] text-ink-3">{d.stats.interestPayments}</div>
        </div>
        <div className="rounded-[10px] border border-rule bg-surface p-[18px_20px]">
          <div className="mb-1.5 text-[11px] font-[700] uppercase tracking-[0.5px] text-ink-3">
            {d.stats.newDeals}
          </div>
          <div className="text-[24px] font-[800] tracking-[-0.5px] text-accent">12</div>
          <div className="mt-[3px] text-[11px] text-ink-3">{d.stats.matchCriteria}</div>
        </div>
        <div className="rounded-[10px] border border-rule bg-surface p-[18px_20px]">
          <div className="mb-1.5 text-[11px] font-[700] uppercase tracking-[0.5px] text-ink-3">
            {d.stats.maturingSoon}
          </div>
          <div className="text-[24px] font-[800] tracking-[-0.5px] text-[#b45309]">1</div>
          <div className="mt-[3px] text-[11px] text-ink-3">{d.stats.within60}</div>
        </div>
      </div>

      {/* Estructura de 2 Columnas */}
      <div className="grid grid-cols-1 items-start gap-[16px] lg:grid-cols-[1fr_340px]">
        {/* Columna Izquierda */}
        <div>
          {/* Alerta de Vencimiento */}
          <div className="mb-[14px] overflow-hidden rounded-[10px] border border-rule bg-surface">
            <div className="flex items-center justify-between border-b border-rule p-[14px_20px]">
              <div className="text-[13px] font-[700] text-ink">{d.alerts.maturityTitle}</div>
            </div>
            <div className="m-[0_20px_14px] mt-4 flex gap-[10px] rounded-[8px] border border-[#fcd34d] bg-[#fffbeb] p-[12px_14px]">
              {AlertIcon}
              <div>
                <div className="text-[12px] font-[700] text-[#92400e]">
                  {d.alerts.maturityMsg
                    .replace("{address}", "1144 Oakwood Dr")
                    .replace("{days}", "47")
                    .replace("{date}", "Aug 3, 2027")}
                </div>
                <div className="mt-[2px] text-[11px] text-[#b45309]">
                  {d.alerts.maturitySub.replace("{amount}", "$95,000").replace("{rate}", "12")}
                </div>
              </div>
            </div>
          </div>

          {/* Prestamos Activos */}
          <div className="mb-[14px] overflow-hidden rounded-[10px] border border-rule bg-surface">
            <div className="flex items-center justify-between border-b border-rule p-[14px_20px]">
              <div className="text-[13px] font-[700] text-ink">{d.cards.activeLoans}</div>
              <button className="text-[12px] font-[600] text-accent hover:underline bg-transparent border-none cursor-pointer">
                {d.cards.viewAll}
              </button>
            </div>
            {/* Row 1 */}
            <div className="flex cursor-pointer items-center justify-between border-b border-[#f6f9fc] p-[12px_20px] transition-colors hover:bg-[#fafbfd]">
              <div>
                <div className="text-[13px] font-[600] text-ink">{d.data.loan1Addr}</div>
                <div className="mt-[2px] text-[11px] text-ink-3">{d.data.loan1Sub}</div>
              </div>
              <div className="text-center">
                <div className="text-[13px] font-[700] text-ink">{d.data.loan1Amt}</div>
                <div className="text-[10px] text-ink-3">{d.data.loan1Rate}</div>
              </div>
              <div className="text-right">
                <div className="inline-block rounded-[10px] bg-[#e3f2fd] px-[10px] py-[3px] text-[11px] font-[700] text-[#1565c0]">
                  {d.badges.active}
                </div>
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex cursor-pointer items-center justify-between border-b border-[#f6f9fc] p-[12px_20px] transition-colors hover:bg-[#fafbfd]">
              <div>
                <div className="text-[13px] font-[600] text-ink">{d.data.loan2Addr}</div>
                <div className="mt-[2px] text-[11px] text-ink-3">{d.data.loan2Sub}</div>
              </div>
              <div className="text-center">
                <div className="text-[13px] font-[700] text-ink">{d.data.loan2Amt}</div>
                <div className="text-[10px] text-ink-3">{d.data.loan2Rate}</div>
              </div>
              <div className="text-right">
                <div className="inline-block rounded-[10px] bg-[#fff8e1] px-[10px] py-[3px] text-[11px] font-[700] text-[#b45309]">
                  {d.badges.maturity.replace("{n}", "47")}
                </div>
              </div>
            </div>
            {/* Row 3 */}
            <div className="flex cursor-pointer items-center justify-between p-[12px_20px] transition-colors hover:bg-[#fafbfd]">
              <div>
                <div className="text-[13px] font-[600] text-ink">{d.data.loan3Addr}</div>
                <div className="mt-[2px] text-[11px] text-ink-3">{d.data.loan3Sub}</div>
              </div>
              <div className="text-center">
                <div className="text-[13px] font-[700] text-ink">{d.data.loan3Amt}</div>
                <div className="text-[10px] text-ink-3">{d.data.loan3Rate}</div>
              </div>
              <div className="text-right">
                <div className="inline-block rounded-[10px] bg-[#e8f5e9] px-[10px] py-[3px] text-[11px] font-[700] text-[#2e7d32]">
                  {d.badges.closing}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha */}
        <div>
          {/* Proximos Pagos */}
          <div className="mb-[14px] overflow-hidden rounded-[10px] border border-rule bg-surface">
            <div className="flex items-center justify-between border-b border-rule p-[14px_20px]">
              <div className="text-[13px] font-[700] text-ink">{d.cards.upcomingPayments}</div>
              <button className="text-[12px] font-[600] text-accent hover:underline bg-transparent border-none cursor-pointer">
                {d.cards.allPayments}
              </button>
            </div>
            {/* Row 1 */}
            <div className="flex items-center justify-between border-b border-[#f6f9fc] p-[10px_20px]">
              <div>
                <div className="text-[12px] font-[600] text-ink">{d.data.loan1Addr}</div>
                <div className="text-[11px] text-ink-3">{d.data.pay1Date}</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-[700] text-[#2e7d32]">{d.data.loan1Amt}</div>
                <div className="text-[10px] text-ink-3">{d.badges.pending}</div>
              </div>
            </div>
            {/* Row 2 */}
            <div className="flex items-center justify-between border-b border-[#f6f9fc] p-[10px_20px]">
              <div>
                <div className="text-[12px] font-[600] text-ink">{d.data.loan2Addr}</div>
                <div className="text-[11px] text-ink-3">{d.data.pay2Date}</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-[700] text-[#2e7d32]">{d.data.loan2Amt.replace("95,000", "950")}</div>
                <div className="text-[10px] text-ink-3">{d.badges.pending}</div>
              </div>
            </div>
            {/* Row 3 */}
            <div className="flex items-center justify-between border-b border-[#f6f9fc] p-[10px_20px]">
              <div>
                <div className="text-[12px] font-[600] text-ink">{d.data.loan1Addr}</div>
                <div className="text-[11px] text-ink-3">{d.data.pay3Date}</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-[700] text-[#2e7d32]">{d.data.loan1Amt}</div>
                <div className="text-[10px] text-[#2e7d32]">{d.badges.received}</div>
              </div>
            </div>
            {/* Row 4 */}
            <div className="flex items-center justify-between p-[10px_20px]">
              <div>
                <div className="text-[12px] font-[600] text-ink">{d.data.loan2Addr}</div>
                <div className="text-[11px] text-ink-3">{d.data.pay4Date}</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] font-[700] text-[#2e7d32]">{d.data.loan2Amt.replace("95,000", "950")}</div>
                <div className="text-[10px] text-[#2e7d32]">{d.badges.received}</div>
              </div>
            </div>
          </div>

          {/* Call To Action (Browse Deals) */}
          <div className="mb-[14px] overflow-hidden rounded-[10px] border border-rule bg-surface">
            <div className="m-[20px] rounded-[8px] border border-[#c7c4ff] bg-[#f0efff] p-[16px] text-center">
              <div className="mb-[6px] text-[13px] font-[700] text-accent">
                {d.browseCta.title.replace("{n}", "12")}
              </div>
              <div className="mb-[12px] text-[12px] text-ink-3">
                {d.browseCta.sub}
              </div>
              <button className="rounded-[6px] bg-accent px-[20px] py-[9px] text-[13px] font-[700] text-white transition-opacity hover:opacity-90 border-none cursor-pointer">
                {d.browseCta.btn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}