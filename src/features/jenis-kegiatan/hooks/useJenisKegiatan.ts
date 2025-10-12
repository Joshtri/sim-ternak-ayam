// Custom React Query hooks for jenis kegiatan management
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { jenisKegiatanService } from "../services/jenisKegiatanService";
import { CreateJenisKegiatanDto, UpdateJenisKegiatanDto } from "../types";

import { getErrorMessage } from "@/lib/axios";
import { showToast } from "@/utils/showToast";

// Query keys
export const jenisKegiatanKeys = {
  all: ["jenis-kegiatan"] as const,
  lists: () => [...jenisKegiatanKeys.all, "list"] as const,
  list: () => [...jenisKegiatanKeys.lists()] as const,
  details: () => [...jenisKegiatanKeys.all, "detail"] as const,
  detail: (id: string) => [...jenisKegiatanKeys.details(), id] as const,
  byName: (name: string) => [...jenisKegiatanKeys.all, "by-name", name] as const,
  bySatuan: (satuan: string) =>
    [...jenisKegiatanKeys.all, "by-satuan", satuan] as const,
};

/**
 * Hook to fetch all jenis kegiatans
 */
export function useJenisKegiatans() {
  return useQuery({
    queryKey: jenisKegiatanKeys.list(),
    queryFn: () => jenisKegiatanService.getJenisKegiatans(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
}

/**
 * Hook to fetch a single jenis kegiatan
 */
export function useJenisKegiatanById(id: string, enabled = true) {
  return useQuery({
    queryKey: jenisKegiatanKeys.detail(id),
    queryFn: () => jenisKegiatanService.getJenisKegiatanById(id),
    enabled: enabled && !!id,
  });
}

/**
 * Hook to fetch jenis kegiatan by name
 */
export function useJenisKegiatanByName(name: string, enabled = true) {
  return useQuery({
    queryKey: jenisKegiatanKeys.byName(name),
    queryFn: () => jenisKegiatanService.getJenisKegiatanByName(name),
    enabled: enabled && !!name,
  });
}

/**
 * Hook to fetch jenis kegiatan by satuan
 */
export function useJenisKegiatanBySatuan(satuan: string, enabled = true) {
  return useQuery({
    queryKey: jenisKegiatanKeys.bySatuan(satuan),
    queryFn: () => jenisKegiatanService.getJenisKegiatanBySatuan(satuan),
    enabled: enabled && !!satuan,
  });
}

/**
 * Hook to create a new jenis kegiatan
 */
export function useCreateJenisKegiatan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateJenisKegiatanDto>) =>
      jenisKegiatanService.createJenisKegiatan(data),
    onSuccess: () => {
      // Invalidate all jenis kegiatan lists
      queryClient.invalidateQueries({ queryKey: jenisKegiatanKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data jenis kegiatan berhasil dibuat",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to create jenis kegiatan:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Membuat Data Jenis Kegiatan",
        description:
          errorMessage || "Terjadi kesalahan saat membuat data jenis kegiatan",
        color: "error",
      });
    },
  });
}

/**
 * Hook to update a jenis kegiatan
 */
export function useUpdateJenisKegiatan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<UpdateJenisKegiatanDto>;
    }) => jenisKegiatanService.updateJenisKegiatan(id, data),
    onSuccess: (_, variables) => {
      // Invalidate the specific jenis kegiatan and all jenis kegiatan lists
      queryClient.invalidateQueries({
        queryKey: jenisKegiatanKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: jenisKegiatanKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data jenis kegiatan berhasil diupdate",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to update jenis kegiatan:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Mengupdate Data Jenis Kegiatan",
        description:
          errorMessage ||
          "Terjadi kesalahan saat mengupdate data jenis kegiatan",
        color: "error",
      });
    },
  });
}

/**
 * Hook to delete a jenis kegiatan
 */
export function useDeleteJenisKegiatan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => jenisKegiatanService.deleteJenisKegiatan(id),
    onSuccess: () => {
      // Invalidate all jenis kegiatan lists
      queryClient.invalidateQueries({ queryKey: jenisKegiatanKeys.lists() });

      // Show success toast
      showToast({
        title: "Berhasil!",
        description: "Data jenis kegiatan berhasil dihapus",
        color: "success",
      });
    },
    onError: error => {
      const errorMessage = getErrorMessage(error);
      console.error("Failed to delete jenis kegiatan:", errorMessage);

      // Show error toast
      showToast({
        title: "Gagal Menghapus Data Jenis Kegiatan",
        description:
          errorMessage ||
          "Terjadi kesalahan saat menghapus data jenis kegiatan",
        color: "error",
      });
    },
  });
}
