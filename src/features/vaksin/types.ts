import { BaseEntity } from "@/interfaces/common";

export interface Vaksin extends BaseEntity {
  namaVaksin: string;
  stok: number;
  bulan: number;
  tahun: number;
}

export interface CreateVaksinDto {
  namaVaksin: string;
  stok: number;
  bulan: number;
  tahun: number;
}

export interface UpdateVaksinDto extends Pick<BaseEntity, "id"> {
  namaVaksin?: string;
  stok?: number;
  bulan?: number;
  tahun?: number;
}

export interface UpdateStockDto {
  stok: number;
}
