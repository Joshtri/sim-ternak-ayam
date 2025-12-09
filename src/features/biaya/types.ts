import { BaseEntity } from "@/interfaces/common";

export interface Biaya extends BaseEntity {
  jenisBiaya: string;
  tanggal: string;
  jumlah: number;
  petugasId: string;
  petugasNama: string;
  operasionalId?: string;
  operasionalJenisKegiatan?: string;
  buktiBase64?: string;
  kandangId?: string;
  kandangNama?: string;
  keterangan?: string;
  catatan?: string;
  bulan?: number;
  tahun?: number;
  kategoriBiaya?: number; // NEW: 0 = Operasional, 1 = Pembelian
}

export interface CreateBiayaDto {
  jenisBiaya: string;
  tanggal: string;
  jumlah: number;
  petugasId: string;
  operasionalId?: string;
  buktiBase64?: string;
  kandangId?: string;
  keterangan?: string;
  catatan?: string;
  bulan?: number;
  tahun?: number;
  kategoriBiaya?: number;
}

export interface UpdateBiayaDto extends Pick<BaseEntity, "id"> {
  jenisBiaya?: string;
  tanggal?: string;
  jumlah?: number;
  petugasId?: string;
  operasionalId?: string;
  buktiBase64?: string;
  kandangId?: string;
  keterangan?: string;
  catatan?: string;
  bulan?: number;
  tahun?: number;
  kategoriBiaya?: number;
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
  grandTotal: number;
  grandTotalBiayaListrik: number;
  grandTotalBiayaAir: number;
  grandTotalBiayaLainnya: number;
  perKandang: BiayaKandangDetailDto[];
}
