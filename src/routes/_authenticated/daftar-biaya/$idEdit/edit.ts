import { createFileRoute } from "@tanstack/react-router";

import BiayaEditPage from "@/pages/biaya/edit";

export const Route = createFileRoute("/_authenticated/daftar-biaya/$idEdit/edit")({
  component: BiayaEditPage,
});
