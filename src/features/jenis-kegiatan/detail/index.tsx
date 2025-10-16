import { useParams } from "@tanstack/react-router";
import { ArrowLeft, Pencil, ListChecks, Calendar } from "lucide-react";

import { useJenisKegiatanById } from "../hooks/useJenisKegiatan";

import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/PageHeader";

export default function JenisKegiatanDetail() {
  const { id } = useParams(
    "/_authenticated/daftar-jenis-kegiatan/$id" as any
  ) as {
    id?: string;
  };

  // Call hook unconditionally but disable it when `id` is missing
  const {
    data: jenisKegiatan,
    isLoading,
    error,
  } = useJenisKegiatanById(id ?? "", !!id);

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
  if (isLoading || !jenisKegiatan) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Jenis Kegiatan", href: "/daftar-jenis-kegiatan" },
            { label: "Detail" },
          ]}
          title="Detail Jenis Kegiatan"
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
              href="/daftar-jenis-kegiatan"
              size="md"
              startContent={<ArrowLeft className="w-4 h-4" />}
              variant="light"
            >
              Kembali
            </LinkButton>
            <LinkButton
              color="warning"
              href={`/daftar-jenis-kegiatan/${id}/edit`}
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
          { label: "Jenis Kegiatan", href: "/daftar-jenis-kegiatan" },
          { label: "Detail" },
        ]}
        description="Informasi lengkap data jenis kegiatan"
        title={`Detail Jenis Kegiatan - ${jenisKegiatan.namaKegiatan}`}
      />

      {/* Detail Cards */}
      <DetailCard
        sections={[
          {
            title: "Informasi Jenis Kegiatan",
            description: "Data master jenis kegiatan",
            icon: <ListChecks className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "namaKegiatan",
                label: "Nama Kegiatan",
                value: (
                  <span className="font-semibold text-primary text-lg">
                    {jenisKegiatan.namaKegiatan}
                  </span>
                ),
                fullWidth: true,
              },
              {
                key: "deskripsi",
                label: "Deskripsi",
                value: (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                    <p className="text-blue-800 whitespace-pre-wrap">
                      {jenisKegiatan.deskripsi}
                    </p>
                  </div>
                ),
                fullWidth: true,
              },
              // {
              //   key: "satuan",
              //   label: "Satuan",
              //   value: (
              //     <Badge color="primary" variant="flat" size="lg">
              //       {jenisKegiatan.satuan}
              //     </Badge>
              //   ),
              // },
              // {
              //   key: "biayaDefault",
              //   label: "Biaya Default",
              //   value: (
              //     <span className="text-2xl font-bold text-success">
              //       {formatCurrency(jenisKegiatan.biayaDefault)}
              //     </span>
              //   ),
              // },
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
                label: "ID Jenis Kegiatan",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {jenisKegiatan.id}
                  </code>
                ),
                fullWidth: true,
              },
              {
                key: "createdAt",
                label: "Dibuat Pada",
                value: formatDate(jenisKegiatan.createdAt),
              },
              {
                key: "updatedAt",
                label: "Terakhir Diupdate",
                value: formatDate(jenisKegiatan.updatedAt),
              },
            ],
          },
        ]}
      />

      {/* Info Card */}
    </div>
  );
}
