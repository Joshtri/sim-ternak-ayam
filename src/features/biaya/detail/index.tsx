import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Pencil,
  Wallet,
  Calendar,
  User,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

import { useBiayaById } from "../hooks/useBiaya";
import { formatCurrency, formatDateIndonesian } from "../create/helpers";

import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/PageHeader";

export default function BiayaDetail() {
  const { id } = useParams("/_authenticated/daftar-biaya/$id" as any) as {
    id?: string;
  };

  // Call hook unconditionally but disable it when `id` is missing
  const { data: biaya, isLoading } = useBiayaById(id ?? "", !!id);

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
  if (isLoading || !biaya) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Data Biaya", href: "/daftar-biaya" },
            { label: "Detail" },
          ]}
          title="Detail Data Biaya"
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
              href="/daftar-biaya"
              size="md"
              startContent={<ArrowLeft className="w-4 h-4" />}
              variant="light"
            >
              Kembali
            </LinkButton>
            <LinkButton
              color="warning"
              href={`/daftar-biaya/edit/${id}`}
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
          { label: "Data Biaya", href: "/daftar-biaya" },
          { label: "Detail" },
        ]}
        description="Informasi lengkap data pengeluaran/biaya"
        title={`Detail Biaya - ${biaya.jenisBiaya}`}
      />

      {/* Detail Cards */}
      <DetailCard
        sections={[
          {
            title: "Informasi Biaya",
            description: "Data pengeluaran/biaya peternakan",
            icon: <Wallet className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "jenisBiaya",
                label: "Jenis Biaya",
                value: (
                  <span className="font-semibold text-danger text-lg">
                    {biaya.jenisBiaya}
                  </span>
                ),
                fullWidth: true,
              },
              {
                key: "tanggal",
                label: "Tanggal Biaya",
                value: (
                  <Badge color="danger" variant="flat" size="lg">
                    {formatDateIndonesian(biaya.tanggal)}
                  </Badge>
                ),
                fullWidth: true,
              },
              {
                key: "jumlah",
                label: "Jumlah",
                value: (
                  <div className="bg-danger-50 border border-danger-200 rounded-lg p-3 mt-2">
                    <span className="text-3xl font-bold text-danger-700">
                      {formatCurrency(biaya.jumlah)}
                    </span>
                    <p className="text-xs text-danger-600 mt-1">
                      Nominal pengeluaran dalam Rupiah
                    </p>
                  </div>
                ),
                fullWidth: true,
              },
            ],
          },
          {
            title: "Informasi Petugas & Operasional",
            description: "Data petugas dan kegiatan terkait",
            icon: <User className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "petugasNama",
                label: "Petugas",
                value: (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-success" />
                    <span className="font-semibold text-success">
                      {biaya.petugasNama}
                    </span>
                  </div>
                ),
                fullWidth: true,
              },
              ...(biaya.operasionalId && biaya.operasionalJenisKegiatan
                ? [
                    {
                      key: "operasionalJenisKegiatan",
                      label: "Kegiatan Operasional",
                      value: (
                        <Badge color="primary" variant="flat">
                          {biaya.operasionalJenisKegiatan}
                        </Badge>
                      ),
                      fullWidth: true,
                    },
                  ]
                : [
                    {
                      key: "noOperasional",
                      label: "Kegiatan Operasional",
                      value: (
                        <span className="text-gray-500 italic">
                          Tidak terkait dengan kegiatan operasional
                        </span>
                      ),
                      fullWidth: true,
                    },
                  ]),
            ],
          },
          ...(biaya.buktiUrl
            ? [
                {
                  title: "Bukti Pengeluaran",
                  description: "Link bukti pengeluaran (nota/kwitansi)",
                  icon: <FileText className="w-5 h-5" />,
                  columns: 1 as const,
                  items: [
                    {
                      key: "buktiUrl",
                      label: "Bukti URL",
                      value: (
                        <div className="flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-primary" />
                          <a
                            className="text-primary hover:underline font-medium"
                            href={biaya.buktiUrl}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {biaya.buktiUrl}
                          </a>
                        </div>
                      ),
                      fullWidth: true,
                    },
                  ],
                },
              ]
            : []),
          {
            title: "Informasi Sistem",
            description: "Data sistem dan riwayat perubahan",
            icon: <Calendar className="w-5 h-5" />,
            columns: 2 as const,
            items: [
              {
                key: "id",
                label: "ID Data Biaya",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {biaya.id}
                  </code>
                ),
                fullWidth: true,
              },
              {
                key: "createdAt",
                label: "Dibuat Pada",
                value: formatDate(biaya.createdAt),
              },
              {
                key: "updatedAt",
                label: "Terakhir Diupdate",
                value: formatDate(biaya.updatedAt),
              },
            ],
          },
        ]}
      />

      {/* Success Info Card */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Wallet className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-900 mb-1">
              Biaya Tercatat
            </h4>
            <p className="text-sm text-red-700">
              Pengeluaran untuk{" "}
              <span className="font-semibold">{biaya.jenisBiaya}</span>{" "}
              sebesar{" "}
              <span className="font-semibold">
                {formatCurrency(biaya.jumlah)}
              </span>{" "}
              telah dicatat pada tanggal{" "}
              <span className="font-semibold">
                {formatDateIndonesian(biaya.tanggal)}
              </span>{" "}
              oleh petugas{" "}
              <span className="font-semibold">{biaya.petugasNama}</span>
              {biaya.operasionalJenisKegiatan && (
                <>
                  {" "}
                  dan terkait dengan kegiatan{" "}
                  <span className="font-semibold">
                    {biaya.operasionalJenisKegiatan}
                  </span>
                </>
              )}
              .
              {biaya.buktiUrl && (
                <>
                  {" "}
                  Bukti pengeluaran tersedia di:{" "}
                  <a
                    className="font-semibold underline"
                    href={biaya.buktiUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Lihat Bukti
                  </a>
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
