import type { JenisKegiatan } from "../types";

import { useState } from "react";

import {
  useDeleteJenisKegiatan,
  useJenisKegiatans,
} from "../hooks/useJenisKegiatan";

import { ListGrid } from "@/components/ui/ListGrid";
import { Badge } from "@/components/ui/Badge";

export default function JenisKegiatanList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: jenisKegiatans, isLoading } = useJenisKegiatans();

  const deleteJenisKegiatan = useDeleteJenisKegiatan();

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const columns = [
    {
      key: "namaKegiatan",
      label: "Nama Kegiatan",
      value: (item: JenisKegiatan) => (
        <span className="font-semibold">{item.namaKegiatan}</span>
      ),
    },
    {
      key: "deskripsi",
      label: "Deskripsi",
      value: (item: JenisKegiatan) => (
        <span className="text-sm text-gray-600 line-clamp-2">
          {item.deskripsi}
        </span>
      ),
    },
    // {
    //   key: "satuan",
    //   label: "Satuan",
    //   value: (item: JenisKegiatan) => (
    //     <Badge color="primary" variant="flat">
    //       {item.satuan}
    //     </Badge>
    //   ),
    // },
    // {
    //   key: "biayaDefault",
    //   label: "Biaya Default",
    //   value: (item: JenisKegiatan) => (
    //     <span className="font-semibold text-success">
    //       {formatCurrency(item.biayaDefault)}
    //     </span>
    //   ),
    // },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  // Filter data based on search query
  const filteredData = jenisKegiatans?.filter(item => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      (item.namaKegiatan?.toLowerCase().includes(query) ?? false) ||
      (item.deskripsi?.toLowerCase().includes(query) ?? false) ||
      (item.satuan?.toLowerCase().includes(query) ?? false)
    );
  });

  return (
    <ListGrid
      actionButtons={{
        show: {
          href: (id: string) => `/daftar-jenis-kegiatan/${id}`,
          label: "Detail",
        },
        edit: {
          href: (id: string) => `/daftar-jenis-kegiatan/${id}/edit`,
          label: "Edit",
        },
        delete: {
          onDelete: (id: string) => deleteJenisKegiatan.mutate(id),
          label: "Hapus",
        },
      }}
      addButton={{
        href: "/daftar-jenis-kegiatan/create",
        label: "Tambah Jenis Kegiatan",
      }}
      columns={columns}
      data={filteredData}
      deleteConfirmMessage={(item: JenisKegiatan) =>
        `Apakah Anda yakin ingin menghapus jenis kegiatan "${item.namaKegiatan}"?`
      }
      deleteConfirmTitle="Hapus Jenis Kegiatan"
      description="Kelola data master jenis kegiatan"
      keyField="id"
      loading={isLoading}
      nameField="namaKegiatan"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan nama, deskripsi, atau satuan..."
      showPagination={true}
      title="Data Jenis Kegiatan"
      onSearch={value => setSearchQuery(value)}
    />
  );
}
