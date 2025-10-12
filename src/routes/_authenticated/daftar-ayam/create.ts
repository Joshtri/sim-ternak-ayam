import { createFileRoute } from "@tanstack/react-router";

import AyamCreatePage from "@/pages/ayams/create";

export const Route = createFileRoute("/_authenticated/daftar-ayam/create")({
  component: AyamCreatePage,
});
