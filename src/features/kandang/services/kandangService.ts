import type {
  Kandang,
  CreateKandangDto,
  UpdateKandangDto,
  KandangFilters,
} from "../types";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

// Kandang service - all API calls related to kandangs
export const kandangService = {
  /**
   * Get all kandangs with optional filters and pagination
   */
  getKandangs: async (filters?: KandangFilters): Promise<Kandang[]> => {
    const response = await api.get<PaginatedResponse<Kandang>>("/kandangs", {
      params: filters,
    });

    // Return the data array directly from the response
    return response.data.data;
  },

  /**
   * Get a single kandang by ID
   */
  getKandang: async (id: string): Promise<Kandang> => {
    const response = await api.get<ApiResponse<Kandang>>(`/kandangs/${id}`);

    // Return the data directly from the response
    return response.data.data;
  },

  /**
   * Create a new kandang
   */
  createKandang: async (data: CreateKandangDto): Promise<Kandang> => {
    const response = await api.post<ApiResponse<Kandang>>("/kandangs", data);

    // Return the data directly from the response
    return response.data.data;
  },

  /**
   * Update an existing kandang
   */
  updateKandang: async (
    id: string,
    data: UpdateKandangDto
  ): Promise<Kandang> => {
    const response = await api.put<ApiResponse<Kandang>>(
      `/kandangs/${id}`,
      data
    );

    // Return the data directly from the response
    return response.data.data;
  },



  /**
   * Delete a kandang
   */
  deleteKandang: async (id: string): Promise<void> => {
    await api.delete(`/kandangs/${id}`);
  },
};
