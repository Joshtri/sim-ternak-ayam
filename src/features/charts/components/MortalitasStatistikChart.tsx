import { Card, CardBody, CardHeader } from "@heroui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useMortalitasStatistik } from "../hooks/useCharts";
import { ChartQueryParams } from "../types";

interface MortalitasStatistikChartProps {
  params?: ChartQueryParams;
}

export function MortalitasStatistikChart({
  params,
}: MortalitasStatistikChartProps) {
  const { data, isLoading, error } = useMortalitasStatistik(params);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <h3 className="text-lg font-semibold">Statistik Mortalitas</h3>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <h3 className="text-lg font-semibold">Statistik Mortalitas</h3>
        </CardHeader>
        <CardBody>
          <div className="text-danger">Error loading chart data</div>
        </CardBody>
      </Card>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <h3 className="text-lg font-semibold">Statistik Mortalitas</h3>
        </CardHeader>
        <CardBody>
          <div className="text-center text-gray-500 py-8">
            Tidak ada data tersedia
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-semibold">Statistik Mortalitas</h3>
        <p className="text-sm text-gray-500">{data.namaKandang}</p>
        <p className="text-sm text-gray-500 capitalize">
          Periode: {data.periode}
        </p>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-gray-600">Total Mortalitas</p>
              <p className="text-xl font-bold text-red-600">
                {data.summary?.totalMortalitas ?? "-"}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600">Total Ayam</p>
              <p className="text-xl font-bold text-blue-600">
                {data.summary?.totalAyam ?? "-"}
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-xs text-gray-600">Persentase</p>
              <p className="text-xl font-bold text-orange-600">
                {data.summary?.persentaseMortalitas?.toFixed(2) ?? "-"}%
              </p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periode" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="jumlahMati"
                  fill="#ef4444"
                  name="Jumlah Mati"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Penyebab */}
          {data.topPenyebab && data.topPenyebab.length > 0 && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-3">
                Penyebab Kematian Tertinggi
              </h4>
              <div className="space-y-2">
                {data.topPenyebab.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm">{item.penyebab}</span>
                    <div className="text-right">
                      <span className="text-sm font-semibold">
                        {item.jumlah}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({item.persentase.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
