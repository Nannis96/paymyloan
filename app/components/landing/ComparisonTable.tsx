"use client";

interface CompData {
  title: string;
  cols: { pml: string; alt1: string; alt2: string; alt3: string };
  rows: { label: string; pml: string; c1: string; c2: string; c3: string }[];
}

export default function ComparisonTable({ data }: { data: CompData }) {
  const renderCell = (val: string) => {
    if (val === "yes") return <span className="text-[15px] font-bold text-green-600 dark:text-green-400">✓</span>;
    if (val === "no") return <span className="text-[15px] font-bold text-red-600 dark:text-red-400">✗</span>;
    return <span className="text-xs font-semibold text-amber">{val === "partial" ? "Parcial" : val}</span>;
  };

  return (
    <div className="mb-16">
      <div className="mb-6 text-center text-[13px] font-bold uppercase tracking-wider text-ink-3">
        {data.title}
      </div>
      <div className="overflow-x-auto rounded-xl border border-rule">
        <table className="w-full min-w-[700px] border-collapse text-center">
          <thead>
            <tr className="border-b-2 border-rule">
              <th className="bg-surface-2 p-4 text-left text-xs font-bold uppercase tracking-wider text-ink-3"></th>
              <th className="bg-accent p-4 text-xs font-bold uppercase tracking-wider text-white">
                {data.cols.pml}
              </th>
              <th className="bg-surface-2 p-4 text-xs font-bold uppercase tracking-wider text-ink-3">{data.cols.alt1}</th>
              <th className="bg-surface-2 p-4 text-xs font-bold uppercase tracking-wider text-ink-3">{data.cols.alt2}</th>
              <th className="bg-surface-2 p-4 text-xs font-bold uppercase tracking-wider text-ink-3">{data.cols.alt3}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule bg-surface">
            {data.rows.map((row, i) => (
              <tr key={i} className="transition-colors hover:bg-surface-2/50">
                <td className="p-3.5 text-left text-[13px] font-semibold text-ink bg-surface">
                  {row.label}
                </td>
                <td className="bg-accent-soft/30 p-3.5">
                  {renderCell(row.pml)}
                </td>
                <td className="p-3.5">{renderCell(row.c1)}</td>
                <td className="p-3.5">{renderCell(row.c2)}</td>
                <td className="p-3.5">{renderCell(row.c3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}