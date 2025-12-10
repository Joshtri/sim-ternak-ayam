import type { Ayam } from "../interface";

import { useMemo, useState } from "react";

import { useDeleteAyam, useAyams } from "../hooks/useAyams";

import { ListGrid } from "@/components/ui/ListGrid/ListGridRefactored";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { ICurrentUser } from "@/interfaces/common";
import { Badge } from "@/components/ui/Badge";

export default function AyamsList() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: meData, isLoading: isLoadingMe } =
    useCurrentUser<ICurrentUser>();

  const { data: ayams, isLoading: isLoadingAyams } = useAyams({
    search: searchQuery,
  });

  // Filter client-side: if user is Petugas, show only ayams with kandangId
  const filteredAyams = useMemo(() => {
    const list = ayams ?? [];

    const role = String(meData?.role ?? "").toLowerCase();

    if (role === "petugas") {
      const kandangIds = new Set(
        (meData?.kandangsManaged ?? []).map((k: any) => String(k.id))
      );

      return list.filter(a => kandangIds.has(String(a.kandangId)));
    }

    return list;
  }, [ayams, meData]);

  const deleteAyam = useDeleteAyam();

  const columns = [
    {
      key: "kandangNama",
      label: "Nama Kandang",
      value: (ayam: Ayam) => ayam.kandangNama,
    },

    {
      key: "penanggungJawabKandang",
      label: "Penanggung Jawab",
      value: (ayam: Ayam) => ayam.petugasKandangNama,
    },
    {
      key: "tanggalMasuk",
      label: "Tanggal Masuk",
      value: (ayam: Ayam) => {
        // Format date to Indonesian locale
        const date = new Date(ayam.tanggalMasuk);

        return date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      },
    },
    {
      key: "jumlahMasuk",
      label: "Jml Masuk",
      value: (ayam: Ayam) => ayam.jumlahMasuk.toLocaleString("id-ID"),
    },
    {
      key: "sisaAyamHidup",
      label: "Sisa (Ekor)",
      value: (ayam: Ayam) => ayam.sisaAyamHidup.toLocaleString("id-ID"),
    },
    {
      key: "statusPanen",
      label: "Status Panen",
      value: (ayam: Ayam) => (
        <Badge color={ayam.bisaDipanen ? "success" : "default"} variant="flat">
          {ayam.bisaDipanen ? "Siap Panen" : "Belum Siap"}
        </Badge>
      ),
    },
    {
      key: "kesehatan",
      label: "Kesehatan",
      value: (ayam: Ayam) => (
        <Badge
          color={ayam.perluPerhatianKesehatan ? "danger" : "success"}
          variant="flat"
        >
          {ayam.perluPerhatianKesehatan ? "Cek Kesehatan" : "Sehat"}
        </Badge>
      ),
    },
    { key: "actions", label: "Aksi", align: "center" as const },
  ];

  const isLoading = isLoadingAyams || isLoadingMe;

  return (
    <ListGrid
      actionButtons={{
        show: {
          href: (id: string) => `/daftar-ayam/${id}`,
          label: "Detail",
        },
        edit: {
          href: (id: string) => `/daftar-ayam/${id}/edit`,
          label: "Edit",
        },
        delete: {
          onDelete: (id: string) => deleteAyam.mutate(id),
          label: "Hapus",
        },
      }}
      addButton={{
        href: "/daftar-ayam/create",
        label: "Tambah Data Ayam",
      }}
      columns={columns}
      data={filteredAyams}
      deleteConfirmMessage={(item: Ayam) =>
        `Apakah Anda yakin ingin menghapus data ayam dari ${item.kandangNama}?`
      }
      deleteConfirmTitle="Hapus Data Ayam"
      keyField="id"
      loading={isLoading}
      nameField="kandangNama"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan nama kandang..."
      showPagination={true}
      title="Daftar Ayam"
      onSearch={value => setSearchQuery(value)}
    />
  );
}
