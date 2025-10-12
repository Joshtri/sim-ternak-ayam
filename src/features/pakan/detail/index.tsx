import { useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Pencil,
  Package,
  Calendar,
  AlertCircle,
} from "lucide-react";

import { usePakanById } from "../hooks/usePakan";
import { formatStok, isLowStock } from "../create/helpers";

import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/PageHeader";

export default function PakanDetail() {
  const { id } = useParams("/_authenticated/daftar-pakan/$id" as any) as {
    id?: string;
  };

  // Call hook unconditionally but disable it when `id` is missing
  const { data: pakan, isLoading, error } = usePakanById(id ?? "", !!id);

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
  if (isLoading || !pakan) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <PageHeader
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Data Pakan", href: "/daftar-pakan" },
            { label: "Detail" },
          ]}
          title="Detail Data Pakan"
        />
        <DetailCardSkeleton itemsPerSection={4} sections={2} />
      </div>
    );
  }

  const lowStock = isLowStock(pakan.stok);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <PageHeader
        actions={
          <div className="flex items-center gap-2">
            <LinkButton
              color="default"
              href="/daftar-pakan"
              size="md"
              startContent={<ArrowLeft className="w-4 h-4" />}
              variant="light"
            >
              Kembali
            </LinkButton>
            <LinkButton
              color="warning"
              href={`/daftar-pakan/edit/${id}`}
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
          { label: "Data Pakan", href: "/daftar-pakan" },
          { label: "Detail" },
        ]}
        description="Informasi lengkap data pakan"
        title={`Detail Pakan - ${pakan.namaPakan}`}
      />

      {/* Detail Cards */}
      <DetailCard
        sections={[
          {
            title: "Informasi Pakan",
            description: "Data pakan ayam broiler",
            icon: <Package className="w-5 h-5" />,
            columns: 2,
            items: [
              {
                key: "namaPakan",
                label: "Nama Pakan",
                value: (
                  <span className="font-semibold text-primary text-lg">
                    {pakan.namaPakan}
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
                      {formatStok(pakan.stok)}
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
                label: "ID Data Pakan",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {pakan.id}
                  </code>
                ),
                fullWidth: true,
              },
              {
                key: "createdAt",
                label: "Dibuat Pada",
                value: formatDate(pakan.createdAt),
              },
              {
                key: "updatedAt",
                label: "Terakhir Diupdate",
                value: formatDate(pakan.updatedAt),
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
                Stok pakan <span className="font-semibold">{pakan.namaPakan}</span>{" "}
                saat ini adalah{" "}
                <span className="font-semibold">{formatStok(pakan.stok)}</span>.
                Segera lakukan pengisian ulang stok untuk menghindari kehabisan
                pakan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
