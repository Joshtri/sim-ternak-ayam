import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Home,
  TrendingUp,
} from "lucide-react";

import { usePetugasDashboard } from "../hooks/useDashboard";

import { Card } from "@/components/ui/Card";
import { DashboardSkeleton } from "./DashboardSkeleton";

export function PetugasDashboard() {
  const { data, isLoading, isError } = usePetugasDashboard();

  if (isLoading) {
    return <DashboardSkeleton variant="petugas" />;
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

  const completionPercentage = data.dailyTasks.completionRate || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard Petugas</h1>
        <p className="text-default-600 mt-1">
          Ringkasan kegiatan dan performa Anda
        </p>
      </div>

      {/* Daily Tasks Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-default-600">Tugas Hari Ini</p>
              <p className="text-2xl font-bold mt-1">
                {data.dailyTasks.totalTasks}
              </p>
            </div>
            <Clock className="text-primary" size={32} />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-default-600">Selesai</p>
              <p className="text-2xl font-bold mt-1 text-success">
                {data.dailyTasks.completedTasks}
              </p>
            </div>
            <CheckCircle2 className="text-success" size={32} />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-default-600">Tertunda</p>
              <p className="text-2xl font-bold mt-1 text-warning">
                {data.dailyTasks.totalTasks - data.dailyTasks.completedTasks}
              </p>
            </div>
            <AlertCircle className="text-warning" size={32} />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-default-600">Tingkat Selesai</p>
              <p className="text-2xl font-bold mt-1">
                {completionPercentage.toFixed(0)}%
              </p>
            </div>
            <TrendingUp className="text-primary" size={32} />
          </div>
          <div className="mt-2 h-2 bg-default-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </Card>
      </div>

      {/* My Kandangs */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Home className="text-primary" size={24} />
          <h2 className="text-xl font-semibold">Kandang Saya</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.myKandangs.map(kandang => (
            <Card key={kandang.id} className="p-4 border">
              <h3 className="font-semibold text-lg">{kandang.name}</h3>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-default-600">Populasi:</span>
                  <span className="font-medium">
                    {kandang.currentAyams}/{kandang.capacity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-600">Mortalitas Hari Ini:</span>
                  <span className="font-medium text-danger">
                    {kandang.mortalityToday}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-600">Status Kesehatan:</span>
                  <span
                    className={`font-medium ${
                      kandang.healthStatus === "Sehat"
                        ? "text-success"
                        : "text-warning"
                    }`}
                  >
                    {kandang.healthStatus}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Stock Alerts */}
      {(data.stockAlerts.criticalStockCount > 0 ||
        data.stockAlerts.warningStockCount > 0) && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-warning" size={24} />
            <h2 className="text-xl font-semibold">Peringatan Stok</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.stockAlerts.lowStockPakan.length > 0 && (
              <div>
                <h3 className="font-medium text-sm text-default-600 mb-2">
                  Stok Pakan Menipis
                </h3>
                <div className="space-y-2">
                  {data.stockAlerts.lowStockPakan.map(item => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-2 bg-warning-50 rounded"
                    >
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium text-warning">
                        {item.currentStock} / {item.minimumStock}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.stockAlerts.lowStockVaksin.length > 0 && (
              <div>
                <h3 className="font-medium text-sm text-default-600 mb-2">
                  Stok Vaksin Menipis
                </h3>
                <div className="space-y-2">
                  {data.stockAlerts.lowStockVaksin.map(item => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-2 bg-danger-50 rounded"
                    >
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium text-danger">
                        {item.currentStock} / {item.minimumStock}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* My Performance */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-primary" size={24} />
          <h2 className="text-xl font-semibold">Performa Saya</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {data.myPerformance.efficiencyScore.toFixed(0)}
            </p>
            <p className="text-xs text-default-600 mt-1">Skor Efisiensi</p>
          </div>
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-2xl font-bold">
              {data.myPerformance.tasksCompletedThisWeek}
            </p>
            <p className="text-xs text-default-600 mt-1">Tugas Minggu Ini</p>
          </div>
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-2xl font-bold">
              {data.myPerformance.tasksCompletedThisMonth}
            </p>
            <p className="text-xs text-default-600 mt-1">Tugas Bulan Ini</p>
          </div>
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-2xl font-bold">
              {data.myPerformance.averageMortalityRate.toFixed(2)}%
            </p>
            <p className="text-xs text-default-600 mt-1">
              Rata-rata Mortalitas
            </p>
          </div>
          <div className="text-center p-4 bg-default-50 rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {data.myPerformance.performanceLevel}
            </p>
            <p className="text-xs text-default-600 mt-1">Level Performa</p>
          </div>
        </div>
      </Card>

      {/* Upcoming Activities */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Kegiatan Mendatang</h2>
        <div className="space-y-4">
          {data.upcomingActivities.todayActivities.length > 0 && (
            <div>
              <h3 className="font-medium text-sm text-default-600 mb-2">
                Hari Ini
              </h3>
              <div className="space-y-2">
                {data.upcomingActivities.todayActivities.map(
                  (activity, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        activity.isOverdue ? "bg-danger-50" : "bg-default-50"
                      }`}
                    >
                      <div>
                        <p className="font-medium">{activity.activityType}</p>
                        <p className="text-sm text-default-600">
                          {activity.kandangName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {activity.priority}
                        </p>
                        <p className="text-xs text-default-600">
                          {new Date(activity.scheduledTime).toLocaleTimeString(
                            "id-ID",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
