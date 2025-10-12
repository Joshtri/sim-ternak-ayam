// Custom React Query hooks for pakan management
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { pakanService } from "../services/pakanService";
import { CreatePakanDto, UpdatePakanDto, UpdateStockDto } from "../types";

import { getErrorMessage } from "@/lib/axios";
import { showToast } from "@/utils/showToast";

// Query keys
export const pakanKeys = {
  all: ["pakan"] as const,
  lists: () => [...pakanKeys.all, "list"] as const,
  list: () => [...pakanKeys.lists()] as const,
  lowStock: () => [...pakanKeys.all, "low-stock"] as const,
  details: () => [...pakanKeys.all, "detail"] as const,
  detail: (id: string) => [...pakanKeys.details(), id] as const,
  byName: (name: string) => [...pakanKeys.all, "by-name", name] as const,
};

/**
 * Hook to fetch all pakans
 */
export function usePakans() {
  return useQuery({
    queryKey: pakanKeys.list(),
    queryFn: () => pakanService.getPakans(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

/**
 * Hook to fetch low stock pakans
 */
export function useLowStockPakans() {
  return useQuery({
    queryKey: pakanKeys.lowStock(),
    queryFn: () => pakanService.getLowStockPakans(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single pakan
 */
export function usePakanById(id: string, enabled = true) {
  return useQuery({
    queryKey: pakanKeys.detail(id),
    queryFn: () => pakanService.getPakanById(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to fetch pakan by name
 */
export function usePakanByName(name: string, enabled = true) {
  return useQuery({
    queryKey: pakanKeys.byName(name),
    queryFn: () => pakanService.getPakanByName(name),
    enabled: enabled && !!name,
  });
}

/**
 * Hook to create a new pakan
 */
export function useCreatePakan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreatePakanDto>) =>
      pakanService.createPakan(data),
    onSuccess: () => {
      // Invalidate all pakan lists
      queryClient.invalidateQueries({ queryKey: pakanKeys.lists() });
      queryClient.invalidateQueries({ queryKey: pakanKeys.lowStock() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data pakan berhasil dibuat",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to create pakan:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Membuat Data Pakan",
        description: errorMessage || "Terjadi kesalahan saat membuat data pakan",
        color: "error",
      });
    },
  });
}

/**
 * Hook to update a pakan
 */
export function useUpdatePakan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UpdatePakanDto> }) =>
      pakanService.updatePakan(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific pakan and all pakan lists
      queryClient.invalidateQueries({
        queryKey: pakanKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: pakanKeys.lists() });
      queryClient.invalidateQueries({ queryKey: pakanKeys.lowStock() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data pakan berhasil diupdate",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to update pakan:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Mengupdate Data Pakan",
        description: errorMessage || "Terjadi kesalahan saat mengupdate data pakan",
        color: "error",
      });
    },
  });
}

/**
 * Hook to update stock
 */
export function useUpdateStockPakan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStockDto }) =>
      pakanService.updateStock(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific pakan and all pakan lists
      queryClient.invalidateQueries({
        queryKey: pakanKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: pakanKeys.lists() });
      queryClient.invalidateQueries({ queryKey: pakanKeys.lowStock() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Stok pakan berhasil diupdate",
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
 * Hook to delete a pakan
 */
export function useDeletePakan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pakanService.deletePakan(id),
    onSuccess: () => {
      // Invalidate all pakan lists
      queryClient.invalidateQueries({ queryKey: pakanKeys.lists() });
      queryClient.invalidateQueries({ queryKey: pakanKeys.lowStock() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data pakan berhasil dihapus",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to delete pakan:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Menghapus Data Pakan",
        description: errorMessage || "Terjadi kesalahan saat menghapus data pakan",
        color: "error",
      });
    },
  });
}
