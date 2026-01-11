import { Panen, UpdatePanenDto } from "../types";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

export const panenService = {
  getPanens: async (filters?: any): Promise<Panen[]> => {
    const params: Record<string, any> = {};

    if (filters) {
      if (filters.period) params["period"] = filters.period;
      if (filters.kandangId) params["kandangId"] = filters.kandangId;
      if (filters.search) params["search"] = filters.search;
    }

    const response = await api.get<PaginatedResponse<Panen>>("/panens", {
      params,
    });

    return response.data.data;
  },

  getPanenById: async (id: string): Promise<Panen> => {
    const response = await api.get<ApiResponse<Panen>>(`/panens/${id}`);

    return response.data.data;
  },

  createPanen: async (data: any): Promise<any> => {
    const response = await api.post<ApiResponse<any>>("/panens", data);

    return response.data.data;
  },

  createPanenAutoFifo: async (data: any): Promise<any> => {
    const response = await api.post<ApiResponse<any>>(
      "/panens/auto-fifo",
      data
    );

    return response.data;
  },

  updatePanen: async (
    id: string,
    data: Partial<UpdatePanenDto>
  ): Promise<UpdatePanenDto> => {
    const response = await api.put<ApiResponse<UpdatePanenDto>>(
      `/panens/${id}`,
      data
    );

    return response.data.data;
  },

  deletePanen: async (id: string): Promise<void> => {
    await api.delete(`/panens/${id}`);
  },
};
