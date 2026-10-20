import type { Metadata } from "next";
import SiteShell from "@/app/components/layout/SiteShell";
import PrivacyNotice from "@/app/components/landing/PrivacyNotice";
import { legal } from "@/content/es/legal";

export const metadata: Metadata = {
  title: `${legal.privacy.title} — PayMyLoan.ai`,
  description: legal.privacy.sections[0].paragraphs[0],
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