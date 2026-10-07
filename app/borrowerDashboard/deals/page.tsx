import SiteShell from "@/app/components/layout/SiteShell";
import DealView from "../borrowerViewsComponents/DealView";

export default function DealPage() {
  return (
    <SiteShell isMinimal={true}>
      <DealView />
    </SiteShell>
  );
}