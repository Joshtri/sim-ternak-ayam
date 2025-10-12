import { createFileRoute } from "@tanstack/react-router";

import BiayaShowPage from "@/pages/biaya/show";

export const Route = createFileRoute("/_authenticated/daftar-biaya/$id")({
  component: BiayaShowPage,
});
