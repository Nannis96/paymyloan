import SiteShell from "@/app/components/layout/SiteShell";
import FeeAgreementView from "../borrowerViewsComponents/FeeAgreementView";

export default function FeeAgreementPage() {
  return (
    <SiteShell isMinimal={true}>
      <FeeAgreementView />
    </SiteShell>
  );
}