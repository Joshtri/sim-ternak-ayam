import { createFileRoute } from "@tanstack/react-router";

import OperasionalEditPage from "@/pages/operasional/edit";

export const Route = createFileRoute(
  "/_authenticated/daftar-operasional/$idEdit/edit"
)({
  component: OperasionalEditPage,
});
