import { createFileRoute } from "@tanstack/react-router";

import JurnalHarianPage from "@/pages/jurnal-harian";

export const Route = createFileRoute("/_authenticated/jurnal-harian/")({
  component: JurnalHarianPage,
});
