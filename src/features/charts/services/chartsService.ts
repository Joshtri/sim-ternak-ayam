import api, { ApiResponse } from "@/lib/axios";
import {
  ProduktivitasTrendChart,
  ProduktivitasTrendApiResponse,
  MortalitasStatistikChart,
  MortalitasStatistikApiResponse,
  OperasionalBreakdownChart,
  OperasionalBreakdownApiResponse,
  FinancialAnalysisChart,
  FinancialAnalysisApiResponse,
  ChartQueryParams,
} from "../types";

/**
 * Charts Service
 * Handles all chart-related API calls
 * Endpoints sesuai CLAUDE.md
 */
export const chartsService = {
  /**
   * GET /api/charts/produktivitas-trend
   * Grafik produktivitas kandang
   */
  getProduktivitasTrend: async (
    params?: ChartQueryParams
  ): Promise<ProduktivitasTrendChart> => {
    const response = await api.get<ApiResponse<ProduktivitasTrendApiResponse>>(
      "/charts/produktivitas-trend",
      { params }
    );

    const apiData = response.data.data;

    // Transform API response to Recharts format
    const data = apiData.chartData.labels.map((label, index) => ({
      periode: label,
      jumlahOperasional: apiData.chartData.series[0]?.data[index] || 0,
    }));

    return {
      periode: apiData.periode,
      tanggalMulai: apiData.tanggalMulai,
      tanggalSelesai: apiData.tanggalSelesai,
      data,
      summary: {
        totalKandangAktif: apiData.totalKandangAktif,
        totalOperasionalDilakukan: apiData.totalOperasionalDilakukan,
        rataProduktivitas: apiData.rataProduktivitas,
      },
    };
  },

  /**
   * GET /api/charts/mortalitas-statistik
   * Grafik mortalitas per minggu/bulan
   */
  getMortalitasStatistik: async (
    params?: ChartQueryParams
  ): Promise<MortalitasStatistikChart> => {
    const response = await api.get<ApiResponse<MortalitasStatistikApiResponse>>(
      "/charts/mortalitas-statistik",
      { params }
    );

    const apiData = response.data.data;

    // Transform API response to Recharts format
    const data = apiData.chartData.labels.map((label, index) => ({
      periode: label,
      jumlahMati: apiData.chartData.series[0]?.data[index] || 0,
    }));

    return {
      kandangId: apiData.kandangId,
      namaKandang: apiData.namaKandang,
      periode: apiData.periode,
      data,
      summary: {
        totalMortalitas: apiData.totalMortalitas,
        totalAyam: apiData.totalAyam,
        persentaseMortalitas: apiData.persentaseMortalitas,
      },
      topPenyebab: apiData.topPenyebab,
    };
  },

  /**
   * GET /api/charts/operasional-breakdown
   * Pie chart aktivitas operasional
   */
  getOperasionalBreakdown: async (
    params?: ChartQueryParams
  ): Promise<OperasionalBreakdownChart> => {
    const response = await api.get<
      ApiResponse<OperasionalBreakdownApiResponse>
    >("/charts/operasional-breakdown", { params });

    const apiData = response.data.data;

    // Transform API response to Recharts format
    const data = apiData.categories.map((category) => ({
      name: category.namaKegiatan,
      value: category.persentase,
      jumlah: category.jumlahOperasional,
      color: category.color,
    }));

    return {
      petugasId: apiData.petugasId,
      namaPetugas: apiData.namaPetugas,
      periode: apiData.periode,
      data,
      summary: {
        totalOperasional: apiData.totalOperasional,
        totalKandangDikelola: apiData.totalKandangDikelola,
        kategoriTerbanyak: apiData.kategoriTerbanyak,
      },
    };
  },

  /**
   * GET /api/charts/financial-analysis
   * Analisis revenue vs cost
   */
  getFinancialAnalysis: async (
    params?: ChartQueryParams
  ): Promise<FinancialAnalysisChart> => {
    const response = await api.get<ApiResponse<FinancialAnalysisApiResponse>>(
      "/charts/financial-analysis",
      { params }
    );

    const apiData = response.data.data;

    // Transform API response to Recharts format
    const data = apiData.chartData.labels.map((label, index) => {
      const revenueSeries = apiData.chartData.series.find(
        (s) => s.name === "Revenue"
      );
      const costSeries = apiData.chartData.series.find(
        (s) => s.name === "Cost"
      );

      const revenue = revenueSeries?.data[index] || 0;
      const cost = costSeries?.data[index] || 0;

      return {
        periode: label,
        revenue,
        cost,
        profit: revenue - cost,
      };
    });

    return {
      tanggalMulai: apiData.tanggalMulai,
      tanggalSelesai: apiData.tanggalSelesai,
      data,
      summary: {
        totalRevenue: apiData.totalRevenue,
        totalCost: apiData.totalCost,
        netProfit: apiData.netProfit,
        profitMargin: apiData.profitMargin,
      },
      biayaBreakdown: apiData.biayaBreakdown,
    };
  },
};
