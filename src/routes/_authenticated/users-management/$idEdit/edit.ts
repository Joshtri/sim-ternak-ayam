import { createFileRoute } from "@tanstack/react-router";

import UsersManagementEditPage from "@/pages/users-management/edit";

export const Route = createFileRoute(
  "/_authenticated/users-management/$idEdit/edit"
)({
  component: UsersManagementEditPage,
});
