// Custom React Query hooks for panen management
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { panenService } from "../services/panenService";
import { CreatePanenDto, UpdatePanenDto } from "../types";

import { getErrorMessage } from "@/lib/axios";
import { showToast } from "@/utils/showToast";

// Query keys
export const panenKeys = {
  all: ["panen"] as const,
  lists: () => [...panenKeys.all, "list"] as const,
  list: (filters?: any) => [...panenKeys.lists(), filters] as const,
  details: () => [...panenKeys.all, "detail"] as const,
  detail: (id: string) => [...panenKeys.details(), id] as const,
};

/**
 * Hook to fetch all panens
 */
export function usePanens(filters?: any) {
  return useQuery({
    queryKey: panenKeys.list(filters),
    queryFn: () => panenService.getPanens(filters),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

/**
 * Hook to fetch a single panen
 */
export function usePanenById(id: string, enabled = true) {
  return useQuery({
    queryKey: panenKeys.detail(id),
    queryFn: () => panenService.getPanenById(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to create a new panen
 */
export function useCreatePanen() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreatePanenDto>) =>
      panenService.createPanen(data),
    onSuccess: () => {
      // Invalidate all panen lists
      queryClient.invalidateQueries({ queryKey: panenKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data panen berhasil dibuat",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to create panen:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Membuat Data Panen",
        description: errorMessage || "Terjadi kesalahan saat membuat data panen",
        color: "error",
      });
    },
  });
}

/**
 * Hook to update a panen
 */
export function useUpdatePanen() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UpdatePanenDto> }) =>
      panenService.updatePanen(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific panen and all panen lists
      queryClient.invalidateQueries({
        queryKey: panenKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: panenKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data panen berhasil diupdate",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to update panen:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Mengupdate Data Panen",
        description:
          errorMessage || "Terjadi kesalahan saat mengupdate data panen",
        color: "error",
      });
    },
  });
}

/**
 * Hook to delete a panen
 */
export function useDeletePanen() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => panenService.deletePanen(id),
    onSuccess: () => {
      // Invalidate all panen lists
      queryClient.invalidateQueries({ queryKey: panenKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data panen berhasil dihapus",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to delete panen:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Menghapus Data Panen",
        description:
          errorMessage || "Terjadi kesalahan saat menghapus data panen",
        color: "error",
      });
    },
  });
}
