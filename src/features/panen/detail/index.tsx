import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Pencil,
  Warehouse,
  Calendar,
  CheckCircle,
} from "lucide-react";

import { usePanenById } from "../hooks/usePanen";
import {
  formatDateIndonesian,
  formatWeight,
  calculateTotalWeight,
} from "../create/helpers";

import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/PageHeader";

export default function PanenDetail() {
  const { id } = useParams("/_authenticated/daftar-panen/$id" as any) as {
    id?: string;
  };

  // Call hook unconditionally but disable it when `id` is missing
  const { data: panen, isLoading, error } = usePanenById(id ?? "", !!id);

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
  if (isLoading || !panen) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Data Panen", href: "/daftar-panen" },
            { label: "Detail" },
          ]}
          title="Detail Data Panen"
        />
        <DetailCardSkeleton itemsPerSection={4} sections={2} />
      </div>
    );
  }

  // Calculate total harvest weight
  const totalWeight = calculateTotalWeight(
    panen.jumlahEkorPanen,
    panen.beratRataRata
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <PageHeader
        actions={
          <div className="flex items-center gap-2">
            <LinkButton
              color="default"
              href="/daftar-panen"
              size="md"
              startContent={<ArrowLeft className="w-4 h-4" />}
              variant="light"
            >
              Kembali
            </LinkButton>
            <LinkButton
              color="warning"
              href={`/daftar-panen/${id}/edit`}
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
          { label: "Data Panen", href: "/daftar-panen" },
          { label: "Detail" },
        ]}
        description="Informasi lengkap data pemanenan ayam"
        title={`Detail Panen - ${panen.namaKandang}`}
      />

      {/* Detail Cards */}
      <DetailCard
        sections={[
          {
            title: "Informasi Panen",
            description: "Data pemanenan ayam broiler",
            icon: <Warehouse className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "namaKandang",
                label: "Nama Kandang",
                value: (
                  <span className="font-semibold text-primary text-lg">
                    {panen.namaKandang}
                  </span>
                ),
                fullWidth: true,
              },
              {
                key: "tanggalPanen",
                label: "Tanggal Panen",
                value: (
                  <Badge color="primary" variant="flat" size="lg">
                    {formatDateIndonesian(panen.tanggalPanen)}
                  </Badge>
                ),
                fullWidth: true,
              },
              {
                key: "jumlahEkorPanen",
                label: "Jumlah Ekor Panen",
                value: (
                  <span className="text-2xl font-bold text-success">
                    {panen.jumlahEkorPanen.toLocaleString("id-ID")} ekor
                  </span>
                ),
              },
              {
                key: "beratRataRata",
                label: "Berat Rata-Rata",
                value: (
                  <span className="text-2xl font-bold text-primary">
                    {formatWeight(panen.beratRataRata)}
                  </span>
                ),
              },
              {
                key: "totalWeight",
                label: "Total Berat Panen",
                value: (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                    <span className="text-3xl font-bold text-green-700">
                      {formatWeight(totalWeight)}
                    </span>
                    <p className="text-xs text-green-600 mt-1">
                      Total berat hasil panen
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
                    {panen.ayamId}
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
                label: "ID Data Panen",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {panen.id}
                  </code>
                ),
                fullWidth: true,
              },
              {
                key: "createdAt",
                label: "Dibuat Pada",
                value: formatDate(panen.createdAt),
              },
              {
                key: "updatedAt",
                label: "Terakhir Diupdate",
                value: formatDate(panen.updatedAt),
              },
            ],
          },
        ]}
      />

      {/* Success Info Card */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900 mb-1">
              Panen Berhasil Dicatat
            </h4>
            <p className="text-sm text-green-700">
              Pemanenan dari kandang{" "}
              <span className="font-semibold">{panen.namaKandang}</span> pada
              tanggal{" "}
              <span className="font-semibold">
                {formatDateIndonesian(panen.tanggalPanen)}
              </span>{" "}
              menghasilkan{" "}
              <span className="font-semibold">
                {panen.jumlahEkorPanen.toLocaleString("id-ID")} ekor
              </span>{" "}
              dengan berat rata-rata{" "}
              <span className="font-semibold">
                {formatWeight(panen.beratRataRata)}
              </span>
              . Total berat panen:{" "}
              <span className="font-semibold">{formatWeight(totalWeight)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
