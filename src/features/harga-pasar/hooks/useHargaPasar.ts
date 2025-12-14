import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { hargaPasarService } from "../services/hargaPasarService";
import { CreateHargaPasarPayload, UpdateHargaPasarPayload } from "../types";
import { getErrorMessage } from "@/lib/axios";
import { showToast } from "@/utils/showToast";

export const hargaPasarKeys = {
    all: ["harga-pasar"] as const,
    lists: () => [...hargaPasarKeys.all, "list"] as const,
    list: () => [...hargaPasarKeys.lists()] as const,
    details: () => [...hargaPasarKeys.all, "detail"] as const,
    detail: (id: string) => [...hargaPasarKeys.details(), id] as const,
    terbaru: () => [...hargaPasarKeys.all, "terbaru"] as const,
    riwayat: (startDate: string, endDate: string) => [...hargaPasarKeys.all, "riwayat", startDate, endDate] as const,
};

export function useHargaPasars() {
    return useQuery({
        queryKey: hargaPasarKeys.list(),
        queryFn: () => hargaPasarService.getAll(),
    });
}

export function useHargaPasarById(id: string, enabled = true) {
    return useQuery({
        queryKey: hargaPasarKeys.detail(id),
        queryFn: () => hargaPasarService.getById(id),
        enabled: enabled && !!id,
    });
}

export function useHargaPasarTerbaru() {
    return useQuery({
        queryKey: hargaPasarKeys.terbaru(),
        queryFn: () => hargaPasarService.getTerbaru(),
    });
}

export function useRiwayatHargaPasar(startDate: string, endDate: string, enabled = true) {
    return useQuery({
        queryKey: hargaPasarKeys.riwayat(startDate, endDate),
        queryFn: () => hargaPasarService.getRiwayat(startDate, endDate),
        enabled: enabled && !!startDate && !!endDate,
    });
}

export function useCreateHargaPasar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateHargaPasarPayload) => hargaPasarService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: hargaPasarKeys.lists() });
            queryClient.invalidateQueries({ queryKey: hargaPasarKeys.terbaru() });
            showToast({
                title: "Berhasil!",
                description: "Data Harga Pasar berhasil dibuat",
                color: "success",
            });
        },
        onError: error => {
            const msg = getErrorMessage(error);
            showToast({
                title: "Gagal Membuat Harga Pasar",
                description: msg,
                color: "error",
            });
        },
    });
}

export function useUpdateHargaPasar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateHargaPasarPayload }) =>
            hargaPasarService.update(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: hargaPasarKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: hargaPasarKeys.lists() });
            queryClient.invalidateQueries({ queryKey: hargaPasarKeys.terbaru() });
            showToast({
                title: "Berhasil!",
                description: "Data Harga Pasar berhasil diupdate",
                color: "success",
            });
        },
        onError: error => {
            const msg = getErrorMessage(error);
            showToast({
                title: "Gagal Update Harga Pasar",
                description: msg,
                color: "error",
            });
        },
    });
}

export function useUpdateHargaPasarStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, isAktif }: { id: string; isAktif: boolean }) =>
            hargaPasarService.updateStatus(id, isAktif),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: hargaPasarKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: hargaPasarKeys.lists() });
            queryClient.invalidateQueries({ queryKey: hargaPasarKeys.terbaru() });
            showToast({
                title: "Berhasil!",
                description: "Status Harga Pasar berhasil diperbarui",
                color: "success",
            });
        },
        onError: error => {
            const msg = getErrorMessage(error);
            showToast({
                title: "Gagal Update Status",
                description: msg,
                color: "error",
            });
        },
    });
}

export function useDeactivateAllHargaPasar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => hargaPasarService.deactivateAll(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: hargaPasarKeys.lists() });
            queryClient.invalidateQueries({ queryKey: hargaPasarKeys.terbaru() });
            showToast({
                title: "Berhasil!",
                description: "Semua Harga Pasar dinonaktifkan",
                color: "success",
            });
        },
        onError: error => {
            const msg = getErrorMessage(error);
            showToast({
                title: "Gagal Deaktivasi",
                description: msg,
                color: "error",
            });
        },
    });
}

export function useDeleteHargaPasar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => hargaPasarService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: hargaPasarKeys.lists() });
            queryClient.invalidateQueries({ queryKey: hargaPasarKeys.terbaru() });
            showToast({
                title: "Berhasil!",
                description: "Data Harga Pasar berhasil dihapus",
                color: "success",
            });
        },
        onError: error => {
            const msg = getErrorMessage(error);
            showToast({
                title: "Gagal Menghapus Data",
                description: msg,
                color: "error",
            });
        },
    });
}
