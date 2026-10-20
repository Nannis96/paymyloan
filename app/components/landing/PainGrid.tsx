"use client";

interface PainData {
  title: string;
  before: string;
  after: string;
  rows: { b: string; a: string }[];
}

export default function PainGrid({ data }: { data: PainData }) {
  return (
    <div className="mb-16">
      <div className="mb-6 text-center text-[13px] font-bold uppercase tracking-wider text-ink-3">
        {data.title}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl border border-rule">
        <div className="border-b md:border-b-0 md:border-r border-rule">
          <div className="border-b-2 border-rule bg-crit-soft px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-crit">
            {data.before}
          </div>
          {data.rows.map((row, i) => (
            <div key={i} className="flex border-b border-rule bg-surface p-4 text-[13px] leading-relaxed text-ink-2 last:border-0 hover:bg-surface-2 transition-colors">
              <span className="mr-2 font-bold text-crit">✗</span>
              <span>{row.b}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="border-b-2 border-rule bg-success-soft px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-success">
            {data.after}
          </div>
          {data.rows.map((row, i) => (
            <div key={i} className="flex border-b border-rule bg-success-soft/50 p-4 text-[13px] font-semibold leading-relaxed text-success last:border-0 hover:bg-success-soft transition-colors">
              <span className="mr-2 font-bold text-success">✓</span>
              <span>{row.a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}