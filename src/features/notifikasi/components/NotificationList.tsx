import { Card, CardBody, Button, Chip } from "@heroui/react";
import { formatDistanceToNow } from "date-fns";
import { id as localeId } from "date-fns/locale";
import {
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Bell,
  MessageCircle,
} from "lucide-react";

import { Notification, NotificationType } from "../types";
import {
  useNotifications,
  useMarkAsRead,
  useDeleteNotification,
} from "../hooks/useNotifikasi";

interface NotificationListProps {
  compact?: boolean;
  maxItems?: number;
}

export function NotificationList({
  compact = false,
  maxItems,
}: NotificationListProps) {
  const { data: notifications, isLoading } = useNotifications();
  const markAsReadMutation = useMarkAsRead();
  const deleteMutation = useDeleteNotification();

  const handleMarkAsRead = (id: string) => {
    markAsReadMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const getTypeIcon = (type: NotificationType) => {
    const className = "h-5 w-5";

    switch (type) {
      case "info":
        return <Info className={className + " text-blue-500"} />;
      case "warning":
        return <AlertTriangle className={className + " text-yellow-500"} />;
      case "error":
        return <XCircle className={className + " text-red-500"} />;
      case "success":
        return <CheckCircle className={className + " text-green-500"} />;
      case "message":
        return <MessageCircle className={className + " text-purple-500"} />;
      default:
        return <Bell className={className + " text-gray-500"} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "danger";
      case "high":
        return "warning";
      case "medium":
        return "primary";
      default:
        return "default";
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
      </div>
    );
  }

  const displayNotifications = maxItems
    ? notifications?.slice(0, maxItems)
    : notifications;

  if (!displayNotifications || displayNotifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">Tidak ada notifikasi</div>
    );
  }

  return (
    <div className={compact ? "" : "space-y-2"}>
      {!compact && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Notifikasi</h3>
        </div>
      )}

      {displayNotifications.map((notification: Notification) => (
        <Card
          key={notification.id}
          className={`${
            !notification.is_read ? "bg-blue-50 border-l-4 border-blue-500" : ""
          } ${compact ? "shadow-none" : ""}`}
        >
          <CardBody className="p-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-1">
                {getTypeIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-sm">
                    {notification.title}
                  </h4>
                  <Chip
                    color={getPriorityColor(notification.priority)}
                    size="sm"
                    variant="flat"
                  >
                    {notification.priority}
                  </Chip>
                </div>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {notification.message}
                </p>
                {notification.sender_name && (
                  <p className="text-xs text-gray-500 mt-1">
                    Dari: {notification.sender_name}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                      locale: localeId,
                    })}
                  </span>
                  <div className="flex gap-2">
                    {!notification.is_read && (
                      <Button
                        color="primary"
                        size="sm"
                        variant="light"
                        onPress={() => handleMarkAsRead(notification.id)}
                      >
                        Tandai dibaca
                      </Button>
                    )}
                    <Button
                      color="danger"
                      size="sm"
                      variant="light"
                      onPress={() => handleDelete(notification.id)}
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}

      {compact && notifications && notifications.length > (maxItems || 0) && (
        <div className="p-2 text-center border-t">
          <Button as="a" href="/notifications" size="sm" variant="light">
            Lihat semua notifikasi
          </Button>
        </div>
      )}
    </div>
  );
}
