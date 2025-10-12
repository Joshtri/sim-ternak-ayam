// Custom React Query hooks for biaya management
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { biayaService } from "../services/biayaService";
import { CreateBiayaDto, UpdateBiayaDto } from "../types";

import { getErrorMessage } from "@/lib/axios";
import { showToast } from "@/utils/showToast";

// Query keys
export const biayaKeys = {
  all: ["biaya"] as const,
  lists: () => [...biayaKeys.all, "list"] as const,
  list: () => [...biayaKeys.lists()] as const,
  details: () => [...biayaKeys.all, "detail"] as const,
  detail: (id: string) => [...biayaKeys.details(), id] as const,
};

/**
 * Hook to fetch all biayas
 */
export function useBiayas() {
  return useQuery({
    queryKey: biayaKeys.list(),
    queryFn: () => biayaService.getBiayas(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single biaya
 */
export function useBiayaById(id: string, enabled = true) {
  return useQuery({
    queryKey: biayaKeys.detail(id),
    queryFn: () => biayaService.getBiayaById(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to create a new biaya
 */
export function useCreateBiaya() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateBiayaDto>) =>
      biayaService.createBiaya(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: biayaKeys.lists() });

      showToast({
        title: "Berhasil!",
        description: "Data biaya berhasil dibuat",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to create biaya:", errorMessage);

      showToast({
        title: "Gagal Membuat Data Biaya",
        description:
          errorMessage || "Terjadi kesalahan saat membuat data biaya",
        color: "error",
      });
    },
  });
}

/**
 * Hook to update a biaya
 */
export function useUpdateBiaya() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<UpdateBiayaDto>;
    }) => biayaService.updateBiaya(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: biayaKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: biayaKeys.lists() });

      showToast({
        title: "Berhasil!",
        description: "Data biaya berhasil diupdate",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to update biaya:", errorMessage);

      showToast({
        title: "Gagal Mengupdate Data Biaya",
        description:
          errorMessage || "Terjadi kesalahan saat mengupdate data biaya",
        color: "error",
      });
    },
  });
}

/**
 * Hook to delete a biaya
 */
export function useDeleteBiaya() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => biayaService.deleteBiaya(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: biayaKeys.lists() });

      showToast({
        title: "Berhasil!",
        description: "Data biaya berhasil dihapus",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to delete biaya:", errorMessage);

      showToast({
        title: "Gagal Menghapus Data Biaya",
        description:
          errorMessage || "Terjadi kesalahan saat menghapus data biaya",
        color: "error",
      });
    },
  });
}
