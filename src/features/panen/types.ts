import { BaseEntity } from "@/interfaces/common";

export interface Panen extends BaseEntity {
  ayamId: string;
  namaKandang: string;
  tanggalPanen: string;
  jumlahEkorPanen: number;
  beratRataRata: number;
}

export interface CreatePanenDto {
  ayamId: string;
  tanggalPanen: string;
  jumlahEkorPanen: number;
  beratRataRata: number;
}

export interface UpdatePanenDto extends Pick<BaseEntity, "id"> {
  ayamId: string;
  tanggalPanen?: string;
  jumlahEkorPanen?: number;
  beratRataRata?: number;
}
