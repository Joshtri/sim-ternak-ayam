import { createFileRoute } from "@tanstack/react-router";

import OperasionalCreatePage from "@/pages/operasional/create";

export const Route = createFileRoute(
  "/_authenticated/daftar-operasional/create"
)({
  component: OperasionalCreatePage,
});
