import {
    CreateHargaPasarPayload,
    HargaPasar,
    UpdateHargaPasarPayload,
    EstimasiKeuntunganParams,
    EstimasiKeuntunganResult,
    KeuntunganPanenResult,
    LaporanKeuntunganBulanan,
    RingkasanKeuntunganTahunan,
} from "../types";

import api, { ApiResponse } from "@/lib/axios";

export const hargaPasarService = {
    getAll: async (): Promise<HargaPasar[]> => {
        // According to specs: GET /api/harga_pasar (all)
        // Note: Assuming it returns list directly in data, or wrapped.
        // Spec says: Response DTO ... or helper fields. Common format.
        const response = await api.get<ApiResponse<HargaPasar[]>>("/harga_pasar");

        return response.data.data;
    },

    getById: async (id: string): Promise<HargaPasar> => {
        const response = await api.get<ApiResponse<HargaPasar>>(
            `/harga_pasar/${id}`
        );

        return response.data.data;
    },

    getTerbaru: async (): Promise<HargaPasar> => {
        const response = await api.get<ApiResponse<HargaPasar>>(
            "/harga_pasar/terbaru"
        );

        return response.data.data;
    },

    getByTanggal: async (tanggal: string): Promise<HargaPasar> => {
        const response = await api.get<ApiResponse<HargaPasar>>(
            `/harga_pasar/by-tanggal?tanggal=${tanggal}`
        );

        return response.data.data;
    },

    getRiwayat: async (
        startDate: string,
        endDate: string
    ): Promise<HargaPasar[]> => {
        const response = await api.get<ApiResponse<HargaPasar[]>>(
            `/harga_pasar/riwayat?startDate=${startDate}&endDate=${endDate}`
        );

        return response.data.data;
    },

    create: async (data: CreateHargaPasarPayload): Promise<HargaPasar> => {
        const response = await api.post<ApiResponse<HargaPasar>>(
            "/harga_pasar",
            data
        );

        return response.data.data;
    },

    update: async (
        id: string,
        data: UpdateHargaPasarPayload
    ): Promise<HargaPasar> => {
        const response = await api.put<ApiResponse<HargaPasar>>(
            `/harga_pasar/${id}`,
            data
        );

        return response.data.data;
    },

    updateStatus: async (id: string, isAktif: boolean): Promise<void> => {
        await api.patch(`/harga_pasar/${id}/status?isAktif=${isAktif}`);
    },

    deactivateAll: async (): Promise<void> => {
        await api.post("/harga_pasar/deactivate-all");
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/harga_pasar/${id}`);
    },

    // --- Analysis Endpoints ---

    hitungKeuntungan: async (
        params: EstimasiKeuntunganParams
    ): Promise<EstimasiKeuntunganResult> => {
        const response = await api.get<ApiResponse<EstimasiKeuntunganResult>>(
            `/harga_pasar/hitung-keuntungan?totalAyam=${params.totalAyam}&beratRataRata=${params.beratRataRata}&tanggalPanen=${params.tanggalPanen}`
        );

        return response.data.data;
    },

    getKeuntunganPanen: async (
        panenId: string
    ): Promise<KeuntunganPanenResult> => {
        const response = await api.get<ApiResponse<KeuntunganPanenResult>>(
            `/harga_pasar/keuntungan-panen/${panenId}`
        );

        return response.data.data;
    },

    getLaporanKeuntunganBulanan: async (
        tahun: number,
        bulan: number
    ): Promise<LaporanKeuntunganBulanan> => {
        const response = await api.get<ApiResponse<LaporanKeuntunganBulanan>>(
            `/harga_pasar/laporan-keuntungan-bulanan?tahun=${tahun}&bulan=${bulan}`
        );

        return response.data.data;
    },

    getLaporanKeuntunganMingguan: async (
        tahun: number,
        mingguKe: number
    ): Promise<LaporanKeuntunganBulanan> => {
        // Assuming the response structure is similar to monthly for now, or adapt as needed based on "Similar structure to monthly"
        const response = await api.get<ApiResponse<LaporanKeuntunganBulanan>>(
            `/harga_pasar/laporan-keuntungan-mingguan?tahun=${tahun}&mingguKe=${mingguKe}`
        );

        return response.data.data;
    },

    getRingkasanKeuntunganTahunan: async (
        tahun: number
    ): Promise<RingkasanKeuntunganTahunan> => {
        const response = await api.get<ApiResponse<RingkasanKeuntunganTahunan>>(
            `/harga_pasar/ringkasan-keuntungan-tahunan?tahun=${tahun}`
        );

        return response.data.data;
    },
};
