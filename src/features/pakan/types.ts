import { BaseEntity } from "@/interfaces/common";

export interface Pakan extends BaseEntity {
  namaPakan: string;
  stokKg: number;
  bulan: number;
  tahun: number;
}

export interface CreatePakanDto {
  namaPakan: string;
  stokKg: number;
  bulan: number;
  tahun: number;
}

export interface UpdatePakanDto extends Pick<BaseEntity, "id"> {
  namaPakan?: string;
  stokKg?: number;
  bulan?: number;
  tahun?: number;
}

export interface UpdateStockDto {
  stokKg: number;
}
