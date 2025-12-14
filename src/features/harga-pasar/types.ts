import { BaseResponse } from "@/types/api";

export interface HargaPasar {
    id: string;
    hargaPerKg: number;
    tanggalMulai: string;
    tanggalBerakhir?: string;
    keterangan?: string;
    isAktif: boolean;
    wilayah?: string;
    createdAt: string;
    updatedAt: string;

    // Helper fields from backend
    statusText?: string;
    durasiBerlaku?: string;
    hargaFormatted?: string;
}

export interface CreateHargaPasarPayload {
    hargaPerKg: number;
    tanggalMulai: string; // YYYY-MM-DD
    keterangan?: string;
    wilayah?: string;
    isAktif?: boolean;
}

export interface UpdateHargaPasarPayload {
    hargaPerKg?: number;
    tanggalMulai?: string;
    tanggalBerakhir?: string;
    keterangan?: string;
    wilayah?: string;
    isAktif?: boolean;
}

export interface HargaPasarResponse extends BaseResponse<HargaPasar> { }
export interface HargaPasarListResponse extends BaseResponse<HargaPasar[]> { }

// --- Analysis Types ---

export interface EstimasiKeuntunganParams {
    totalAyam: number;
    beratRataRata: number;
    tanggalPanen: string;
}

export interface EstimasiKeuntunganResult {
    totalAyam: number;
    beratRataRata: number;
    totalBerat: number;
    hargaPerKg: number;
    totalPendapatan: number;
    tanggalReferensi: string;
    hargaPasarInfo: HargaPasar;
}

export interface KeuntunganPanenResult {
    panenId: string;
    tanggalPanen: string;
    jumlahAyam: number;
    totalBerat: number;
    beratRataRata: number;
    hargaPerKg: number;
    totalPendapatan: number;
    namaKandang: string;
    hargaPasarInfo: HargaPasar;
}

export interface DetailHarian {
    tanggal: string;
    jumlahPanen: number;
    totalAyam: number;
    totalBerat: number;
    totalKeuntungan: number;
    hargaPerKg: number;
    detailPanen?: any[]; // Simplified for now
}

export interface LaporanKeuntunganBulanan {
    tahun: number;
    bulan: number;
    namaBulan: string;
    periode: {
        tanggalMulai: string;
        tanggalAkhir: string;
        jumlahHari: number;
    };
    total: {
        totalPanen: number;
        totalAyam: number;
        totalBerat: number;
        totalPendapatan: number;
        rataRataBeratPerEkor: number;
    };
    detailHarian: DetailHarian[];
    perbandinganBulanSebelumnya: {
        bulanSebelumnya: string;
        totalKeuntunganSebelumnya: number;
        selisihKeuntungan: number;
        persentasePerubahan: number;
        statusPerubahan: string;
    };
    hargaPasarBulanIni: HargaPasar[];
    rataRataHargaPerKg: number;
    fluktusiHarga: {
        hargaTerendah: number;
        hargaTertinggi: number;
        selisihHarga: number;
        persentaseFluktuasi: number;
    };
}

export interface BreakdownBulanan {
    bulan: number;
    namaBulan: string;
    totalKeuntungan: number;
    totalAyam: number;
    totalBerat: number;
    jumlahHariPanen: number;
    rataRataHargaPerKg: number;
}

export interface RingkasanKeuntunganTahunan {
    tahun: number;
    totalTahunan: {
        totalPanen: number;
        totalAyam: number;
        totalBerat: number;
        totalPendapatan: number;
        rataRataBeratPerEkor: number;
    };
    breakdownBulanan: BreakdownBulanan[];
    bulanTerbaik: BreakdownBulanan;
    bulanTerburuk: BreakdownBulanan;
    rataRataKeuntunganPerBulan: number;
    trendTahunan: string;
    fluktusiHargaTahunan: {
        hargaTerendah: number;
        hargaTertinggi: number;
        selisihHarga: number;
        persentaseFluktuasi: number;
    };
}
