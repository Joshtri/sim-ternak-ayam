import {
  CreateJenisKegiatanDto,
  JenisKegiatan,
  UpdateJenisKegiatanDto,
} from "../types";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

export const jenisKegiatanService = {
  getJenisKegiatans: async (): Promise<JenisKegiatan[]> => {
    const response = await api.get<PaginatedResponse<JenisKegiatan>>(
      "/jenis-kegiatans"
    );

    return response.data.data;
  },

  getJenisKegiatanById: async (id: string): Promise<JenisKegiatan> => {
    const response = await api.get<ApiResponse<JenisKegiatan>>(
      `/jenis-kegiatans/${id}`
    );

    return response.data.data;
  },

  getJenisKegiatanByName: async (
    namaKegiatan: string
  ): Promise<JenisKegiatan> => {
    const response = await api.get<ApiResponse<JenisKegiatan>>(
      `/jenis-kegiatans/by-name/${namaKegiatan}`
    );

    return response.data.data;
  },

  getJenisKegiatanBySatuan: async (satuan: string): Promise<JenisKegiatan[]> => {
    const response = await api.get<PaginatedResponse<JenisKegiatan>>(
      `/jenis-kegiatans/by-satuan/${satuan}`
    );

    return response.data.data;
  },

  createJenisKegiatan: async (
    data: Partial<CreateJenisKegiatanDto>
  ): Promise<CreateJenisKegiatanDto> => {
    const response = await api.post<ApiResponse<CreateJenisKegiatanDto>>(
      "/jenis-kegiatans",
      data
    );

    return response.data.data;
  },

  updateJenisKegiatan: async (
    id: string,
    data: Partial<UpdateJenisKegiatanDto>
  ): Promise<UpdateJenisKegiatanDto> => {
    const response = await api.put<ApiResponse<UpdateJenisKegiatanDto>>(
      `/jenis-kegiatans/${id}`,
      data
    );

    return response.data.data;
  },

  deleteJenisKegiatan: async (id: string): Promise<void> => {
    await api.delete(`/jenis-kegiatans/${id}`);
  },
};
