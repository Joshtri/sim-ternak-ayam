/**
 * Laporan Service
 * API service layer for all report endpoints
 */

import api, { ApiResponse } from "@/lib/axios";
import {
  KesehatanAyam,
  LaporanOperasional,
  LaporanOperasionalFilters,
  Produktivitas,
} from "../types";

export const laporanService = {
  /**
   * Get health data for all kandang
   * @returns Array of health data for all kandang
   */
  getKesehatanAyam: async (): Promise<KesehatanAyam[]> => {
    const response = await api.get<ApiResponse<KesehatanAyam[]>>(
      "/laporan/kesehatan-ayam"
    );

    return response.data.data;
  },

  /**
   * Get specific kandang health data by ID
   * @param kandangId - Kandang UUID
   * @returns Health data for specific kandang
   */
  getKesehatanAyamById: async (kandangId: string): Promise<KesehatanAyam> => {
    const response = await api.get<ApiResponse<KesehatanAyam>>(
      `/laporan/kesehatan-ayam/${kandangId}`
    );

    return response.data.data;
  },

  /**
   * Get operational report with optional date filters
   * @param filters - Date range or preset filters
   * @returns Operational report data
   */
  getLaporanOperasional: async (
    filters?: LaporanOperasionalFilters
  ): Promise<LaporanOperasional> => {
    const params = new URLSearchParams();

    if (filters?.startDate) {
      params.append("startDate", filters.startDate);
    }
    if (filters?.endDate) {
      params.append("endDate", filters.endDate);
    }
    if (filters?.preset) {
      params.append("preset", filters.preset);
    }

    const url = `/laporan/operasional${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await api.get<ApiResponse<LaporanOperasional>>(url);

    return response.data.data;
  },

  /**
   * Get productivity analysis for all petugas
   * @returns Array of petugas productivity data
   */
  getAnalisisProduktivitas: async (): Promise<Produktivitas[]> => {
    const response = await api.get<ApiResponse<Produktivitas[]>>(
      "/laporan/produktivitas"
    );

    return response.data.data;
  },

  /**
   * Get productivity analysis for specific petugas
   * @param petugasId - Petugas UUID
   * @returns Productivity data for specific petugas
   */
  getAnalisisProduktivitasById: async (
    petugasId: string
  ): Promise<Produktivitas> => {
    const response = await api.get<ApiResponse<Produktivitas>>(
      `/laporan/produktivitas/${petugasId}`
    );

    return response.data.data;
  },

  /**
   * Download PDF for Operational Report
   * @param kandangId - Kandang UUID
   * @param startDate - Optional start date (YYYY-MM-DD)
   * @param endDate - Optional end date (YYYY-MM-DD)
   * @returns PDF file blob
   */
  downloadOperasionalPDF: async (
    kandangId: string,
    startDate?: string,
    endDate?: string
  ): Promise<Blob> => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const url = `/laporan/operasional/pdf/${kandangId}${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await api.get(url, {
      responseType: "blob",
    });

    return response.data;
  },

  /**
   * Download PDF for Health Report
   * @param kandangId - Kandang UUID
   * @param startDate - Optional start date (YYYY-MM-DD)
   * @param endDate - Optional end date (YYYY-MM-DD)
   * @returns PDF file blob
   */
  downloadKesehatanPDF: async (
    kandangId: string,
    startDate?: string,
    endDate?: string
  ): Promise<Blob> => {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const url = `/laporan/kesehatan/pdf/${kandangId}${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await api.get(url, {
      responseType: "blob",
    });

    return response.data;
  },
};
