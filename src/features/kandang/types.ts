import { BaseResponseApi } from "@/interfaces/common";

// Kandang types/interfaces
export interface Kandang {
  id: string;
  namaKandang: string;
  kapasitas: number;
  lokasi: string;
  petugasId: string;
  petugasNama: string | null;
  createdAt: string;
  updateAt: string;
}

export interface CreateKandangDto {
  namaKandang: string;
  kapasitas: number;
  lokasi: string;
  petugasId: string;
}

export interface UpdateKandangDto {
  id: string;
  namaKandang?: string;
  kapasitas?: number;
  lokasi?: string;
  petugasId?: string;
}

export interface KandangFilters extends BaseResponseApi {
  petugasId?: string;
}
