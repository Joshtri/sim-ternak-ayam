/**
 * Jurnal Harian Petugas Types
 * Mengacu pada API endpoints di CLAUDE.md:
 * - POST /api/jurnal-harian
 * - POST /api/jurnal-harian/with-photo
 * - GET /api/jurnal-harian
 * - GET /api/jurnal-harian/{id}
 * - PUT /api/jurnal-harian/{id}
 * - DELETE /api/jurnal-harian/{id}
 * - GET /api/jurnal-harian/laporan
 */

// ============================================
// Jurnal Harian Entity
// ============================================

export interface JurnalHarian {
  id: string;
  petugasId: string;
  namaPetugas: string;
  usernamePetugas: string;
  tanggal: string; // ISO date string
  judulKegiatan: string;
  deskripsiKegiatan: string;
  waktuMulai: string;
  waktuSelesai: string;
  durasiKegiatan: string;
  kandangId: string;
  namaKandang: string;
  lokasiKandang: string;
  catatan: string;
  // fotoKegiatan: string; // Commented out due to backend conversion error
  createdAt: string;
  updatedAt: string;
}

// ============================================
// DTOs for Create/Update
// ============================================

export interface CreateJurnalHarianDto {
  tanggal: string;
  judulKegiatan: string;
  deskripsiKegiatan: string;
  waktuMulai: string;
  waktuSelesai: string;
  kandangId: string;
  catatan?: string;
  // fotoKegiatan?: string; // Commented out due to backend conversion error
}

export interface UpdateJurnalHarianDto {
  tanggal?: string;
  judulKegiatan?: string;
  deskripsiKegiatan?: string;
  waktuMulai?: string;
  waktuSelesai?: string;
  kandangId?: string;
  catatan?: string;
  // fotoKegiatan?: string; // Commented out due to backend conversion error
}

// ============================================
// Query Params for Filtering
// ============================================

export interface JurnalHarianQueryParams {
  petugasId?: string;
  kandangId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// ============================================
// Laporan (Report) Types
// ============================================

export interface JurnalHarianLaporanParams {
  petugasId?: string;
  kandangId?: string;
  startDate: string;
  endDate: string;
}

export interface JurnalHarianLaporan {
  periode: {
    start: string;
    end: string;
  };
  petugas?: {
    id: string;
    name: string;
  };
  summary: {
    totalJurnal: number;
    totalKegiatan: number;
  };
  data: JurnalHarian[];
  breakdownByKandang: {
    kandangId: string;
    namaKandang: string;
    jumlah: number;
  }[];
}
