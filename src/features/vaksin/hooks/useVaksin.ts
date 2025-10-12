// Custom React Query hooks for vaksin management
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { vaksinService } from "../services/vaksinService";
import { CreateVaksinDto, UpdateVaksinDto, UpdateStockDto } from "../types";

import { getErrorMessage } from "@/lib/axios";
import { showToast } from "@/utils/showToast";

// Query keys
export const vaksinKeys = {
  all: ["vaksin"] as const,
  lists: () => [...vaksinKeys.all, "list"] as const,
  list: () => [...vaksinKeys.lists()] as const,
  lowStock: () => [...vaksinKeys.all, "low-stock"] as const,
  details: () => [...vaksinKeys.all, "detail"] as const,
  detail: (id: string) => [...vaksinKeys.details(), id] as const,
  byName: (name: string) => [...vaksinKeys.all, "by-name", name] as const,
};

/**
 * Hook to fetch all vaksins
 */
export function useVaksins() {
  return useQuery({
    queryKey: vaksinKeys.list(),
    queryFn: () => vaksinService.getVaksins(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

/**
 * Hook to fetch low stock vaksins
 */
export function useLowStockVaksins() {
  return useQuery({
    queryKey: vaksinKeys.lowStock(),
    queryFn: () => vaksinService.getLowStockVaksins(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single vaksin
 */
export function useVaksinById(id: string, enabled = true) {
  return useQuery({
    queryKey: vaksinKeys.detail(id),
    queryFn: () => vaksinService.getVaksinById(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to fetch vaksin by name
 */
export function useVaksinByName(name: string, enabled = true) {
  return useQuery({
    queryKey: vaksinKeys.byName(name),
    queryFn: () => vaksinService.getVaksinByName(name),
    enabled: enabled && !!name,
  });
}

/**
 * Hook to create a new vaksin
 */
export function useCreateVaksin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateVaksinDto>) =>
      vaksinService.createVaksin(data),
    onSuccess: () => {
      // Invalidate all vaksin lists
      queryClient.invalidateQueries({ queryKey: vaksinKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vaksinKeys.lowStock() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data vaksin berhasil dibuat",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to create vaksin:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Membuat Data Vaksin",
        description: errorMessage || "Terjadi kesalahan saat membuat data vaksin",
        color: "error",
      });
    },
  });
}

/**
 * Hook to update a vaksin
 */
export function useUpdateVaksin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UpdateVaksinDto> }) =>
      vaksinService.updateVaksin(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific vaksin and all vaksin lists
      queryClient.invalidateQueries({
        queryKey: vaksinKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: vaksinKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vaksinKeys.lowStock() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data vaksin berhasil diupdate",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to update vaksin:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Mengupdate Data Vaksin",
        description: errorMessage || "Terjadi kesalahan saat mengupdate data vaksin",
        color: "error",
      });
    },
  });
}

/**
 * Hook to update stock
 */
export function useUpdateStockVaksin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStockDto }) =>
      vaksinService.updateStock(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific vaksin and all vaksin lists
      queryClient.invalidateQueries({
        queryKey: vaksinKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: vaksinKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vaksinKeys.lowStock() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Stok vaksin berhasil diupdate",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to update stock:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Mengupdate Stok",
        description: errorMessage || "Terjadi kesalahan saat mengupdate stok",
        color: "error",
      });
    },
  });
}

/**
 * Hook to delete a vaksin
 */
export function useDeleteVaksin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => vaksinService.deleteVaksin(id),
    onSuccess: () => {
      // Invalidate all vaksin lists
      queryClient.invalidateQueries({ queryKey: vaksinKeys.lists() });
      queryClient.invalidateQueries({ queryKey: vaksinKeys.lowStock() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data vaksin berhasil dihapus",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to delete vaksin:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Menghapus Data Vaksin",
        description: errorMessage || "Terjadi kesalahan saat menghapus data vaksin",
        color: "error",
      });
    },
  });
}
