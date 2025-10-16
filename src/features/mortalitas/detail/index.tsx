import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Pencil,
  Skull,
  Calendar,
  AlertTriangle,
} from "lucide-react";

import { useMortalitasById } from "../hooks/useMortalitas";
import { formatDateIndonesian, formatJumlah } from "../create/helpers";

import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/PageHeader";

export default function MortalitasDetail() {
  const { id } = useParams("/_authenticated/mortalitas/$id" as any) as {
    id?: string;
  };

  // Call hook unconditionally but disable it when `id` is missing
  const {
    data: mortalitas,
    isLoading,
    error,
  } = useMortalitasById(id ?? "", !!id);

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
  if (isLoading || !mortalitas) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Data Mortalitas", href: "/mortalitas" },
            { label: "Detail" },
          ]}
          title="Detail Data Mortalitas"
        />
        <DetailCardSkeleton itemsPerSection={4} sections={2} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <PageHeader
        actions={
          <div className="flex items-center gap-2">
            <LinkButton
              color="default"
              href="/daftar-mortalitas"
              size="md"
              startContent={<ArrowLeft className="w-4 h-4" />}
              variant="light"
            >
              Kembali
            </LinkButton>
            <LinkButton
              color="warning"
              href={`/daftar-mortalitas/${id}/edit`}
              size="md"
              startContent={<Pencil className="w-4 h-4" />}
              variant="solid"
            >
              Edit
            </LinkButton>
          </div>
        }
        description="Informasi lengkap data mortalitas ayam"
        title="Detail Data Mortalitas"
      />

      {/* Detail Cards */}
      <DetailCard
        sections={[
          {
            title: "Informasi Mortalitas",
            description: "Data kematian ayam broiler",
            icon: <Skull className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "tanggalKematian",
                label: "Tanggal Kematian",
                value: formatDateIndonesian(mortalitas.tanggalKematian),
              },
              {
                key: "jumlahKematian",
                label: "Jumlah Kematian",
                value: (
                  <span className="text-lg font-bold text-danger">
                    {formatJumlah(mortalitas.jumlahKematian)}
                  </span>
                ),
              },
              {
                key: "penyebabKematian",
                label: "Penyebab Kematian",
                value: (
                  <div className="bg-warning-50 border border-warning-200 rounded-lg p-3 mt-2">
                    <p className="text-warning-800 whitespace-pre-wrap">
                      {mortalitas.penyebabKematian}
                    </p>
                  </div>
                ),
                fullWidth: true,
              },
              {
                key: "ayamId",
                label: "ID Ayam",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {mortalitas.ayamId}
                  </code>
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
                label: "ID Data Mortalitas",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {mortalitas.id}
                  </code>
                ),
                fullWidth: true,
              },
              {
                key: "createdAt",
                label: "Dibuat Pada",
                value: formatDate(mortalitas.createdAt),
              },
              {
                key: "updatedAt",
                label: "Terakhir Diupdate",
                value: formatDate(mortalitas.updatedAt),
              },
            ],
          },
        ]}
      />

      {/* Alert Info Card */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-900 mb-1">
              Peringatan Mortalitas
            </h4>
            <p className="text-sm text-red-700">
              Data ini mencatat kematian sebanyak{" "}
              <span className="font-semibold">
                {formatJumlah(mortalitas.jumlahKematian)}
              </span>{" "}
              yang terjadi pada tanggal{" "}
              <span className="font-semibold">
                {formatDateIndonesian(mortalitas.tanggalKematian)}
              </span>
              . Penyebab:{" "}
              <span className="font-semibold">
                {mortalitas.penyebabKematian}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
