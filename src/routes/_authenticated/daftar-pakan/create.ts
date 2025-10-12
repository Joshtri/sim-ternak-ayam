import { createFileRoute } from "@tanstack/react-router";

import PakanCreatePage from "@/pages/pakan/create";
export const Route = createFileRoute("/_authenticated/daftar-pakan/create")({
  component: PakanCreatePage,
});
