import type { Operasional } from "../types";

import { useState } from "react";

import { useDeleteOperasional, useOperasionals } from "../hooks/useOperasional";

import { ListGrid } from "@/components/ui/ListGrid/ListGridRefactored";
import { Badge } from "@/components/ui/Badge";

export default function OperasionalList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: operasionals, isLoading } = useOperasionals();

  const deleteOperasional = useDeleteOperasional();

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
      key: "jenisKegiatanNama",
      label: "Jenis Kegiatan",
      value: (item: Operasional) => (
        <span className="font-semibold">{item.jenisKegiatanNama || "-"}</span>
      ),
    },
    {
      key: "detailItem",
      label: "Item Digunakan",
      value: (item: Operasional) => {
        if (item.pakanNama) {
          return (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">Pakan</span>
              <span className="font-medium text-warning-600">
                {item.pakanNama}
              </span>
            </div>
          );
        }
        if (item.vaksinNama) {
          return (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">Vaksin</span>
              <span className="font-medium text-secondary-600">
                {item.vaksinNama}
              </span>
            </div>
          );
        }

        return <span className="text-gray-400">-</span>;
      },
    },
    {
      key: "kandangNama",
      label: "Kandang",
      value: (item: Operasional) => (
        <span className="text-primary">{item.kandangNama || "-"}</span>
      ),
    },
    {
      key: "petugasNama",
      label: "Petugas",
      value: (item: Operasional) => item.petugasNama || "-",
    },
    {
      key: "tanggal",
      label: "Tanggal",
      value: (item: Operasional) => formatDate(item.tanggal),
    },
    {
      key: "jumlah",
      label: "Jumlah",
      value: (item: Operasional) => {
        let unit = "";
        let color: "primary" | "warning" | "secondary" | "default" = "default";
        let label = "Jumlah";

        if (item.pakanNama) {
          unit = "kg";
          color = "warning";
          label = "Pakan";
        } else if (item.vaksinNama) {
          unit = "dosis";
          color = "secondary";
          label = "Vaksin";
        } else {
          color = "primary";
        }

        return (
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] uppercase text-gray-400 font-bold">
              {label}
            </span>
            <Badge color={color} variant="flat">
              {item.jumlah.toLocaleString("id-ID")} {unit}
            </Badge>
          </div>
        );
      },
    },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  // Filter data based on search query
  const filteredData = operasionals?.filter(item => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();

    return (
      (item.jenisKegiatanNama?.toLowerCase().includes(query) ?? false) ||
      (item.kandangNama?.toLowerCase().includes(query) ?? false)
    );
  });

  return (
    <ListGrid
      actionButtons={{
        show: {
          href: (id: string) => `/daftar-operasional/${id}`,
          label: "Detail",
        },
        edit: {
          href: (id: string) => `/daftar-operasional/${id}/edit`,
          label: "Edit",
        },
        delete: {
          onDelete: (id: string) => deleteOperasional.mutate(id),
          label: "Hapus",
        },
      }}
      addButton={{
        href: "/daftar-operasional/create",
        label: "Tambah Data Operasional",
      }}
      columns={columns}
      data={filteredData}
      deleteConfirmMessage={(item: Operasional) =>
        `Apakah Anda yakin ingin menghapus data operasional "${item.jenisKegiatanNama}" pada kandang "${item.kandangNama}"?`
      }
      deleteConfirmTitle="Hapus Data Operasional"
      description="Kelola data kegiatan operasional harian peternakan ayam broiler"
      keyField="id"
      loading={isLoading}
      nameField="jenisKegiatanNama"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan jenis kegiatan atau kandang..."
      showPagination={true}
      title="Data Operasional"
      onSearch={value => setSearchQuery(value)}
    />
  );
}
