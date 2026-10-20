import SiteShell from "@/app/components/layout/SiteShell";
import BorrowerDealsListView from "@/app/borrowerDashboard/borrowerViewsComponents/DealsComponents/BorrowerDealsListView";

export default function DealsListPage() {
  return (
    <SiteShell isMinimal={true}>
      <BorrowerDealsListView />
    </SiteShell>
  );
}