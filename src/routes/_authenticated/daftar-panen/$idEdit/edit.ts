import { createFileRoute } from "@tanstack/react-router";

import PanenEditPage from "@/pages/panen/edit";

export const Route = createFileRoute("/_authenticated/daftar-panen/$idEdit/edit")({
  component: PanenEditPage,
});
  