// Custom React Query hooks for kandang management
import type {
  CreateKandangDto,
  UpdateKandangDto,
  KandangFilters,
} from "../types";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { kandangService } from "../services/kandangService";

import { getErrorMessage } from "@/lib/axios";
import { showToast } from "@/utils/showToast";

// Query keys
export const kandangKeys = {
  all: ["kandang"] as const,
  lists: () => [...kandangKeys.all, "list"] as const,
  list: (filters?: KandangFilters) =>
    [...kandangKeys.lists(), filters] as const,
  details: () => [...kandangKeys.all, "detail"] as const,
  detail: (id: string) => [...kandangKeys.details(), id] as const,
};

/**
 * Hook to fetch all kandangs with filters
 */
export function useKandangs(filters?: KandangFilters) {
  return useQuery({
    queryKey: kandangKeys.list(filters),
    queryFn: () => kandangService.getKandangs(filters),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

/**
 * Hook to fetch a single kandang
 */
export function useKandang(id: string, enabled = true) {
  return useQuery({
    queryKey: kandangKeys.detail(id),
    queryFn: () => kandangService.getKandang(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to create a new kandang
 */
export function useCreateKandang() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateKandangDto) => kandangService.createKandang(data),
    onSuccess: () => {
      // Invalidate all kandang lists
      queryClient.invalidateQueries({ queryKey: kandangKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Kandang berhasil dibuat",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to create kandang:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Membuat Kandang",
        description: errorMessage || "Terjadi kesalahan saat membuat kandang",
        color: "error",
      });
    },
  });
}

/**
 * Hook to update a kandang
 */
export function useUpdateKandang() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateKandangDto }) =>
      kandangService.updateKandang(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific kandang and all kandang lists
      queryClient.invalidateQueries({
        queryKey: kandangKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: kandangKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Kandang berhasil diupdate",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to update kandang:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Mengupdate Kandang",
        description: errorMessage || "Terjadi kesalahan saat mengupdate kandang",
        color: "error",
      });
    },
  });
}

/**
 * Hook to delete a kandang
 */
export function useDeleteKandang() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => kandangService.deleteKandang(id),
    onSuccess: () => {
      // Invalidate all kandang lists
      queryClient.invalidateQueries({ queryKey: kandangKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Kandang berhasil dihapus",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to delete kandang:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Menghapus Kandang",
        description: errorMessage || "Terjadi kesalahan saat menghapus kandang",
        color: "error",
      });
    },
  });
}
