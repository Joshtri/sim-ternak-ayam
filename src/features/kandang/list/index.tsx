// import { ListGrid } from "@/components/ui/";
import React, { useState } from "react";

import { useDeleteKandang, useKandangs } from "../hooks/useKandang";
import { Kandang } from "../types";

import { ListGrid } from "@/components/ui/ListGrid/ListGridRefactored";

export default function KandangList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: kandangs, isLoading } = useKandangs({
    search: searchQuery,
  });

  const deleteKandang = useDeleteKandang();

  const columns = [
    {
      key: "nama",
      label: "Nama",
      value: (kandang: any) => kandang.namaKandang,
    },
    { key: "lokasi", label: "Lokasi", value: (kandang: any) => kandang.lokasi },
    {
      key: "kapasitas",
      label: "Kapasitas",
      value: (kandang: any) => kandang.kapasitas,
    },
    {
      key: "petugas-nama",
      label: "Nama Petugas",
      value: (kandang: any) => kandang.petugasNama,
    },
    // { key: "status", label: "Status", value: (kandang: any) => kandang.status },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  return (
    <ListGrid
      actionButtons={{
        show: {
          href: (id: string) => `/daftar-kandang/${id}`,
          label: "Detail",
        },

        edit: {
          href: (id: string) => `/daftar-kandang/${id}/edit`,
          label: "Edit",
        },
        delete: {
          onDelete: (id: string) => deleteKandang.mutate(id),
          label: "Hapus",
        },
      }}
      addButton={{
        href: "/daftar-kandang/create",
        label: "Tambah Kandang",
      }}
      columns={columns}
      data={kandangs}
      deleteConfirmMessage={(item: Kandang) =>
        `Apakah Anda yakin ingin menghapus kandang ${item.namaKandang}?`
      }
      deleteConfirmTitle="Hapus Kandang"
      keyField="id"
      loading={isLoading}
      nameField="namaKandang"
      pageSize={10}
      searchPlaceholder="Cari kandang berdasarkan nama atau lokasi..."
      showPagination={true}
      title="Daftar Kandang"
      onSearch={value => setSearchQuery(value)}
    />
  );
}
