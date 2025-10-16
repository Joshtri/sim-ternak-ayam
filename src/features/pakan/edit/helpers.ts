/**
 * Pakan Edit Helper Functions
 */

import type { UpdatePakanDto, Pakan } from "../types";

/**
 * Pakan edit form data interface
 */
export interface PakanEditFormData {
  
  namaPakan: string;
  stokKg: number;
  bulan: number;
  tahun: number;
}

/**
 * Get default form values from existing pakan data
 */
export const getDefaultPakanEditFormValues = (
  pakan?: Pakan
): Partial<PakanEditFormData> => {
  if (!pakan) {
    const now = new Date();
    return {
      namaPakan: "",
      stokKg: 0,
      bulan: now.getMonth() + 1,
      tahun: now.getFullYear(),
    };
  }

  return {
    namaPakan: pakan.namaPakan || "",
    stokKg: pakan.stokKg || 0,
    bulan: pakan.bulan || new Date().getMonth() + 1,
    tahun: pakan.tahun || new Date().getFullYear(),
  };
};

/**
 * Transform form data to UpdatePakanDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformPakanEditFormData = (
  data: PakanEditFormData,
  id: string
): UpdatePakanDto => {
  return {
    id,
    namaPakan: data.namaPakan,
    stokKg: Number(data.stokKg),
    bulan: Number(data.bulan),
    tahun: Number(data.tahun),
  };
};

/**
 * Format stock in kg for display
 * @param stok - Stock amount
 * @returns Formatted string
 */
export const formatStokKg = (stok: number): string => {
  return `${stok.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} kg`;
};

/**
 * Generate month-year label
 * @param bulan - Month (1-12)
 * @param tahun - Year
 * @returns Formatted string
 */
export const formatBulanTahun = (bulan: number, tahun: number): string => {
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return `${monthNames[bulan - 1]} ${tahun}`;
};
