import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jurnalHarianService } from "../services/jurnalHarianService";
import {
  CreateJurnalHarianDto,
  UpdateJurnalHarianDto,
  JurnalHarianQueryParams,
  JurnalHarianLaporanParams,
} from "../types";
import { showToast } from "@/utils/showToast";

/**
 * Hook untuk mengambil list jurnal harian
 */
export function useJurnalHarianList(params?: JurnalHarianQueryParams) {
  return useQuery({
    queryKey: ["jurnal-harian", "list", params],
    queryFn: () => jurnalHarianService.getJurnals(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook untuk mengambil detail jurnal
 */
export function useJurnalHarianDetail(id: string) {
  return useQuery({
    queryKey: ["jurnal-harian", "detail", id],
    queryFn: () => jurnalHarianService.getJurnalById(id),
    enabled: !!id,
  });
}

/**
 * Hook untuk mengambil laporan jurnal
 */
export function useJurnalHarianLaporan(params: JurnalHarianLaporanParams) {
  return useQuery({
    queryKey: ["jurnal-harian", "laporan", params],
    queryFn: () => jurnalHarianService.getLaporan(params),
    enabled: !!(params.start_date && params.end_date),
  });
}

/**
 * Hook untuk membuat jurnal baru
 */
export function useCreateJurnalHarian() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJurnalHarianDto) =>
      jurnalHarianService.createJurnal(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jurnal-harian"] });
      showToast({
        title: "Berhasil",
        description: "Jurnal harian berhasil dibuat",
        color: "success",
      });
    },
    onError: (error: any) => {
      showToast({
        title: "Gagal",
        description: error?.message || "Gagal membuat jurnal harian",
        color: "error",
      });
    },
  });
}

/**
 * Hook untuk update jurnal
 */
export function useUpdateJurnalHarian() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateJurnalHarianDto }) =>
      jurnalHarianService.updateJurnal(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jurnal-harian"] });
      showToast({
        title: "Berhasil",
        description: "Jurnal harian berhasil diupdate",
        color: "success",
      });
    },
    onError: (error: any) => {
      showToast({
        title: "Gagal",
        description: error?.message || "Gagal mengupdate jurnal harian",
        color: "error",
      });
    },
  });
}

/**
 * Hook untuk hapus jurnal
 */
export function useDeleteJurnalHarian() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => jurnalHarianService.deleteJurnal(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["jurnal-harian"] });
      showToast({
        title: "Berhasil",
        description: "Jurnal harian berhasil dihapus",
        color: "success",
      });
    },
    onError: (error: any) => {
      showToast({
        title: "Gagal",
        description: error?.message || "Gagal menghapus jurnal harian",
        color: "error",
      });
    },
  });
}
