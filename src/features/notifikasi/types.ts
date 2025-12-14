/**
 * Sistem Notifikasi Types
 * Mengacu pada API endpoints di CLAUDE.md:
 * - GET /api/notifications
 * - POST /api/notifications
 * - PUT /api/notifications/{id}/read
 * - DELETE /api/notifications/{id}
 * - GET /api/notifications/unread-count
 * - POST /api/notifications/broadcast (role Pemilik)
 */

// ============================================
// Notification Entity
// ============================================

export interface Notification {
  id: string;
  userId: string;
  sender_id?: string;
  sender_name?: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  readAt?: string;
  linkUrl?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export type NotificationType =
  | "info"
  | "warning"
  | "error"
  | "success"
  | "reminder"
  | "system"
  | "message";

export type NotificationPriority = "low" | "medium" | "high" | "urgent";

// ============================================
// DTOs for Create/Send
// ============================================

export interface CreateNotificationDto {
  user_id?: string; // Target user (optional jika broadcast)
  title: string;
  message: string;
  type?: NotificationType;
  priority?: NotificationPriority;
  link_url?: string;
  metadata?: Record<string, any>;
}

export interface BroadcastNotificationDto {
  title: string;
  message: string;
  type?: NotificationType;
  priority?: NotificationPriority;
  linkUrl?: string;
  targetRole?: "Petugas" | "Operator" | "Pemilik" | "all";
}

// ============================================
// Query Params for Filtering
// ============================================

export interface NotificationQueryParams {
  is_read?: boolean;
  type?: NotificationType;
  priority?: NotificationPriority;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
}

// ============================================
// Unread Count Response
// ============================================

export interface UnreadCountResponse {
  count: number;
  urgent_count: number;
  high_priority_count: number;
}
