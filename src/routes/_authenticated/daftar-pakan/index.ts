import { createFileRoute } from "@tanstack/react-router";

import PakanListPage from "@/pages/pakan/list";

export const Route = createFileRoute("/_authenticated/daftar-pakan/")({
  component: PakanListPage,
});
