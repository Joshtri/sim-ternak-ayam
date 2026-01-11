/**
 * Kandang Detail Component
 * Displays detailed information about a kandang
 */

import { useParams } from "@tanstack/react-router";
import {
  Building2,
  MapPin,
  User,
  UserPlus,
  UserCheck,
  TrendingUp,
  Skull,
  Activity,
  Package,
} from "lucide-react";
import {
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card as NextCard,
  CardBody,
} from "@heroui/react";

import { useKandang } from "../hooks/useKandang";

import { useAsistensByKandang } from "@/features/kandang-asisten/hooks/useKandangAsisten";
import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { PageHeader } from "@/components/common/PageHeader";
import { Card } from "@/components/ui/Card";

export default function KandangDetail() {
  const { id } = useParams({ strict: false }) as { id?: string };

  const { data: kandang, isLoading } = useKandang(id ?? "", !!id);
  const { data: asistens, isLoading: isLoadingAsistens } = useAsistensByKandang(
    id ?? "",
    !!id
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <NextCard className="bg-primary-50 border border-primary-100">
          <CardBody className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 bg-primary-100 rounded-lg text-primary-600">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-primary-600 font-medium">
                Total Masuk
              </p>
              <h4 className="text-2xl font-bold text-primary-800">
                {kandang.totalAyamMasuk?.toLocaleString("id-ID") ?? 0}
              </h4>
            </div>
          </CardBody>
        </NextCard>

        <NextCard className="bg-success-50 border border-success-100">
          <CardBody className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 bg-success-100 rounded-lg text-success-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-success-600 font-medium">
                Total Panen
              </p>
              <h4 className="text-2xl font-bold text-success-800">
                {kandang.totalPanen?.toLocaleString("id-ID") ?? 0}
              </h4>
            </div>
          </CardBody>
        </NextCard>

        <NextCard className="bg-danger-50 border border-danger-100">
          <CardBody className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 bg-danger-100 rounded-lg text-danger-600">
              <Skull size={24} />
            </div>
            <div>
              <p className="text-sm text-danger-600 font-medium">
                Total Mortalitas
              </p>
              <h4 className="text-2xl font-bold text-danger-800">
                {kandang.totalMortalitas?.toLocaleString("id-ID") ?? 0}
              </h4>
            </div>
          </CardBody>
        </NextCard>

        <NextCard className="bg-warning-50 border border-warning-100">
          <CardBody className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 bg-warning-100 rounded-lg text-warning-600">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm text-warning-600 font-medium">
                Total Operasional
              </p>
              <h4 className="text-2xl font-bold text-warning-800">
                {kandang.totalOperasional?.toLocaleString("id-ID") ?? 0}
              </h4>
            </div>
          </CardBody>
        </NextCard>
      </div>

      <div className="space-y-4">
        <Tabs aria-label="Kandang Details">
          <Tab key="info" title="Informasi Umum">
            <div className="space-y-6 pt-4">
              <DetailCard
                sections={[
                  {
                    title: "Informasi Utama",
                    description: "Status dan kapasitas kandang",
                    icon: <Building2 className="w-5 h-5" />,
                    columns: 2,
                    items: [
                      {
                        key: "namaKandang",
                        label: "Nama Kandang",
                        value: (
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-lg">
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
                            <span>{kandang.lokasi}</span>
                          </div>
                        ),
                      },
                      {
                        key: "status",
                        label: "Status Kapasitas",
                        value: (
                          <Badge
                            color={
                              kandang.isKandangPenuh ? "danger" : "success"
                            }
                          >
                            {kandang.statusKapasitas ?? "Tersedia"}
                          </Badge>
                        ),
                      },
                      {
                        key: "occupancy",
                        label: "Okupansi",
                        value: (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>
                                {kandang.jumlahAyamTerisi?.toLocaleString(
                                  "id-ID"
                                )}{" "}
                                / {kandang.kapasitas.toLocaleString("id-ID")}
                              </span>
                              <span className="font-semibold">
                                {kandang.persentaseTerisi}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className={`h-2.5 rounded-full ${
                                  (kandang.persentaseTerisi ?? 0) > 90
                                    ? "bg-red-600"
                                    : "bg-blue-600"
                                }`}
                                style={{
                                  width: `${Math.min(
                                    kandang.persentaseTerisi ?? 0,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        ),
                        fullWidth: true,
                      },
                    ],
                  },
                  {
                    title: "Petugas",
                    description: "Penanggung jawab kandang",
                    icon: <User className="w-5 h-5" />,
                    columns: 1,
                    items: [
                      {
                        key: "petugas",
                        label: "Nama Petugas",
                        value: kandang.petugasNama ?? "Belum ada petugas",
                      },
                    ],
                  },
                ]}
              />

              {/* Asisten List */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold">Asisten Kandang</h3>
                      <p className="text-sm text-default-500">
                        Daftar asisten yang ditugaskan
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
                    Tambah
                  </LinkButton>
                </div>
                {isLoadingAsistens ? (
                  <p>Loading...</p>
                ) : (
                  <div className="space-y-2">
                    {asistens?.map(asisten => (
                      <div
                        key={asisten.id}
                        className="flex justify-between items-center bg-default-50 p-3 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-default-500" />
                          <div>
                            <p className="font-medium text-default-700">
                              {asisten.asistenNama}
                            </p>
                            <Badge
                              color={asisten.isAktif ? "success" : "default"}
                              size="sm"
                            >
                              {asisten.isAktif ? "Aktif" : "Non-Aktif"}
                            </Badge>
                          </div>
                        </div>
                        <LinkButton
                          href={`/kandang-asistens/${asisten.id}/edit`}
                          size="sm"
                          variant="light"
                        >
                          Edit
                        </LinkButton>
                      </div>
                    ))}
                    {!asistens?.length && (
                      <p className="text-default-400 italic text-center py-4">
                        Tidak ada asisten
                      </p>
                    )}
                  </div>
                )}
              </Card>
            </div>
          </Tab>

          <Tab key="masuk" title="Riwayat Masuk">
            <NextCard className="mt-4">
              <CardBody>
                <Table aria-label="Tabel Riwayat Masuk">
                  <TableHeader>
                    <TableColumn>Tanggal Masuk</TableColumn>
                    <TableColumn>Jumlah Masuk</TableColumn>
                    <TableColumn>Sisa Hidup</TableColumn>
                  </TableHeader>
                  <TableBody items={kandang.historyAyamMasuk ?? []}>
                    {item => (
                      <TableRow key={item.id}>
                        <TableCell>{formatDate(item.tanggalMasuk)}</TableCell>
                        <TableCell>
                          {item.jumlahMasuk.toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell>
                          <Badge
                            color={item.sisaHidup > 0 ? "success" : "default"}
                          >
                            {item.sisaHidup.toLocaleString("id-ID")}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardBody>
            </NextCard>
          </Tab>

          <Tab key="panen" title="Riwayat Panen">
            <NextCard className="mt-4">
              <CardBody>
                <Table aria-label="Tabel Riwayat Panen">
                  <TableHeader>
                    <TableColumn>Tanggal Panen</TableColumn>
                    <TableColumn>Batch</TableColumn>
                    <TableColumn>Jumlah (Ekor)</TableColumn>
                    <TableColumn>Berat Rata-rata</TableColumn>
                    <TableColumn>Total Berat</TableColumn>
                  </TableHeader>
                  <TableBody items={kandang.historyPanen ?? []}>
                    {item => (
                      <TableRow key={item.id}>
                        <TableCell>{formatDate(item.tanggalPanen)}</TableCell>
                        <TableCell>{item.namaAyamBatch}</TableCell>
                        <TableCell>
                          {item.jumlahEkorPanen.toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell>{item.beratRataRata} kg</TableCell>
                        <TableCell>{item.totalBerat} kg</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardBody>
            </NextCard>
          </Tab>

          <Tab key="mortalitas" title="Riwayat Mortalitas">
            <NextCard className="mt-4">
              <CardBody>
                <Table aria-label="Tabel Riwayat Mortalitas">
                  <TableHeader>
                    <TableColumn>Tanggal</TableColumn>
                    <TableColumn>Batch</TableColumn>
                    <TableColumn>Jumlah</TableColumn>
                    <TableColumn>Penyebab</TableColumn>
                  </TableHeader>
                  <TableBody items={kandang.historyMortalitas ?? []}>
                    {item => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {formatDate(item.tanggalKematian)}
                        </TableCell>
                        <TableCell>{item.namaAyamBatch}</TableCell>
                        <TableCell className="text-danger font-medium">
                          {item.jumlahKematian}
                        </TableCell>
                        <TableCell>{item.penyebabKematian}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardBody>
            </NextCard>
          </Tab>

          <Tab key="operasional" title="Riwayat Operasional">
            <NextCard className="mt-4">
              <CardBody>
                <Table aria-label="Tabel Riwayat Operasional">
                  <TableHeader>
                    <TableColumn>Tanggal</TableColumn>
                    <TableColumn>Kegiatan</TableColumn>
                    <TableColumn>Item</TableColumn>
                    <TableColumn>Jumlah</TableColumn>
                    <TableColumn>Petugas</TableColumn>
                  </TableHeader>
                  <TableBody items={kandang.historyOperasional ?? []}>
                    {item => (
                      <TableRow key={item.id}>
                        <TableCell>{formatDateTime(item.tanggal)}</TableCell>
                        <TableCell>{item.jenisKegiatan}</TableCell>
                        <TableCell>{item.itemNama ?? "-"}</TableCell>
                        <TableCell>
                          {item.jumlah} {item.satuan}
                        </TableCell>
                        <TableCell>{item.petugasNama}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardBody>
            </NextCard>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
