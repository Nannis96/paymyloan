"use client";

import { Moon, Sun } from "lucide-react";
import { useSite } from "./SiteShell";
import { CONTAINER } from "./ui";

export default function SiteHeader() {
  const { t, lang, setLang, resolvedTheme, toggleTheme } = useSite();

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-bg/92 backdrop-blur-[6px]">
      <a
        href="#registro"
        className="sr-only rounded-[2px] bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:absolute focus:top-3 focus:left-6 focus:z-10"
      >
        {t.nav.skip}
      </a>

      <div className={`${CONTAINER} flex h-16 items-center justify-between gap-4`}>
        <a
          href="#contenido"
          className="font-serif text-[1.15rem] font-semibold tracking-[-0.01em] text-ink no-underline"
        >
          {t.nav.brand}
          <span className="text-accent">{t.nav.brandSuffix}</span>
        </a>

        <nav
          aria-label={t.nav.brand}
          className="hidden items-center gap-8 lg:flex"
        >
          {t.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-2 no-underline transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

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

          <a
            href="#registro"
            className="ml-1 hidden min-h-11 items-center rounded-[2px] bg-accent px-4 text-sm font-medium text-accent-ink no-underline transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
