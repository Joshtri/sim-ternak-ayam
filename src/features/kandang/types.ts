import { BaseResponseApi } from "@/interfaces/common";

// Kandang types/interfaces
export interface Kandang {
  id: string;
  namaKandang: string;
  kapasitas: number;
  lokasi: string;
  petugasId: string;
  petugasNama: string | null;
  jumlahAyamTerisi?: number;
  kapasitasTersedia?: number;
  persentaseTerisi?: number;
  isKandangPenuh?: boolean;
  statusKapasitas?: string;
  createdAt: string;
  updateAt: string;
}

export interface CreateKandangDto {
  namaKandang: string;
  kapasitas: number;
  lokasi: string;
  petugasId: string;
}

export interface UpdateKandangDto {
  id: string;
  namaKandang?: string;
  kapasitas?: number;
  lokasi?: string;
  petugasId?: string;
}

export interface KandangFilters extends BaseResponseApi {
  petugasId?: string;
}

export interface HistoryAyamMasuk {
  id: string;
  tanggalMasuk: string;
  jumlahMasuk: number;
  sisaHidup: number;
}

export interface HistoryPanen {
  id: string;
  tanggalPanen: string;
  jumlahEkorPanen: number;
  beratRataRata: number;
  totalBerat: number;
  keterangan: string | null;
  namaAyamBatch: string;
}

export interface HistoryMortalitas {
  id: string;
  tanggalKematian: string;
  jumlahKematian: number;
  penyebabKematian: string;
  namaAyamBatch: string;
}

export interface HistoryOperasional {
  id: string;
  tanggal: string;
  jenisKegiatan: string;
  jumlah: number;
  satuan: string | null;
  itemNama: string | null;
  petugasNama: string;
  keterangan: string | null;
}

export interface KandangDetail extends Kandang {
  totalAyamMasuk: number;
  totalPanen: number;
  totalMortalitas: number;
  totalOperasional: number;
  historyAyamMasuk: HistoryAyamMasuk[];
  historyPanen: HistoryPanen[];
  historyMortalitas: HistoryMortalitas[];
  historyOperasional: HistoryOperasional[];
  ayamSisaList?: AyamSisa[];
}

export interface AyamSisa {
  id: string;
  tanggalMasuk: string;
  jumlahMasukAwal: number;
  sisaHidup: number;
  alasanSisa: string;
  tanggalDitandaiSisa: string;
  umurAyam: number;
  perluPerhatian: boolean;
}
