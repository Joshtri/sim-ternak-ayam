import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Pencil,
  Activity,
  Calendar,
  CheckCircle,
  User,
  Warehouse,
} from "lucide-react";

import { useOperasionalById } from "../hooks/useOperasional";
import {
  formatDateIndonesian,
  formatQuantityWithUnit,
} from "../create/helpers";

import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/PageHeader";

export default function OperasionalDetail() {
  const { id } = useParams("/_authenticated/daftar-operasional/$id" as any) as {
    id?: string;
  };

  // Call hook unconditionally but disable it when `id` is missing
  const {
    data: operasional,
    isLoading,
    error,
  } = useOperasionalById(id ?? "", !!id);

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
  if (isLoading || !operasional) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Data Operasional", href: "/daftar-operasional" },
            { label: "Detail" },
          ]}
          title="Detail Data Operasional"
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
              href="/daftar-operasional"
              size="md"
              startContent={<ArrowLeft className="w-4 h-4" />}
              variant="light"
            >
              Kembali
            </LinkButton>
            <LinkButton
              color="warning"
              href={`/daftar-operasional/edit/${id}`}
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
          { label: "Data Operasional", href: "/daftar-operasional" },
          { label: "Detail" },
        ]}
        description="Informasi lengkap data kegiatan operasional"
        title={`Detail Operasional - ${operasional.jenisKegiatanNama}`}
      />

      {/* Detail Cards */}
      <DetailCard
        sections={[
          {
            title: "Informasi Kegiatan",
            description: "Data kegiatan operasional harian",
            icon: <Activity className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "jenisKegiatanNama",
                label: "Jenis Kegiatan",
                value: (
                  <span className="font-semibold text-primary text-lg">
                    {operasional.jenisKegiatanNama}
                  </span>
                ),
                fullWidth: true,
              },
              {
                key: "tanggal",
                label: "Tanggal Kegiatan",
                value: (
                  <Badge color="primary" variant="flat" size="lg">
                    {formatDateIndonesian(operasional.tanggal)}
                  </Badge>
                ),
                fullWidth: true,
              },
              {
                key: "jumlah",
                label: "Jumlah",
                value: (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mt-2">
                    <span className="text-3xl font-bold text-primary-700">
                      {operasional.jumlah.toLocaleString("id-ID")}
                    </span>
                    <p className="text-xs text-primary-600 mt-1">
                      Quantity kegiatan yang dilakukan
                    </p>
                  </div>
                ),
                fullWidth: true,
              },
            ],
          },
          {
            title: "Informasi Lokasi & Petugas",
            description: "Data kandang dan petugas yang bertanggung jawab",
            icon: <Warehouse className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "kandangNama",
                label: "Kandang",
                value: (
                  <div className="flex items-center gap-2">
                    <Warehouse className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary">
                      {operasional.kandangNama}
                    </span>
                  </div>
                ),
                fullWidth: true,
              },
              {
                key: "petugasNama",
                label: "Petugas",
                value: (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-success" />
                    <span className="font-semibold text-success">
                      {operasional.petugasNama}
                    </span>
                  </div>
                ),
                fullWidth: true,
              },
            ],
          },
          {
            title: "Informasi Tambahan",
            description: "Data pakan dan vaksin (jika ada)",
            icon: <CheckCircle className="w-5 h-5" />,
            columns: 2,
            items: [
              ...(operasional.pakanNama
                ? [
                    {
                      key: "pakanNama",
                      label: "Pakan",
                      value: (
                        <Badge color="warning" variant="flat">
                          {operasional.pakanNama}
                        </Badge>
                      ),
                      fullWidth: true,
                    },
                  ]
                : []),
              ...(operasional.vaksinNama
                ? [
                    {
                      key: "vaksinNama",
                      label: "Vaksin",
                      value: (
                        <Badge color="success" variant="flat">
                          {operasional.vaksinNama}
                        </Badge>
                      ),
                      fullWidth: true,
                    },
                  ]
                : []),
              ...(!operasional.pakanNama && !operasional.vaksinNama
                ? [
                    {
                      key: "noAdditional",
                      label: "Catatan",
                      value: (
                        <span className="text-gray-500 italic">
                          Tidak ada data pakan atau vaksin untuk kegiatan ini
                        </span>
                      ),
                      fullWidth: true,
                    },
                  ]
                : []),
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
                label: "ID Data Operasional",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {operasional.id}
                  </code>
                ),
                fullWidth: true,
              },
              {
                key: "createdAt",
                label: "Dibuat Pada",
                value: formatDate(operasional.createdAt),
              },
              {
                key: "updatedAt",
                label: "Terakhir Diupdate",
                value: formatDate(operasional.updatedAt),
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
              Kegiatan Operasional Tercatat
            </h4>
            <p className="text-sm text-green-700">
              Kegiatan{" "}
              <span className="font-semibold">
                {operasional.jenisKegiatanNama}
              </span>{" "}
              dilakukan pada tanggal{" "}
              <span className="font-semibold">
                {formatDateIndonesian(operasional.tanggal)}
              </span>{" "}
              di kandang{" "}
              <span className="font-semibold">{operasional.kandangNama}</span>{" "}
              oleh petugas{" "}
              <span className="font-semibold">{operasional.petugasNama}</span>{" "}
              dengan jumlah{" "}
              <span className="font-semibold">
                {operasional.jumlah.toLocaleString("id-ID")}
              </span>
              .
              {operasional.pakanNama && (
                <>
                  {" "}
                  Pakan yang digunakan:{" "}
                  <span className="font-semibold">{operasional.pakanNama}</span>.
                </>
              )}
              {operasional.vaksinNama && (
                <>
                  {" "}
                  Vaksin yang digunakan:{" "}
                  <span className="font-semibold">{operasional.vaksinNama}</span>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
