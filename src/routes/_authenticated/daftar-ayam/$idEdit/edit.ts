import { createFileRoute } from "@tanstack/react-router";

import AyamEditPage from "@/pages/ayams/edit";

export const Route = createFileRoute("/_authenticated/daftar-ayam/$idEdit/edit")({
  component: AyamEditPage,
});
