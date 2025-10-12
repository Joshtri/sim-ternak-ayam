import { BaseEntity } from "@/interfaces/common";

export interface Operasional extends BaseEntity {
  jenisKegiatanId: string;
  jenisKegiatanNama: string;
  tanggal: string;
  jumlah: number;
  petugasId: string;
  petugasNama: string;
  kandangId: string;
  kandangNama: string;
  pakanId?: string;
  pakanNama?: string;
  vaksinId?: string;
  vaksinNama?: string;
}

export interface CreateOperasionalDto {
  jenisKegiatanId: string;
  tanggal: string;
  jumlah: number;
  petugasId: string;
  kandangId: string;
  pakanId?: string;
  vaksinId?: string;
}

export interface UpdateOperasionalDto extends Pick<BaseEntity, "id"> {
  jenisKegiatanId: string;
  tanggal?: string;
  jumlah?: number;
  petugasId: string;
  kandangId: string;
  pakanId?: string;
  vaksinId?: string;
}

export interface OperasionalFilters {
  kandangId?: string;
  jenisKegiatanId?: string;
  startDate?: string;
  endDate?: string;
}
