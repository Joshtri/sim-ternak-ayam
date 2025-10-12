import { createFileRoute } from "@tanstack/react-router";

import PanenListPage from "@/pages/panen/list";

export const Route = createFileRoute("/_authenticated/daftar-panen/")({
  component: PanenListPage,
});
