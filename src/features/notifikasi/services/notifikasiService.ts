import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";
import {
  Notification,
  CreateNotificationDto,
  BroadcastNotificationDto,
  NotificationQueryParams,
  UnreadCountResponse,
} from "../types";

/**
 * Notifikasi Service
 * Handles all notification-related API calls
 * Endpoints sesuai CLAUDE.md
 */
export const notifikasiService = {
  /**
   * GET /api/notifications
   * Ambil daftar notifikasi user
   */
  getNotifications: async (
    params?: NotificationQueryParams
  ): Promise<Notification[]> => {
    const response = await api.get<PaginatedResponse<Notification>>(
      "/notifications",
      { params }
    );
    return response.data.data;
  },

  /**
   * POST /api/notifications
   * Kirim notifikasi
   */
  sendNotification: async (
    data: CreateNotificationDto
  ): Promise<Notification> => {
    const response = await api.post<ApiResponse<Notification>>(
      "/notifications",
      data
    );
    return response.data.data;
  },

  /**
   * PUT /api/notifications/{id}/read
   * Tandai notifikasi dibaca
   */
  markAsRead: async (id: string): Promise<Notification> => {
    const response = await api.put<ApiResponse<Notification>>(
      `/notifications/${id}/read`
    );
    return response.data.data;
  },

  /**
   * DELETE /api/notifications/{id}
   * Hapus notifikasi
   */
  deleteNotification: async (id: string): Promise<void> => {
    await api.delete(`/notifications/${id}`);
  },

  /**
   * GET /api/notifications/unread-count
   * Jumlah notifikasi belum dibaca
   */
  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    const response = await api.get<ApiResponse<UnreadCountResponse>>(
      "/notifications/unread-count"
    );
    return response.data.data;
  },

  /**
   * POST /api/notifications/broadcast
   * Broadcast ke semua user (role Pemilik)
   */
  broadcastNotification: async (
    data: BroadcastNotificationDto
  ): Promise<void> => {
    const response = await api.post<ApiResponse<void>>(
      "/notifications/broadcast",
      data
    );
    return response.data.data;
  },
};
