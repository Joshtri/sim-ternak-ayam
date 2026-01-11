// Custom React Query hooks for mortalitas management
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { mortalitasService } from "../services/mortalitasService";
import {
  CreateMortalitasDto,
  UpdateMortalitasDto,
  MortalitasFilters,
} from "../types";

import { getErrorMessage } from "@/lib/axios";
import { showToast } from "@/utils/showToast";

// Query keys
export const mortalitasKeys = {
  all: ["mortalitas"] as const,
  lists: () => [...mortalitasKeys.all, "list"] as const,
  list: (filters?: MortalitasFilters) =>
    [...mortalitasKeys.lists(), JSON.stringify(filters ?? {})] as const,
  details: () => [...mortalitasKeys.all, "detail"] as const,
  detail: (id: string) => [...mortalitasKeys.details(), id] as const,
};

/**
 * Hook to fetch all mortalitas
 */

export function useMortalitas(filters?: MortalitasFilters) {
  return useQuery({
    queryKey: mortalitasKeys.list(filters as any),
    queryFn: () => mortalitasService.getMortalitas(filters),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

/**
 * Hook to fetch a single mortalitas
 */
export function useMortalitasById(id: string, enabled = true) {
  return useQuery({
    queryKey: mortalitasKeys.detail(id),
    queryFn: () => mortalitasService.getMortalitasById(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to create a new mortalitas
 */
export function useCreateMortalitas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateMortalitasDto>) =>
      mortalitasService.createMortalitas(data),
    onSuccess: () => {
      // Invalidate all mortalitas lists
      queryClient.invalidateQueries({ queryKey: mortalitasKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data mortalitas berhasil dibuat",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);

      console.error("Failed to create mortalitas:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Membuat Data Mortalitas",
        description:
          errorMessage || "Terjadi kesalahan saat membuat data mortalitas",
        color: "error",
      });
    },
  });
}

/**
 * Hook to update a mortalitas
 */
export function useUpdateMortalitas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<UpdateMortalitasDto>;
    }) => mortalitasService.updateMortalitas(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific mortalitas and all mortalitas lists
      queryClient.invalidateQueries({
        queryKey: mortalitasKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: mortalitasKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data mortalitas berhasil diupdate",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);

      console.error("Failed to update mortalitas:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Mengupdate Data Mortalitas",
        description:
          errorMessage || "Terjadi kesalahan saat mengupdate data mortalitas",
        color: "error",
      });
    },
  });
}

/**
 * Hook to delete a mortalitas
 */
export function useDeleteMortalitas() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mortalitasService.deleteMortalitas(id),
    onSuccess: () => {
      // Invalidate all mortalitas lists
      queryClient.invalidateQueries({ queryKey: mortalitasKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data mortalitas berhasil dihapus",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);

      console.error("Failed to delete mortalitas:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Menghapus Data Mortalitas",
        description:
          errorMessage || "Terjadi kesalahan saat menghapus data mortalitas",
        color: "error",
      });
    },
  });
}
