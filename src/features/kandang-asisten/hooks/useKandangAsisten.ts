/**
 * Kandang Asisten Hooks
 * React Query hooks for kandang asisten CRUD operations
 */

import type {
  CreateKandangAsistenDto,
  UpdateKandangAsistenDto,
} from "../types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { kandangAsistenService } from "../services/kandangAsistenService";

import { showToast } from "@/utils/showToast";

/**
 * Query keys for cache management
 */
export const kandangAsistenKeys = {
  all: ["kandang-asistens"] as const,
  byId: (id: string) => [...kandangAsistenKeys.all, id] as const,
  byKandang: (kandangId: string) =>
    [...kandangAsistenKeys.all, "kandang", kandangId] as const,
  byKandangActive: (kandangId: string) =>
    [...kandangAsistenKeys.all, "kandang", kandangId, "active"] as const,
  byAsisten: (asistenId: string) =>
    [...kandangAsistenKeys.all, "asisten", asistenId] as const,
};

/**
 * Hook to fetch all kandang assistants
 */
export function useKandangAsistens() {
  return useQuery({
    queryKey: kandangAsistenKeys.all,
    queryFn: () => kandangAsistenService.getKandangAsistens(),
  });
}

/**
 * Hook to fetch kandang assistant by ID
 */
export function useKandangAsistenById(id: string, enabled = true) {
  return useQuery({
    queryKey: kandangAsistenKeys.byId(id),
    queryFn: () => kandangAsistenService.getKandangAsistenById(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to fetch assistants by kandang
 */
export function useAsistensByKandang(kandangId: string, enabled = true) {
  return useQuery({
    queryKey: kandangAsistenKeys.byKandang(kandangId),
    queryFn: () => kandangAsistenService.getAsistensByKandang(kandangId),
    enabled: enabled && !!kandangId,
  });
}

/**
 * Hook to fetch active assistants by kandang
 */
export function useActiveAsistensByKandang(kandangId: string, enabled = true) {
  return useQuery({
    queryKey: kandangAsistenKeys.byKandangActive(kandangId),
    queryFn: () => kandangAsistenService.getActiveAsistensByKandang(kandangId),
    enabled: enabled && !!kandangId,
  });
}

/**
 * Hook to fetch kandang assignments by asisten
 */
export function useKandangsByAsisten(asistenId: string, enabled = true) {
  return useQuery({
    queryKey: kandangAsistenKeys.byAsisten(asistenId),
    queryFn: () => kandangAsistenService.getKandangsByAsisten(asistenId),
    enabled: enabled && !!asistenId,
  });
}

/**
 * Hook to create kandang assistant
 */
export function useCreateKandangAsisten() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateKandangAsistenDto) =>
      kandangAsistenService.createKandangAsisten(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: kandangAsistenKeys.all });
      showToast({
        title: "Berhasil",
        description: "Asisten kandang berhasil ditambahkan",
        color: "success",
      });
    },
    onError: (error: any) => {
      // Extract error message from API response
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Gagal menambahkan asisten kandang";

      showToast({
        title: "Gagal",
        description: errorMessage,
        color: "error",
        timeout: 5000,
      });
    },
  });
}

/**
 * Hook to update kandang assistant
 */
export function useUpdateKandangAsisten() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateKandangAsistenDto }) =>
      kandangAsistenService.updateKandangAsisten(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: kandangAsistenKeys.all });
      showToast({
        title: "Berhasil",
        description: "Data asisten kandang berhasil diperbarui",
        color: "success",
      });
    },
    onError: (error: any) => {
      // Extract error message from API response
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Gagal memperbarui asisten kandang";

      showToast({
        title: "Gagal",
        description: errorMessage,
        color: "error",
        timeout: 5000,
      });
    },
  });
}

/**
 * Hook to delete kandang assistant
 */
export function useDeleteKandangAsisten() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => kandangAsistenService.deleteKandangAsisten(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: kandangAsistenKeys.all });
      showToast({
        title: "Berhasil",
        description: "Asisten kandang berhasil dihapus",
        color: "success",
      });
    },
    onError: (error: any) => {
      // Extract error message from API response
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Gagal menghapus asisten kandang";

      showToast({
        title: "Gagal",
        description: errorMessage,
        color: "error",
        timeout: 5000,
      });
    },
  });
}
