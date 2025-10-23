import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notifikasiService } from "../services/notifikasiService";
import {
  CreateNotificationDto,
  BroadcastNotificationDto,
  NotificationQueryParams,
} from "../types";
import { showToast } from "@/utils/showToast";

/**
 * Hook untuk mengambil list notifikasi
 */
export function useNotifications(params?: NotificationQueryParams) {
  return useQuery({
    queryKey: ["notifications", "list", params],
    queryFn: () => notifikasiService.getNotifications(params),
    refetchInterval: 30000, // Auto refresh every 30 seconds
  });
}

/**
 * Hook untuk mengambil jumlah notifikasi belum dibaca
 */
export function useUnreadCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: () => notifikasiService.getUnreadCount(),
    refetchInterval: 15000, // Auto refresh every 15 seconds
  });
}

/**
 * Hook untuk mengirim notifikasi
 */
export function useSendNotification() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNotificationDto) =>
      notifikasiService.sendNotification(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      showToast({
        title: "Berhasil",
        description: "Notifikasi berhasil dikirim",
        color: "success",
      });
    },
    onError: (error: any) => {
      showToast({
        title: "Gagal",
        description: error?.message || "Gagal mengirim notifikasi",
        color: "error",
      });
    },
  });
}

/**
 * Hook untuk broadcast notifikasi (Pemilik only)
 */
export function useBroadcastNotification() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: BroadcastNotificationDto) =>
      notifikasiService.broadcastNotification(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      showToast({
        title: "Berhasil",
        description: "Notifikasi broadcast berhasil dikirim",
        color: "success",
      });
    },
    onError: (error: any) => {
      showToast({
        title: "Gagal",
        description: error?.message || "Gagal mengirim broadcast",
        color: "error",
      });
    },
  });
}

/**
 * Hook untuk menandai notifikasi sebagai dibaca
 */
export function useMarkAsRead() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notifikasiService.markAsRead(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

/**
 * Hook untuk menghapus notifikasi
 */
export function useDeleteNotification() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notifikasiService.deleteNotification(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      showToast({
        title: "Berhasil",
        description: "Notifikasi berhasil dihapus",
        color: "success",
      });
    },
    onError: (error: any) => {
      showToast({
        title: "Gagal",
        description: error?.message || "Gagal menghapus notifikasi",
        color: "error",
      });
    },
  });
}
