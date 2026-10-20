import type { ReactNode } from "react";
import { X } from "lucide-react";
import Link from "next/link";

/* Shared primitives. Centralize design decisions so no section reinvents them. */
export const CONTAINER = "mx-auto w-full max-w-[78rem] px-6";

export const BTN_PRIMARY =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] " +
  "bg-accent px-5 text-sm font-medium text-accent-ink transition-opacity " +
  "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60";

export const BTN_SECONDARY =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] " +
  "border border-rule-strong bg-surface px-5 text-sm font-medium text-ink " +
  "transition-colors hover:border-accent hover:text-accent";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`${CONTAINER} ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow m-0 text-accent ${className}`}>{children}</p>;
}

export function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="border-t border-rule-strong pt-8">
      <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
      <h2 className="m-0 max-w-[34ch] font-serif text-[1.75rem] leading-[1.18] font-semibold tracking-[-0.01em] text-ink text-pretty md:text-[2.1rem]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 max-w-[46rem] border-l-2 border-accent pl-[1.1rem] text-[1.02rem] text-ink-2">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  subtext,
  trendText,
  trendUp,
  accent = false,
}: {
  label: string;
  value: string | ReactNode;
  subtext?: string;
  trendText?: string;
  trendUp?: boolean;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-xl border border-rule bg-surface p-5 shadow-sm ${accent ? 'border-t-[3px] border-t-accent' : ''}`}>
      <div className={`mb-2 text-[10px] font-bold uppercase tracking-widest ${accent ? 'text-accent' : 'text-ink-3'}`}>
        {label}
      </div>
      <div className="mb-1 text-[26px] font-black tracking-tight text-ink">
        {value}
      </div>
      {(subtext || trendText) && (
        <div className="mt-1 text-[11px] text-ink-3">
          {trendText && (
            <span className={`font-semibold mr-1.5 ${trendUp ? 'text-green-600 dark:text-green-400' : 'text-crit'}`}>
              {trendText}
            </span>
          )}
          {subtext}
        </div>
      )}
    </div>
  );
}

export function StatusPill({ status, label }: { status: 'success' | 'warning' | 'error' | 'info' | 'default'; label: string }) {
  const base = "inline-flex items-center gap-1.5 font-bold px-2 py-0.5 rounded-[4px] text-[10px] uppercase tracking-widest border";
  const styles = {
    success: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-400 dark:border-green-800",
    warning: "bg-amber/10 text-amber border-amber/20",
    error: "bg-crit/10 text-crit border-crit/20",
    info: "bg-accent-soft text-accent border-accent/20",
    default: "bg-surface-2 text-ink-2 border-rule-strong"
  };

  return <span className={`${base} ${styles[status]}`}>{label}</span>;
}

/* --- NEW COMPONENTS FROM STRIPE PROTOTYPES --- */

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="h-[3px] w-full bg-rule">
      <div
        className="h-full bg-accent transition-all duration-300 ease-in-out"
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
      />
    </div>
  );
}

export function StepsNav({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <div className="flex border-b border-rule">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isPast = stepNumber < currentStep;
        return (
          <div
            key={step}
            className={`flex-1 border-b-2 py-[11px] text-center text-[11px] font-semibold transition-colors ${
              isActive
                ? "border-accent text-accent"
                : isPast
                ? "border-transparent text-ink"
                : "border-transparent text-ink-3"
            }`}
          >
            {step}
          </div>
        );
      })}
    </div>
  );
}

export function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[20px] border px-3 py-1.5 text-xs font-medium transition-colors ${
        isActive
          ? "border-accent bg-accent-soft text-accent"
          : "border-rule bg-surface text-ink-2 hover:border-ink-3 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

export function InsightCard({
  badgeLabel = "Insight",
  title,
  description,
  linkLabel,
  linkHref,
  onClose,
}: {
  badgeLabel?: string;
  title: string;
  description: string;
  linkLabel?: string;
  linkHref?: string;
  onClose?: () => void;
}) {
  return (
    <div className="relative mb-4 rounded-xl border border-rule bg-surface-2 p-[18px]">
      {onClose && (
        <button onClick={onClose} className="absolute right-3 top-3 text-ink-3 transition-colors hover:text-ink">
          <X size={14} />
        </button>
      )}
      <div className="mb-2 inline-block rounded-lg bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent">
        {badgeLabel}
      </div>
      <div className="mb-1.5 text-sm font-bold text-ink">{title}</div>
      <div className="mb-2.5 text-[13px] leading-relaxed text-ink-2">{description}</div>
      {linkHref && linkLabel && (
        <Link href={linkHref} className="text-[13px] font-medium text-accent hover:underline">
          {linkLabel} &rarr;
        </Link>
      )}
    </div>
  );
}

export function ToggleBar({
  options,
  activeOption,
  onChange,
}: {
  options: { id: string; label: string }[];
  activeOption: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex rounded-lg border border-rule bg-surface-2 p-1">
      {options.map((opt) => (
        <div
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={`cursor-pointer rounded-[5px] px-[18px] py-1.5 text-[13px] font-semibold transition-all ${
            activeOption === opt.id
              ? "bg-accent text-accent-ink shadow-sm"
              : "text-ink-3 hover:text-ink"
          }`}
        >
          {opt.label}
        </div>
      ))}
    </div>
  );
}

export function DealCard({
  type,
  isNew,
  address,
  cityState,
  loanAmount,
  arv,
  maxRate,
  maxRateSub,
  rehab,
  ltv,
  offersCount,
  lenderAvatar,
  lenderName,
  timeAgo,
  t, // Passed translation object for uiComponents.dealCard
}: {
  type: "Bridge" | "Slow flip";
  isNew?: boolean;
  address: string;
  cityState: string;
  loanAmount: string;
  arv: string;
  maxRate: string;
  maxRateSub: string;
  rehab: string;
  ltv: number;
  offersCount: number;
  lenderAvatar: string;
  lenderName: string;
  timeAgo: string;
  t: any;
}) {
  const dc = t.uiComponents.dealCard;
  
  return (
    <div className="flex flex-col overflow-hidden rounded-[10px] border border-rule bg-surface transition-all hover:border-ink-3 hover:shadow-md cursor-pointer">
      {/* Top Section */}
      <div className="border-b border-rule p-[18px] pb-3.5">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-[10px] border px-2.5 py-0.5 text-[11px] font-semibold ${
              type === "Bridge" ? "border-transparent bg-accent-soft text-accent" : "border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-900/40 dark:text-green-400"
            }`}>
              {type}
            </span>
            {isNew && (
              <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-amber/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber">
                {t.uiComponents.status.new}
              </span>
            )}
          </div>
        </div>
        <div className="mb-0.5 text-sm font-bold text-ink">{address}</div>
        <div className="text-xs text-ink-3">{cityState}</div>
      </div>

      {/* Mid Section - Stats */}
      <div className="grid grid-cols-2 gap-2.5 p-[18px]">
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-3">{dc.loanRequest}</div>
          <div className="text-sm font-bold text-ink">{loanAmount}</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-3">{dc.arv}</div>
          <div className="text-sm font-bold text-ink">{arv}</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-3">{dc.maxRate}</div>
          <div className="text-sm font-bold text-ink">{maxRate}</div>
          <div className="text-[11px] text-ink-3">{maxRateSub}</div>
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-3">{dc.rehab}</div>
          <div className="text-sm font-bold text-ink">{rehab}</div>
        </div>
      </div>

      {/* LTV Bar & Offers Action */}
      <div className="flex items-center justify-between bg-surface-2 p-[18px] py-3">
        <div className="mr-4 flex flex-1 flex-col gap-1">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-3">{dc.ltv}</div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-rule">
            <div
              className={`h-full rounded-full ${ltv <= 65 ? "bg-green-500" : "bg-accent"}`}
              style={{ width: `${ltv}%` }}
            />
          </div>
          <div className={`mt-0.5 text-[11px] font-bold ${ltv <= 65 ? "text-green-600 dark:text-green-400" : "text-accent"}`}>
            {ltv}%
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="text-[11px] text-ink-3">
            <strong className="block text-[13px] text-ink">{offersCount}</strong> {offersCount === 1 ? dc.offer : dc.offers}
          </div>
          <button className={`whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90 ${ltv <= 65 ? "bg-green-600" : "bg-accent"}`}>
            {dc.makeOffer}
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between border-t border-rule px-[18px] py-2.5">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
            {lenderAvatar}
          </div>
          <span className="text-xs text-ink-2">{lenderName}</span>
        </div>
        <span className="text-[11px] text-ink-3">{timeAgo}</span>
      </div>
    </div>
  );
}

export function SettingCard({
  icon,
  title,
  description,
  onClick
}: {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <div 
      onClick={onClick}
      className="flex items-start gap-3.5 bg-surface p-5 cursor-pointer transition-colors hover:bg-surface-2"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent text-base mt-[1px]">
        {icon}
      </div>
      <div>
        <div className="mb-1 text-sm font-semibold text-accent hover:underline">{title}</div>
        <div className="text-xs leading-[1.55] text-ink-3">{description}</div>
      </div>
    </div>
  );
}

export function StatCell({
  label,
  value,
  subtext,
  subtextHighlight
}: {
  label: string;
  value: string | ReactNode;
  subtext?: string;
  subtextHighlight?: string;
}) {
  return (
    <div className="bg-surface p-4 sm:p-5">
      <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-3">
        {label}
      </div>
      <div className="text-[22px] font-bold tracking-tight text-ink">
        {value}
      </div>
      {(subtext || subtextHighlight) && (
        <div className="mt-1 text-[11px] text-ink-3">
          {subtextHighlight && <span className="font-semibold text-green-600 dark:text-green-400 mr-1">{subtextHighlight}</span>}
          {subtext}
        </div>
      )}
    </div>
  );
}