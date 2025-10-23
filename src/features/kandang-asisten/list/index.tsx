/**
 * Kandang Asisten List Component
 * Displays all kandang assistant assignments
 */

import type { KandangAsistenResponseDto } from "../types";

import { useState } from "react";

import { useDeleteKandangAsisten, useKandangAsistens } from "../hooks/useKandangAsisten";

import { ListGrid } from "@/components/ui/ListGrid/ListGridRefactored";
import { Badge } from "@/components/ui/Badge";

export default function KandangAsistenList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: kandangAsistens, isLoading } = useKandangAsistens();
  const deleteKandangAsisten = useDeleteKandangAsisten();

  const columns = [
    {
      key: "kandangNama",
      label: "Kandang",
      value: (item: KandangAsistenResponseDto) => item.kandangNama,
    },
    {
      key: "asistenNama",
      label: "Asisten",
      value: (item: KandangAsistenResponseDto) => item.asistenNama,
    },
    {
      key: "status",
      label: "Status",
      value: (item: KandangAsistenResponseDto) => (
        <Badge color={item.isAktif ? "success" : "default"} variant="flat">
          {item.isAktif ? "Aktif" : "Tidak Aktif"}
        </Badge>
      ),
    },
    {
      key: "catatan",
      label: "Catatan",
      value: (item: KandangAsistenResponseDto) =>
        item.catatan || <span className="text-default-400 italic">-</span>,
    },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  // Filter data based on search query
  const filteredData = kandangAsistens?.filter((item) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      item.kandangNama?.toLowerCase().includes(query) ||
      item.asistenNama?.toLowerCase().includes(query) ||
      item.catatan?.toLowerCase().includes(query)
    );
  });

  return (
    <ListGrid
      actionButtons={{
        edit: {
          href: (id: string) => `/kandang-asistens/${id}/edit`,
          label: "Edit",
        },
        delete: {
          onDelete: (id: string) => deleteKandangAsisten.mutate(id),
          label: "Hapus",
        },
      }}
      addButton={{
        href: "/kandang-asistens/create",
        label: "Tambah Asisten Kandang",
      }}
      columns={columns}
      data={filteredData}
      deleteConfirmMessage={(item: KandangAsistenResponseDto) =>
        `Apakah Anda yakin ingin menghapus penugasan "${item.asistenNama}" dari kandang "${item.kandangNama}"?`
      }
      deleteConfirmTitle="Hapus Asisten Kandang"
      description="Kelola penugasan asisten untuk setiap kandang"
      keyField="id"
      loading={isLoading}
      nameField="asistenNama"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan kandang, asisten, atau catatan..."
      showPagination={true}
      title="Data Asisten Kandang"
      onSearch={(value) => setSearchQuery(value)}
    />
  );
}
