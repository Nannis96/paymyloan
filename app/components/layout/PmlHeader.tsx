import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useSite } from "./SiteShell";

export default function PmlHeader() {
  const { t, lang, setLang, resolvedTheme, toggleTheme } = useSite();

  return (
    <header className="sticky top-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-rule">
      <nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-5 lg:px-14">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-ink no-underline">
          PML<span className="text-accent">.ai</span>
          <sub className="ml-1 align-baseline text-[11px] font-medium tracking-normal text-ink-3">
            PayMyLoan
          </sub>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/#features" className="text-sm font-medium text-ink-2 no-underline hover:text-ink">
            {t.nav.features}
          </Link>
          <Link href="/#how" className="text-sm font-medium text-ink-2 no-underline hover:text-ink">
            {t.nav.howItWorks}
          </Link>

          {/* Boton de cambio de idioma restaurado */}
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label={t.nav.langToggle}
            className="flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-xs font-bold text-ink-2 hover:bg-surface-2 hover:text-ink transition-colors"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.nav.themeToggle}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-2 hover:bg-surface-2 transition-colors"
          >
            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            href="/login"
            className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-bg no-underline transition-transform hover:scale-105"
          >
            {t.nav.cta}
          </Link>
        </div>
      </nav>
    </header>
  );
}