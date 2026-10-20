import SiteShell from "@/app/components/layout/SiteShell";
import BorrowerOnboardingView from "../borrowerViewsComponents/BorrowerOnboardingView";

export default function BorrowerOnboardingPage() {
  return (
    <SiteShell isMinimal={true}>
      <BorrowerOnboardingView />
    </SiteShell>
  );
}