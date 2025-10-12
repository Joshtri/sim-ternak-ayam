import { BaseEntity } from "@/interfaces/common";

export interface JenisKegiatan extends BaseEntity {
  namaKegiatan: string;
  deskripsi: string;
  satuan: string;
  biayaDefault: number;
}

export interface CreateJenisKegiatanDto {
  namaKegiatan: string;
  deskripsi: string;
  satuan: string;
  biayaDefault: number;
}

export interface UpdateJenisKegiatanDto extends Pick<BaseEntity, "id"> {
  namaKegiatan?: string;
  deskripsi?: string;
  satuan?: string;
  biayaDefault?: number;
}
