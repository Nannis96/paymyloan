"use client";

import Link from "next/link";
import { useSite } from "@/app/components/layout/SiteShell";

export default function RegisterForm() {
  const { t } = useSite();
  const f = t.form;

  return (
    <div className="rounded-[10px] border border-rule bg-surface p-8 text-center shadow-sm">
      <h3 className="mb-2 text-[18px] font-[800] text-ink">{f.title}</h3>
      <p className="mb-6 text-[13px] text-ink-3">{f.subtitle}</p>
      <Link 
        href="/register" 
        className="inline-block w-full rounded-[6px] bg-accent px-4 py-3 text-[14px] font-bold text-white transition-colors hover:bg-blue-700"
      >
        {f.submit} &rarr;
      </Link>
    </div>
  );
}