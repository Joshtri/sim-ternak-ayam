import type { Panen } from "../types";

import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { useDeletePanen, usePanens } from "../hooks/usePanen";

import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { ICurrentUser } from "@/interfaces/common";
import { ListGrid } from "@/components/ui/ListGrid";
import { Badge } from "@/components/ui/Badge";

export default function PanenList() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/_authenticated/daftar-panen/" });
  const [searchQuery, setSearchQuery] = useState("");

  const currentFilters = search as any;

  const { data: meData, isLoading: isLoadingMe } =
    useCurrentUser<ICurrentUser>();

  // Fetch all kandangs for filter
  const { data: kandangs } = useKandangs();

  // Determine kandangId filter based on user role (if needed)
  // Logic: if Petugas and managed kandangs exist, maybe default to first?
  // But unlike MortalitasList, I will keep it flexible or standard.
  // Actually, let's replicate the logic if it makes sense.
  // Assuming Petugas sees only their kandangs, backend filters it usually.
  // But for the dropdown options, we want to show relevant ones.
  // And for the initial fetch, maybe restrict?
  // Let's stick to the same pattern as MortalitasList for consistency.

  const kandangIdFilter = useMemo(() => {
    const roleNormalized = String(meData?.role ?? "").toLowerCase();

    if (roleNormalized === "petugas" && meData?.kandangsManaged?.length) {
      return String(meData.kandangsManaged[0]);
    }

    return undefined;
  }, [meData]);

  const { data: panens, isLoading: isLoadingPanens } = usePanens({
    kandangId: kandangIdFilter,
    ...currentFilters,
    search: searchQuery,
  });

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
          label: k.name || k.nama || k.kandangNama || "Kandang",
          value: k.id,
        });
      });
    }

    return options;
  }, [kandangs]);

  const isLoading = isLoadingPanens || isLoadingMe;

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
      nameField="namaKandang"
      pageSize={10}
      searchPlaceholder="Cari berdasarkan nama kandang..."
      showPagination={true}
      title="Data Panen"
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
