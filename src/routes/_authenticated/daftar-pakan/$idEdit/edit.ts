import { createFileRoute } from "@tanstack/react-router";

import PakanEditPage from "@/pages/pakan/edit";

export const Route = createFileRoute("/_authenticated/daftar-pakan/$idEdit/edit")({
  component: PakanEditPage,
});
