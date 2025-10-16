import { createFileRoute } from "@tanstack/react-router";

import JenisKegiatanShowPage from "@/pages/jenis-kegiatan/show";

export const Route = createFileRoute(
  "/_authenticated/daftar-jenis-kegiatan/$id"
)({
  component: JenisKegiatanShowPage,
});
