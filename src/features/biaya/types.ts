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
}

export interface CreateBiayaDto {
  jenisBiaya: string;
  tanggal: string;
  jumlah: number;
  petugasId: string;
  operasionalId?: string;
  buktiUrl?: string;
}

export interface UpdateBiayaDto extends Pick<BaseEntity, "id"> {
  jenisBiaya?: string;
  tanggal?: string;
  jumlah?: number;
  petugasId?: string;
  operasionalId?: string;
  buktiUrl?: string;
}
