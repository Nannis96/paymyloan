"use client";

import { useSite } from "./SiteShell";

export default function PmlFooter() {
  const { t } = useSite();
  const f = t.pmlFooter;

  return (
    <footer className="border-t border-rule px-6 py-8 lg:px-14">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-base font-extrabold text-ink">
          PML<span className="text-accent">.ai</span>{" "}
          <span className="text-xs font-normal text-ink-3">{f.by}</span>
        </div>
        <p className="text-xs text-ink-3 text-center sm:text-left">
          © {new Date().getFullYear()} {f.rights}
        </p>
      </div>
    </footer>
  );
}