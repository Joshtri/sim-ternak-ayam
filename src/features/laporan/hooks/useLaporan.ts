/**
 * Custom React Query hooks for laporan (reports)
 */

import { useQuery } from "@tanstack/react-query";

import { laporanService } from "../services/laporanService";
import { LaporanOperasionalFilters } from "../types";

// Query keys for cache management
export const laporanKeys = {
  all: ["laporan"] as const,

  // Kesehatan Ayam keys
  kesehatanAyam: () => [...laporanKeys.all, "kesehatan-ayam"] as const,
  kesehatanAyamDetail: (kandangId: string) =>
    [...laporanKeys.kesehatanAyam(), kandangId] as const,

  // Operasional keys
  operasional: () => [...laporanKeys.all, "operasional"] as const,
  operasionalWithFilters: (filters?: LaporanOperasionalFilters) =>
    [...laporanKeys.operasional(), filters] as const,

  // Produktivitas keys
  produktivitas: () => [...laporanKeys.all, "produktivitas"] as const,
  produktivitasDetail: (petugasId: string) =>
    [...laporanKeys.produktivitas(), petugasId] as const,
};

/**
 * Hook to fetch health data for all kandang
 */
export function useKesehatanAyam() {
  return useQuery({
    queryKey: laporanKeys.kesehatanAyam(),
    queryFn: () => laporanService.getKesehatanAyam(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch health data for specific kandang
 */
export function useKesehatanAyamById(kandangId: string, enabled = true) {
  return useQuery({
    queryKey: laporanKeys.kesehatanAyamDetail(kandangId),
    queryFn: () => laporanService.getKesehatanAyamById(kandangId),
    enabled: enabled && !!kandangId,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch operational report with optional filters
 */
export function useLaporanOperasional(filters?: LaporanOperasionalFilters) {
  return useQuery({
    queryKey: laporanKeys.operasionalWithFilters(filters),
    queryFn: () => laporanService.getLaporanOperasional(filters),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch productivity analysis for all petugas
 */
export function useProduktivitas() {
  return useQuery({
    queryKey: laporanKeys.produktivitas(),
    queryFn: () => laporanService.getAnalisisProduktivitas(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch productivity analysis for specific petugas
 */
export function useProduktivitasById(petugasId: string, enabled = true) {
  return useQuery({
    queryKey: laporanKeys.produktivitasDetail(petugasId),
    queryFn: () => laporanService.getAnalisisProduktivitasById(petugasId),
    enabled: enabled && !!petugasId,
    staleTime: 5 * 60 * 1000,
  });
}
