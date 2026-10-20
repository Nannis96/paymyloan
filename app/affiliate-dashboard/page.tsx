"use client";

import { useState } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

export default function AffiliateDashboardPage() {
  return <AffiliateDashboardContent />;
}

function AffiliateDashboardContent() {
  const { t } = useSite();
  const ad = t.affiliateDashboard;

  // Estados interactivos
  const [activePeriod, setActivePeriod] = useState(1);
  const [activeFilter, setActiveFilter] = useState(0);
  
  // Mock data (TODO: Integrar con endpoint real cuando se implemente en el backend)
  const affiliateData = {
    code: "DAVIS25",
    stats: {
      totalEarned: "$2,418",
      earnedTrend: "$287",
      pendingPayout: "$932",
      pendingDate: "Oct 1",
      activeReferrals: 4,
      dealsClosed: 7
    },
    chartData: [
      { month: "Apr", amount: "$181", height: "45px", isCurrent: false },
      { month: "May", amount: "$248", height: "62px", isCurrent: false },
      { month: "Jun", amount: "$220", height: "55px", isCurrent: false },
      { month: "Jul", amount: "$321", height: "80px", isCurrent: false },
      { month: "Aug", amount: "$287", height: "70px", isCurrent: false },
      { month: "Sep", amount: "$362", height: "90px", isCurrent: true }
    ],
    referrals: [
      { borrower: "Memphis Realty LLC", property: "3802 University Cove", loan: "$115,000", status: "active", closingFee: "$287.50", monthly: "$53.50/mo" },
      { borrower: "Rivera Holdings", property: "1244 Poplar Ridge", loan: "$95,000", status: "active", closingFee: "$237.50", monthly: "$44.13/mo" },
      { borrower: "Eastside REI LLC", property: "5521 Germantown Rd", loan: "$140,000", status: "active", closingFee: "$350.00", monthly: "$65.00/mo" },
      { borrower: "Johnson Flips LLC", property: "872 Oakwood Ave", loan: "$80,000", status: "pending", closingFee: "$200.00", monthly: "$37.00/mo" },
      { borrower: "Cruz Investment Co", property: "3301 Summer Ave", loan: "$105,000", status: "closed", closingFee: "$262.50", monthly: "ended" }
    ],
    payoutDetails: {
      monthlyCommissions: "$644.50",
      closingFees: "$200.00",
      closingSubject: "Johnson Flips",
      bonus: "$87.50",
      total: "$932.00",
      bankName: "First Tennessee Bank",
      bankAccount: "Checking ····4821",
      minPayout: "$50.00",
      allTimePaid: "$1,486.00"
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copiado al portapapeles: " + text);
  };

  const statusStyles = {
    active: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-400 dark:border-green-800",
    closed: "bg-accent-soft text-accent border-accent/20",
    pending: "bg-amber/10 text-amber border-amber/20"
  };

  return (
    <div className="w-full max-w-[1200px] animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-[22px] font-[800] tracking-[-0.3px] text-ink">{ad.title}</h1>
          <p className="text-[13px] text-ink-3 mt-[3px]">{ad.subtitle}</p>
        </div>
        <div className="bg-accent-soft border border-[#c7c4ff] rounded-lg px-4 py-2 text-right">
          <div className="text-[10px] font-[700] uppercase tracking-[0.5px] text-ink-3">{ad.refBadge.label}</div>
          <div className="text-[16px] font-[800] text-accent tracking-[1px] mt-[2px]">{affiliateData.code}</div>
          <div className="text-[11px] text-ink-3 mt-[2px]">{ad.refBadge.linkFormat}{affiliateData.code}</div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-rule rounded-[10px] p-[20px_22px] shadow-sm">
          <div className="text-[11px] font-[700] uppercase tracking-[0.5px] text-ink-3 mb-[8px]">{ad.stats.earned.label}</div>
          <div className="text-[26px] font-[800] text-green-700 dark:text-green-500 tracking-[-0.5px]">{affiliateData.stats.totalEarned}</div>
          <div className="text-[11px] text-green-700 dark:text-green-500 font-[600] mt-[4px]">{ad.stats.earned.trend.replace("{amount}", affiliateData.stats.earnedTrend)}</div>
        </div>
        <div className="bg-surface border border-rule rounded-[10px] p-[20px_22px] shadow-sm">
          <div className="text-[11px] font-[700] uppercase tracking-[0.5px] text-ink-3 mb-[8px]">{ad.stats.pending.label}</div>
          <div className="text-[26px] font-[800] text-accent tracking-[-0.5px]">{affiliateData.stats.pendingPayout}</div>
          <div className="text-[11px] text-ink-3 mt-[4px]">{ad.stats.pending.sub.replace("{date}", affiliateData.stats.pendingDate)}</div>
        </div>
        <div className="bg-surface border border-rule rounded-[10px] p-[20px_22px] shadow-sm">
          <div className="text-[11px] font-[700] uppercase tracking-[0.5px] text-ink-3 mb-[8px]">{ad.stats.active.label}</div>
          <div className="text-[26px] font-[800] text-ink tracking-[-0.5px]">{affiliateData.stats.activeReferrals}</div>
          <div className="text-[11px] text-ink-3 mt-[4px]">{ad.stats.active.sub}</div>
        </div>
        <div className="bg-surface border border-rule rounded-[10px] p-[20px_22px] shadow-sm">
          <div className="text-[11px] font-[700] uppercase tracking-[0.5px] text-ink-3 mb-[8px]">{ad.stats.closed.label}</div>
          <div className="text-[26px] font-[800] text-ink tracking-[-0.5px]">{affiliateData.stats.dealsClosed}</div>
          <div className="text-[11px] text-ink-3 mt-[4px]">{ad.stats.closed.sub}</div>
        </div>
      </div>

      {/* Chart Mock */}
      <div className="bg-surface border border-rule rounded-[10px] p-[24px_28px] mb-8 shadow-sm overflow-x-auto">
        <div className="flex justify-between items-center mb-5">
          <div>
            <div className="text-[14px] font-[700] text-ink">{ad.chart.title}</div>
            <div className="text-[12px] text-ink-3 mt-[2px]">{ad.chart.sub}</div>
          </div>
          <div className="flex gap-1">
            {ad.chart.periods.map((period, idx) => (
              <div 
                key={idx} 
                onClick={() => setActivePeriod(idx)}
                className={`px-3 py-1 rounded-[6px] text-[12px] font-[600] cursor-pointer border border-transparent transition-colors ${activePeriod === idx ? "bg-accent text-white" : "text-ink-3 hover:text-ink"}`}
              >
                {period}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-2 h-[120px] px-1 min-w-[400px]">
          {affiliateData.chartData.map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
              <div 
                className={`w-full rounded-t-[4px] relative transition-colors ${bar.isCurrent ? "bg-[#a89df9] dark:bg-accent/70" : "bg-accent"}`} 
                style={{ height: bar.height }}
              ></div>
              <div className="text-[10px] font-[700] text-accent">{bar.amount}</div>
              <div className="text-[10px] text-ink-3">{bar.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Referrals Table */}
      <div className="bg-surface border border-rule rounded-[10px] overflow-hidden mb-8 shadow-sm">
        <div className="p-[18px_24px] border-b border-rule flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-[14px] font-[700] text-ink">{ad.table.title}</div>
          <div className="flex gap-2 flex-wrap">
            {ad.table.filters.map((filter, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveFilter(idx)}
                className={`px-3 py-1 rounded-[6px] text-[12px] font-[600] cursor-pointer border transition-colors ${activeFilter === idx ? "bg-accent text-white border-accent" : "bg-surface text-ink-3 border-rule hover:text-ink"}`}
              >
                {filter}
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left whitespace-nowrap min-w-[700px]">
            <thead>
              <tr>
                {ad.table.cols.map((col, idx) => (
                  <th key={idx} className="text-[11px] font-[700] uppercase tracking-[0.4px] text-ink-3 p-[10px_24px] bg-surface-2 border-b border-rule">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {affiliateData.referrals.map((row, idx) => {
                const statusKey = row.status as keyof typeof ad.table.status;
                const badgeStyle = statusStyles[row.status as keyof typeof statusStyles];
                
                return (
                  <tr key={idx} className="border-b border-surface-2 last:border-none hover:bg-surface-2 transition-colors">
                    <td className="p-[14px_24px] text-[13px] font-[600] text-ink">{row.borrower}</td>
                    <td className="p-[14px_24px] text-[13px] text-ink-2">{row.property}</td>
                    <td className="p-[14px_24px] text-[13px] font-[700] text-green-700 dark:text-green-500">{row.loan}</td>
                    <td className="p-[14px_24px]">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-[700] border ${badgeStyle}`}>
                        {ad.table.status[statusKey]}
                      </span>
                    </td>
                    <td className={`p-[14px_24px] text-[13px] font-[700] ${row.status === "pending" ? "text-amber" : "text-green-700 dark:text-green-500"}`}>
                      {row.closingFee}
                    </td>
                    <td className={`p-[14px_24px] text-[13px] ${row.monthly === "ended" ? "text-ink-3" : (row.status === "pending" ? "font-[700] text-amber" : "font-[700] text-green-700 dark:text-green-500")}`}>
                      {row.monthly === "ended" ? ad.table.ended : row.monthly}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout & Settings (Two Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface border border-rule rounded-[10px] p-[22px_24px] shadow-sm">
          <div className="text-[13px] font-[700] text-ink mb-[14px]">{ad.payouts.nextTitle.replace("{date}", affiliateData.stats.pendingDate + ", " + new Date().getFullYear())}</div>
          <div className="flex justify-between text-[13px] py-2 border-b border-surface-2">
            <span className="text-ink-3">{ad.payouts.monthly}</span>
            <span className="font-[700] text-green-700 dark:text-green-500">{affiliateData.payoutDetails.monthlyCommissions}</span>
          </div>
          <div className="flex justify-between text-[13px] py-2 border-b border-surface-2">
            <span className="text-ink-3">{ad.payouts.closing.replace("{name}", affiliateData.payoutDetails.closingSubject)}</span>
            <span className="font-[700] text-green-700 dark:text-green-500">{affiliateData.payoutDetails.closingFees}</span>
          </div>
          <div className="flex justify-between text-[13px] py-2 border-b border-surface-2">
            <span className="text-ink-3">{ad.payouts.bonus}</span>
            <span className="font-[700] text-green-700 dark:text-green-500">{affiliateData.payoutDetails.bonus}</span>
          </div>
          <div className="flex justify-between text-[13px] pt-3 mt-1 border-t-2 border-rule">
            <span className="font-[700] text-ink">{ad.payouts.total}</span>
            <span className="font-[800] text-[16px] text-green-700 dark:text-green-500">{affiliateData.payoutDetails.total}</span>
          </div>
        </div>

        <div className="bg-surface border border-rule rounded-[10px] p-[22px_24px] shadow-sm">
          <div className="text-[13px] font-[700] text-ink mb-[14px]">{ad.payouts.accountTitle}</div>
          <div className="flex items-center gap-3 bg-surface-2 border border-rule rounded-[8px] p-[12px_14px]">
            <div className="w-8 h-8 bg-ink rounded-md flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="12" height="8" rx="1" stroke="#fff" strokeWidth="1.3"/><path d="M5 6V4a3 3 0 016 0v2" stroke="#fff" strokeWidth="1.3"/></svg>
            </div>
            <div>
              <div className="text-[13px] font-[600] text-ink">{affiliateData.payoutDetails.bankName}</div>
              <div className="text-[11px] text-ink-3 mt-0.5">{affiliateData.payoutDetails.bankAccount}</div>
            </div>
            <div className="ml-auto text-[12px] font-[600] text-accent cursor-pointer hover:underline">{ad.payouts.edit}</div>
          </div>
          <div className="mt-[14px]">
            <div className="flex justify-between text-[13px] py-2 border-b border-surface-2">
              <span className="text-ink-3">{ad.payouts.scheduleLabel}</span>
              <span className="font-[700] text-ink">{ad.payouts.scheduleValue}</span>
            </div>
            <div className="flex justify-between text-[13px] py-2 border-b border-surface-2">
              <span className="text-ink-3">{ad.payouts.minLabel}</span>
              <span className="font-[700] text-ink">{affiliateData.payoutDetails.minPayout}</span>
            </div>
            <div className="flex justify-between text-[13px] py-2">
              <span className="text-ink-3">{ad.payouts.allTimeLabel}</span>
              <span className="font-[700] text-green-700 dark:text-green-500">{affiliateData.payoutDetails.allTimePaid}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Share Tools */}
      <div className="bg-surface border border-rule rounded-[10px] p-[22px_24px] shadow-sm mb-6">
        <div className="text-[14px] font-[700] text-ink">{ad.shareTools.title}</div>
        <div className="text-[12px] text-ink-3 mt-1">{ad.shareTools.sub}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {ad.shareTools.items.map((item, idx) => {
            const val = item.val.replace("{code}", affiliateData.code);
            const isCodeOnly = item.label === ad.shareTools.items[3].label;
            return (
              <div key={idx} className="bg-surface-2 border border-rule rounded-[8px] p-[14px_16px]">
                <div className="text-[11px] font-[700] uppercase tracking-[0.4px] text-ink-3 mb-1.5">{item.label}</div>
                <div className={`font-[600] break-all ${isCodeOnly ? "text-[18px] font-[800] text-accent tracking-[1px]" : "text-[13px] text-ink"}`}>
                  {val}
                </div>
                <div 
                  className="inline-block mt-2 text-[11px] font-[700] text-accent cursor-pointer hover:underline"
                  onClick={() => copyToClipboard(val)}
                >
                  {isCodeOnly ? ad.shareTools.copyCodeBtn : ad.shareTools.copyBtn}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}