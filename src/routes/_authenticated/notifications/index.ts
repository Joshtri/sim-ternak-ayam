import { createFileRoute } from "@tanstack/react-router";

import NotifikasiPage from "@/pages/notifikasi";

export const Route = createFileRoute("/_authenticated/notifications/")({
  component: NotifikasiPage,
});
