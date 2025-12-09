import { createFileRoute } from "@tanstack/react-router";

import VaksinListPage from "@/features/vaksin/list";

export const Route = createFileRoute(
  "/_authenticated/daftar-vaksin-dan-vitamin/"
)({
  component: VaksinListPage,
});
