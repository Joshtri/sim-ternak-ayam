// Custom React Query hooks for ayam management
import type { CreateAyamDto, UpdateAyamDto, AyamFilters } from "../interface";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ayamService } from "../services/ayamService";

import { getErrorMessage } from "@/lib/axios";
import { showToast } from "@/utils/showToast";

// Query keys
export const ayamKeys = {
  all: ["ayam"] as const,
  lists: () => [...ayamKeys.all, "list"] as const,
  list: (filters?: AyamFilters) => [...ayamKeys.lists(), filters] as const,
  details: () => [...ayamKeys.all, "detail"] as const,
  detail: (id: string) => [...ayamKeys.details(), id] as const,
};

/**
 * Hook to fetch all ayams with filters
 */
export function useAyams(filters?: AyamFilters) {
  return useQuery({
    queryKey: ayamKeys.list(filters),
    queryFn: () => ayamService.getAyams(filters),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

/**
 * Hook to fetch a single ayam
 */
export function useAyam(id: string, enabled = true) {
  return useQuery({
    queryKey: ayamKeys.detail(id),
    queryFn: () => ayamService.getAyam(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to create a new ayam
 */
export function useCreateAyam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAyamDto) => ayamService.createAyam(data),
    onSuccess: () => {
      // Invalidate all ayam lists
      queryClient.invalidateQueries({ queryKey: ayamKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data ayam berhasil dibuat",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to create ayam:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Membuat Data Ayam",
        description: errorMessage || "Terjadi kesalahan saat membuat data ayam",
        color: "error",
      });
    },
  });
}

/**
 * Hook to update an ayam
 */
export function useUpdateAyam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAyamDto }) =>
      ayamService.updateAyam(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific ayam and all ayam lists
      queryClient.invalidateQueries({
        queryKey: ayamKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: ayamKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data ayam berhasil diupdate",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to update ayam:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Mengupdate Data Ayam",
        description: errorMessage || "Terjadi kesalahan saat mengupdate data ayam",
        color: "error",
      });
    },
  });
}

/**
 * Hook to delete an ayam
 */
export function useDeleteAyam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ayamService.deleteAyam(id),
    onSuccess: () => {
      // Invalidate all ayam lists
      queryClient.invalidateQueries({ queryKey: ayamKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data ayam berhasil dihapus",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to delete ayam:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Menghapus Data Ayam",
        description: errorMessage || "Terjadi kesalahan saat menghapus data ayam",
        color: "error",
      });
    },
  });
}
