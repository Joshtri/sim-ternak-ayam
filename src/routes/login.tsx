import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import LoginPage from "@/pages/login";

const searchSchema = z.object({
  redirect: z.string().optional().catch(""),
});

export const Route = createFileRoute("/login")({
  validateSearch: search => searchSchema.parse(search),
  beforeLoad: () => {
    const token = localStorage.getItem("authToken");

    if (token) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: LoginPage,
});
