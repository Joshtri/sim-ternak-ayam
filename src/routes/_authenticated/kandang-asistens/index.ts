import { createFileRoute } from "@tanstack/react-router";

import KandangAsistenListPage from "@/pages/kandang-asistens/list";

export const Route = createFileRoute("/_authenticated/kandang-asistens/")({
  component: KandangAsistenListPage,
});
