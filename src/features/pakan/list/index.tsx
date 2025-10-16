import type { Pakan } from "../types";

import { useState } from "react";

import { useDeletePakan, usePakans } from "../hooks/usePakan";
import { formatMonthYear } from "../create/helpers";

import { ListGrid } from "@/components/ui/ListGrid/ListGridRefactored";
import { Badge } from "@/components/ui/Badge";

export default function PakanList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: pakans, isLoading } = usePakans();

  const deletePakan = useDeletePakan();

  const columns = [
    {
      key: "namaPakan",
      label: "Nama Pakan",
      value: (item: Pakan) => item.namaPakan,
    },
    {
      key: "stokKg",
      label: "Stok",
      value: (item: Pakan) => {
        const isLowStock = item.stokKg < 100; // Adjust threshold as needed

        return (
          <Badge color={isLowStock ? "danger" : "success"} variant="flat">
            {item.stokKg.toLocaleString("id-ID")} kg
          </Badge>
        );
      },
    },
    {
      key: "periode",
      label: "Periode",
      value: (item: Pakan) => formatMonthYear(item.bulan, item.tahun),
    },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  // Filter data based on search query
  const filteredData = pakans?.filter(item =>
    item.namaPakan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ListGrid
      actionButtons={{
        show: {
          href: (id: string) => `/daftar-pakan/${id}`,
          label: "Detail",
        },
        edit: {
          href: (id: string) => `/daftar-pakan/${id}/edit`,
          label: "Edit",
        },
        delete: {
          onDelete: (id: string) => deletePakan.mutate(id),
          label: "Hapus",
        },
      }}
      addButton={{
        href: "/daftar-pakan/create",
        label: "Tambah Data Pakan",
      }}
      columns={columns}
      data={filteredData}
      deleteConfirmMessage={(item: Pakan) =>
        `Apakah Anda yakin ingin menghapus data pakan "${item.namaPakan}"?`
      }
      deleteConfirmTitle="Hapus Data Pakan"
      description="Kelola data pakan ayam broiler"
      keyField="id"
      loading={isLoading}
      nameField="namaPakan"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan nama pakan..."
      showPagination={true}
      title="Data Pakan"
      onSearch={value => setSearchQuery(value)}
    />
  );
}
