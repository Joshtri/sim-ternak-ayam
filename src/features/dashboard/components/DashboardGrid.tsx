import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";

import { PetugasDashboard } from "./PetugasDashboard";
import { OperatorDashboard } from "./OperatorDashboard";
import { PemilikDashboard } from "./PemilikDashboard";

import { authService } from "@/features/auth/services/authService";
import { Card } from "@/components/ui/Card";

/**
 * Current User Type
 * Matches the user object from /auth/me
 */
interface CurrentUser {
  id?: string;
  username?: string;
  email?: string;
  fullName?: string;
  noWA?: string;
  role?: string; // "Petugas", "Operator", or "Pemilik"
  createdAt?: string;
  updateAt?: string;
}

/**
 * DashboardGrid Component
 * Renders the appropriate dashboard based on the user's role from /auth/me
 */
export function DashboardGrid() {
  // Fetch current user from /auth/me
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery<CurrentUser>({
    queryKey: ["me"],
    queryFn: () => authService.me<CurrentUser>(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-default-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-6 text-center max-w-md">
          <AlertCircle className="mx-auto text-danger" size={48} />
          <h3 className="mt-4 text-lg font-semibold">
            Gagal memuat informasi user
          </h3>
          <p className="mt-2 text-default-600">
            Silakan refresh halaman atau coba lagi nanti
          </p>
        </Card>
      </div>
    );
  }

  // No role assigned
  if (!currentUser.role) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-6 text-center max-w-md">
          <AlertCircle className="mx-auto text-warning" size={48} />
          <h3 className="mt-4 text-lg font-semibold">Role tidak ditemukan</h3>
          <p className="mt-2 text-default-600">
            Hubungi administrator untuk mengatur role Anda
          </p>
        </Card>
      </div>
    );
  }

  // Render dashboard based on role
  switch (currentUser.role) {
    case "Petugas":
      return <PetugasDashboard />;

    case "Operator":
      return <OperatorDashboard />;

    case "Pemilik":
      return <PemilikDashboard />;

    default:
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="p-6 text-center max-w-md">
            <AlertCircle className="mx-auto text-warning" size={48} />
            <h3 className="mt-4 text-lg font-semibold">Role tidak valid</h3>
            <p className="mt-2 text-default-600">
              Role "{currentUser.role}" tidak dikenali. Hubungi administrator.
            </p>
          </Card>
        </div>
      );
  }
}
