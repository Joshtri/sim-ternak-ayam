/**
 * Kandang Detail Component
 * Displays detailed information about a kandang
 */

import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Pencil,
  Building2,
  MapPin,
  Users,
  Calendar,
  User,
  Phone,
  Mail,
  UserPlus,
  UserCheck,
} from "lucide-react";

import { useKandang } from "../hooks/useKandang";
import { useAsistensByKandang } from "@/features/kandang-asisten/hooks/useKandangAsisten";

import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";

export default function KandangDetail() {
  const { id } = useParams({ strict: false }) as { id?: string };

  // Call hook unconditionally but disable it when `id` is missing
  const { data: kandang, isLoading } = useKandang(id ?? "", !!id);

  // Fetch assistants for this kandang
  const { data: asistens, isLoading: isLoadingAsistens } = useAsistensByKandang(id ?? "", !!id);

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
  if (isLoading || !kandang) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Daftar Kandang", href: "/daftar-kandang" },
            { label: "Detail" },
          ]}
          title="Detail Kandang"
        />
        <DetailCardSkeleton itemsPerSection={3} sections={2} />
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
              href="/daftar-kandang"
              size="md"
              startContent={<ArrowLeft className="w-4 h-4" />}
              variant="light"
            >
              Kembali
            </LinkButton>
            <LinkButton
              color="warning"
              href={`/daftar-kandang/${id}/edit`}
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
          { label: "Daftar Kandang", href: "/daftar-kandang" },
          { label: "Detail" },
        ]}
        description="Informasi lengkap data kandang"
        title={`Detail Kandang - ${kandang.namaKandang}`}
      />

      {/* Detail Cards */}
      <DetailCard
        sections={[
          {
            title: "Informasi Kandang",
            description: "Data utama kandang",
            icon: <Building2 className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "namaKandang",
                label: "Nama Kandang",
                value: (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary text-lg">
                      {kandang.namaKandang}
                    </span>
                  </div>
                ),
                fullWidth: true,
              },
              {
                key: "lokasi",
                label: "Lokasi",
                value: (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-success" />
                    <Badge color="success" variant="flat" size="lg">
                      {kandang.lokasi}
                    </Badge>
                  </div>
                ),
                fullWidth: true,
              },
              {
                key: "kapasitas",
                label: "Kapasitas",
                value: (
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mt-2">
                    <div className="flex items-center gap-3">
                      <Users className="w-8 h-8 text-primary-600" />
                      <div>
                        <span className="text-3xl font-bold text-primary-700">
                          {kandang.kapasitas.toLocaleString("id-ID")}
                        </span>
                        <p className="text-xs text-primary-600 mt-1">
                          Kapasitas maksimal ayam
                        </p>
                      </div>
                    </div>
                  </div>
                ),
                fullWidth: true,
              },
            ],
          },
          {
            title: "Petugas Bertanggung Jawab",
            description: "Informasi petugas yang mengelola kandang",
            icon: <User className="w-5 h-5" />,
            columns: 1,
            items: [
              {
                key: "petugasNama",
                label: "Nama Petugas",
                value: kandang.petugasNama ? (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-warning" />
                    <span className="font-semibold text-warning">
                      {kandang.petugasNama}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-500 italic">
                    Belum ada petugas yang ditugaskan
                  </span>
                ),
                fullWidth: true,
              },
              {
                key: "petugasId",
                label: "ID Petugas",
                value: kandang.petugasId ? (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {kandang.petugasId}
                  </code>
                ) : (
                  <span className="text-gray-500 italic">-</span>
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
                label: "ID Kandang",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {kandang.id}
                  </code>
                ),
                fullWidth: true,
              },
              {
                key: "createdAt",
                label: "Dibuat Pada",
                value: formatDate(kandang.createdAt),
              },
              {
                key: "updatedAt",
                label: "Terakhir Diupdate",
                value: formatDate(kandang.updateAt),
              },
            ],
          },
        ]}
      />

      {/* Asisten Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-xl font-bold">Asisten Kandang</h3>
              <p className="text-sm text-default-500">
                Daftar asisten yang ditugaskan untuk kandang ini
              </p>
            </div>
          </div>
          <LinkButton
            color="primary"
            href="/kandang-asistens/create"
            size="sm"
            startContent={<UserPlus className="w-4 h-4" />}
            variant="flat"
          >
            Tambah Asisten
          </LinkButton>
        </div>

        {isLoadingAsistens ? (
          <div className="text-center py-8 text-default-500">
            Memuat data asisten...
          </div>
        ) : !asistens || asistens.length === 0 ? (
          <div className="text-center py-12 bg-default-50 rounded-lg border border-dashed border-default-200">
            <UserPlus className="w-12 h-12 text-default-300 mx-auto mb-3" />
            <p className="text-default-500 font-medium">
              Belum ada asisten yang ditugaskan
            </p>
            <p className="text-sm text-default-400 mt-1">
              Klik tombol "Tambah Asisten" untuk menugaskan asisten
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {asistens.map((asisten) => (
              <div
                key={asisten.id}
                className="flex items-start justify-between p-4 bg-default-50 rounded-lg border border-default-200 hover:border-primary-200 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <User className="w-5 h-5 text-primary mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-lg">
                        {asisten.asistenNama}
                      </h4>
                      <Badge
                        color={asisten.isAktif ? "success" : "default"}
                        size="sm"
                        variant="flat"
                      >
                        {asisten.isAktif ? "Aktif" : "Tidak Aktif"}
                      </Badge>
                    </div>
                    {asisten.catatan && (
                      <p className="text-sm text-default-600 mt-1">
                        {asisten.catatan}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-default-500">
                      <span>ID: {asisten.asistenId}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <LinkButton
                    color="warning"
                    href={`/kandang-asistens/${asisten.id}/edit`}
                    size="sm"
                    startContent={<Pencil className="w-3 h-3" />}
                    variant="flat"
                  >
                    Edit
                  </LinkButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Building2 className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">
              Informasi Kandang
            </h4>
            <p className="text-sm text-blue-700">
              Kandang <span className="font-semibold">{kandang.namaKandang}</span>{" "}
              berlokasi di <span className="font-semibold">{kandang.lokasi}</span>{" "}
              dengan kapasitas maksimal{" "}
              <span className="font-semibold">
                {kandang.kapasitas.toLocaleString("id-ID")} ekor
              </span>
              {kandang.petugasNama && (
                <>
                  . Kandang ini dikelola oleh petugas{" "}
                  <span className="font-semibold">{kandang.petugasNama}</span>
                </>
              )}
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
