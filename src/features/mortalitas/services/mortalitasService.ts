import { CreateMortalitasDto, Mortalitas, UpdateMortalitasDto } from "../types";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

export const mortalitasService = {
  getMortalitas: async (filters?: {
    kandangId?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<Mortalitas[]> => {
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
    }

    const response = await api.get<PaginatedResponse<Mortalitas>>(
      "/mortalitas",
      {
        params,
      }
    );

    return response.data.data;
  },

  getMortalitasById: async (id: string): Promise<Mortalitas> => {
    const response = await api.get<ApiResponse<Mortalitas>>(
      `/mortalitas/${id}`
    );

    return response.data.data;
  },

  createMortalitas: async (
    data: Partial<CreateMortalitasDto>
  ): Promise<CreateMortalitasDto> => {
    const response = await api.post<ApiResponse<CreateMortalitasDto>>(
      "/mortalitas",
      data
    );

    return response.data.data;
  },

  updateMortalitas: async (
    id: string,
    data: Partial<UpdateMortalitasDto>
  ): Promise<UpdateMortalitasDto> => {
    const response = await api.put<ApiResponse<UpdateMortalitasDto>>(
      `/mortalitas/${id}`,
      data
    );

    return response.data.data;
  },

  deleteMortalitas: async (id: string): Promise<void> => {
    await api.delete(`/mortalitas/${id}`);
  },
};
