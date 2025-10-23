import {
  CreateVaksinDto,
  Vaksin,
  UpdateVaksinDto,
  UpdateStockDto,
  
} from "../types";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

export const vaksinService = {
  getVaksins: async (): Promise<Vaksin[]> => {
    const response = await api.get<ApiResponse<Vaksin[]>>("/vaksins");

    return response.data.data;
  },

  getVaksinById: async (id: string): Promise<Vaksin> => {
    const response = await api.get<ApiResponse<Vaksin>>(`/vaksins/${id}`);

    return response.data.data;
  },

  getVaksinByName: async (namaVaksin: string): Promise<Vaksin> => {
    const response = await api.get<ApiResponse<Vaksin>>(
      `/vaksins/by-name/${namaVaksin}`
    );

    return response.data.data;
  },

  // NEW: Get by type (Vaksin or Vitamin)
  getVaksinByType: async (type: "Vaksin" | "Vitamin"): Promise<Vaksin[]> => {
    const response = await api.get<PaginatedResponse<Vaksin>>(
      `/vaksins/by-type/${type}`
    );

    return response.data.data;
  },

  getLowStockVaksins: async (): Promise<Vaksin[]> => {
    const response = await api.get<ApiResponse<Vaksin[]>>("/vaksins/low-stock");

    return response.data.data;
  },

  createVaksin: async (
    data: Partial<CreateVaksinDto>
  ): Promise<CreateVaksinDto> => {
    const response = await api.post<ApiResponse<CreateVaksinDto>>(
      "/vaksins",
      data
    );

    return response.data.data;
  },

  updateVaksin: async (
    id: string,
    data: Partial<UpdateVaksinDto>
  ): Promise<UpdateVaksinDto> => {
    const response = await api.put<ApiResponse<UpdateVaksinDto>>(
      `/vaksins/${id}`,
      data
    );

    return response.data.data;
  },

  updateStock: async (id: string, data: UpdateStockDto): Promise<Vaksin> => {
    const response = await api.put<ApiResponse<Vaksin>>(
      `/vaksins/${id}/update-stock`,
      data
    );

    return response.data.data;
  },

  deleteVaksin: async (id: string): Promise<void> => {
    await api.delete(`/vaksins/${id}`);
  },
};
