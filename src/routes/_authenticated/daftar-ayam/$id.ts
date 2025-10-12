import { createFileRoute } from "@tanstack/react-router";

import AyamShowPage from "@/pages/ayams/show";

export const Route = createFileRoute("/_authenticated/daftar-ayam/$id")({
  component: AyamShowPage,
});
