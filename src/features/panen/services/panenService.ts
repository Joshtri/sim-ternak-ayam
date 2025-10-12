import { CreatePanenDto, Panen, UpdatePanenDto } from "../types";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

export const panenService = {
  getPanens: async (): Promise<Panen[]> => {
    const response = await api.get<PaginatedResponse<Panen>>("/panens");

    return response.data.data;
  },

  getPanenById: async (id: string): Promise<Panen> => {
    const response = await api.get<ApiResponse<Panen>>(`/panens/${id}`);

    return response.data.data;
  },

  createPanen: async (
    data: Partial<CreatePanenDto>
  ): Promise<CreatePanenDto> => {
    const response = await api.post<ApiResponse<CreatePanenDto>>(
      "/panens",
      data
    );

    return response.data.data;
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
