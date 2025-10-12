import { createFileRoute } from "@tanstack/react-router";

import CreateUserPage from "@/pages/users-management/create";

export const Route = createFileRoute("/_authenticated/users-management/create")(
  {
    component: CreateUserPage,
  }
);
