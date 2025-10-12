import { createFileRoute } from "@tanstack/react-router";

import BiayaListPage from "@/pages/biaya/list";

export const Route = createFileRoute("/_authenticated/daftar-biaya/")({
  component: BiayaListPage,
});
