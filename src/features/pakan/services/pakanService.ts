import { CreatePakanDto, Pakan, UpdatePakanDto, UpdateStockDto } from "../types";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

export const pakanService = {
  getPakans: async (): Promise<Pakan[]> => {
    const response = await api.get<PaginatedResponse<Pakan>>("/pakans");

    return response.data.data;
  },

  getPakanById: async (id: string): Promise<Pakan> => {
    const response = await api.get<ApiResponse<Pakan>>(`/pakans/${id}`);

    return response.data.data;
  },

  getPakanByName: async (namaPakan: string): Promise<Pakan> => {
    const response = await api.get<ApiResponse<Pakan>>(
      `/pakans/by-name/${namaPakan}`
    );

    return response.data.data;
  },

  getLowStockPakans: async (): Promise<Pakan[]> => {
    const response = await api.get<PaginatedResponse<Pakan>>("/pakans/low-stock");

    return response.data.data;
  },

  createPakan: async (data: Partial<CreatePakanDto>): Promise<CreatePakanDto> => {
    const response = await api.post<ApiResponse<CreatePakanDto>>(
      "/pakans",
      data
    );

    return response.data.data;
  },

  updatePakan: async (
    id: string,
    data: Partial<UpdatePakanDto>
  ): Promise<UpdatePakanDto> => {
    const response = await api.put<ApiResponse<UpdatePakanDto>>(
      `/pakans/${id}`,
      data
    );

    return response.data.data;
  },

  updateStock: async (
    id: string,
    data: UpdateStockDto
  ): Promise<Pakan> => {
    const response = await api.put<ApiResponse<Pakan>>(
      `/pakans/${id}/update-stock`,
      data
    );

    return response.data.data;
  },

  deletePakan: async (id: string): Promise<void> => {
    await api.delete(`/pakans/${id}`);
  },
};
