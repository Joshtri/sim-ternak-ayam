import { createFileRoute, Outlet } from "@tanstack/react-router";

import AppLayout from "@/components/layout/AppLayout";

// ============================================
// 🔒 AUTHENTICATED LAYOUT ROUTE
// ============================================
// Route layout untuk halaman yang butuh authentication & layout
// Semua route di dalam _authenticated/ folder akan wrapped dengan AppLayout

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  // TODO: Get user role from auth context/store
  // For now, hardcoded to "operator"
  const userRole = "operator"; // Change this based on your auth implementation

  return (
    <AppLayout userRole={userRole}>
      <Outlet />
    </AppLayout>
  );
}
