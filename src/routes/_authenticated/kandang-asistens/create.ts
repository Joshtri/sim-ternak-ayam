import { createFileRoute } from "@tanstack/react-router";

import KandangAsistenCreatePage from "@/pages/kandang-asistens/create";

export const Route = createFileRoute("/_authenticated/kandang-asistens/create")({
  component: KandangAsistenCreatePage,
});
