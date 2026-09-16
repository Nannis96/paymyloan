"use client";

import { Bell } from "lucide-react";
import { useSite } from "@/app/components/layout/SiteShell";

interface Props {
  className?: string;
}

export default function NotificationsPanel({ className = "" }: Props) {
  const { t } = useSite();
  const n = t.notifications;

  return (
    <div className={`flex flex-col justify-between rounded-xl border border-rule bg-surface p-5 shadow-sm ${className}`}>
      <div className="mb-3 flex items-center justify-between border-b border-rule pb-3">
        <h3 className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-accent">
          <Bell size={14} /> {n.title}
        </h3>
        <button className="text-[10px] font-bold text-ink-3 hover:text-ink">{n.markRead}</button>
      </div>
      <div className="flex max-h-[80px] flex-col gap-2 overflow-y-auto">
        <p className="text-sm text-ink-3">{n.empty}</p>
      </div>
    </div>
  );
}