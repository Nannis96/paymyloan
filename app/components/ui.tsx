import type { ReactNode } from "react";

/* Primitivas compartidas. Concentran las decisiones que el documento de
   alcance ya tomó —ancho de 78rem, radio de 2px, reglas de 1px, versalitas
   monoespaciadas— para que ninguna sección las reinvente. */

export const CONTAINER = "mx-auto w-full max-w-[78rem] px-6";

/* 44px de alto mínimo en cualquier control: es el piso táctil. */
export const BTN_PRIMARY =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] " +
  "bg-accent px-5 text-sm font-medium text-accent-ink transition-opacity " +
  "hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60";

export const BTN_SECONDARY =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[2px] " +
  "border border-rule-strong bg-surface px-5 text-sm font-medium text-ink " +
  "transition-colors hover:border-accent hover:text-accent";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${CONTAINER} ${className}`}>{children}</div>;
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`eyebrow m-0 text-accent ${className}`}>{children}</p>
  );
}

/* El encabezado de sección repite el patrón del documento: regla superior
   fuerte, versalita monoespaciada y título en Spectral. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
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
