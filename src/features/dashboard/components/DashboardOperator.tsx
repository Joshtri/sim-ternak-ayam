import type { Notification } from "@/features/notifikasi/types";

import { Button } from "@heroui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bell,
  Check,
  CheckCircle,
  Clock,
  ExternalLink,
  Home,
  Info,
  MessageSquare,
  Trash2,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import { useOperatorDashboard } from "../hooks/useDashboard";

import { DashboardSkeleton } from "./DashboardSkeleton";

import { Card } from "@/components/ui/Card";
import {
  useDeleteNotification,
  useMarkAsRead,
  useNotifications,
} from "@/features/notifikasi/hooks/useNotifikasi";

export function DashboardOperator() {
  const { data, isLoading, isError } = useOperatorDashboard();

  // Fetch notifications for dashboard (limit 10, unread only)
  const { data: notifications = [] } = useNotifications({
    is_read: false,
    limit: 10,
  });

  const markAsReadMutation = useMarkAsRead();
  const deleteNotificationMutation = useDeleteNotification();

  const handleMarkAsRead = async (id: string) => {
    await markAsReadMutation.mutateAsync(id);
  };

  const handleDelete = async (id: string) => {
    await deleteNotificationMutation.mutateAsync(id);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="text-warning" size={20} />;
      case "error":
        return <XCircle className="text-danger" size={20} />;
      case "success":
        return <CheckCircle className="text-success" size={20} />;
      case "reminder":
        return <Clock className="text-primary" size={20} />;
      case "message":
        return <MessageSquare className="text-primary" size={20} />;
      default:
        return <Info className="text-default-500" size={20} />;
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;

    return `${diffDays} hari yang lalu`;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-danger text-white">
            URGENT
          </span>
        );
      case "high":
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-warning text-white">
            HIGH
          </span>
        );
      case "medium":
        return (
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 text-primary">
            MEDIUM
          </span>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <DashboardSkeleton variant="operator" />;
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Productivity Stats */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-primary" size={24} />
              <h2 className="text-xl font-semibold">Statistik Produktivitas</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-default-50 rounded-lg">
                <p className="text-2xl font-bold">
                  {data.productivityStats.averagePanenWeight.toFixed(2)}
                </p>
                <p className="text-xs text-default-600 mt-1">
                  Rata-rata Berat (kg)
                </p>
              </div>
              <div className="text-center p-4 bg-default-50 rounded-lg">
                <p className="text-2xl font-bold">
                  {data.productivityStats.totalPanenThisMonth}
                </p>
                <p className="text-xs text-default-600 mt-1">
                  Total Panen Bulan Ini
                </p>
              </div>
              <div className="text-center p-4 bg-default-50 rounded-lg">
                <p className="text-2xl font-bold">
                  {data.productivityStats.averageMortalityRate.toFixed(2)}%
                </p>
                <p className="text-xs text-default-600 mt-1">
                  Rata-rata Mortalitas
                </p>
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
              <Home className="text-primary" size={24} />
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
                  {data.kandangPerformances.map(kandang => (
                    <tr
                      key={kandang.kandangId}
                      className="border-b hover:bg-default-50"
                    >
                      <td className="py-3 px-2 font-medium">
                        {kandang.kandangName}
                      </td>
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
                          {kandang.mortalityThisMonth} (
                          {kandang.mortalityRate.toFixed(2)}%)
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
                <AlertCircle className="text-warning" size={24} />
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

          {/* Tools / Widgets */}
          {/* <ProfitCalculator /> */}
        </div>

        {/* Right Column - 1/3 width - NOTIFICATIONS */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="text-primary" size={24} />
                <h2 className="text-xl font-semibold">Notifikasi</h2>
              </div>
              {notifications.length > 0 && (
                <span className="px-2 py-1 bg-danger text-white text-xs rounded-full font-semibold">
                  {notifications.length}
                </span>
              )}
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="mx-auto text-default-300 mb-2" size={48} />
                  <p className="text-default-500 text-sm">
                    Tidak ada notifikasi baru
                  </p>
                </div>
              ) : (
                notifications.map((notif: Notification) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg border ${
                      notif.priority === "urgent" || notif.priority === "high"
                        ? "bg-danger-50 border-danger-200"
                        : "bg-default-50 border-default-200"
                    } hover:shadow-md transition-shadow`}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-2 mb-2">
                      <div className="mt-0.5">
                        {getNotificationIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold truncate">
                            {notif.title}
                          </h3>
                          {getPriorityBadge(notif.priority)}
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <p className="text-xs text-default-600 mb-2 line-clamp-3 pl-7">
                      {notif.message}
                    </p>

                    {/* Sender & Time */}
                    <div className="flex items-center justify-between text-xs text-default-500 mb-2 pl-7">
                      {notif.sender_name && (
                        <span className="truncate">
                          Dari: {notif.sender_name}
                        </span>
                      )}
                      <span className="whitespace-nowrap">
                        {getTimeAgo(notif.createdAt)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 pl-7">
                      {notif.linkUrl && (
                        <Button
                          as={Link}
                          className="h-7 text-xs"
                          color="primary"
                          size="sm"
                          startContent={<ExternalLink size={12} />}
                          to={notif.linkUrl}
                          variant="flat"
                        >
                          Lihat
                        </Button>
                      )}
                      <Button
                        className="h-7 text-xs"
                        color="success"
                        isDisabled={markAsReadMutation.isPending}
                        size="sm"
                        startContent={<Check size={12} />}
                        variant="flat"
                        onPress={() => handleMarkAsRead(notif.id)}
                      >
                        Tandai Dibaca
                      </Button>
                      <Button
                        isIconOnly
                        className="h-7 w-7 min-w-7"
                        color="danger"
                        isDisabled={deleteNotificationMutation.isPending}
                        size="sm"
                        variant="flat"
                        onPress={() => handleDelete(notif.id)}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* View All Link */}
            {notifications.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <Link
                  className="text-sm text-primary hover:underline font-medium flex items-center justify-center gap-1"
                  to='/notifikasi'
                >
                  Lihat Semua Notifikasi
                  <ExternalLink size={14} />
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
