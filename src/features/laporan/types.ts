/**
 * Laporan Types
 * TypeScript interfaces for report data structures
 */

// ============================================
// Kesehatan Ayam (Health Monitoring)
// ============================================

export interface MortalitasTerbaru {
  tanggalKematian: string;
  jumlahKematian: number;
  penyebabKematian: string;
}

export interface KesehatanAyam {
  kandangId: string;
  namaKandang: string;
  lokasi: string;
  kapasitas: number;
  petugasId: string;
  namaPetugas: string;
  usernamePetugas: string;
  emailPetugas: string;
  noWAPetugas: string;
  totalAyamMasuk: number;
  totalMortalitas: number;
  persentaseMortalitas: number;
  ayamHidup: number;
  tingkatKesehatanPersen: number;
  statusKesehatan: string;
  mortalitasTerbaru: MortalitasTerbaru[];
}

// ============================================
// Laporan Operasional
// ============================================

export interface DetailPerJenis {
  namaJenisKegiatan: string;
  jumlahKegiatan: number;
  totalJumlah: number;
}

export interface DetailPerKandang {
  namaKandang: string;
  lokasi: string;
  jumlahOperasional: number;
  namaPetugas: string;
}

export interface DetailPerPetugas {
  namaPetugas: string;
  username: string;
  jumlahOperasional: number;
  kandangDikelola: string[];
}

export interface LaporanOperasional {
  periode: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  totalOperasional: number;
  totalKandang: number;
  totalPetugas: number;
  detailPerJenis: DetailPerJenis[];
  detailPerKandang: DetailPerKandang[];
  detailPerPetugas: DetailPerPetugas[];
}

export interface LaporanOperasionalFilters {
  startDate?: string;
  endDate?: string;
  preset?: "thisWeek" | "lastWeek" | "thisMonth" | "lastMonth";
}

// ============================================
// Produktivitas (Productivity Analysis)
// ============================================

export interface KandangDikelola {
  kandangId: string;
  namaKandang: string;
  lokasi: string;
  kapasitas: number;
  totalAyam: number;
  totalOperasional: number;
  totalMortalitas: number;
  persentaseMortalitas: number;
  tingkatPengisianPersen: number;
  tanggalOperasionalTerakhir: string;
  jenisKegiatanTerakhir: string;
}

export interface Produktivitas {
  petugasId: string;
  namaPetugas: string;
  username: string;
  email: string;
  kandangDikelola: KandangDikelola[];
  totalKandang: number;
  totalOperasional: number;
  totalAyamDikelola: number;
  totalMortalitas: number;
  rataMortalitasPersen: number;
  ratingPerforma: string;
  skorProduktivitas: number;
}

// ============================================
// Helper Types
// ============================================

export type HealthStatus = "Baik" | "Sedang" | "Buruk";
export type PerformanceRating = "Sangat Baik" | "Baik" | "Cukup" | "Kurang";

export interface DatePreset {
  label: string;
  value: "thisWeek" | "lastWeek" | "thisMonth" | "lastMonth";
  startDate: Date;
  endDate: Date;
}
