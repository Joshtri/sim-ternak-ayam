import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Award,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";

import { usePemilikDashboard } from "../hooks/useDashboard";

import { DashboardSkeleton } from "./DashboardSkeleton";

import { Card } from "@/components/ui/Card";

export function PemilikDashboard() {
  const { data, isLoading, isError } = usePemilikDashboard();

  if (isLoading) {
    return <DashboardSkeleton variant="pemilik" />;
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-6 text-center">
          <AlertCircle className="mx-auto text-danger" size={48} />
          <h3 className="mt-4 text-lg font-semibold">Gagal memuat dashboard</h3>
          <p className="mt-2 text-default-600">Silakan coba lagi nanti</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard Pemilik</h1>
        <p className="text-default-600 mt-1">
          Ringkasan bisnis dan analisis strategis
        </p>
      </div>

      {/* Business KPI */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <DollarSign className="mx-auto text-success mb-2" size={24} />
            <p className="text-xl font-bold">
              Rp {(data.businessKpi.monthlyRevenue / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-default-600 mt-1">
              Pendapatan Bulan Ini
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-center">
            <TrendingUp className="mx-auto text-primary mb-2" size={24} />
            <p className="text-xl font-bold">
              Rp {(data.businessKpi.monthlyProfit / 1000000).toFixed(1)}M
            </p>
            <p className="text-xs text-default-600 mt-1">Profit Bulan Ini</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-center">
            <Target className="mx-auto text-warning mb-2" size={24} />
            <p className="text-xl font-bold">
              {data.businessKpi.returnOnInvestment.toFixed(1)}%
            </p>
            <p className="text-xs text-default-600 mt-1">ROI</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-center">
            <Award className="mx-auto text-success mb-2" size={24} />
            <p className="text-xl font-bold">
              {data.businessKpi.totalAyamStock.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-default-600 mt-1">Total Stok Ayam</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-center">
            <TrendingUp className="mx-auto text-primary mb-2" size={24} />
            <p className="text-xl font-bold">
              {data.businessKpi.averageProductivity.toFixed(1)}%
            </p>
            <p className="text-xs text-default-600 mt-1">
              Rata-rata Produktivitas
            </p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-center">
            <Award className="mx-auto text-warning mb-2" size={24} />
            <p className="text-xl font-bold">
              {data.businessKpi.customerSatisfaction.toFixed(1)}%
            </p>
            <p className="text-xs text-default-600 mt-1">Kepuasan Pelanggan</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="text-center">
            <Target className="mx-auto text-primary mb-2" size={24} />
            <p className="text-xl font-bold">
              {data.businessKpi.marketShare.toFixed(1)}%
            </p>
            <p className="text-xs text-default-600 mt-1">Pangsa Pasar</p>
          </div>
        </Card>
      </div>

      {/* Profitability */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="text-primary" size={24} />
          <h2 className="text-xl font-semibold">Analisis Profitabilitas</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-success-50 rounded-lg">
            <p className="text-sm text-default-600 mb-1">Gross Profit</p>
            <p className="text-xl font-bold text-success">
              Rp {data.profitability.grossProfit.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-default-600 mb-1">Net Profit</p>
            <p className="text-xl font-bold text-primary">
              Rp {data.profitability.netProfit.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center p-4 bg-danger-50 rounded-lg">
            <p className="text-sm text-default-600 mb-1">Biaya Operasional</p>
            <p className="text-xl font-bold text-danger">
              Rp {data.profitability.operatingExpenses.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-sm text-default-600 mb-1">Profit Margin</p>
            <p className="text-xl font-bold">
              {data.profitability.profitMargin.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-sm text-default-600 mb-1">Biaya per Kg</p>
            <p className="text-lg font-bold">
              Rp {data.profitability.costPerKg.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-sm text-default-600 mb-1">Harga per Kg</p>
            <p className="text-lg font-bold">
              Rp {data.profitability.pricePerKg.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center p-4 bg-success-50 rounded-lg">
            <p className="text-sm text-default-600 mb-1">Profit per Kg</p>
            <p className="text-lg font-bold text-success">
              Rp {data.profitability.profitPerKg.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </Card>

      {/* Comparison Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Month Comparison */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Perbandingan Bulan Lalu</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-default-600">Pendapatan</span>
              <div className="flex items-center gap-1">
                {data.comparisonAnalysis.currentVsPreviousMonth.revenueChange >=
                0 ? (
                  <TrendingUp className="text-success" size={16} />
                ) : (
                  <TrendingDown className="text-danger" size={16} />
                )}
                <span
                  className={`font-medium ${
                    data.comparisonAnalysis.currentVsPreviousMonth
                      .revenueChange >= 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {data.comparisonAnalysis.currentVsPreviousMonth.revenueChange.toFixed(
                    1
                  )}
                  %
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-default-600">Profit</span>
              <div className="flex items-center gap-1">
                {data.comparisonAnalysis.currentVsPreviousMonth.profitChange >=
                0 ? (
                  <TrendingUp className="text-success" size={16} />
                ) : (
                  <TrendingDown className="text-danger" size={16} />
                )}
                <span
                  className={`font-medium ${
                    data.comparisonAnalysis.currentVsPreviousMonth
                      .profitChange >= 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {data.comparisonAnalysis.currentVsPreviousMonth.profitChange.toFixed(
                    1
                  )}
                  %
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-default-600">Produktivitas</span>
              <div className="flex items-center gap-1">
                {data.comparisonAnalysis.currentVsPreviousMonth
                  .productivityChange >= 0 ? (
                  <TrendingUp className="text-success" size={16} />
                ) : (
                  <TrendingDown className="text-danger" size={16} />
                )}
                <span
                  className={`font-medium ${
                    data.comparisonAnalysis.currentVsPreviousMonth
                      .productivityChange >= 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {data.comparisonAnalysis.currentVsPreviousMonth.productivityChange.toFixed(
                    1
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Year Comparison */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Pertumbuhan Tahunan</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-default-600">Pendapatan</span>
              <div className="flex items-center gap-1">
                {data.comparisonAnalysis.currentVsPreviousYear.revenueGrowth >=
                0 ? (
                  <TrendingUp className="text-success" size={16} />
                ) : (
                  <TrendingDown className="text-danger" size={16} />
                )}
                <span
                  className={`font-medium ${
                    data.comparisonAnalysis.currentVsPreviousYear
                      .revenueGrowth >= 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {data.comparisonAnalysis.currentVsPreviousYear.revenueGrowth.toFixed(
                    1
                  )}
                  %
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-default-600">Profit</span>
              <div className="flex items-center gap-1">
                {data.comparisonAnalysis.currentVsPreviousYear.profitGrowth >=
                0 ? (
                  <TrendingUp className="text-success" size={16} />
                ) : (
                  <TrendingDown className="text-danger" size={16} />
                )}
                <span
                  className={`font-medium ${
                    data.comparisonAnalysis.currentVsPreviousYear
                      .profitGrowth >= 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {data.comparisonAnalysis.currentVsPreviousYear.profitGrowth.toFixed(
                    1
                  )}
                  %
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-default-600">Kapasitas</span>
              <div className="flex items-center gap-1">
                {data.comparisonAnalysis.currentVsPreviousYear.capacityGrowth >=
                0 ? (
                  <TrendingUp className="text-success" size={16} />
                ) : (
                  <TrendingDown className="text-danger" size={16} />
                )}
                <span
                  className={`font-medium ${
                    data.comparisonAnalysis.currentVsPreviousYear
                      .capacityGrowth >= 0
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {data.comparisonAnalysis.currentVsPreviousYear.capacityGrowth.toFixed(
                    1
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Industry Benchmark */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Benchmark Industri</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-default-600">Mortalitas</span>
                <span className="text-sm font-medium">
                  {data.comparisonAnalysis.industryBenchmark.yourMortalityRate.toFixed(
                    2
                  )}
                  %
                </span>
              </div>
              <div className="text-xs text-default-500">
                Industri:{" "}
                {data.comparisonAnalysis.industryBenchmark.industryAvgMortalityRate.toFixed(
                  2
                )}
                %
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-default-600">Produktivitas</span>
                <span className="text-sm font-medium">
                  {data.comparisonAnalysis.industryBenchmark.yourProductivity.toFixed(
                    1
                  )}
                  %
                </span>
              </div>
              <div className="text-xs text-default-500">
                Industri:{" "}
                {data.comparisonAnalysis.industryBenchmark.industryAvgProductivity.toFixed(
                  1
                )}
                %
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-default-600">Rating Performa</p>
              <p className="text-lg font-bold text-primary mt-1">
                {data.comparisonAnalysis.industryBenchmark.performanceRating}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Strategic Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recommendations & Opportunities */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="text-warning" size={24} />
            <h2 className="text-xl font-semibold">Rekomendasi & Peluang</h2>
          </div>
          <div className="space-y-4">
            {data.strategicInsights.recommendations.length > 0 && (
              <div>
                <h3 className="font-medium text-sm text-default-600 mb-2">
                  Rekomendasi
                </h3>
                <ul className="space-y-2">
                  {data.strategicInsights.recommendations.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.strategicInsights.opportunities.length > 0 && (
              <div>
                <h3 className="font-medium text-sm text-default-600 mb-2">
                  Peluang
                </h3>
                <ul className="space-y-2">
                  {data.strategicInsights.opportunities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-success mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>

        {/* Risks & Success Factors */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-danger" size={24} />
            <h2 className="text-xl font-semibold">Risiko & Faktor Sukses</h2>
          </div>
          <div className="space-y-4">
            {data.strategicInsights.risks.length > 0 && (
              <div>
                <h3 className="font-medium text-sm text-default-600 mb-2">
                  Risiko
                </h3>
                <ul className="space-y-2">
                  {data.strategicInsights.risks.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-danger mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.strategicInsights.keySuccessFactors.length > 0 && (
              <div>
                <h3 className="font-medium text-sm text-default-600 mb-2">
                  Faktor Kunci Sukses
                </h3>
                <ul className="space-y-2">
                  {data.strategicInsights.keySuccessFactors.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-warning mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
