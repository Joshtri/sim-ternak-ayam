import { createFileRoute } from "@tanstack/react-router";

import HargaPasarAnalysisPage from "@/features/harga-pasar/analysis";

export const Route = createFileRoute("/_authenticated/harga-pasar/analisis")({
  component: HargaPasarAnalysisPage,
});
