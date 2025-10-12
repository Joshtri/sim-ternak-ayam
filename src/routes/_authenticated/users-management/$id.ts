import { createFileRoute } from "@tanstack/react-router";

import UsersManagementShowPage from "@/pages/users-management/show";
export const Route = createFileRoute("/_authenticated/users-management/$id")({
  component: UsersManagementShowPage,
});
