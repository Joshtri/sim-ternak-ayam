import { createFileRoute } from "@tanstack/react-router";

import MortalitasDetail from "@/features/mortalitas/detail";

export const Route = createFileRoute("/_authenticated/daftar-mortalitas/$id")({
  component: MortalitasDetail,
});
