import { createFileRoute } from "@tanstack/react-router";

import VaksinEditPage from "@/pages/vaksin/edit";

export const Route = createFileRoute("/_authenticated/daftar-vaksin-dan-vitamin/$idEdit/edit")({
  component: VaksinEditPage,
});
