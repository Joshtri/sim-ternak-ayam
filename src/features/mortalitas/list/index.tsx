import type { Mortalitas } from "../types";

import { useState } from "react";

import { useDeleteMortalitas, useMortalitas } from "../hooks/useMortalitas";

import { ListGrid } from "@/components/ui/ListGrid/ListGridRefactored";

export default function MortalitasList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: mortalitas, isLoading } = useMortalitas();

  const deleteMortalitas = useDeleteMortalitas();

  // Format date to Indonesian locale
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const columns = [
    {
      key: "tanggalKematian",
      label: "Tanggal Kematian",
      value: (item: Mortalitas) => formatDate(item.tanggalKematian),
    },
    {
      key: "jumlahKematian",
      label: "Jumlah Kematian (ekor)",
      value: (item: Mortalitas) => item.jumlahKematian.toLocaleString("id-ID"),
    },
    {
      key: "penyebabKematian",
      label: "Penyebab Kematian",
      value: (item: Mortalitas) => item.penyebabKematian,
    },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  // Filter data based on search query
  const filteredData = mortalitas?.filter(item =>
    item.penyebabKematian.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ListGrid
      actionButtons={{
        show: {
          href: (id: string) => `/daftar-mortalitas/${id}`,
          label: "Detail",
        },
        edit: {
          href: (id: string) => `/daftar-mortalitas/edit/${id}`,
          label: "Edit",
        },
        delete: {
          onDelete: (id: string) => deleteMortalitas.mutate(id),
          label: "Hapus",
        },
      }}
      addButton={{
        href: "/daftar-mortalitas/create",
        label: "Tambah Data Mortalitas",
      }}
      columns={columns}
      data={filteredData}
      deleteConfirmMessage={(item: Mortalitas) =>
        `Apakah Anda yakin ingin menghapus data mortalitas dengan penyebab "${item.penyebabKematian}"?`
      }
      deleteConfirmTitle="Hapus Data Mortalitas"
      description="Kelola data mortalitas ayam broiler"
      keyField="id"
      loading={isLoading}
      nameField="penyebabKematian"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan penyebab kematian..."
      showPagination={true}
      title="Data Mortalitas"
      onSearch={value => setSearchQuery(value)}
    />
  );
}
