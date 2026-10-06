import SiteShell from "@/app/components/layout/SiteShell";
import SubmitDealView from "../borrowerViewsComponents/SubmitDealView";

export default function SubmitDealPage() {
  return (
    <SiteShell isMinimal={true}>
      <SubmitDealView />
    </SiteShell>
  );
}