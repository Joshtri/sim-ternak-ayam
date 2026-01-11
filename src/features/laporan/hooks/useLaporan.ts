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
  produktivitasWithFilters: (
    year?: string | number,
    month?: string | number,
    hasKandang?: boolean
  ) => [...laporanKeys.produktivitas(), { year, month, hasKandang }] as const,
  produktivitasDetail: (petugasId: string) =>
    [...laporanKeys.produktivitas(), petugasId] as const,
  produktivitasDetailWithFilters: (
    petugasId: string,
    year?: string | number,
    month?: string | number,
    hasKandang?: boolean
  ) =>
    [
      ...laporanKeys.produktivitasDetail(petugasId),
      { year, month, hasKandang },
    ] as const,
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
export function useProduktivitas(
  year?: string | number,
  month?: string | number,
  hasKandang?: boolean
) {
  return useQuery({
    queryKey: laporanKeys.produktivitasWithFilters(year, month, hasKandang),
    queryFn: () =>
      laporanService.getAnalisisProduktivitas(year, month, hasKandang),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook to fetch productivity analysis for specific petugas
 */
export function useProduktivitasById(
  petugasId: string,
  year?: string | number,
  month?: string | number,
  hasKandang?: boolean,
  enabled = true
) {
  return useQuery({
    queryKey: laporanKeys.produktivitasDetailWithFilters(
      petugasId,
      year,
      month,
      hasKandang
    ),
    queryFn: () =>
      laporanService.getAnalisisProduktivitasById(petugasId, year, month),
    enabled: enabled && !!petugasId,
    staleTime: 5 * 60 * 1000,
  });
}
