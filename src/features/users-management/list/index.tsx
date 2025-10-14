import { useState } from "react";

import { useDeleteUser, useUsers } from "../hooks/useUsers";
import { User } from "../services/userService";

// import ListGrid from "@/components/ui/ListGrid";
import { Badge } from "@/components/ui/Badge";
import { ListGrid } from "@/components/ui/ListGrid/ListGridRefactored";

export default function UserManagementList() {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch users with filters
  const { data: users, isLoading } = useUsers({
    search: searchQuery,
  });

  // Mutations
  const deleteUser = useDeleteUser();

  // Define columns with value functions - everything in one place!
  const columns = [
    {
      key: "fullName",
      label: "Nama",
      value: (user: User) => user.fullName,
    },
    {
      key: "email",
      label: "Email",
      value: (user: User) => user.email,
    },
    {
      key: "role",
      label: "Role",
      value: (user: User) => <Badge variant="flat">{user.role}</Badge>,
    },
    {
      key: "noWA",
      label: "No WhatsApp",
      value: (user: User) => user.noWA || "-",
    },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  return (
    <ListGrid
      // Add button configuration
      addButton={{
        href: "/users-management/create",
        label: "Tambah User",
      }}
      // Action buttons configuration
      showPagination
      actionButtons={{
        show: {
          href: (id: string) => `/users-management/${id}`,
          label: "Detail",
        },
        edit: {
          href: (id: string) => `/users-management/${id}/edit`,
          label: "Edit",
        },
        delete: {
          onDelete: async (id: string) => {
            await deleteUser.mutateAsync(id);
          },
        },
      }}
      deleteConfirmMessage={(item: User) =>
        `Apakah Anda yakin ingin menghapus user "${item.fullName}"?`
      }
      deleteConfirmTitle="Hapus User"
      description="Kelola data pengguna sistem"
      loading={isLoading}
      nameField="fullName"
      pageSize={10}
      searchPlaceholder="Cari user berdasarkan nama atau email..."
      title="Manajemen User"
      onSearch={(value: string) => setSearchQuery(value)}
      columns={columns}
      // NEW! Just pass raw data - no manual mapping needed!
      data={users}
    />
  );
}
