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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useRingkasanKeuntunganTahunan } from "@/features/harga-pasar/hooks/useHargaPasarAnalysis";

export function YearlyAnalysis() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const { data: ringkasan, isLoading } =
    useRingkasanKeuntunganTahunan(selectedYear);

  const years = Array.from({ length: 5 }, (_, i) => ({
    value: currentYear - i,
    label: (currentYear - i).toString(),
  }));

  const chartData =
    ringkasan?.breakdownBulanan.map(d => ({
      ...d,
      keuntunganJuta: d.totalKeuntungan / 1000000,
    })) || [];

  return (
    <div className="space-y-6">
      <div className="flex gap-4 max-w-xs">
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
      ) : ringkasan ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-primary-50">
              <CardBody>
                <p className="text-small text-primary-600 uppercase font-bold">
                  Total Tahunan
                </p>
                <p className="text-2xl font-bold text-primary-800">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(ringkasan.totalTahunan.totalPendapatan)}
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-small text-default-500 uppercase font-bold">
                  Total Panen
                </p>
                <p className="text-2xl font-bold">
                  {ringkasan.totalTahunan.totalPanen}{" "}
                  <span className="text-sm font-normal text-default-400">
                    kali
                  </span>
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-small text-default-500 uppercase font-bold">
                  Bulan Terbaik
                </p>
                <div className="flex flex-col">
                  <span className="text-xl font-bold">
                    {ringkasan.bulanTerbaik?.namaBulan || "-"}
                  </span>
                  <span className="text-xs text-success-600 font-semibold">
                    {ringkasan.bulanTerbaik
                      ? new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        }).format(ringkasan.bulanTerbaik.totalKeuntungan)
                      : ""}
                  </span>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <p className="text-small text-default-500 uppercase font-bold">
                  Trend Tahunan
                </p>
                <p
                  className={`text-2xl font-bold ${ringkasan.trendTahunan === "Naik" ? "text-success" : ringkasan.trendTahunan === "Turun" ? "text-danger" : "text-default-600"}`}
                >
                  {ringkasan.trendTahunan}
                </p>
              </CardBody>
            </Card>
          </div>

          <Card className="min-h-[400px]">
            <CardHeader>
              <h3 className="text-lg font-bold">Trend Keuntungan Bulanan</h3>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="namaBulan" />
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
                  <Line
                    type="monotone"
                    dataKey="keuntunganJuta"
                    stroke="#006FEE"
                    strokeWidth={3}
                    name="Keuntungan (Juta Rp)"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
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
