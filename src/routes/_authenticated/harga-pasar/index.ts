import { createFileRoute } from "@tanstack/react-router";

import HargaPasarPage from "@/pages/harga-pasar";

export const Route = createFileRoute("/_authenticated/harga-pasar/")({
  component: HargaPasarPage,
});
