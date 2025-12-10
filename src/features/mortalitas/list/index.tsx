import type { Mortalitas } from "../types";

import { useMemo, useState } from "react";

import { useDeleteMortalitas, useMortalitas } from "../hooks/useMortalitas";

import { ListGrid } from "@/components/ui/ListGrid/ListGridRefactored";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { ICurrentUser } from "@/interfaces/common";

export default function MortalitasList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: meData, isLoading: isLoadingMe } =
    useCurrentUser<ICurrentUser>();

  // Determine kandangId filter based on user role
  // For Petugas: filter by first managed kandang (or you can add UI to select)
  // For other roles: no filter (show all)
  const kandangIdFilter = useMemo(() => {
    const roleNormalized = String(meData?.role ?? "").toLowerCase();

    if (roleNormalized === "petugas" && meData?.kandangsManaged?.length) {
      // For Petugas, filter by first kandang or you can add dropdown to select
      return String(meData.kandangsManaged[0].id);
    }

    return undefined;
  }, [meData]);

  // Use server-side filtering with kandangId query param
  const { data: mortalitas, isLoading: isLoadingMortalitas } = useMortalitas({
    kandangId: kandangIdFilter,
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

  // Filter data based on search query only (kandangId filtering is done server-side)
  const filteredData = useMemo(() => {
    const list = mortalitas ?? [];

    // Apply search filter (by penyebabKematian)
    if (!searchQuery || searchQuery.trim() === "") return list;

    const q = searchQuery.toLowerCase().trim();

    return list.filter(item =>
      String(item.penyebabKematian ?? "")
        .toLowerCase()
        .includes(q)
    );
  }, [mortalitas, searchQuery]);
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

  // Filter data based on search query
  // const filteredData = mortalitas?.filter(item =>
  //   item.penyebabKematian.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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
      data={filteredData}
      deleteConfirmMessage={(item: Mortalitas) =>
        `Apakah Anda yakin ingin menghapus data mortalitas dengan penyebab "${item.penyebabKematian}"?`
      }
      deleteConfirmTitle="Hapus Data Mortalitas"
      description="Kelola data mortalitas ayam broiler"
      keyField="id"
      loading={isLoading}
      nameField="penyebabKematian"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan penyebab kematian..."
      showPagination={true}
      title="Data Mortalitas"
      onSearch={value => setSearchQuery(value)}
    />
  );
}
