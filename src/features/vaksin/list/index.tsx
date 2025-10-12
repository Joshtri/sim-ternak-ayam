import type { Vaksin } from "../types";

import { useState } from "react";

import { useDeleteVaksin, useVaksins } from "../hooks/useVaksin";

import { ListGrid } from "@/components/ui/ListGrid/ListGridRefactored";
import { Badge } from "@/components/ui/Badge";

export default function VaksinList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: vaksins, isLoading } = useVaksins();

  const deleteVaksin = useDeleteVaksin();

  const columns = [
    {
      key: "namaVaksin",
      label: "Nama Vaksin",
      value: (item: Vaksin) => item.namaVaksin,
    },
    {
      key: "stok",
      label: "Stok",
      value: (item: Vaksin) => {
        const isLowStock = item.stok < 50; // Adjust threshold as needed for vaksin

        return (
          <Badge color={isLowStock ? "danger" : "success"} variant="flat">
            {item.stok.toLocaleString("id-ID")} unit
          </Badge>
        );
      },
    },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  // Filter data based on search query
  const filteredData = vaksins?.filter(item =>
    item.namaVaksin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ListGrid
      actionButtons={{
        show: {
          href: (id: string) => `/daftar-vaksin/${id}`,
          label: "Detail",
        },
        edit: {
          href: (id: string) => `/daftar-vaksin/edit/${id}`,
          label: "Edit",
        },
        delete: {
          onDelete: (id: string) => deleteVaksin.mutate(id),
          label: "Hapus",
        },
      }}
      addButton={{
        href: "/daftar-vaksin/create",
        label: "Tambah Data Vaksin",
      }}
      columns={columns}
      data={filteredData}
      deleteConfirmMessage={(item: Vaksin) =>
        `Apakah Anda yakin ingin menghapus data vaksin "${item.namaVaksin}"?`
      }
      deleteConfirmTitle="Hapus Data Vaksin"
      description="Kelola data vaksin ayam broiler"
      keyField="id"
      loading={isLoading}
      nameField="namaVaksin"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan nama vaksin..."
      showPagination={true}
      title="Data Vaksin"
      onSearch={value => setSearchQuery(value)}
    />
  );
}
