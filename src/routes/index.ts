import { createFileRoute } from "@tanstack/react-router";

// import { Home } from "../pages/Home";
// import LoginPage from "../features/auth/pages/LoginPage";
import LoginPage from "@/pages/login";

export const Route = createFileRoute("/")({
  component: LoginPage,
});
