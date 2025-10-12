import { createFileRoute } from "@tanstack/react-router";

import JenisKegiatanListPage from "@/pages/jenis-kegiatan/list";

export const Route = createFileRoute("/_authenticated/daftar-jenis-kegiatan/")({
  component: JenisKegiatanListPage,
});
