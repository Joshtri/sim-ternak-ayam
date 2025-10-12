import { createFileRoute } from "@tanstack/react-router";

import OperasionalListPage from "@/pages/operasional/list";

export const Route = createFileRoute("/_authenticated/daftar-operasional/")({
  component: OperasionalListPage,
});
