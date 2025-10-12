import { createFileRoute } from "@tanstack/react-router";

import KandangShowPage from "@/pages/kandangs/show";

export const Route = createFileRoute("/_authenticated/daftar-kandang/$id")({
  component: KandangShowPage,
});
