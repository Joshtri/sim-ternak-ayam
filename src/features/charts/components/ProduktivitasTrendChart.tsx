import { Card, CardBody, CardHeader } from "@heroui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useProduktivitasTrend } from "../hooks/useCharts";
import { ChartQueryParams } from "../types";

interface ProduktivitasTrendChartProps {
  params?: ChartQueryParams;
}

export function ProduktivitasTrendChart({
  params,
}: ProduktivitasTrendChartProps) {
  const { data, isLoading, error } = useProduktivitasTrend(params);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <h3 className="text-lg font-semibold">Trend Produktivitas</h3>
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
          <h3 className="text-lg font-semibold">Trend Produktivitas</h3>
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
          <h3 className="text-lg font-semibold">Trend Produktivitas</h3>
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
        <h3 className="text-lg font-semibold">Trend Produktivitas</h3>
        <p className="text-sm text-gray-500">Periode: {data.periode}</p>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600">Total Kandang Aktif</p>
              <p className="text-xl font-bold text-blue-600">
                {data.summary?.totalKandangAktif ?? "-"}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-600">Total Operasional</p>
              <p className="text-xl font-bold text-green-600">
                {data.summary?.totalOperasionalDilakukan ?? "-"}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-gray-600">Rata Produktivitas</p>
              <p className="text-xl font-bold text-purple-600">
                {data.summary?.rataProduktivitas ?? "-"}
              </p>
            </div>
          </div>

          {/* Line Chart */}
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periode" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="jumlahOperasional"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Jumlah Operasional"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
