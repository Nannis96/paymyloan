"use client";

import { OverviewView } from "./AdminViewsComponents/OverviewView";

// El marco (barra superior, menu y guardia de rol ADMIN) vive en layout.tsx.
export default function AdminDashboardPage() {
  return <OverviewView />;
}
