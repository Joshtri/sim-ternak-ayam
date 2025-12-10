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
      key: "stokTersisa",
      label: "Sisa Stok",
      value: (item: Pakan) => {
        const sisa = item.stokTersisa ?? item.stokKg;
        const status = item.statusStok;

        let color: "success" | "warning" | "danger" | "default" = "success";

        if (status === "Menipis") color = "warning";
        if (status === "Kritis" || status === "Habis") color = "danger";

        return (
          <Badge color={color} variant="flat">
            {sisa.toLocaleString("id-ID")} kg
          </Badge>
        );
      },
    },
    // {
    //   key: "stokTerpakai",
    //   label: "Terpakai",
    //   value: (item: Pakan) =>
    //     `${(item.stokTerpakai ?? 0).toLocaleString("id-ID")} kg`,
    // },
    {
      key: "statusStok",
      label: "Status",
      value: (item: Pakan) => {
        if (!item.statusStok) return "-";

        let color: "success" | "warning" | "danger" | "default" = "success";
        if (item.statusStok === "Aman") color = "success";
        if (item.statusStok === "Menipis") color = "warning";
        if (item.statusStok === "Kritis" || item.statusStok === "Habis")
          color = "danger";

        return (
          <Badge color={color} variant="solid">
            {item.statusStok}
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
  const filteredData = pakans?.filter(item => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return item.namaPakan?.toLowerCase().includes(query) ?? false;
  });

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
