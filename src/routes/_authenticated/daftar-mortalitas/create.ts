import { createFileRoute } from "@tanstack/react-router";

import MortalitasCreatePage from "@/pages/mortalitas/create";

export const Route = createFileRoute(
  "/_authenticated/daftar-mortalitas/create"
)({
  component: MortalitasCreatePage,
});
