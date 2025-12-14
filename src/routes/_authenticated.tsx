import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import AppLayout from "@/components/layout/AppLayout";

// ============================================
// 🔒 AUTHENTICATED LAYOUT ROUTE
// ============================================
// Route layout untuk halaman yang butuh authentication & layout
// Semua route di dalam _authenticated/ folder akan wrapped dengan AppLayout

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const userRole = "operator"; // Change this based on your auth implementation

  return (
    <AppLayout userRole={userRole}>
      <Outlet />
    </AppLayout>
  );
}
