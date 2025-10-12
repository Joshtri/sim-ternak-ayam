import { createFileRoute } from "@tanstack/react-router";

import KandangListPage from "@/pages/kandangs/list";

export const Route = createFileRoute("/_authenticated/daftar-kandang/")({
  component: KandangListPage,
});
