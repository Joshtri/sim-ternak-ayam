import { createFileRoute } from "@tanstack/react-router";

import VaksinCreatePage from "@/pages/vaksin/create";

export const Route = createFileRoute("/_authenticated/daftar-vaksin/create")({
    component: VaksinCreatePage,
});
