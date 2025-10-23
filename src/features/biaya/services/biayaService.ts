import { CreateBiayaDto, Biaya, UpdateBiayaDto, BiayaBulananResponseDto } from "../types";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

export const biayaService = {
  getBiayas: async (): Promise<Biaya[]> => {
    const response = await api.get<PaginatedResponse<Biaya>>("/biayas");

    return response.data.data;
  },

  getBiayaById: async (id: string): Promise<Biaya> => {
    const response = await api.get<ApiResponse<Biaya>>(`/biayas/${id}`);

    return response.data.data;
  },

  // NEW: Get monthly recap of costs
  getRekapBulanan: async (bulan: number, tahun: number): Promise<BiayaBulananResponseDto> => {
    const response = await api.get<ApiResponse<BiayaBulananResponseDto>>(
      `/biayas/rekap-bulanan/${bulan}/${tahun}`
    );

    return response.data.data;
  },

  createBiaya: async (data: Partial<CreateBiayaDto>): Promise<CreateBiayaDto> => {
    const response = await api.post<ApiResponse<CreateBiayaDto>>(
      "/biayas",
      data
    );

    return response.data.data;
  },

  updateBiaya: async (
    id: string,
    data: Partial<UpdateBiayaDto>
  ): Promise<UpdateBiayaDto> => {
    const response = await api.put<ApiResponse<UpdateBiayaDto>>(
      `/biayas/${id}`,
      data
    );

    return response.data.data;
  },

  deleteBiaya: async (id: string): Promise<void> => {
    await api.delete(`/biayas/${id}`);
  },
};
