import { useQuery } from "@tanstack/react-query";
import { hargaPasarService } from "@/features/harga-pasar/services/hargaPasarService";
import { EstimasiKeuntunganParams } from "@/features/harga-pasar/types";

export const analysisKeys = {
    all: ["harga-pasar-analysis"] as const,
    estimasi: (params: EstimasiKeuntunganParams) => [...analysisKeys.all, "estimasi", params] as const,
    keuntunganPanen: (id: string) => [...analysisKeys.all, "keuntungan-panen", id] as const,
    laporanBulanan: (tahun: number, bulan: number) => [...analysisKeys.all, "laporan-bulanan", tahun, bulan] as const,
    laporanMingguan: (tahun: number, mingguKe: number) => [...analysisKeys.all, "laporan-mingguan", tahun, mingguKe] as const,
    ringkasanTahunan: (tahun: number) => [...analysisKeys.all, "ringkasan-tahunan", tahun] as const,
};

export function useEstimasiKeuntungan(params: EstimasiKeuntunganParams, enabled: boolean = false) {
    return useQuery({
        queryKey: analysisKeys.estimasi(params),
        queryFn: () => hargaPasarService.hitungKeuntungan(params),
        enabled: enabled && !!params.tanggalPanen && params.totalAyam > 0 && params.beratRataRata > 0,
    });
}

export function useKeuntunganPanen(panenId: string) {
    return useQuery({
        queryKey: analysisKeys.keuntunganPanen(panenId),
        queryFn: () => hargaPasarService.getKeuntunganPanen(panenId),
        enabled: !!panenId,
    });
}

export function useLaporanKeuntunganBulanan(tahun: number, bulan: number) {
    return useQuery({
        queryKey: analysisKeys.laporanBulanan(tahun, bulan),
        queryFn: () => hargaPasarService.getLaporanKeuntunganBulanan(tahun, bulan),
    });
}

export function useLaporanKeuntunganMingguan(tahun: number, mingguKe: number) {
    return useQuery({
        queryKey: analysisKeys.laporanMingguan(tahun, mingguKe),
        queryFn: () => hargaPasarService.getLaporanKeuntunganMingguan(tahun, mingguKe),
    });
}

export function useRingkasanKeuntunganTahunan(tahun: number) {
    return useQuery({
        queryKey: analysisKeys.ringkasanTahunan(tahun),
        queryFn: () => hargaPasarService.getRingkasanKeuntunganTahunan(tahun),
    });
}
