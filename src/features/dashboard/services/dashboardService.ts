import api, { ApiResponse } from "@/lib/axios";
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
 * Dashboard Service
 * Handles all dashboard-related API calls
 */
export const dashboardService = {
  // ============================================
  // Role-based Dashboard Data
  // ============================================

  /**
   * Get Petugas dashboard data
   */
  getPetugasDashboard: async (): Promise<PetugasDashboardData> => {
    const response = await api.get<ApiResponse<PetugasDashboardData>>(
      "/dashboard/petugas"
    );
    return response.data.data;
  },

  /**
   * Get Operator dashboard data
   */
  getOperatorDashboard: async (): Promise<OperatorDashboardData> => {
    const response = await api.get<ApiResponse<OperatorDashboardData>>(
      "/dashboard/operator"
    );
    return response.data.data;
  },

  /**
   * Get Pemilik dashboard data
   */
  /**
   * Get Pemilik dashboard data
   */
  getPemilikDashboard: async (month?: string): Promise<PemilikDashboardData> => {
    const params = month ? { month } : {};
    const response = await api.get<ApiResponse<PemilikDashboardData>>(
      "/dashboard/pemilik",
      { params }
    );
    return response.data.data;
  },

  /**
   * Get dashboard by role
   * Generic function that routes to the correct dashboard
   */
  getDashboardByRole: async (
    role: string
  ): Promise<
    PetugasDashboardData | OperatorDashboardData | PemilikDashboardData
  > => {
    const response = await api.get<
      ApiResponse<
        PetugasDashboardData | OperatorDashboardData | PemilikDashboardData
      >
    >(`/dashboard/role/${role}`);
    return response.data.data;
  },

  // ============================================
  // Chart Data Endpoints
  // ============================================

  /**
   * Get revenue vs expense chart data
   */
  getRevenueExpenseChart: async (): Promise<RevenueExpenseChartData> => {
    const response = await api.get<ApiResponse<RevenueExpenseChartData>>(
      "/dashboard/charts/revenue-expense"
    );
    return response.data.data;
  },

  /**
   * Get mortality trend chart data
   */
  getMortalityTrendChart: async (): Promise<MortalityTrendChartData> => {
    const response = await api.get<ApiResponse<MortalityTrendChartData>>(
      "/dashboard/charts/mortality-trend"
    );
    return response.data.data;
  },

  /**
   * Get production chart data
   */
  getProductionChart: async (): Promise<ProductionChartData> => {
    const response = await api.get<ApiResponse<ProductionChartData>>(
      "/dashboard/charts/production"
    );
    return response.data.data;
  },

  /**
   * Get kandang utilization chart data
   */
  getKandangUtilizationChart:
    async (): Promise<KandangUtilizationChartData> => {
      const response = await api.get<ApiResponse<KandangUtilizationChartData>>(
        "/dashboard/charts/kandang-utilization"
      );
      return response.data.data;
    },

  /**
   * Get feed consumption chart data
   */
  getFeedConsumptionChart: async (): Promise<FeedConsumptionChartData> => {
    const response = await api.get<ApiResponse<FeedConsumptionChartData>>(
      "/dashboard/charts/feed-consumption"
    );
    return response.data.data;
  },

  /**
   * Get financial performance chart data
   */
  getFinancialPerformanceChart:
    async (): Promise<FinancialPerformanceChartData> => {
      const response = await api.get<
        ApiResponse<FinancialPerformanceChartData>
      >("/dashboard/charts/financial-performance");
      return response.data.data;
    },

  /**
   * Get operational activities chart data
   */
  getOperationalActivitiesChart:
    async (): Promise<OperationalActivitiesChartData> => {
      const response = await api.get<
        ApiResponse<OperationalActivitiesChartData>
      >("/dashboard/charts/operational-activities");
      return response.data.data;
    },

  /**
   * Get stock levels chart data
   */
  getStockLevelsChart: async (): Promise<StockLevelsChartData> => {
    const response = await api.get<ApiResponse<StockLevelsChartData>>(
      "/dashboard/charts/stock-levels"
    );
    return response.data.data;
  },

  /**
   * Get performance comparison chart data
   */
  getPerformanceComparisonChart:
    async (): Promise<PerformanceComparisonChartData> => {
      const response = await api.get<
        ApiResponse<PerformanceComparisonChartData>
      >("/dashboard/charts/performance-comparison");
      return response.data.data;
    },

  /**
   * Get seasonal trends chart data
   */
  getSeasonalTrendsChart: async (): Promise<SeasonalTrendsChartData> => {
    const response = await api.get<ApiResponse<SeasonalTrendsChartData>>(
      "/dashboard/charts/seasonal-trends"
    );
    return response.data.data;
  },

  /**
   * Get cost breakdown chart data
   */
  getCostBreakdownChart: async (): Promise<CostBreakdownChartData> => {
    const response = await api.get<ApiResponse<CostBreakdownChartData>>(
      "/dashboard/charts/cost-breakdown"
    );
    return response.data.data;
  },
};
