import { createFileRoute } from "@tanstack/react-router";

import MortalitasList from "@/features/mortalitas/list";

export const Route = createFileRoute("/_authenticated/daftar-mortalitas/")({
  component: MortalitasList,
});
