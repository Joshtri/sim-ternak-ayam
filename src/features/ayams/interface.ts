import { BaseEntity, BaseResponseApi } from "@/interfaces/common";

export interface Ayam extends BaseEntity {
  kandangId: string;
  kandangNama: string;
  tanggalMasuk: string;
  jumlahMasuk: number;
  petugasKandangNama: string;
  jumlahSudahDipanen: number;
  jumlahMortalitas: number;
  sisaAyamHidup: number;
  persentaseSurvival: number;
  persentaseDipanen: number;
  persentaseMortalitas: number;
  bisaDipanen: boolean;
  perluPerhatianKesehatan: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
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

export interface AyamFilters extends BaseResponseApi {
  kandangId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

// export interface AyamFilters {
//   kandangId?: string; // GUID as string
//   search?: string;
//   page?: number; // for future pagination
//   pageSize?: number; // for future pagination
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   message: string;
//   data: T;
//   statusCode: number;
//   timestamp: string;
// }
