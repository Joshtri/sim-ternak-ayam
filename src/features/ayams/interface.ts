import { BaseEntity, BaseResponseApi } from "@/interfaces/common";

export interface Ayam extends BaseEntity {
  kandangId: string;
  kandangNama: string;
  tanggalMasuk: string;
  jumlahMasuk: number;
}

export interface CreateAyamDto {
  kandangId: string;
  tanggalMasuk: string;
  jumlahMasuk: number;
}

export interface UpdateAyamDto extends Pick<BaseEntity, "id"> {
  kandangId?: string;
  tanggalMasuk?: string;
  jumlahMasuk?: number;
}

export interface AyamFilters extends BaseResponseApi {}
