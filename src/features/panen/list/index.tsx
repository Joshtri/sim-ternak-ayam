import type { Panen } from "../types";

import { useState } from "react";

import { useDeletePanen, usePanens } from "../hooks/usePanen";

import { ListGrid } from "@/components/ui/ListGrid/ListGridRefactored";
import { Badge } from "@/components/ui/Badge";

export default function PanenList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: panens, isLoading } = usePanens();

  const deletePanen = useDeletePanen();

  // Format date
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
      key: "namaKandang",
      label: "Nama Kandang",
      value: (item: Panen) => (
        <span className="font-semibold">{item.namaKandang}</span>
      ),
    },
    {
      key: "tanggalPanen",
      label: "Tanggal Panen",
      value: (item: Panen) => formatDate(item.tanggalPanen),
    },
    {
      key: "jumlahEkorPanen",
      label: "Jumlah Panen",
      value: (item: Panen) => (
        <Badge color="success" variant="flat">
          {item.jumlahEkorPanen.toLocaleString("id-ID")} ekor
        </Badge>
      ),
    },
    {
      key: "beratRataRata",
      label: "Berat Rata-Rata",
      value: (item: Panen) => (
        <span className="font-semibold text-primary">
          {item.beratRataRata.toLocaleString("id-ID", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          kg
        </span>
      ),
    },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  // Filter data based on search query
  // const filteredData = panens?.filter(item => item.namaKandang);

  return (
    <ListGrid
      actionButtons={{
        show: {
          href: (id: string) => `/daftar-panen/${id}`,
          label: "Detail",
        },
        edit: {
          href: (id: string) => `/daftar-panen/${id}/edit`,
          label: "Edit",
        },
        delete: {
          onDelete: (id: string) => deletePanen.mutate(id),
          label: "Hapus",
        },
      }}
      addButton={{
        href: "/daftar-panen/create",
        label: "Tambah Data Panen",
      }}
      columns={columns}
      data={panens || []}
      deleteConfirmMessage={(item: Panen) =>
        `Apakah Anda yakin ingin menghapus data panen dari kandang "${item.namaKandang}"?`
      }
      deleteConfirmTitle="Hapus Data Panen"
      description="Kelola data pemanenan ayam broiler"
      keyField="id"
      loading={isLoading}
      nameField="namaKandang"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan nama kandang..."
      showPagination={true}
      title="Data Panen"
      onSearch={value => setSearchQuery(value)}
    />
  );
}
