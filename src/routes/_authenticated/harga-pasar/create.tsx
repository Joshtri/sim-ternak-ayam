import { createFileRoute } from "@tanstack/react-router";

import HargaPasarCreatePage from "@/pages/harga-pasar/create";

export const Route = createFileRoute("/_authenticated/harga-pasar/create")({
  component: HargaPasarCreatePage,
});
