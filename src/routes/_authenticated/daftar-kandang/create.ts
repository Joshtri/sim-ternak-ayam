import { createFileRoute } from "@tanstack/react-router";

import KandangCreatePage from "@/pages/kandangs/create";

export const Route = createFileRoute("/_authenticated/daftar-kandang/create")({
  component: KandangCreatePage,
});
