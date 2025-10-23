import { createFileRoute } from "@tanstack/react-router";

import BiayaBulananPage from "@/pages/biaya/bulanan";

export const Route = createFileRoute("/_authenticated/daftar-biaya/bulanan/")({
  component: BiayaBulananPage,
});
