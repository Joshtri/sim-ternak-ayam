import { createFileRoute } from "@tanstack/react-router";

import HargaPasarEditPage from "@/pages/harga-pasar/[id]/edit";

export const Route = createFileRoute("/_authenticated/harga-pasar/$id/edit")({
  component: HargaPasarEditPage,
});
