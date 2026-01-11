import { BaseEntity } from "@/interfaces/common";

// Enum values for Vaksin/Vitamin
export enum VaksinVitaminTypeEnum {
  Vaksin = 0,
  Vitamin = 1,
}

export interface Vaksin extends BaseEntity {
  namaVaksin: string;
  stok: number;
  stokAwal?: number;
  stokTerpakai?: number;
  stokTersisa?: number;
  bulan: number;
  tahun: number;
  tipe: number; // Enum value (0 or 1)
  tipeNama: string; // "Vaksin" or "Vitamin"
  jenis?: string;
  satuan?: string;
  hargaPerSatuan?: number;
  statusStok?: string;
  isStokCukup?: boolean;
  rekomendasi?: string;
}

export interface CreateVaksinDto {
  namaVaksin: string;
  stok: number;
  bulan: number;
  tahun: number;
  tipe: VaksinVitaminTypeEnum;
  stokAwal?: number;
}

export interface UpdateVaksinDto extends Pick<BaseEntity, "id"> {
  namaVaksin?: string;
  stok?: number;
  bulan?: number;
  tahun?: number;
  tipe?: VaksinVitaminTypeEnum;
}

export interface UpdateStockDto {
  stok: number;
}
