/**
 * Biaya Bulanan (Monthly Costs) Page
 * Shows monthly costs recap per kandang
 */

import { useState } from "react";
import { Card, Select, SelectItem, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import { biayaService } from "../services/biayaService";

import { PageHeader } from "@/components/common";

// import PageHeader from "@/components/common/PageHeader";

export default function BiayaBulananPage() {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1
  ); // 1-12
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Fetch monthly costs data
  const { data, isLoading, error } = useQuery({
    queryKey: ["biaya", "rekap-bulanan", selectedMonth, selectedYear],
    queryFn: () => biayaService.getRekapBulanan(selectedMonth, selectedYear),
  });

  const months = [
    { value: 1, label: "Januari" },
    { value: 2, label: "Februari" },
    { value: 3, label: "Maret" },
    { value: 4, label: "April" },
    { value: 5, label: "Mei" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
    { value: 8, label: "Agustus" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
  ];

  const years = Array.from(
    { length: 10 },
    (_, i) => currentDate.getFullYear() - 5 + i
  );

  return (
    <div className="space-y-6">
      <PageHeader
        description="Lihat rekap biaya operasional per bulan dan per kandang"
        title="Rekap Biaya Bulanan"
      />

      {/* Month & Year Selector */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Bulan"
            placeholder="Pilih bulan"
            selectedKeys={[selectedMonth.toString()]}
            onChange={e => setSelectedMonth(Number(e.target.value))}
          >
            {months.map(month => (
              <SelectItem key={month.value.toString()}>
                {month.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Tahun"
            placeholder="Pilih tahun"
            selectedKeys={[selectedYear.toString()]}
            onChange={e => setSelectedYear(Number(e.target.value))}
          >
            {years.map(year => (
              <SelectItem key={year.toString()}>{year}</SelectItem>
            ))}
          </Select>
        </div>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Spinner label="Memuat data..." size="lg" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="p-6">
          <div className="text-center text-danger">
            <p className="text-lg font-semibold">Gagal memuat data</p>
            <p className="text-sm mt-2">{(error as Error).message}</p>
          </div>
        </Card>
      )}

      {/* Data Display */}
      {!isLoading && !error && data && (
        <>
          {/* Total Biaya Card */}
          <Card className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
            <div className="space-y-2">
              <p className="text-sm text-default-600">Total Biaya Bulan Ini</p>
              <p className="text-3xl font-bold text-primary">
                Rp {(data.totalBiaya || 0).toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-default-500">
                {
                  months.find(m => m.value === (data.bulan || selectedMonth))
                    ?.label
                }{" "}
                {data.tahun || selectedYear}
              </p>
            </div>
          </Card>

          {/* Per Kandang Breakdown */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rincian Per Kandang</h3>

            {!data.detailPerKandang || data.detailPerKandang.length === 0 ? (
              <Card className="p-12">
                <div className="text-center text-default-500">
                  <p className="text-lg font-semibold">Tidak ada data</p>
                  <p className="text-sm mt-2">
                    Belum ada biaya tercatat untuk bulan ini
                  </p>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.detailPerKandang.map((kandang, index) => (
                  <Card
                    key={kandang.kandangId || index}
                    className="p-6 space-y-4"
                  >
                    {/* Kandang Header */}
                    <div className="flex items-start justify-between border-b border-divider pb-3">
                      <div>
                        <h4 className="text-lg font-bold">
                          {kandang.kandangNama || "Kandang Tidak Diketahui"}
                        </h4>
                        {kandang.kandangId && (
                          <p className="text-xs text-default-500">
                            ID: {kandang.kandangId}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-default-500">Total Biaya</p>
                        <p className="text-xl font-bold text-primary">
                          Rp {(kandang.totalBiaya || 0).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>

                    {/* Detail Biaya Items */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-default-600">
                        Rincian Biaya:
                      </p>
                      {!kandang.detailBiaya ||
                      kandang.detailBiaya.length === 0 ? (
                        <p className="text-sm text-default-500">
                          Tidak ada detail biaya
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {kandang.detailBiaya.map((item, itemIndex) => (
                            <div
                              key={`${kandang.kandangId}-${itemIndex}`}
                              className="flex items-start justify-between p-3 bg-default-100 dark:bg-default-50/5 rounded-lg"
                            >
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  {item.jenisBiaya ||
                                    "Jenis biaya tidak diketahui"}
                                </p>
                                {item.keterangan && (
                                  <p className="text-xs text-default-500 mt-1">
                                    {item.keterangan}
                                  </p>
                                )}
                                {item.catatan && (
                                  <p className="text-xs text-default-400 mt-1 italic">
                                    Note: {item.catatan}
                                  </p>
                                )}
                                <p className="text-xs text-default-500 mt-1">
                                  {item.tanggal
                                    ? new Date(item.tanggal).toLocaleDateString(
                                        "id-ID",
                                        {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                        }
                                      )
                                    : "Tanggal tidak tersedia"}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-sm font-semibold text-danger">
                                  Rp{" "}
                                  {(item.jumlah || 0).toLocaleString("id-ID")}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
