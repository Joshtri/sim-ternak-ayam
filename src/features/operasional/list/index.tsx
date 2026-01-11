import type { Operasional } from "../types";

import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { useDeleteOperasional, useOperasionals } from "../hooks/useOperasional";

import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { useUsers } from "@/features/users-management/hooks/useUsers";
import { usePakans } from "@/features/pakan/hooks/usePakan";
import { useVaksins } from "@/features/vaksin/hooks/useVaksin";
import { ListGrid } from "@/components/ui/ListGrid";
import { Badge } from "@/components/ui/Badge";

export default function OperasionalList() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/_authenticated/daftar-operasional/" });
  const [searchQuery, setSearchQuery] = useState("");

  const currentFilters = search as any;

  // Fetch data for OPTIONS
  const { data: kandangs } = useKandangs();
  const { data: users } = useUsers();
  const { data: pakans } = usePakans();
  const { data: vaksins } = useVaksins();

  // 1. Period Options
  const monthOptions = useMemo(() => {
    const options = [{ label: "Semua", value: "all" }];
    const today = new Date();

    for (let i = 0; i < 24; i++) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      });

      options.push({ label, value });
    }

    return options;
  }, []);

  // 2. Kandang Options
  const kandangOptions = useMemo(() => {
    const options = [{ label: "Semua Kandang", value: "all" }];

    if (kandangs) {
      kandangs.forEach((k: any) => {
        options.push({
          label: k.name || k.nama || k.kandangNama || "Kandang",
          value: k.id,
        });
      });
    }

    return options;
  }, [kandangs]);

  // 3. Petugas Options (filter users by role 'petugas' if possible, or just Show All)
  // Assuming 'role' property exists on user
  const petugasOptions = useMemo(() => {
    const options = [{ label: "Semua Petugas", value: "all" }];

    if (users) {
      users
        .filter((u: any) => u.role?.toLowerCase() === "petugas")
        .forEach((u: any) => {
          options.push({ label: u.fullName || u.username, value: u.id });
        });
    }

    return options;
  }, [users]);

  // 4. Pakan Options
  const pakanOptions = useMemo(() => {
    const options = [{ label: "Semua Pakan", value: "all" }];

    if (pakans) {
      pakans.forEach((p: any) => {
        options.push({ label: p.nama, value: p.id });
      });
    }

    return options;
  }, [pakans]);

  // 5. Vaksin Options
  const vaksinOptions = useMemo(() => {
    const options = [{ label: "Semua Vaksin", value: "all" }];

    if (vaksins) {
      vaksins.forEach((v: any) => {
        options.push({ label: v.nama, value: v.id });
      });
    }

    return options;
  }, [vaksins]);

  // Use server-side filtering
  const { data: operasionals, isLoading } = useOperasionals({
    ...currentFilters,
    search: searchQuery,
  });

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
      data={operasionals}
      deleteConfirmMessage={(item: Operasional) =>
        `Apakah Anda yakin ingin menghapus data operasional "${item.jenisKegiatanNama}" pada kandang "${item.kandangNama}"?`
      }
      deleteConfirmTitle="Hapus Data Operasional"
      description="Kelola data kegiatan operasional harian peternakan ayam broiler"
      filterValues={currentFilters}
      filters={[
        {
          key: "period",
          label: "Periode",
          type: "select",
          placeholder: "Pilih Periode",
          options: monthOptions,
          className: "w-full md:w-36",
        },
        {
          key: "kandangId",
          label: "Kandang",
          type: "select",
          placeholder: "Pilih Kandang",
          options: kandangOptions,
          className: "w-full md:w-36",
        },
        {
          key: "petugasId",
          label: "Petugas",
          type: "select",
          placeholder: "Pilih Petugas",
          options: petugasOptions,
          className: "w-full md:w-36",
        },
        {
          key: "pakanId",
          label: "Pakan",
          type: "select",
          placeholder: "Pilih Pakan",
          options: pakanOptions,
          className: "w-full md:w-36",
        },
        {
          key: "vaksinId",
          label: "Vaksin",
          type: "select",
          placeholder: "Pilih Vaksin",
          options: vaksinOptions,
          className: "w-full md:w-36",
        },
      ]}
      keyField="id"
      loading={isLoading}
      nameField="jenisKegiatanNama"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan jenis kegiatan atau kandang..."
      showPagination={true}
      title="Data Operasional"
      onFilterChange={newValues => {
        navigate({
          search: (prev: any) => ({
            ...prev,
            ...newValues,
          }),
        } as any);
      }}
      onSearch={value => setSearchQuery(value)}
    />
  );
}
