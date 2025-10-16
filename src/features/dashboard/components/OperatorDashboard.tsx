import { Card } from "@/components/ui/Card";
import { useOperatorDashboard } from "../hooks/useDashboard";
import {
  AlertCircle,
  Home,
  Users,
  TrendingUp,
  DollarSign,
  Activity,
} from "lucide-react";

export function OperatorDashboard() {
  const { data, isLoading, isError } = useOperatorDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-default-600">Memuat dashboard...</p>
        </div>
      </div>
    );
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
        <h1 className="text-2xl font-bold">Dashboard Operator</h1>
        <p className="text-default-600 mt-1">
          Ringkasan sistem dan operasional
        </p>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-default-600">Total Kandang</p>
              <p className="text-2xl font-bold mt-1">
                {data.systemOverview.totalKandangs}
              </p>
            </div>
            <Home className="text-primary" size={32} />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-default-600">Total Ayam</p>
              <p className="text-2xl font-bold mt-1">
                {data.systemOverview.totalAyams.toLocaleString("id-ID")}
              </p>
            </div>
            <Activity className="text-success" size={32} />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-default-600">Total Users</p>
              <p className="text-2xl font-bold mt-1">
                {data.systemOverview.totalUsers}
              </p>
            </div>
            <Users className="text-warning" size={32} />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-default-600">Operasi Aktif</p>
              <p className="text-2xl font-bold mt-1">
                {data.systemOverview.activeOperations}
              </p>
            </div>
            <TrendingUp className="text-primary" size={32} />
          </div>
        </Card>
      </div>

      {/* Financial Summary */}
      {/* <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign size={24} className="text-primary" />
          <h2 className="text-xl font-semibold">Ringkasan Keuangan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-success-50 rounded-lg">
            <p className="text-sm text-default-600 mb-1">Total Pendapatan</p>
            <p className="text-xl font-bold text-success">
              Rp {data.financialSummary.totalRevenue.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center p-4 bg-danger-50 rounded-lg">
            <p className="text-sm text-default-600 mb-1">Total Pengeluaran</p>
            <p className="text-xl font-bold text-danger">
              Rp {data.financialSummary.totalExpenses.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-default-600 mb-1">Net Profit</p>
            <p className="text-xl font-bold text-primary">
              Rp {data.financialSummary.netProfit.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-sm text-default-600 mb-1">Profit Margin</p>
            <p className="text-xl font-bold">
              {data.financialSummary.profitMargin.toFixed(2)}%
            </p>
            <p
              className={`text-xs mt-1 ${
                data.financialSummary.monthlyChange >= 0
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {data.financialSummary.monthlyChange >= 0 ? "+" : ""}
              {data.financialSummary.monthlyChange.toFixed(2)}% bulan ini
            </p>
          </div>
        </div>
      </Card> */}

      {/* Productivity Stats */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={24} className="text-primary" />
          <h2 className="text-xl font-semibold">Statistik Produktivitas</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-2xl font-bold">
              {data.productivityStats.averagePanenWeight.toFixed(2)}
            </p>
            <p className="text-xs text-default-600 mt-1">Rata-rata Berat (kg)</p>
          </div>
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-2xl font-bold">
              {data.productivityStats.totalPanenThisMonth}
            </p>
            <p className="text-xs text-default-600 mt-1">Total Panen Bulan Ini</p>
          </div>
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-2xl font-bold">
              {data.productivityStats.averageMortalityRate.toFixed(2)}%
            </p>
            <p className="text-xs text-default-600 mt-1">Rata-rata Mortalitas</p>
          </div>
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-2xl font-bold">
              {data.productivityStats.feedConversionRatio.toFixed(2)}
            </p>
            <p className="text-xs text-default-600 mt-1">FCR</p>
          </div>
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {data.productivityStats.activeKandangs}
            </p>
            <p className="text-xs text-default-600 mt-1">Kandang Aktif</p>
          </div>
        </div>
      </Card>

      {/* Kandang Performance */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Home size={24} className="text-primary" />
          <h2 className="text-xl font-semibold">Performa Kandang</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Kandang</th>
                <th className="text-left py-3 px-2">Petugas</th>
                <th className="text-right py-3 px-2">Populasi</th>
                <th className="text-right py-3 px-2">Utilisasi</th>
                <th className="text-right py-3 px-2">Mortalitas</th>
                <th className="text-center py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.kandangPerformances.map((kandang) => (
                <tr key={kandang.kandangId} className="border-b hover:bg-default-50">
                  <td className="py-3 px-2 font-medium">{kandang.kandangName}</td>
                  <td className="py-3 px-2 text-default-600">
                    {kandang.petugasName}
                  </td>
                  <td className="py-3 px-2 text-right">
                    {kandang.currentAyams}/{kandang.capacity}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-2 bg-default-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${kandang.utilizationPercentage}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm">
                        {kandang.utilizationPercentage.toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-danger">
                      {kandang.mortalityThisMonth} ({kandang.mortalityRate.toFixed(2)}%)
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        kandang.status === "Sehat"
                          ? "bg-success-100 text-success"
                          : kandang.status === "Perhatian"
                          ? "bg-warning-100 text-warning"
                          : "bg-danger-100 text-danger"
                      }`}
                    >
                      {kandang.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* System Alerts */}
      {data.systemAlerts.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={24} className="text-warning" />
            <h2 className="text-xl font-semibold">Peringatan Sistem</h2>
          </div>
          <div className="space-y-2">
            {data.systemAlerts.map((alert, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.severity === "Critical"
                    ? "bg-danger-50 border-danger"
                    : alert.severity === "Warning"
                    ? "bg-warning-50 border-warning"
                    : "bg-default-50 border-default"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium">{alert.type}</p>
                    <p className="text-sm text-default-600 mt-1">
                      {alert.message}
                    </p>
                    {alert.relatedEntityName && (
                      <p className="text-xs text-default-500 mt-1">
                        Terkait: {alert.relatedEntityName}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-default-500 whitespace-nowrap ml-4">
                    {new Date(alert.createdAt).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
