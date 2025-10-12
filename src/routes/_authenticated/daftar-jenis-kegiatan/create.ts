import { createFileRoute } from "@tanstack/react-router";

import JenisKegiatanCreatePage from "@/pages/jenis-kegiatan/create";

export const Route = createFileRoute("/_authenticated/daftar-jenis-kegiatan/create")({
  component: JenisKegiatanCreatePage,
});
