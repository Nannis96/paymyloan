import SiteShell from "@/app/components/layout/SiteShell";
import DealView from "../../borrowerViewsComponents/DealsComponents/DealView";

export default function DealPage() {
  return (
    <SiteShell isMinimal={true}>
      <DealView />
    </SiteShell>
  );
}