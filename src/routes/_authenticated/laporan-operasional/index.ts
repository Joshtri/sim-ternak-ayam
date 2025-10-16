import { createFileRoute } from "@tanstack/react-router";

import LaporanOperasionalPage from "@/pages/laporan/operasional";

export const Route = createFileRoute("/_authenticated/laporan-operasional/")({
  component: LaporanOperasionalPage,
});
