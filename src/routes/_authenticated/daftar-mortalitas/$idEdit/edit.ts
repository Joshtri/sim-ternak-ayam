import { createFileRoute } from "@tanstack/react-router";

import EditMortalitasPage from "@/pages/mortalitas/edit";

export const Route = createFileRoute(
  "/_authenticated/daftar-mortalitas/$idEdit/edit"
)({
  component: EditMortalitasPage,
});
