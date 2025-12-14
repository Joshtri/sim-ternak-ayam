import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useLaporanKeuntunganBulanan } from "@/features/harga-pasar/hooks/useHargaPasarAnalysis";
import { formatCurrency } from "@/utils/format";

export function MonthlyAnalysis() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 1-12

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const { data: laporan, isLoading } = useLaporanKeuntunganBulanan(
    selectedYear,
    selectedMonth
  );

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString("id-ID", { month: "long" }),
  }));
  const years = Array.from({ length: 5 }, (_, i) => ({
    value: currentYear - i,
    label: (currentYear - i).toString(),
  }));

  const chartData =
    laporan?.detailHarian.map(d => ({
      ...d,
      tanggal: new Date(d.tanggal).getDate(), // Show only day for XAxis
      keuntunganJuta: d.totalKeuntungan / 1000000,
    })) || [];

  return (
    <div className="space-y-6">
      <div className="flex gap-4 max-w-lg">
        <Select
          label="Bulan"
          selectedKeys={[selectedMonth.toString()]}
          onChange={e => setSelectedMonth(Number(e.target.value))}
        >
          {months.map(m => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Tahun"
          selectedKeys={[selectedYear.toString()]}
          onChange={e => setSelectedYear(Number(e.target.value))}
        >
          {years.map(y => (
            <SelectItem key={y.value} value={y.value}>
              {y.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Spinner />
        </div>
      ) : laporan ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardBody>
                <p className="text-small text-default-500 uppercase font-bold">
                  Total Keuntungan
                </p>
                <p className="text-2xl font-bold text-success">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(laporan.total.totalPendapatan)}
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-small text-default-500 uppercase font-bold">
                  Total Panen
                </p>
                <p className="text-2xl font-bold">
                  {laporan.total.totalPanen}{" "}
                  <span className="text-sm font-normal text-default-400">
                    kali
                  </span>
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-small text-default-500 uppercase font-bold">
                  Total Ayam
                </p>
                <p className="text-2xl font-bold">
                  {laporan.total.totalAyam.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-default-400">
                    ekor
                  </span>
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-small text-default-500 uppercase font-bold">
                  Rata-rata Harga
                </p>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(laporan.rataRataHargaPerKg)}
                </p>
              </CardBody>
            </Card>
          </div>

          <Card className="min-h-[400px]">
            <CardHeader>
              <h3 className="text-lg font-bold">Grafik Keuntungan Harian</h3>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="tanggal"
                    label={{
                      value: "Tanggal",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Juta Rupiah",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(value * 1000000),
                      "Keuntungan",
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="keuntunganJuta"
                    fill="#17c964"
                    name="Keuntungan (Juta Rp)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </>
      ) : (
        <div className="p-8 text-center text-default-500">
          Tidak ada data untuk periode ini.
        </div>
      )}
    </div>
  );
}
