import { createFileRoute } from "@tanstack/react-router";

import KandangEditPage from "@/pages/kandang/edit";

export const Route = createFileRoute(
  "/_authenticated/daftar-kandang/$idEdit/edit"
)({
  component: KandangEditPage,
});
