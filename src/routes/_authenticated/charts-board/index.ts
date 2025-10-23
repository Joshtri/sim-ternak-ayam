import { createFileRoute } from "@tanstack/react-router";

import DashboardChartsPage from "@/pages/charts/dashboard";

export const Route = createFileRoute("/_authenticated/charts-board/")({
  component: DashboardChartsPage,
});
