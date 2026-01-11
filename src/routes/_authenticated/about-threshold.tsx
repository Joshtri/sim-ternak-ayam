import { createFileRoute } from "@tanstack/react-router";

import ThresholdPage from "@/pages/about/threshold";

export const Route = createFileRoute("/_authenticated/about-threshold")({
  component: ThresholdPage,
});
