import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";
import {
  JurnalHarian,
  CreateJurnalHarianDto,
  UpdateJurnalHarianDto,
  JurnalHarianQueryParams,
  JurnalHarianLaporanParams,
  JurnalHarianLaporan,
} from "../types";

/**
 * Jurnal Harian Service
 * Handles all jurnal harian API calls
 * Endpoints sesuai CLAUDE.md
 */
export const jurnalHarianService = {
  /**
   * POST /api/jurnal-harian
   * Membuat jurnal baru (without photo)
   */
  createJurnal: async (data: CreateJurnalHarianDto): Promise<JurnalHarian> => {
    const response = await api.post<ApiResponse<JurnalHarian>>(
      "/jurnal-harian",
      data
    );
    return response.data.data;
  },

  /**
   * POST /api/jurnal-harian/with-photo
   * Membuat jurnal baru dengan foto (multipart/form-data)
   */
  createJurnalWithPhoto: async (formData: FormData): Promise<JurnalHarian> => {
    const response = await api.post<ApiResponse<JurnalHarian>>(
      "/jurnal-harian/with-photo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  /**
   * GET /api/jurnal-harian
   * Ambil list jurnal (filter by user)
   */
  getJurnals: async (
    params?: JurnalHarianQueryParams
  ): Promise<JurnalHarian[]> => {
    const response = await api.get<PaginatedResponse<JurnalHarian>>(
      "/jurnal-harian",
      { params }
    );
    return response.data.data;
  },

  /**
   * GET /api/jurnal-harian/{id}
   * Ambil jurnal detail
   */
  getJurnalById: async (id: string): Promise<JurnalHarian> => {
    const response = await api.get<ApiResponse<JurnalHarian>>(
      `/jurnal-harian/${id}`
    );
    return response.data.data;
  },

  /**
   * PUT /api/jurnal-harian/{id}
   * Update jurnal
   */
  updateJurnal: async (
    id: string,
    data: UpdateJurnalHarianDto
  ): Promise<JurnalHarian> => {
    const response = await api.put<ApiResponse<JurnalHarian>>(
      `/jurnal-harian/${id}`,
      data
    );
    return response.data.data;
  },

  /**
   * DELETE /api/jurnal-harian/{id}
   * Hapus jurnal
   */
  deleteJurnal: async (id: string): Promise<void> => {
    await api.delete(`/jurnal-harian/${id}`);
  },

  /**
   * GET /api/jurnal-harian/laporan
   * Laporan jurnal (filter tanggal/petugas)
   */
  getLaporan: async (
    params: JurnalHarianLaporanParams
  ): Promise<JurnalHarianLaporan> => {
    const response = await api.get<ApiResponse<JurnalHarianLaporan>>(
      "/jurnal-harian/laporan",
      { params }
    );
    return response.data.data;
  },
};
