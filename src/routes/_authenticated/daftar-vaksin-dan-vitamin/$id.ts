import { createFileRoute } from "@tanstack/react-router";

import VaksinDetail from "@/features/vaksin/detail";

export const Route = createFileRoute("/_authenticated/daftar-vaksin-dan-vitamin/$id")({
  component: VaksinDetail,
});
