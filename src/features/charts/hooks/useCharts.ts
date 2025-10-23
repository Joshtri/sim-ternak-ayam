import { useQuery } from "@tanstack/react-query";

import { chartsService } from "../services/chartsService";
import { ChartQueryParams } from "../types";

/**
 * Hook untuk mengambil data produktivitas trend
 */
export function useProduktivitasTrend(params?: ChartQueryParams) {
  return useQuery({
    queryKey: ["charts", "produktivitas-trend", params],
    queryFn: () => chartsService.getProduktivitasTrend(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook untuk mengambil data mortalitas statistik
 */
export function useMortalitasStatistik(params?: ChartQueryParams) {
  return useQuery({
    queryKey: ["charts", "mortalitas-statistik", params],
    queryFn: () => chartsService.getMortalitasStatistik(params),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook untuk mengambil data operasional breakdown
 */
export function useOperasionalBreakdown(params?: ChartQueryParams) {
  return useQuery({
    queryKey: ["charts", "operasional-breakdown", params],
    queryFn: () => chartsService.getOperasionalBreakdown(params),
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook untuk mengambil data financial analysis
 */
export function useFinancialAnalysis(params?: ChartQueryParams) {
  return useQuery({
    queryKey: ["charts", "financial-analysis", params],
    queryFn: () => chartsService.getFinancialAnalysis(params),
    staleTime: 1000 * 60 * 5,
  });
}
