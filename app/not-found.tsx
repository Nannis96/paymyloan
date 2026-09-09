"use client";

import Link from "next/link";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

function NotFoundContent() {
  const { t } = useSite();
  const e = t.errors;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 text-xs font-bold uppercase tracking-widest text-amber">
        {e.code404}
      </div>
      
      <h1 className="mb-4 text-4xl font-black tracking-tight text-ink md:text-5xl">
        {e.title404}
      </h1>
      
      <p className="mx-auto mb-8 max-w-[500px] text-lg text-ink-2">
        {e.message404}
      </p>
      
      <Link
        href="/"
        className="inline-flex min-h-11 items-center justify-center rounded-lg border border-rule-strong bg-surface px-6 py-3 text-sm font-bold text-ink transition-colors hover:border-accent hover:text-accent shadow-sm"
      >
        &larr; {e.goHome}
      </Link>
    </div>
  );
}

export default function NotFoundPage() {
  return (
    <SiteShell isMinimal={true}>
      <NotFoundContent />
    </SiteShell>
  );
}