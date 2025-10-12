import { createFileRoute } from "@tanstack/react-router";

import AyamsListPage from "@/pages/ayams/list";

export const Route = createFileRoute("/_authenticated/daftar-ayam/")({
  component: AyamsListPage,
});
