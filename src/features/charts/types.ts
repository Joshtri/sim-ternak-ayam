/**
 * Dashboard Charts Types
 * Mengacu pada API endpoints di CLAUDE.md:
 * - /api/charts/produktivitas-trend
 * - /api/charts/mortalitas-statistik
 * - /api/charts/operasional-breakdown
 * - /api/charts/financial-analysis
 */

// ============================================
// Common Chart Data Structure
// ============================================

export interface ChartDataSeries {
  name: string;
  data: number[];
  color: string;
}

export interface ChartData {
  labels: string[];
  series: ChartDataSeries[];
}

// ============================================
// Produktivitas Trend Chart (API Response)
// ============================================

export interface ProduktivitasTrendApiResponse {
  periode: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  chartData: ChartData;
  totalKandangAktif: number;
  totalOperasionalDilakukan: number;
  rataProduktivitas: number;
}

// Transformed data for Recharts
export interface ProduktivitasTrendDataPoint {
  periode: string;
  jumlahOperasional: number;
}

export interface ProduktivitasTrendChart {
  periode: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  data: ProduktivitasTrendDataPoint[];
  summary: {
    totalKandangAktif: number;
    totalOperasionalDilakukan: number;
    rataProduktivitas: number;
  };
}

// ============================================
// Mortalitas Statistik Chart (API Response)
// ============================================

export interface TopPenyebab {
  penyebab: string;
  jumlah: number;
  persentase: number;
}

export interface MortalitasStatistikApiResponse {
  kandangId: string | null;
  namaKandang: string;
  periode: string;
  chartData: ChartData;
  totalMortalitas: number;
  totalAyam: number;
  persentaseMortalitas: number;
  topPenyebab: TopPenyebab[];
}

// Transformed data for Recharts
export interface MortalitasDataPoint {
  periode: string;
  jumlahMati: number;
}

export interface MortalitasStatistikChart {
  kandangId: string | null;
  namaKandang: string;
  periode: string;
  data: MortalitasDataPoint[];
  summary: {
    totalMortalitas: number;
    totalAyam: number;
    persentaseMortalitas: number;
  };
  topPenyebab: TopPenyebab[];
}

// ============================================
// Operasional Breakdown Chart (API Response)
// ============================================

export interface OperasionalCategory {
  namaKegiatan: string;
  jumlahOperasional: number;
  persentase: number;
  color: string;
}

export interface OperasionalBreakdownApiResponse {
  petugasId: string | null;
  namaPetugas: string;
  periode: string;
  categories: OperasionalCategory[];
  totalOperasional: number;
  totalKandangDikelola: number;
  kategoriTerbanyak: string;
}

// Transformed data for Recharts
export interface OperasionalBreakdownItem {
  name: string;
  value: number;
  jumlah: number;
  color: string;
}

export interface OperasionalBreakdownChart {
  petugasId: string | null;
  namaPetugas: string;
  periode: string;
  data: OperasionalBreakdownItem[];
  summary: {
    totalOperasional: number;
    totalKandangDikelola: number;
    kategoriTerbanyak: string;
  };
}

// ============================================
// Financial Analysis Chart (API Response)
// ============================================

export interface BiayaBreakdownItem {
  jenisBiaya: string;
  totalBiaya: number;
  persentase: number;
}

export interface FinancialAnalysisApiResponse {
  tanggalMulai: string;
  tanggalSelesai: string;
  chartData: ChartData;
  totalRevenue: number;
  totalCost: number;
  netProfit: number;
  profitMargin: number;
  biayaBreakdown: BiayaBreakdownItem[];
}

// Transformed data for Recharts
export interface FinancialDataPoint {
  periode: string;
  revenue: number;
  cost: number;
  profit: number;
}

export interface FinancialAnalysisChart {
  tanggalMulai: string;
  tanggalSelesai: string;
  data: FinancialDataPoint[];
  summary: {
    totalRevenue: number;
    totalCost: number;
    netProfit: number;
    profitMargin: number;
  };
  biayaBreakdown: BiayaBreakdownItem[];
}

// ============================================
// Query Params for Chart Filters
// ============================================

export interface ChartQueryParams {
  kandang_id?: string;
  start_date?: string;
  end_date?: string;
  periode_type?: 'mingguan' | 'bulanan' | 'tahunan';
  limit?: number;
}
