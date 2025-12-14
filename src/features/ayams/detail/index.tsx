import { useParams } from "@tanstack/react-router";
import { ArrowLeft, Pencil, Bird, Home, Calendar } from "lucide-react";

import { useAyam } from "../hooks/useAyams";
import { formatDateIndonesian, formatJumlahAyam } from "../create/helpers";

import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/PageHeader";

export default function AyamDetail() {
  const { id } = useParams("/_authenticated/daftar-ayam/$id" as any) as {
    id?: string;
  };

  // Call hook unconditionally but disable it when `id` is missing
  const { data: ayam, isLoading, error } = useAyam(id ?? "", !!id);

  // Format dates
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
  if (isLoading || !ayam) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Daftar Ayam", href: "/daftar-ayam" },
            { label: "Detail" },
          ]}
          title="Detail Data Ayam"
        />
        <DetailCardSkeleton itemsPerSection={4} sections={2} />
      </div>
    );
  }

  // Calculate days since entry
  const daysSinceEntry = Math.floor(
    (new Date().getTime() - new Date(ayam.tanggalMasuk).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <PageHeader
        actions={
          <div className="flex items-center gap-2">
            <LinkButton
              color="default"
              href="/daftar-ayam"
              size="md"
              startContent={<ArrowLeft className="w-4 h-4" />}
              variant="light"
            >
              Kembali
            </LinkButton>
            <LinkButton
              color="warning"
              href={`/daftar-ayam/${id}/edit`}
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
          { label: "Daftar Ayam", href: "/daftar-ayam" },
          { label: "Detail" },
        ]}
        description="Informasi lengkap data ayam yang masuk"
        title={`Detail Ayam - ${ayam.kandangNama}`}
      />

      {/* Detail Cards */}
      <DetailCard
        sections={[
          {
            title: "Informasi Ayam",
            description: "Data ayam yang masuk ke kandang",
            icon: <Bird className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "kandangNama",
                label: "Nama Kandang",
                value: (
                  <span className="font-semibold text-primary">
                    {ayam.kandangNama}
                  </span>
                ),
                fullWidth: true,
              },
              {
                key: "tanggalMasuk",
                label: "Tanggal Masuk",
                value: formatDateIndonesian(ayam.tanggalMasuk),
              },
              {
                key: "daysSince",
                label: "Lama di Kandang",
                value: (
                  <Badge color="primary" variant="flat">
                    {daysSinceEntry} hari
                  </Badge>
                ),
              },
              {
                key: "jumlahMasuk",
                label: "Jumlah Ayam",
                value: (
                  <span className="text-lg font-bold text-success">
                    {formatJumlahAyam(ayam.jumlahMasuk)}
                  </span>
                ),
              },
              {
                key: "kandangId",
                label: "ID Kandang",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {ayam.kandangId}
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
                label: "ID Data Ayam",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {ayam.id}
                  </code>
                ),
                fullWidth: true,
              },
              {
                key: "createdAt",
                label: "Dibuat Pada",
                value: formatDate(ayam.createdAt),
              },
              {
                key: "updatedAt",
                label: "Terakhir Diupdate",
                value: formatDate(ayam.updatedAt),
              },
            ],
          },
        ]}
      />

      {/* Additional Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Home className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">
              Informasi Kandang
            </h4>
            <p className="text-sm text-blue-700">
              Data ayam ini berada di kandang{" "}
              <span className="font-semibold">{ayam.kandangNama}</span> dan
              telah masuk sejak{" "}
              <span className="font-semibold">
                {formatDateIndonesian(ayam.tanggalMasuk)}
              </span>{" "}
              ({daysSinceEntry} hari yang lalu).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
