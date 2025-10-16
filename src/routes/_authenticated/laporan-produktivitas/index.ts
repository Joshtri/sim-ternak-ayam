import { createFileRoute } from "@tanstack/react-router";

import ProduktivitasPage from "@/pages/laporan/produktivitas";

export const Route = createFileRoute("/_authenticated/laporan-produktivitas/")({
  component: ProduktivitasPage,
});
