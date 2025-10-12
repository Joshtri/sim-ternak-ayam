import { createFileRoute } from "@tanstack/react-router";

import BiayaCreatePage from "@/pages/biaya/create";

export const Route = createFileRoute("/_authenticated/daftar-biaya/create")({
  component: BiayaCreatePage,
});
