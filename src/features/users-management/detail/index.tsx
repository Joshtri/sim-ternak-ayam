import { useParams } from "@tanstack/react-router";
import { ArrowLeft, Pencil, User, Calendar, Phone } from "lucide-react";

import { useUser } from "../hooks/useUsers";
import { formatWhatsAppNumber } from "../create/helpers";

import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/PageHeader";

export default function UserManagementDetail() {
  const { id } = useParams("/_authenticated/users-management/$id" as any) as {
    id?: string;
  };

  // Call hook unconditionally but disable it when `id` is missing so React
  // hook order is preserved and we avoid conditional hook calls.
  const { data: user, isLoading, error } = useUser(id ?? "", !!id);

  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading state
  if (isLoading || !user) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Manajemen User", href: "/users-management" },
            { label: "Detail" },
          ]}
          title="Detail User"
        />
        <DetailCardSkeleton itemsPerSection={4} sections={3} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <PageHeader
        actions={
          <div className="flex items-center gap-2">
            <LinkButton
              color="default"
              href="/users-management"
              size="md"
              startContent={<ArrowLeft className="w-4 h-4" />}
              variant="light"
            >
              Kembali
            </LinkButton>
            <LinkButton
              color="warning"
              href={`/users-management/${id}/edit`}
              size="md"
              startContent={<Pencil className="w-4 h-4" />}
              variant="solid"
            >
              Edit
            </LinkButton>
          </div>
        }
        description="Informasi lengkap pengguna sistem"
        title={`Detail User: ${user.fullName}`}
      />

      {/* Detail Cards */}
      <DetailCard
        sections={[
          {
            title: "Informasi Akun",
            description: "Data akun dan otentikasi pengguna",
            icon: <User className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "username",
                label: "Username",
                value: user.username,
              },
              {
                key: "email",
                label: "Email",
                value: user.email,
              },
              {
                key: "role",
                label: "Role",
                value: (
                  <Badge
                    color={
                      user.role === "Pemilik"
                        ? "danger"
                        : user.role === "Petugas"
                          ? "warning"
                          : "primary"
                    }
                    variant="flat"
                  >
                    {user.role}
                  </Badge>
                ),
              },
              {
                key: "status",
                label: "Status Akun",
                value: (
                  <Badge
                    color={user.isActive ? "success" : "danger"}
                    variant="flat"
                  >
                    {user.isActive ? "Aktif" : "Nonaktif"}
                  </Badge>
                ),
              },
            ],
          },
          {
            title: "Informasi Pribadi",
            description: "Data pribadi dan kontak pengguna",
            icon: <Phone className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "fullName",
                label: "Nama Lengkap",
                value: user.fullName,
                fullWidth: true,
              },
              {
                key: "noWA",
                label: "No. WhatsApp",
                value: user.noWA ? (
                  <a
                    className="text-primary hover:underline"
                    href={`https://wa.me/${user.noWA.replace(/\D/g, "")}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {formatWhatsAppNumber(user.noWA)}
                  </a>
                ) : (
                  <span className="text-default-400">-</span>
                ),
              },
              {
                key: "emailContact",
                label: "Email Kontak",
                value: (
                  <a
                    className="text-primary hover:underline"
                    href={`mailto:${user.email}`}
                  >
                    {user.email}
                  </a>
                ),
              },
            ],
          },
          {
            title: "Informasi Sistem",
            description: "Data sistem dan aktivitas pengguna",
            icon: <Calendar className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "id",
                label: "User ID",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {user.id}
                  </code>
                ),
                fullWidth: true,
              },
              {
                key: "createdAt",
                label: "Dibuat Pada",
                value: formatDate(user.createdAt),
              },
              {
                key: "updatedAt",
                label: "Terakhir Diupdate",
                value: formatDate(user.updatedAt),
              },
            ],
          },
        ]}
      />
    </div>
  );
}
