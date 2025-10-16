import { createFileRoute } from "@tanstack/react-router";

import KesehatanAyamPage from "@/pages/laporan/kesehatan-ayam";

export const Route = createFileRoute(
  "/_authenticated/laporan-kesehatan-ayam/"
)({
  component: KesehatanAyamPage,
});
