import { Switch } from "@heroui/react";
// import { useNavigate } from "@tanstack/react-router";

import {
  useDeleteHargaPasar,
  useHargaPasars,
  useUpdateHargaPasarStatus,
} from "../hooks/useHargaPasar";
import { HargaPasar } from "../types";

import { ListGrid } from "@/components/ui/ListGrid/ListGridRefactored";

export default function HargaPasarListPage() {
  // const navigate = useNavigate();
  const { data: hargaPasars, isLoading } = useHargaPasars();
  const deleteMutation = useDeleteHargaPasar();
  const updateStatusMutation = useUpdateHargaPasarStatus();

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <ListGrid
      actionButtons={{
        edit: { href: id => `/harga-pasar/${id}/edit` },
        delete: { onDelete: handleDelete },
      }}
      addButton={{
        label: "Tambah Harga Pasar",
        href: "/harga-pasar/create",
        // onClick: () => navigate({ to: "/harga-pasar/create" }),
      }}
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: "Harga Pasar", href: "/harga-pasar" },
      ]}
      columns={[
        {
          key: "hargaFormatted",
          label: "Harga / Kg",
          value: (item: HargaPasar) => (
            <span className="font-bold text-default-900">
              {item.hargaFormatted || `Rp ${item.hargaPerKg.toLocaleString()}`}
            </span>
          ),
        },
        {
          key: "tanggalMulai",
          label: "Berlaku Mulai",
          value: (item: HargaPasar) => (
            <span>
              {new Date(item.tanggalMulai).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          ),
        },
        {
          key: "wilayah",
          label: "Wilayah",
          value: (item: HargaPasar) => item.wilayah || "-",
        },
        {
          key: "isAktif",
          label: "Status",
          value: (item: HargaPasar) => (
            <Switch
              color="success"
              isDisabled={updateStatusMutation.isPending}
              isSelected={item.isAktif}
              size="sm"
              onValueChange={isSelected =>
                updateStatusMutation.mutate({
                  id: item.id,
                  isAktif: isSelected,
                })
              }
            >
              <span className="text-small">
                {item.isAktif ? "Aktif" : "Non-Aktif"}
              </span>
            </Switch>
          ),
        },
        {
          key: "keterangan",
          label: "Keterangan",
          value: (item: HargaPasar) => item.keterangan || "-",
        },
        {
          key: "actions",
          label: "Aksi",
        },
      ]}
      data={hargaPasars || []}
      deleteConfirmMessage={item =>
        `Apakah Anda yakin ingin menghapus harga pasar "${item.hargaFormatted || item.hargaPerKg}"?`
      }
      description="Kelola data harga pasar ayam broiler untuk referensi penjualan."
      loading={isLoading}
      title="Daftar Harga Pasar"
    />
  );
}
