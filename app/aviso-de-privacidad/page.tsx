import type { Metadata } from "next";
import SiteShell from "@/app/components/layout/SiteShell";
import PrivacyNotice from "@/app/components/PrivacyNotice";
import { copy } from "@/content/copy";

export const metadata: Metadata = {
  title: `${copy.es.privacy.title} — PayMyLoan.ai`,
  description: copy.es.privacy.intro[0],
  alternates: { canonical: "/aviso-de-privacidad" },
  robots: { index: true, follow: true },
};

export default function AvisoDePrivacidadPage() {
  return (
    <SiteShell>
      <PrivacyNotice />
    </SiteShell>
  );
}
