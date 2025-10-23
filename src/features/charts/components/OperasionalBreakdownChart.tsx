import { Card, CardBody, CardHeader } from "@heroui/react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { useOperasionalBreakdown } from "../hooks/useCharts";
import { ChartQueryParams } from "../types";

interface OperasionalBreakdownChartProps {
  params?: ChartQueryParams;
}

// Colors for pie chart segments
const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#eab308", // yellow
  "#ef4444", // red
  "#a855f7", // purple
  "#ec4899", // pink
  "#6366f1", // indigo
  "#14b8a6", // teal
];

export function OperasionalBreakdownChart({
  params,
}: OperasionalBreakdownChartProps) {
  const { data, isLoading, error } = useOperasionalBreakdown(params);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <h3 className="text-lg font-semibold">Breakdown Operasional</h3>
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
          <h3 className="text-lg font-semibold">Breakdown Operasional</h3>
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
          <h3 className="text-lg font-semibold">Breakdown Operasional</h3>
        </CardHeader>
        <CardBody>
          <div className="text-center text-gray-500 py-8">
            Tidak ada data tersedia
          </div>
        </CardBody>
      </Card>
    );
  }

  // Data is already in the right format from service

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start gap-2">
        <h3 className="text-lg font-semibold">
          Breakdown Aktivitas Operasional
        </h3>
        <p className="text-sm text-gray-500">{data.namaPetugas}</p>
        <p className="text-sm text-gray-500">Periode: {data.periode}</p>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600">Total Operasional</p>
              <p className="text-xl font-bold text-blue-600">
                {data.summary?.totalOperasional ?? "-"}
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-600">Kandang Dikelola</p>
              <p className="text-xl font-bold text-green-600">
                {data.summary?.totalKandangDikelola ?? "-"}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-gray-600">Kategori Terbanyak</p>
              <p className="text-sm font-bold text-purple-600">
                {data.summary?.kategoriTerbanyak ?? "-"}
              </p>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(1)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded shadow-lg">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.jumlah} operasional
                          </p>
                          <p className="text-sm text-gray-600">
                            Persentase: {item.value.toFixed(1)}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
