// Custom React Query hooks for operasional management
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { operasionalService } from "../services/operasionalService";
import {
  CreateOperasionalDto,
  UpdateOperasionalDto,
  OperasionalFilters,
} from "../types";

import { getErrorMessage } from "@/lib/axios";
import { showToast } from "@/utils/showToast";

// Query keys
export const operasionalKeys = {
  all: ["operasional"] as const,
  lists: () => [...operasionalKeys.all, "list"] as const,
  list: (filters?: OperasionalFilters) =>
    [...operasionalKeys.lists(), filters] as const,
  details: () => [...operasionalKeys.all, "detail"] as const,
  detail: (id: string) => [...operasionalKeys.details(), id] as const,
  byKandang: (kandangId: string) =>
    [...operasionalKeys.all, "by-kandang", kandangId] as const,
  byJenisKegiatan: (jenisKegiatanId: string) =>
    [...operasionalKeys.all, "by-jenis-kegiatan", jenisKegiatanId] as const,
};

/**
 * Hook to fetch all operasionals with optional filters
 */
export function useOperasionals(filters?: OperasionalFilters) {
  return useQuery({
    queryKey: operasionalKeys.list(filters),
    queryFn: () => operasionalService.getOperasionals(filters),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch a single operasional
 */
export function useOperasionalById(id: string, enabled = true) {
  return useQuery({
    queryKey: operasionalKeys.detail(id),
    queryFn: () => operasionalService.getOperasionalById(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to fetch operasionals by kandang
 */
export function useOperasionalsByKandang(kandangId: string, enabled = true) {
  return useQuery({
    queryKey: operasionalKeys.byKandang(kandangId),
    queryFn: () => operasionalService.getOperasionalByKandang(kandangId),
    enabled: enabled && !!kandangId,
  });
}

/**
 * Hook to fetch operasionals by jenis kegiatan
 */
export function useOperasionalsByJenisKegiatan(
  jenisKegiatanId: string,
  enabled = true
) {
  return useQuery({
    queryKey: operasionalKeys.byJenisKegiatan(jenisKegiatanId),
    queryFn: () =>
      operasionalService.getOperasionalByJenisKegiatan(jenisKegiatanId),
    enabled: enabled && !!jenisKegiatanId,
  });
}

/**
 * Hook to create a new operasional
 */
export function useCreateOperasional() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateOperasionalDto>) =>
      operasionalService.createOperasional(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: operasionalKeys.lists() });

      showToast({
        title: "Berhasil!",
        description: "Data operasional berhasil dibuat",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to create operasional:", errorMessage);

      showToast({
        title: "Gagal Membuat Data Operasional",
        description:
          errorMessage || "Terjadi kesalahan saat membuat data operasional",
        color: "error",
      });
    },
  });
}

/**
 * Hook to update an operasional
 */
export function useUpdateOperasional() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<UpdateOperasionalDto>;
    }) => operasionalService.updateOperasional(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: operasionalKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: operasionalKeys.lists() });

      showToast({
        title: "Berhasil!",
        description: "Data operasional berhasil diupdate",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to update operasional:", errorMessage);

      showToast({
        title: "Gagal Mengupdate Data Operasional",
        description:
          errorMessage || "Terjadi kesalahan saat mengupdate data operasional",
        color: "error",
      });
    },
  });
}

/**
 * Hook to delete an operasional
 */
export function useDeleteOperasional() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => operasionalService.deleteOperasional(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: operasionalKeys.lists() });

      showToast({
        title: "Berhasil!",
        description: "Data operasional berhasil dihapus",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to delete operasional:", errorMessage);

      showToast({
        title: "Gagal Menghapus Data Operasional",
        description:
          errorMessage || "Terjadi kesalahan saat menghapus data operasional",
        color: "error",
      });
    },
  });
}

/**
 * Hook to fetch form data for operasional
 */
export function useOperasionalFormData() {
  return useQuery({
    queryKey: [...operasionalKeys.all, "form-data"],
    queryFn: () => operasionalService.getFormData(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to create a new operasional with stock validation
 */
export function useCreateOperasionalWithValidation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateOperasionalDto>) =>
      operasionalService.createOperasionalWithValidation(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: operasionalKeys.lists() });
      return data;
    },
  });
}

/**
 * Hook to validate stock
 */
export function useValidateStock() {
  return useMutation({
    mutationFn: (data: {
      vaksinId?: string;
      pakanId?: string;
      jumlah: number;
    }) => operasionalService.validateStock(data),
  });
}
