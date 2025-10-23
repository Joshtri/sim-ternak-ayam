import {
  CreateKandangAsistenDto,
  KandangAsistenResponseDto,
  UpdateKandangAsistenDto,
} from "../types";

import api, { ApiResponse, PaginatedResponse } from "@/lib/axios";

export const kandangAsistenService = {
  /**
   * Get all kandang assistants
   */
  getKandangAsistens: async (): Promise<KandangAsistenResponseDto[]> => {
    const response =
      await api.get<PaginatedResponse<KandangAsistenResponseDto>>(
        "/kandang-asistens"
      );

    return response.data.data;
  },

  /**
   * Get kandang assistant by ID
   */
  getKandangAsistenById: async (
    id: string
  ): Promise<KandangAsistenResponseDto> => {
    const response = await api.get<ApiResponse<KandangAsistenResponseDto>>(
      `/kandang-asistens/${id}`
    );

    return response.data.data;
  },

  /**
   * Get all assistants for a specific kandang
   */
  getAsistensByKandang: async (
    kandangId: string
  ): Promise<KandangAsistenResponseDto[]> => {
    const response = await api.get<
      PaginatedResponse<KandangAsistenResponseDto>
    >(`/kandang-asistens/by-kandang/${kandangId}`);

    return response.data.data;
  },

  /**
   * Get active assistants only for a specific kandang
   */
  getActiveAsistensByKandang: async (
    kandangId: string
  ): Promise<KandangAsistenResponseDto[]> => {
    const response = await api.get<
      PaginatedResponse<KandangAsistenResponseDto>
    >(`/kandang-asistens/by-kandang/${kandangId}/active`);

    return response.data.data;
  },

  /**
   * Get kandang assignments for a specific asisten
   */
  getKandangsByAsisten: async (
    asistenId: string
  ): Promise<KandangAsistenResponseDto[]> => {
    const response = await api.get<
      PaginatedResponse<KandangAsistenResponseDto>
    >(`/kandang-asistens/by-asisten/${asistenId}`);

    return response.data.data;
  },

  /**
   * Create new kandang assistant assignment
   */
  createKandangAsisten: async (
    data: CreateKandangAsistenDto
  ): Promise<KandangAsistenResponseDto> => {
    const response = await api.post<ApiResponse<KandangAsistenResponseDto>>(
      "/kandang-asistens",
      data
    );

    return response.data.data;
  },

  /**
   * Update kandang assistant assignment
   */
  updateKandangAsisten: async (
    id: string,
    data: UpdateKandangAsistenDto
  ): Promise<KandangAsistenResponseDto> => {
    const response = await api.put<ApiResponse<KandangAsistenResponseDto>>(
      `/kandang-asistens/${id}`,
      data
    );

    return response.data.data;
  },

  /**
   * Delete kandang assistant assignment
   */
  deleteKandangAsisten: async (id: string): Promise<void> => {
    await api.delete(`/kandang-asistens/${id}`);
  },
};
