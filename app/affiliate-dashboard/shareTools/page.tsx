"use client";
import { useSite } from "@/app/components/layout/SiteShell";
import { affText } from "@/app/lib/affiliates";
import { useAff } from "../AffiliateContext";
import { CopyField, Title } from "../ui";

export default function ShareToolsPage() {
  const { lang } = useSite();
  const a = affText(lang);
  const { me } = useAff();
  return (
    <div className="max-w-[700px] animate-in fade-in duration-300">
      <Title>{a.share}</Title>
      <p className="mb-6 text-[13px] text-ink-3">{a.shareHelp}</p>
      {me?.link && <CopyField label={a.link} value={me.link} />}
      {me?.code && <CopyField label={a.code} value={me.code} />}
    </div>
  );
}
