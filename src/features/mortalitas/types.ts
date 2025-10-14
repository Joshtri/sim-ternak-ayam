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
}

export interface CreateMortalitasDto {
  ayamId: string;
  tanggalKematian: string;
  jumlahKematian: number;
  penyebabKematian: string;
}

export interface UpdateMortalitasDto extends Pick<BaseEntity, "id"> {
  ayamId: string;
  tanggalKematian?: string;
  jumlahKematian?: number;
  penyebabKematian?: string;
}
