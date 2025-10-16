import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Pencil,
  Syringe,
  Calendar,
  AlertCircle,
} from "lucide-react";

import { useVaksinById } from "../hooks/useVaksin";
import { formatStok, isLowStock, formatMonthYear } from "../create/helpers";

import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/PageHeader";

export default function VaksinDetail() {
  const { id } = useParams("/_authenticated/daftar-vaksin/$id" as any) as {
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
            { label: "Data Vaksin", href: "/daftar-vaksin" },
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
              href="/daftar-vaksin"
              size="md"
              startContent={<ArrowLeft className="w-4 h-4" />}
              variant="light"
            >
              Kembali
            </LinkButton>
            <LinkButton
              color="warning"
              href={`/daftar-vaksin/edit/${id}`}
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
          { label: "Data Vaksin", href: "/daftar-vaksin" },
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
                Stok vaksin <span className="font-semibold">{vaksin.namaVaksin}</span>{" "}
                untuk periode <span className="font-semibold">{formatMonthYear(vaksin.bulan, vaksin.tahun)}</span>{" "}
                saat ini adalah{" "}
                <span className="font-semibold">{formatStok(vaksin.stok)}</span>.
                Segera lakukan pengisian ulang stok untuk menghindari kehabisan
                vaksin yang dapat mengganggu program vaksinasi ayam.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
