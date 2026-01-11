import type { Mortalitas } from "../types";

import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { useDeleteMortalitas, useMortalitas } from "../hooks/useMortalitas";

import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { ListGrid } from "@/components/ui/ListGrid";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { ICurrentUser } from "@/interfaces/common";

export default function MortalitasList() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/_authenticated/daftar-mortalitas/" });
  const [searchQuery, setSearchQuery] = useState("");

  const currentFilters = search as any;

  const { data: meData, isLoading: isLoadingMe } =
    useCurrentUser<ICurrentUser>();

  // Fetch all kandangs for filter
  const { data: kandangs } = useKandangs();

  // Determine kandangId filter based on user role
  const kandangIdFilter = useMemo(() => {
    const roleNormalized = String(meData?.role ?? "").toLowerCase();

    if (roleNormalized === "petugas" && meData?.kandangsManaged?.length) {
      return String(meData.kandangsManaged[0]);
    }

    return undefined;
  }, [meData]);

  // Use server-side filtering
  const { data: mortalitas, isLoading: isLoadingMortalitas } = useMortalitas({
    kandangId: kandangIdFilter,
    ...currentFilters,
    search: searchQuery,
  });

  const deleteMortalitas = useDeleteMortalitas();

  // Format date to Indonesian locale
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
      key: "penanggungJawabKandang",
      label: "Penanggung Jawab Kandang",
      value: (item: Mortalitas) => item.petugasNama,
    },
    {
      key: "kandangNama",
      label: "Nama Kandang",
      value: (item: Mortalitas) => item.kandangNama,
    },
    {
      key: "tanggalKematian",
      label: "Tanggal Kematian",
      value: (item: Mortalitas) => formatDate(item.tanggalKematian),
    },
    {
      key: "jumlahKematian",
      label: "Jumlah Kematian (ekor)",
      value: (item: Mortalitas) => item.jumlahKematian.toLocaleString("id-ID"),
    },
    {
      key: "jumlahAyamSebelumMati",
      label: "Jumlah Ayam Sebelum Mati (ekor)",
      value: (item: Mortalitas) =>
        item.jumlahAyamSebelumMati.toLocaleString("id-ID"),
    },
    {
      key: "jumlahAyamSesudahMati",
      label: "Jumlah Ayam Sesudah Mati (ekor)",
      value: (item: Mortalitas) =>
        item.jumlahAyamSesudahMati.toLocaleString("id-ID"),
    },
    {
      key: "penyebabKematian",
      label: "Penyebab Kematian",
      value: (item: Mortalitas) => item.penyebabKematian,
    },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  // Generate month options (e.g., last 24 months + All)
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

  // Generate kandang options
  const kandangOptions = useMemo(() => {
    const options = [{ label: "Semua Kandang", value: "all" }];

    if (kandangs) {
      kandangs.forEach((k: any) => {
        options.push({
          label: k.namaKandang,
          value: k.id,
        });
      });
    }

    return options;
  }, [kandangs]);

  const isLoading = isLoadingMortalitas || isLoadingMe;

  return (
    <ListGrid
      actionButtons={{
        show: {
          href: (id: string) => `/daftar-mortalitas/${id}`,
          label: "Detail",
        },
        edit: {
          href: (id: string) => `/daftar-mortalitas/${id}/edit`,
          label: "Edit",
        },
        delete: {
          onDelete: (id: string) => deleteMortalitas.mutate(id),
          label: "Hapus",
        },
      }}
      addButton={{
        href: "/daftar-mortalitas/create",
        label: "Tambah Data Mortalitas",
      }}
      columns={columns}
      data={mortalitas}
      deleteConfirmMessage={(item: Mortalitas) =>
        `Apakah Anda yakin ingin menghapus data mortalitas dengan penyebab "${item.penyebabKematian}"?`
      }
      deleteConfirmTitle="Hapus Data Mortalitas"
      description="Kelola data mortalitas ayam broiler"
      filterValues={currentFilters}
      filters={[
        {
          key: "period",
          label: "Periode",
          type: "select",
          placeholder: "Pilih Periode",
          options: monthOptions,
          className: "w-full md:w-48",
        },
        {
          key: "kandangId",
          label: "Kandang",
          type: "select",
          placeholder: "Pilih Kandang",
          options: kandangOptions,
          className: "w-full md:w-48",
        },
      ]}
      keyField="id"
      loading={isLoading}
      nameField="penyebabKematian"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan penyebab kematian..."
      showPagination={true}
      title="Data Mortalitas"
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
