import { Card, CardBody, CardHeader } from "@heroui/react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useFinancialAnalysis } from "../hooks/useCharts";
import { ChartQueryParams } from "../types";

interface FinancialAnalysisChartProps {
  params?: ChartQueryParams;
}

export function FinancialAnalysisChart({
  params,
}: FinancialAnalysisChartProps) {
  const { data, isLoading, error } = useFinancialAnalysis(params);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <h3 className="text-lg font-semibold">Analisis Keuangan</h3>
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
          <h3 className="text-lg font-semibold">Analisis Keuangan</h3>
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
          <h3 className="text-lg font-semibold">Analisis Keuangan</h3>
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
        <h3 className="text-lg font-semibold">
          Analisis Keuangan (Revenue vs Cost)
        </h3>
        <p className="text-sm text-gray-500">
          {data.tanggalMulai} - {data.tanggalSelesai}
        </p>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-600">Total Revenue</p>
              <p className="text-lg font-bold text-green-600">
                Rp{" "}
                {data.summary?.totalRevenue?.toLocaleString("id-ID") ?? "-"}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-gray-600">Total Cost</p>
              <p className="text-lg font-bold text-red-600">
                Rp {data.summary?.totalCost?.toLocaleString("id-ID") ?? "-"}
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-600">Net Profit</p>
              <p
                className={`text-lg font-bold ${
                  (data.summary?.netProfit ?? 0) >= 0
                    ? "text-blue-600"
                    : "text-red-600"
                }`}
              >
                Rp {data.summary?.netProfit?.toLocaleString("id-ID") ?? "-"}
              </p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-gray-600">Profit Margin</p>
              <p
                className={`text-lg font-bold ${
                  (data.summary?.profitMargin ?? 0) >= 0
                    ? "text-purple-600"
                    : "text-red-600"
                }`}
              >
                {data.summary?.profitMargin?.toFixed(2) ?? "-"}%
              </p>
            </div>
          </div>

          {/* Cost Breakdown */}
          {data.biayaBreakdown && data.biayaBreakdown.length > 0 && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Breakdown Biaya</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {data.biayaBreakdown.map((item, idx) => (
                  <div key={idx}>
                    <p className="text-xs text-gray-600">{item.jenisBiaya}</p>
                    <p className="text-sm font-bold">
                      Rp {item.totalBiaya?.toLocaleString("id-ID") ?? "-"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.persentase?.toFixed(2) ?? "-"}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Combo Chart - Bar for Revenue/Cost, Line for Profit */}
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periode" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border rounded shadow-lg">
                          <p className="font-semibold">
                            {payload[0]?.payload?.periode}
                          </p>
                          {payload.map((entry, index) => (
                            <p
                              key={index}
                              className="text-sm"
                              style={{ color: entry.color }}
                            >
                              {entry.name}: Rp{" "}
                              {entry.value?.toLocaleString("id-ID")}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  fill="#10b981"
                  name="Revenue"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  yAxisId="left"
                  dataKey="cost"
                  fill="#ef4444"
                  name="Cost"
                  radius={[8, 8, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="profit"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Profit"
                  dot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
