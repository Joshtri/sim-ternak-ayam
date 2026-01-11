import { BaseEntity } from "@/interfaces/common";

export interface Mortalitas extends BaseEntity {
  ayamId: string;
  tanggalKematian: string;
  jumlahKematian: number;
  petugasId: string;
  petugasNama: string;
  kandangId: string;
  kandangNama: string;
  jumlahAyamSebelumMati: number;
  penyebabKematian: string;
  jumlahAyamSesudahMati: number;
  fotoMortalitas?: string;
  fotoMortalitasBase64?: string;
  persentaseMortalitas?: number;
  kapasitasKandang?: number;
  persentaseUtilisasiSebelum?: number;
  persentaseUtilisasiSesudah?: number;
  statusDampak?: string;
  rekomendasi?: string;
}

export interface MortalitasFilters {
  kandangId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  period?: string;
}

export interface CreateMortalitasDto {
  ayamId: string;
  tanggalKematian: string;
  jumlahKematian: number;
  penyebabKematian: string;
  fotoMortalitasBase64?: string;
  fotoMortalitasFileName?: string;
}

export interface UpdateMortalitasDto extends Pick<BaseEntity, "id"> {
  ayamId: string;
  tanggalKematian?: string;
  jumlahKematian?: number;
  penyebabKematian?: string;
  fotoMortalitasBase64?: string;
  fotoMortalitasFileName?: string;
}
