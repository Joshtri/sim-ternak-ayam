import type { Notification } from "@/features/notifikasi/types";

import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Bell, Trash2, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

import {
  useNotifications,
  useUnreadCount,
  useMarkAsRead,
  useDeleteNotification,
} from "@/features/notifikasi/hooks/useNotifikasi";

/**
 * NotificationDropdown Component
 * Realtime notification dropdown dengan auto-refresh
 * - Petugas: Hanya menerima notifikasi yang ditujukan untuk dirinya
 * - Operator/Pemilik: Bisa melihat semua notifikasi
 */
export function NotificationDropdown() {
  // Fetch unread count (auto-refresh setiap 15 detik)
  const { data: unreadData } = useUnreadCount();

  // Fetch latest notifications (auto-refresh setiap 30 detik)
  const { data: notifications = [], isLoading } = useNotifications({
    is_read: false, // Hanya ambil yang belum dibaca
    limit: 5, // Limit 5 notifikasi terbaru
  });

  const markAsReadMutation = useMarkAsRead();
  const deleteNotificationMutation = useDeleteNotification();

  const unreadCount = unreadData?.count || 0;
  const hasUrgent = (unreadData?.urgent_count || 0) > 0;

  const handleMarkAsRead = async (id: string) => {
    await markAsReadMutation.mutateAsync(id);
  };

  const handleDelete = async (id: string) => {
    await deleteNotificationMutation.mutateAsync(id);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "success":
        return "✅";
      case "reminder":
        return "⏰";
      case "message":
        return "💬";
      default:
        return "ℹ️";
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

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly variant="light">
          <div className="relative">
            <Bell className={hasUrgent ? "animate-pulse" : ""} size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-danger text-white text-xs rounded-full flex items-center justify-center px-1">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Notifications"
        className="w-80 max-h-96 overflow-y-auto"
        emptyContent={
          <div className="py-4 text-center text-default-500">
            {isLoading ? "Memuat notifikasi..." : "Tidak ada notifikasi baru"}
          </div>
        }
      >
        {/* Header */}
        <DropdownItem key="header" isReadOnly className="pb-2 border-b">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Notifikasi</span>
            {unreadCount > 0 && (
              <Link
                className="text-xs text-primary hover:underline"
                to="/notifikasi"
              >
                Lihat semua ({unreadCount})
              </Link>
            )}
          </div>
        </DropdownItem>

        {/* Notification Items */}
        {notifications.map((notif: Notification) => (
          <DropdownItem
            key={notif.id}
            className={`py-3 ${
              notif.priority === "urgent" || notif.priority === "high"
                ? "bg-danger-50/50"
                : ""
            }`}
            textValue={notif.title}
          >
            <div className="flex gap-3">
              {/* Icon */}
              <div className="text-xl pt-1">
                {getNotificationIcon(notif.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold truncate">
                    {notif.title}
                  </p>
                  {notif.priority === "urgent" && (
                    <span className="text-xs bg-danger text-white px-2 py-0.5 rounded-full shrink-0">
                      Urgent
                    </span>
                  )}
                </div>

                <p className="text-xs text-default-600 mt-1 line-clamp-2">
                  {notif.message}
                </p>

                {notif.sender_name && (
                  <p className="text-xs text-default-400 mt-1">
                    Dari: {notif.sender_name}
                  </p>
                )}

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-default-400">
                    {getTimeAgo(notif.createdAt)}
                  </span>

                  {/* Actions */}
                  <div className="flex gap-1">
                    <Button
                      isIconOnly
                      className="h-6 w-6 min-w-6"
                      isDisabled={markAsReadMutation.isPending}
                      size="sm"
                      variant="light"
                      onPress={() => handleMarkAsRead(notif.id)}
                    >
                      <Check className="text-success" size={14} />
                    </Button>
                    <Button
                      isIconOnly
                      className="h-6 w-6 min-w-6"
                      isDisabled={deleteNotificationMutation.isPending}
                      size="sm"
                      variant="light"
                      onPress={() => handleDelete(notif.id)}
                    >
                      <Trash2 className="text-danger" size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DropdownItem>
        ))}

        {/* Footer - View All */}
        {notifications.length > 0 && (
          <DropdownItem key="footer" isReadOnly className="pt-2 border-t">
            <Link
              className="text-sm text-primary hover:underline text-center block"
              to="/notifikasi"
            >
              Lihat Semua Notifikasi
            </Link>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
