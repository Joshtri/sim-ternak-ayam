import { useQuery } from "@tanstack/react-query";

import ProfileAccount from "./ProfileAccount";
import ProfilePetugas from "./ProfilePetugas";

import { authService } from "@/features/auth/services/authService";

export default function ProfileGrid() {
  type User = {
    id?: string;
    username?: string;
    fullName?: string;
    email?: string;
    noWA?: string;
    role?: string;
  };

  const { data: me, isLoading } = useQuery<User>({
    queryKey: ["me"],
    queryFn: () => authService.me<User>(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <ProfileAccount user={me} />

      {/* Only show petugas section when role is Petugas (case-insensitive) */}
      {me?.role && me.role.toUpperCase() === "PETUGAS" && (
        <ProfilePetugas user={me} />
      )}
    </div>
  );
}
