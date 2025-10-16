import type { Biaya } from "../types";

import { useState } from "react";

import { useDeleteBiaya, useBiayas } from "../hooks/useBiaya";

import { ListGrid } from "@/components/ui/ListGrid/ListGridRefactored";
import { Badge } from "@/components/ui/Badge";

export default function BiayaList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: biayas, isLoading } = useBiayas();

  const deleteBiaya = useDeleteBiaya();

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const columns = [
    {
      key: "jenisBiaya",
      label: "Jenis Biaya",
      value: (item: Biaya) => (
        <span className="font-semibold">{item.jenisBiaya}</span>
      ),
    },
    {
      key: "petugasNama",
      label: "Petugas",
      value: (item: Biaya) => item.petugasNama,
    },
    {
      key: "tanggal",
      label: "Tanggal",
      value: (item: Biaya) => formatDate(item.tanggal),
    },
    {
      key: "jumlah",
      label: "Jumlah",
      value: (item: Biaya) => (
        <Badge color="danger" variant="flat">
          {formatCurrency(item.jumlah)}
        </Badge>
      ),
    },
    {
      key: "buktiUrl",
      label: "Bukti",
      value: (item: Biaya) =>
        item.buktiUrl ? (
          <Badge color="success" variant="flat">
            Ada
          </Badge>
        ) : (
          <Badge color="default" variant="flat">
            Tidak Ada
          </Badge>
        ),
    },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  // Filter data based on search query
  const filteredData = biayas?.filter(item => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      (item.jenisBiaya?.toLowerCase().includes(query) ?? false) ||
      (item.petugasNama?.toLowerCase().includes(query) ?? false)
    );
  });

  return (
    <ListGrid
      actionButtons={{
        show: {
          href: (id: string) => `/daftar-biaya/${id}`,
          label: "Detail",
        },
        edit: {
          href: (id: string) => `/daftar-biaya/${id}/edit`,
          label: "Edit",
        },
        delete: {
          onDelete: (id: string) => deleteBiaya.mutate(id),
          label: "Hapus",
        },
      }}
      addButton={{
        href: "/daftar-biaya/create",
        label: "Tambah Data Biaya",
      }}
      columns={columns}
      data={filteredData}
      deleteConfirmMessage={(item: Biaya) =>
        `Apakah Anda yakin ingin menghapus data biaya "${item.jenisBiaya}" dengan jumlah ${formatCurrency(item.jumlah)}?`
      }
      deleteConfirmTitle="Hapus Data Biaya"
      description="Kelola data pengeluaran/biaya peternakan ayam broiler"
      keyField="id"
      loading={isLoading}
      nameField="jenisBiaya"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan jenis biaya atau petugas..."
      showPagination={true}
      title="Data Biaya"
      onSearch={value => setSearchQuery(value)}
    />
  );
}
