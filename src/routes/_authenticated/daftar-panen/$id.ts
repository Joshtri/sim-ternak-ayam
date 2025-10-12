import { createFileRoute } from "@tanstack/react-router";

import PanenDetailPage from "@/pages/panen/show";

export const Route = createFileRoute("/_authenticated/daftar-panen/$id")({
  component: PanenDetailPage,
});
