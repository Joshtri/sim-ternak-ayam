import { useParams } from "@tanstack/react-router";
import {
  Activity,
  Bird,
  Calendar,
  Home,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { formatDateIndonesian, formatJumlahAyam } from "../create/helpers";
import { useAyam } from "../hooks/useAyams";

import { dateConverter } from "@/utils/dateConverter";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DetailCard } from "@/components/ui/DetailCard";
import { ChickenLoading } from "@/components/ui/ChickenLoading";

export default function AyamDetail() {
  const { id } = useParams({ from: "/_authenticated/daftar-ayam/$id" });
  // Call hook unconditionally but disable it when `id` is missing
  const { data: ayam, isLoading } = useAyam(id ?? "", !!id);

  // Calculate days since entry
  const daysSinceEntry = Math.floor(
    (new Date().getTime() - new Date(ayam?.tanggalMasuk ?? "").getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (isLoading || !ayam) {
    return <ChickenLoading isLoading={isLoading} />;
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}

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
                    {ayam?.kandangNama}
                  </span>
                ),
              },
              {
                key: "petugasKandangNama",
                label: "Petugas Kandang",
                value: ayam?.petugasKandangNama || "-",
              },
              {
                key: "tanggalMasuk",
                label: "Tanggal Masuk",
                value: formatDateIndonesian(ayam?.tanggalMasuk ?? ""),
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
                label: "Jumlah Awal Masuk",
                value: (
                  <span className="text-lg font-bold">
                    {formatJumlahAyam(ayam?.jumlahMasuk ?? 0)}
                  </span>
                ),
              },
              {
                key: "kandangId",
                label: "ID Kandang",
                value: (
                  <code className="text-xs bg-default-100 px-2 py-1 rounded">
                    {ayam?.kandangId}
                  </code>
                ),
                fullWidth: true,
              },
            ],
          },
          {
            title: "Statistik Ternak",
            description: "Monitoring populasi dan kesehatan ayam",
            icon: <Activity className="w-5 h-5" />,
            columns: 3,
            items: [
              {
                key: "sisaAyamHidup",
                label: "Sisa Ayam Hidup",
                value: (
                  <span className="text-lg font-bold text-success">
                    {formatJumlahAyam(ayam?.sisaAyamHidup ?? 0)}
                  </span>
                ),
              },
              {
                key: "jumlahMortalitas",
                label: "Total Mati (Mortalitas)",
                value: (
                  <span className="text-lg font-bold text-danger">
                    {formatJumlahAyam(ayam?.jumlahMortalitas ?? 0)}
                  </span>
                ),
              },
              {
                key: "jumlahSudahDipanen",
                label: "Sudah Dipanen",
                value: (
                  <span className="text-lg font-bold text-blue-600">
                    {formatJumlahAyam(ayam?.jumlahSudahDipanen ?? 0)}
                  </span>
                ),
              },
              {
                key: "persentaseSurvival",
                label: "Survival Rate",
                value: `${ayam?.persentaseSurvival?.toFixed(2)}%`,
              },
              {
                key: "persentaseMortalitas",
                label: "Mortality Rate",
                value: `${ayam?.persentaseMortalitas?.toFixed(2)}%`,
              },
              {
                key: "persentaseDipanen",
                label: "Harvested Rate",
                value: `${ayam?.persentaseDipanen?.toFixed(2)}%`,
              },
              {
                key: "statusKesehatan",
                label: "Status Kesehatan",
                value: ayam?.perluPerhatianKesehatan ? (
                  <Badge color="danger" variant="flat">
                    Perlu Perhatian
                  </Badge>
                ) : (
                  <Badge color="success" variant="flat">
                    Sehat
                  </Badge>
                ),
              },
              {
                key: "statusPanen",
                label: "Status Panen",
                value: ayam?.bisaDipanen ? (
                  <Badge color="success" variant="solid">
                    Siap Panen
                  </Badge>
                ) : (
                  <Badge color="warning" variant="flat">
                    Belum Siap
                  </Badge>
                ),
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
                    {ayam?.id}
                  </code>
                ),
                fullWidth: true,
              },
              {
                key: "createdAt",
                label: "Dibuat Pada",
                value: dateConverter.toIndonesianDateTime(
                  ayam?.createdAt ?? ""
                ),
              },
              {
                key: "updatedAt",
                label: "Terakhir Diupdate",
                value: ayam?.updatedAt ?? "",
              },
            ],
          },
        ]}
      />

      {/* Additional Info Card */}
      {/* Analisis Status Sistem Card */}
      <Card className="p-6 border-l-4 border-l-primary shadow-sm bg-gradient-to-r from-white to-default-50 dark:from-default-50 dark:to-default-100">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-default-900 flex items-center gap-2">
            <Activity className="text-primary" size={24} />
            Analisis Status Sistem
          </h3>
          <p className="text-sm text-default-600">
            Penjelasan otomatis berdasarkan data real-time untuk status
            operasional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logic 1: Bisa Dipanen */}
          <div className="bg-white dark:bg-default-100 rounded-lg border border-default-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-default-800 flex items-center gap-2">
                <CheckCircle2
                  className={
                    ayam?.bisaDipanen ? "text-success" : "text-default-400"
                  }
                  size={18}
                />
                Status Panen
              </h4>
              {ayam?.bisaDipanen ? (
                <Badge className="text-xs" color="success" variant="solid">
                  BISA DIPANEN
                </Badge>
              ) : (
                <Badge className="text-xs" color="default" variant="flat">
                  TIDAK AKTIF
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              <div className="bg-default-50 p-2 rounded text-xs font-mono text-default-700">
                Logic:{" "}
                <span className="font-bold">
                  sisaHidup ({ayam?.sisaAyamHidup}) &gt; 0
                </span>
              </div>

              <p className="text-xs text-default-500">
                Karena sisa ayam hidup saat ini adalah{" "}
                <strong>{ayam?.sisaAyamHidup} ekor</strong> (lebih dari 0), maka
                sistem mengaktifkan status "Bisa Dipanen".
              </p>

              <div className="flex items-center gap-2 text-xs text-primary bg-primary/5 p-2 rounded">
                <Home size={14} />
                <span>Stok tersedia di {ayam?.kandangNama}</span>
              </div>
            </div>
          </div>

          {/* Logic 2: Perlu Perhatian */}
          <div className="bg-white dark:bg-default-100 rounded-lg border border-default-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-default-800 flex items-center gap-2">
                <AlertTriangle
                  className={
                    ayam?.perluPerhatianKesehatan
                      ? "text-danger"
                      : "text-success"
                  }
                  size={18}
                />
                Status Kesehatan
              </h4>
              {ayam?.perluPerhatianKesehatan ? (
                <Badge className="text-xs" color="danger" variant="solid">
                  PERLU PERHATIAN
                </Badge>
              ) : (
                <Badge className="text-xs" color="success" variant="flat">
                  AMAN
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              <div className="bg-default-50 p-2 rounded text-xs font-mono text-default-700">
                Logic:{" "}
                <span className="font-bold">
                  Mortalitas ({ayam?.persentaseMortalitas}%) &gt; 10%
                </span>
              </div>

              <p className="text-xs text-default-500">
                Persentase kematian saat ini{" "}
                <strong>{ayam?.persentaseMortalitas?.toFixed(2)}%</strong>.
                {ayam?.perluPerhatianKesehatan
                  ? " Karena melebihi ambang batas 10%, sistem memberikan alert bahaya."
                  : " Karena masih di bawah ambang batas 10%, status kesehatan dianggap aman."}
              </p>

              {ayam?.perluPerhatianKesehatan ? (
                <div className="flex items-center gap-2 text-xs text-danger bg-danger/5 p-2 rounded">
                  <AlertTriangle size={14} />
                  <span>Segera periksa kondisi kandang!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-success bg-success/5 p-2 rounded">
                  <CheckCircle2 size={14} />
                  <span>Pertahankan kondisi ini.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
