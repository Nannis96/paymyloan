import Image from 'next/image';
import Link from 'next/link';
export function BorrowerCard({ dict, user, stats }: { dict: any, user: any, stats: any }) {
  return (
    <div className="bg-surface border border-rule-strong rounded-xl p-6 flex flex-col items-center text-center shadow-card">
      <div className="w-16 h-16 bg-brand-dark text-accent-ink rounded-full flex items-center justify-center text-xl font-bold mb-3">
        {user.initials}
      </div>
      <h3 className="font-bold text-ink">{user.level || 'PML Rookie'}</h3>
      <p className="text-sm text-ink-2 mb-6">
        {dict.profile?.nextLevelHint || 'Pay off your first loan on PML to move up.'}
      </p>
      <div className="grid grid-cols-2 gap-3 w-full mb-6">
        <div className="border border-rule rounded-md p-3 text-left">
          <p className="font-bold text-ink">{stats.dealsClosed}</p>
          <p className="text-xs text-ink-2">{dict.dashboardBorrower.summaryCards.businessScore.deals}</p>
        </div>
        <div className="border border-rule rounded-md p-3 text-left">
          <p className="font-bold text-ink">{stats.totalBorrowed}</p>
          <p className="text-xs text-ink-2">{dict.dashboardBorrower.summaryCards.businessScore.volume}</p>
        </div>
        <div className="border border-rule rounded-md p-3 text-left">
          <p className="font-bold text-ink">{stats.onTimePayments}</p>
          <p className="text-xs text-ink-2">{dict.dashboardBorrower.summaryCards.businessScore.onTime}</p>
        </div>
        <div className="border border-rule rounded-md p-3 text-left">
          <p className="font-bold text-ink">{stats.activeLoans}</p>
          <p className="text-xs text-ink-2">{dict.dashboardBookkeeper.metrics.activeLoans}</p>
        </div>
      </div>
      <p className="text-xs text-ink-3">
        {dict.dealPage.borrower.memberSince} <br/>
        {dict.dashboardBorrower.summaryCards.businessScore.title}: {stats.reportStatus}
      </p>
    </div>
  );
}