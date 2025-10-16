import { createFileRoute } from "@tanstack/react-router";

import JenisKegiatanEditPage from "@/pages/jenis-kegiatan/edit";

export const Route = createFileRoute(
  "/_authenticated/daftar-jenis-kegiatan/$idEdit/edit"
)({
  component: JenisKegiatanEditPage,
});
