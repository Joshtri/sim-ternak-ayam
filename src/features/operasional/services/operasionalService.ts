import {
  CreateOperasionalDto,
  Operasional,
  UpdateOperasionalDto,
  OperasionalFilters,
} from "../types";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

export const operasionalService = {
  getOperasionals: async (
    filters?: OperasionalFilters
  ): Promise<Operasional[]> => {
    let url = "/operasionals";
    const params = new URLSearchParams();

    if (filters?.startDate && filters?.endDate) {
      url = "/operasionals/by-date-range";
      params.append("startDate", filters.startDate);
      params.append("endDate", filters.endDate);
    }

    const response = await api.get<PaginatedResponse<Operasional>>(
      `${url}${params.toString() ? `?${params.toString()}` : ""}`
    );

    return response.data.data;
  },

  getOperasionalById: async (id: string): Promise<Operasional> => {
    const response = await api.get<ApiResponse<Operasional>>(
      `/operasionals/${id}`
    );

    return response.data.data;
  },

  getOperasionalByKandang: async (kandangId: string): Promise<Operasional[]> => {
    const response = await api.get<PaginatedResponse<Operasional>>(
      `/operasionals/by-kandang/${kandangId}`
    );

    return response.data.data;
  },

  getOperasionalByJenisKegiatan: async (
    jenisKegiatanId: string
  ): Promise<Operasional[]> => {
    const response = await api.get<PaginatedResponse<Operasional>>(
      `/operasionals/by-jenis-kegiatan/${jenisKegiatanId}`
    );

    return response.data.data;
  },

  createOperasional: async (
    data: Partial<CreateOperasionalDto>
  ): Promise<CreateOperasionalDto> => {
    const response = await api.post<ApiResponse<CreateOperasionalDto>>(
      "/operasionals",
      data
    );

    return response.data.data;
  },

  updateOperasional: async (
    id: string,
    data: Partial<UpdateOperasionalDto>
  ): Promise<UpdateOperasionalDto> => {
    const response = await api.put<ApiResponse<UpdateOperasionalDto>>(
      `/operasionals/${id}`,
      data
    );

    return response.data.data;
  },

  deleteOperasional: async (id: string): Promise<void> => {
    await api.delete(`/operasionals/${id}`);
  },
};
