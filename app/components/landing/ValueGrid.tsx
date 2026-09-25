"use client";

interface ValueCardData {
  num: string;
  label: string;
  desc: string;
  highlight?: boolean;
}

export default function ValueGrid({ data }: { data: ValueCardData[] }) {
  return (
    <div className="mb-16 grid grid-cols-1 gap-5 md:grid-cols-3">
      {data.map((item, i) => (
        <div 
          key={i} 
          className={`rounded-xl border p-7 transition-colors ${
            item.highlight 
              ? "bg-brand-dark border-brand-dark" 
              : "bg-surface border-rule"
          }`}
        >
          <div className={`mb-1.5 text-4xl font-black ${item.highlight ? "text-brand-purple" : "text-accent"}`}>
            {item.num}
          </div>
          <div className={`mb-1.5 text-sm font-bold ${item.highlight ? "text-white" : "text-ink"}`}>
            {item.label}
          </div>
          <div className={`text-[13px] leading-relaxed ${item.highlight ? "text-white/70" : "text-ink-3"}`}>
            {item.desc}
          </div>
        </div>
      ))}
    </div>
  );
}