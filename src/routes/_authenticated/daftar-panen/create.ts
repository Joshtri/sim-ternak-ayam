import { createFileRoute } from "@tanstack/react-router";

import PanenCreatePage from "@/pages/panen/create";

export const Route = createFileRoute("/_authenticated/daftar-panen/create")({
  component: PanenCreatePage,
});
