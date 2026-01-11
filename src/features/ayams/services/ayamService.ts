import {
  Ayam,
  AyamFilters,
  CreateAyamDto,
  UpdateAyamDto,
  KandangCapacityInfo,
} from "../interface";

import api, { ApiResponse } from "@/lib/axios";

export const ayamService = {
  getAyams: async (filters?: AyamFilters): Promise<Ayam[]> => {
    // Build clean params object
    const params: Record<string, any> = {};

    if (filters) {
      // Convert kandangId to string if provided
      if (filters.kandangId && filters.kandangId.trim() !== "") {
        params["kandangId"] = filters.kandangId;
      }

      // Add search if provided and not empty
      if (filters.search && filters.search.trim() !== "") {
        params["search"] = filters.search.trim();
      }

      // Add pagination if needed (optional for future use)
      if (filters.page) params["page"] = filters.page;
      if (filters.pageSize) params["pageSize"] = filters.pageSize;

      // Pass general dynamic filters if they exist (like 'period')
      if (filters.period) {
        params["period"] = filters.period;
      }
    }

    const response = await api.get<ApiResponse<Ayam[]>>("/ayams", { params });

    return response.data.data;
  },
  getAyam: async (id: string): Promise<Ayam> => {
    const response = await api.get<ApiResponse<Ayam>>(`/ayams/${id}`);

    return response.data.data;
  },

  getKandangCapacity: async (
    kandangId: string,
    periodeRencana?: string
  ): Promise<KandangCapacityInfo> => {
    const params: Record<string, any> = {};

    if (periodeRencana) params["periodeRencana"] = periodeRencana;

    const response = await api.get<ApiResponse<KandangCapacityInfo>>(
      `/ayams/kandang/${kandangId}/kapasitas`,
      { params }
    );

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
