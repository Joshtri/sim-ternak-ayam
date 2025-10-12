import { Ayam, AyamFilters, CreateAyamDto, UpdateAyamDto } from "../interface";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

export const ayamService = {
  getAyams: async (filters?: AyamFilters): Promise<Ayam[]> => {
    const response = await api.get<PaginatedResponse<Ayam>>("/ayams", {
      params: filters,
    });

    return response.data.data;
  },

  getAyam: async (id: string): Promise<Ayam> => {
    const response = await api.get<ApiResponse<Ayam>>(`/ayams/${id}`);

    return response.data.data;
  },

  createAyam: async (data: CreateAyamDto): Promise<Ayam> => {
    const response = await api.post<ApiResponse<Ayam>>("/ayams", data);

    return response.data.data;
  },

  updateAyam: async (id: string, data: UpdateAyamDto): Promise<Ayam> => {
    const response = await api.put<ApiResponse<Ayam>>(`/ayams/${id}`, data);

    return response.data.data;
  },

  deleteAyam: async (id: string): Promise<void> => {
    await api.delete(`/ayams/${id}`);
  },
};
