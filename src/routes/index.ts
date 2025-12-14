import { createFileRoute, redirect } from "@tanstack/react-router";

// import { Home } from "../pages/Home";
// import LoginPage from "../features/auth/pages/LoginPage";
import LoginPage from "@/pages/login";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const token = localStorage.getItem("authToken"); // Simple check
    if (token) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: LoginPage,
});
