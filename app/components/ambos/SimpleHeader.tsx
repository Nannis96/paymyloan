"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";

export default function SimpleHeader() {
  return (
    <nav className="flex h-[52px] items-center justify-between border-b border-rule bg-surface px-8">
      <Link href="/" className="text-[16px] font-[800] tracking-[-0.3px] text-ink no-underline">
        PayMy<span className="text-accent">Loan</span>.ai
      </Link>
      <div className="flex items-center gap-2 border-l border-rule pl-4">
        <LangToggle className="h-8 min-w-8 rounded-md px-1 text-xs font-bold text-ink-3 hover:bg-surface-2 hover:text-ink" />
        <ThemeToggle iconSize={15} className="h-8 w-8 rounded-md text-ink-3 hover:bg-surface-2 hover:text-ink" />
      </div>
    </nav>
  );
}