"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import SiteShell, { useSite } from "@/app/components/layout/SiteShell";

// Importaremos los flujos principales desde la carpeta components
import LenderDemoFlow from "./components/lenderDemo/LenderDemoFlow";
import BorrowerDemoFlow from "./components/borrowerDemo/BorrowerDemoFlow";

function DemoRouter() {
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow");

  const site = useSite();

  React.useEffect(() => {
    // Forzar idioma si el método existe en el contexto, saltando la validación estricta de TS
    if ((site as any)?.setLang) {
      (site as any).setLang("en");
    }

    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    localStorage.setItem("lang", "en");
  }, [site]);

  if (flow === "lender") {
    return <LenderDemoFlow />;
  }
  else{
    return <BorrowerDemoFlow />;
  }
}

export default function PublicDemoPage() {
  return (
    <SiteShell isMinimal={true}>
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Cargando demo...</div>}>
        <DemoRouter />
      </Suspense>
    </SiteShell>
  );
}