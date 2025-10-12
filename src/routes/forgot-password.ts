import { createFileRoute } from "@tanstack/react-router";
import React from "react";

const ForgotPasswordPage = React.lazy(
  () => import("@/pages/forgot-password/index")
);

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});
