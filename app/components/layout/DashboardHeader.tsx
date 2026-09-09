"use client";
import Link from "next/link";
import { Moon, Sun, LogOut } from "lucide-react";
import { useSite } from "./SiteShell";
import { CONTAINER } from "../ui";

export default function DashboardHeader() {
  const { t, lang, setLang, resolvedTheme, toggleTheme } = useSite();

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bg/92 backdrop-blur-[6px]">
      <div className={`${CONTAINER} flex h-16 items-center justify-between gap-4`}>
        <Link
          href="/"
          className="font-serif text-[1.15rem] font-semibold tracking-[-0.01em] text-ink no-underline"
        >
          {t.nav.brand}
          <span className="text-accent">{t.nav.brandSuffix}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label={t.nav.langToggle}
            className="eyebrow flex h-11 min-w-11 items-center justify-center rounded-[2px] border border-rule px-2 text-ink-2 transition-colors hover:border-accent hover:text-accent"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.themeToggle}
            className="flex h-11 w-11 items-center justify-center rounded-[2px] border border-rule text-ink-2 transition-colors hover:border-accent hover:text-accent"
          >
            {resolvedTheme === "dark" ? (
              <Sun aria-hidden className="h-[18px] w-[18px]" />
            ) : (
              <Moon aria-hidden className="h-[18px] w-[18px]" />
            )}
          </button>
          <Link
            href="/"
            className="ml-4 flex items-center gap-2 text-sm font-medium text-ink-2 transition-colors hover:text-crit"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">{t.nav.logout}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}