import { BaseEntity } from "@/interfaces/common";

// Type for Vaksin/Vitamin (API returns string)
export type VaksinVitaminType = "Vaksin" | "Vitamin";

export interface Vaksin extends BaseEntity {
  namaVaksin: string;
  stok: number;
  bulan: number;
  tahun: number;
  tipe: string; // "Vaksin" or "Vitamin" as string from API
  tipeNama: string; // Display name from API
  jenis?: string; // Optional, might not exist in response
  satuan?: string; // Optional, might not exist in response
  hargaPerSatuan?: number; // Optional, might not exist in response
  stokTersisa?: number;
  stokTerpakai?: number;
  statusStok?: "Aman" | "Menipis" | "Kritis" | "Habis";
  isStokCukup?: boolean;
  rekomendasi?: string;
}

export interface CreateVaksinDto {
  namaVaksin: string;
  stok: number;
  bulan: number;
  tahun: number;
  tipe: VaksinVitaminType; // "Vaksin" or "Vitamin"
}

export interface UpdateVaksinDto extends Pick<BaseEntity, "id"> {
  namaVaksin?: string;
  stok?: number;
  bulan?: number;
  tahun?: number;
  tipe?: VaksinVitaminType;
}

export interface UpdateStockDto {
  stok: number;
}
