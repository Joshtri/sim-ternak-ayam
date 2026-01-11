import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Pencil,
  Syringe,
  Calendar,
  AlertCircle,
  Activity,
  CheckCircle2,
  Layers,
} from "lucide-react";

import { useVaksinById } from "../hooks/useVaksin";
import { formatStok, isLowStock, formatMonthYear } from "../create/helpers";

import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/PageHeader";

export default function VaksinDetail() {
  const { id } = useParams(
    "/_authenticated/daftar-vaksin-dan-vitamin/$id" as any
  ) as {
    id?: string;
  };

  // Call hook unconditionally but disable it when `id` is missing
  const { data: vaksin, isLoading, error } = useVaksinById(id ?? "", !!id);

  // Format dates with time
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading state
  if (isLoading || !vaksin) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            {
              label: "Data Vaksin & Vitamin",
              href: "/daftar-vaksin-dan-vitamin",
            },
            { label: "Detail" },
          ]}
          title="Detail Data Vaksin"
        />
        <DetailCardSkeleton itemsPerSection={4} sections={2} />
      </div>
    );
  }

  const lowStock = isLowStock(vaksin.stok);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <PageHeader
        actions={
          <div className="flex items-center gap-2">
            <LinkButton
              color="default"
              href="/daftar-vaksin-dan-vitamin"
              size="md"
              startContent={<ArrowLeft className="w-4 h-4" />}
              variant="light"
            >
              Kembali
            </LinkButton>
            <LinkButton
              color="warning"
              href={`/daftar-vaksin-dan-vitamin/${id}/edit`}
              size="md"
              startContent={<Pencil className="w-4 h-4" />}
              variant="solid"
            >
              Edit
            </LinkButton>
          </div>
        }
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          {
            label: "Data Vaksin & Vitamin",
            href: "/daftar-vaksin-dan-vitamin",
          },
          { label: "Detail" },
        ]}
        description="Informasi lengkap data vaksin"
        title={`Detail Vaksin - ${vaksin.namaVaksin}`}
      />

      {/* Detail Cards */}
      <DetailCard
        sections={[
          {
            title: "Informasi Vaksin",
            description: "Data vaksin ayam broiler",
            icon: <Syringe className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "namaVaksin",
                label: "Nama Vaksin",
                value: (
                  <span className="font-semibold text-primary text-lg">
                    {vaksin.namaVaksin}
                  </span>
                ),
                fullWidth: true,
              },
              {
                key: "stok",
                label: "Stok",
                value: (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-success">
                      {formatStok(vaksin.stok)}
                    </span>
                    {lowStock && (
                      <Badge color="danger" variant="flat">
                        Stok Rendah
                      </Badge>
                    )}
                  </div>
                ),
                fullWidth: true,
              },
              {
                key: "periode",
                label: "Periode",
                value: (
                  <span className="font-semibold text-lg">
                    {formatMonthYear(vaksin.bulan, vaksin.tahun)}
                  </span>
                ),
                fullWidth: true,
              },
            ],
          },
          {
            title: "Informasi Sistem",
            description: "Data sistem dan riwayat perubahan",
            icon: <Calendar className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "id",
                label: "ID Data Vaksin",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {vaksin.id}
                  </code>
                ),
                fullWidth: true,
              },
              {
                key: "createdAt",
                label: "Dibuat Pada",
                value: formatDate(vaksin.createdAt),
              },
              {
                key: "updatedAt",
                label: "Terakhir Diupdate",
                value: formatDate(vaksin.updatedAt),
              },
            ],
          },
        ]}
      />

      {/* Alert for low stock */}
      {lowStock && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-orange-900 mb-1">
                Peringatan Stok Rendah
              </h4>
              <p className="text-sm text-orange-700">
                Stok vaksin{" "}
                <span className="font-semibold">{vaksin.namaVaksin}</span> untuk
                periode{" "}
                <span className="font-semibold">
                  {formatMonthYear(vaksin.bulan, vaksin.tahun)}
                </span>{" "}
                saat ini adalah{" "}
                <span className="font-semibold">{formatStok(vaksin.stok)}</span>
                . Segera lakukan pengisian ulang stok untuk menghindari
                kehabisan vaksin yang dapat mengganggu program vaksinasi ayam.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Analisis Status Stok Card */}
      <Card className="p-6 border-l-4 border-l-purple-500 shadow-sm bg-gradient-to-r from-white to-default-50 dark:from-default-50 dark:to-default-100">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-default-900 flex items-center gap-2">
            <Activity className="text-purple-600" size={24} />
            Analisis Status Stok
          </h3>
          <p className="text-sm text-default-600">
            Penjelasan logika sistem dalam menentukan status ketersediaan
            vaksin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logic 1: Ketersediaan Stok */}
          <div className="bg-white dark:bg-default-100 rounded-lg border border-default-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-default-800 flex items-center gap-2">
                <CheckCircle2
                  className={
                    vaksin.isStokCukup ? "text-success" : "text-danger"
                  }
                  size={18}
                />
                Kecukupan Stok
              </h4>
              {vaksin.isStokCukup ? (
                <Badge className="text-xs" color="success" variant="solid">
                  CUKUP
                </Badge>
              ) : (
                <Badge className="text-xs" color="danger" variant="solid">
                  KURANG
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              <div className="bg-default-50 p-2 rounded text-xs font-mono text-default-700">
                Logic:{" "}
                <span className="font-bold">
                  isStokCukup = {String(vaksin.isStokCukup).toUpperCase()}
                </span>
              </div>

              <p className="text-xs text-default-500">
                Sistem mendeteksi sisa stok{" "}
                <strong>{formatStok(vaksin.stok)} unit</strong>.
                {vaksin.isStokCukup
                  ? " Jumlah ini dinilai aman untuk operasional periode berjalan."
                  : " Jumlah ini berada di bawah batas aman, memicu alert 'Low Stock'."}
              </p>
            </div>
          </div>

          {/* Logic 2: Level Status */}
          <div className="bg-white dark:bg-default-100 rounded-lg border border-default-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-default-800 flex items-center gap-2">
                <Layers className="text-blue-600" size={18} />
                Level Status
              </h4>
              <Badge className="text-xs" color="primary" variant="flat">
                {vaksin.statusStok || "Level Unknown"}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="bg-default-50 p-2 rounded text-xs font-mono text-default-700">
                Status: <span className="font-bold">{vaksin.statusStok}</span>
              </div>

              <p className="text-xs text-default-500">
                Level status ditentukan berdasarkan interval jumlah stok. Level
                saat ini menunjukkan bahwa stok dalam kondisi
                {vaksin.statusStok?.includes("Level 3")
                  ? " Optimal (Aman)"
                  : vaksin.statusStok?.includes("Level 2")
                    ? " Perlu Pantauan"
                    : vaksin.statusStok?.includes("Level 1")
                      ? " Warning"
                      : " Kritis"}
                .
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
