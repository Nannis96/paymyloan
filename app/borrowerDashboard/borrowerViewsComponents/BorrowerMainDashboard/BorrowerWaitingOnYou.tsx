export function BorrowerWaitingOnYou({ dict, alerts }: { dict: any, alerts: any[] }) {
  return (
    <div className="bg-surface border border-crit rounded-xl p-0 overflow-hidden shadow-card">
      <div className="bg-crit-soft px-4 py-3 border-b border-rule">
        <h3 className="font-bold text-ink text-sm">
          {dict.dashboardAdmin.actions.title /* Reutilizando temporalmente o usar llave especifica */}
        </h3>
      </div>
      <div className="p-4 flex flex-col gap-4">
        {alerts.map((alert, i) => (
          <div key={i} className="flex justify-between items-center gap-3">
            <div className="flex items-start gap-2">
              <span className="text-ink-2 mt-1">📄</span>
              <p className="text-sm text-ink-2">{alert.message}</p>
            </div>
            <button className="whitespace-nowrap px-3 py-1.5 text-xs font-bold border border-rule-strong rounded-md hover:bg-surface-2 transition-colors">
              {alert.actionText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}