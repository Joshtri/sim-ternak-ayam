import {
  CreateOperasionalDto,
  Operasional,
  UpdateOperasionalDto,
  OperasionalFilters,
} from "../types";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

export const operasionalService = {
  getOperasionals: async (
    filters?: OperasionalFilters | any
  ): Promise<Operasional[]> => {
    const params: Record<string, any> = {};

    if (filters) {
      if (filters.period) params.period = filters.period;
      if (filters.kandangId) params.kandangId = filters.kandangId;
      if (filters.petugasId) params.petugasId = filters.petugasId;
      if (filters.pakanId) params.pakanId = filters.pakanId;
      if (filters.vaksinId) params.vaksinId = filters.vaksinId;
      if (filters.search) params.search = filters.search;

      // Keep existing date range logic if needed, or pass as params if backend supports it
      if (filters.startDate) params.startDate = filters.startDate;
      if (filters.endDate) params.endDate = filters.endDate;
    }

    // Default to base endpoint, assuming it handles filters
    const response = await api.get<PaginatedResponse<Operasional>>("/operasionals", {
      params,
    });

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

  getFormData: async (): Promise<any> => {
    const response = await api.get<ApiResponse<any>>("/operasionals/form-data");
    return response.data.data;
  },

  createOperasionalWithValidation: async (
    data: Partial<CreateOperasionalDto>
  ): Promise<any> => {
    const response = await api.post<ApiResponse<any>>(
      "/operasionals/create-with-validation",
      data
    );
    return response.data;
  },

  validateStock: async (data: {
    vaksinId?: string;
    pakanId?: string;
    jumlah: number;
  }): Promise<any> => {
    const response = await api.post<ApiResponse<any>>(
      "/operasionals/validate-stock",
      data
    );
    return response.data;
  },
};

