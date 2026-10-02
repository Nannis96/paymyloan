import type { Metadata } from "next";
import SiteShell from "@/app/components/layout/SiteShell";
import PrivacyNotice from "@/app/components/landing/PrivacyNotice";
import { copy } from "@/content/copy";

export const metadata: Metadata = {
  title: `${copy.es.privacy.title} — PayMyLoan.ai`,
  description: copy.es.privacy.sections[0].paragraphs[0],
  alternates: { canonical: "/aviso-de-privacidad" },
  robots: { index: true, follow: true },
};

export default function AvisoDePrivacidadPage() {
  return (
    <SiteShell isMinimal={true}>
      <PrivacyNotice />
    </SiteShell>
  );
}