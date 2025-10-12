import { CreateMortalitasDto, Mortalitas, UpdateMortalitasDto } from "../types";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

export const mortalitasService = {
  getMortalitas: async (): Promise<Mortalitas[]> => {
    const response =
      await api.get<PaginatedResponse<Mortalitas>>("/mortalitas");

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
