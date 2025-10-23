import { BaseEntity } from "@/interfaces/common";

export interface Biaya extends BaseEntity {
  jenisBiaya: string;
  tanggal: string;
  jumlah: number;
  petugasId: string;
  petugasNama: string;
  operasionalId?: string;
  operasionalJenisKegiatan?: string;
  buktiUrl?: string;
  kandangId?: string;        // NEW: Optional kandang ID
  kandangNama?: string;      // NEW: Kandang name
  keterangan?: string;       // NEW: Additional notes
  catatan?: string;          // NEW: Optional notes
  bulan?: number;            // NEW: Month (1-12)
  tahun?: number;            // NEW: Year
}

export interface CreateBiayaDto {
  jenisBiaya: string;
  tanggal: string;
  jumlah: number;
  petugasId: string;
  operasionalId?: string;
  buktiUrl?: string;
  kandangId?: string;        // NEW: Optional kandang ID
  keterangan?: string;       // NEW: Additional notes
  catatan?: string;          // NEW: Optional notes
  bulan?: number;            // NEW: Month (1-12)
  tahun?: number;            // NEW: Year
}

export interface UpdateBiayaDto extends Pick<BaseEntity, "id"> {
  jenisBiaya?: string;
  tanggal?: string;
  jumlah?: number;
  petugasId?: string;
  operasionalId?: string;
  buktiUrl?: string;
  kandangId?: string;
  keterangan?: string;
  catatan?: string;
  bulan?: number;
  tahun?: number;
}

// NEW: Types for Monthly Costs Recap
export interface BiayaItemDto {
  jenisBiaya: string;
  jumlah: number;
  tanggal: string;
  keterangan?: string;
  catatan?: string;
}

export interface BiayaKandangDetailDto {
  kandangId?: string;
  kandangNama: string;
  totalBiaya: number;
  detailBiaya: BiayaItemDto[];
}

export interface BiayaBulananResponseDto {
  bulan: number;
  tahun: number;
  totalBiaya: number;
  detailPerKandang: BiayaKandangDetailDto[];
}
