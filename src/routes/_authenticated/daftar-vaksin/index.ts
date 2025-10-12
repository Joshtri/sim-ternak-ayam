import { createFileRoute } from "@tanstack/react-router";

import VaksinListPage from "@/pages/vaksin/list";

export const Route = createFileRoute("/_authenticated/daftar-vaksin/")({
  component: VaksinListPage,
});
