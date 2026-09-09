"use client"; // Obligatorio en Next.js para error.tsx

import { useEffect } from "react";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

function ErrorContent({ error, reset }: { error: Error; reset: () => void }) {
  const { t } = useSite();
  const e = t.errors;

  useEffect(() => {
    // Aquí podrías enviar el error a un servicio como Sentry o Datadog
    console.error("Error capturado por la app:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
      {/* Usamos el color de criticidad (--crit) de tu globals.css */}
      <div className="mb-4 text-xs font-bold uppercase tracking-widest text-crit">
        {e.code500}
      </div>
      
      <h1 className="mb-4 text-4xl font-black tracking-tight text-ink md:text-5xl">
        {e.title500}
      </h1>
      
      <p className="mx-auto mb-8 max-w-[500px] text-lg text-ink-2">
        {e.message500}
      </p>
      
      {/* Botón usando los colores de acento de tu plataforma */}
      <button
        onClick={() => reset()} // Intenta re-renderizar el componente que falló
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-bold text-accent-ink transition-opacity hover:opacity-90 shadow-md"
      >
        {e.tryAgain}
      </button>
    </div>
  );
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // Usamos isMinimal para que no muestre navegación compleja si la app está fallando
    <SiteShell isMinimal={true}>
      <ErrorContent error={error} reset={reset} />
    </SiteShell>
  );
}