import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";
import {
  PetugasDashboardData,
  OperatorDashboardData,
  PemilikDashboardData,
  RevenueExpenseChartData,
  MortalityTrendChartData,
  ProductionChartData,
  KandangUtilizationChartData,
  FeedConsumptionChartData,
  FinancialPerformanceChartData,
  OperationalActivitiesChartData,
  StockLevelsChartData,
  PerformanceComparisonChartData,
  SeasonalTrendsChartData,
  CostBreakdownChartData,
} from "../types";

/**
 * Dashboard Hooks
 * React Query hooks for dashboard data fetching
 */

// ============================================
// Role-based Dashboard Hooks
// ============================================

/**
 * Hook to fetch Petugas dashboard data
 */
export const usePetugasDashboard = () => {
  return useQuery<PetugasDashboardData, Error>({
    queryKey: ["dashboard", "petugas"],
    queryFn: () => dashboardService.getPetugasDashboard(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook to fetch Operator dashboard data
 */
export const useOperatorDashboard = () => {
  return useQuery<OperatorDashboardData, Error>({
    queryKey: ["dashboard", "operator"],
    queryFn: () => dashboardService.getOperatorDashboard(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook to fetch Pemilik dashboard data
 */
export const usePemilikDashboard = () => {
  return useQuery<PemilikDashboardData, Error>({
    queryKey: ["dashboard", "pemilik"],
    queryFn: () => dashboardService.getPemilikDashboard(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook to fetch dashboard by role
 */
export const useDashboardByRole = (role: string) => {
  return useQuery<
    PetugasDashboardData | OperatorDashboardData | PemilikDashboardData,
    Error
  >({
    queryKey: ["dashboard", "role", role],
    queryFn: () => dashboardService.getDashboardByRole(role),
    enabled: !!role,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

// ============================================
// Chart Hooks
// ============================================

/**
 * Hook to fetch revenue vs expense chart data
 */
export const useRevenueExpenseChart = () => {
  return useQuery<RevenueExpenseChartData, Error>({
    queryKey: ["dashboard", "charts", "revenue-expense"],
    queryFn: () => dashboardService.getRevenueExpenseChart(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch mortality trend chart data
 */
export const useMortalityTrendChart = () => {
  return useQuery<MortalityTrendChartData, Error>({
    queryKey: ["dashboard", "charts", "mortality-trend"],
    queryFn: () => dashboardService.getMortalityTrendChart(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch production chart data
 */
export const useProductionChart = () => {
  return useQuery<ProductionChartData, Error>({
    queryKey: ["dashboard", "charts", "production"],
    queryFn: () => dashboardService.getProductionChart(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch kandang utilization chart data
 */
export const useKandangUtilizationChart = () => {
  return useQuery<KandangUtilizationChartData, Error>({
    queryKey: ["dashboard", "charts", "kandang-utilization"],
    queryFn: () => dashboardService.getKandangUtilizationChart(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch feed consumption chart data
 */
export const useFeedConsumptionChart = () => {
  return useQuery<FeedConsumptionChartData, Error>({
    queryKey: ["dashboard", "charts", "feed-consumption"],
    queryFn: () => dashboardService.getFeedConsumptionChart(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch financial performance chart data
 */
export const useFinancialPerformanceChart = () => {
  return useQuery<FinancialPerformanceChartData, Error>({
    queryKey: ["dashboard", "charts", "financial-performance"],
    queryFn: () => dashboardService.getFinancialPerformanceChart(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch operational activities chart data
 */
export const useOperationalActivitiesChart = () => {
  return useQuery<OperationalActivitiesChartData, Error>({
    queryKey: ["dashboard", "charts", "operational-activities"],
    queryFn: () => dashboardService.getOperationalActivitiesChart(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch stock levels chart data
 */
export const useStockLevelsChart = () => {
  return useQuery<StockLevelsChartData, Error>({
    queryKey: ["dashboard", "charts", "stock-levels"],
    queryFn: () => dashboardService.getStockLevelsChart(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch performance comparison chart data
 */
export const usePerformanceComparisonChart = () => {
  return useQuery<PerformanceComparisonChartData, Error>({
    queryKey: ["dashboard", "charts", "performance-comparison"],
    queryFn: () => dashboardService.getPerformanceComparisonChart(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch seasonal trends chart data
 */
export const useSeasonalTrendsChart = () => {
  return useQuery<SeasonalTrendsChartData, Error>({
    queryKey: ["dashboard", "charts", "seasonal-trends"],
    queryFn: () => dashboardService.getSeasonalTrendsChart(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to fetch cost breakdown chart data
 */
export const useCostBreakdownChart = () => {
  return useQuery<CostBreakdownChartData, Error>({
    queryKey: ["dashboard", "charts", "cost-breakdown"],
    queryFn: () => dashboardService.getCostBreakdownChart(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
