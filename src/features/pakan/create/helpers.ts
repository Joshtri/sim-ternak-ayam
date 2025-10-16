/**
 * Pakan Management Helper Functions
 */

import type { CreatePakanDto } from "../types";

/**
 * Pakan form data interface
 */
export interface PakanFormData {
  namaPakan: string;
  stokKg: number;
  bulan: number;
  tahun: number;
}

/**
 * Get default form values
 */
export const getDefaultPakanFormValues = (): Partial<PakanFormData> => {
  const currentDate = new Date();
  return {
    namaPakan: "",
    stokKg: 0,
    bulan: currentDate.getMonth() + 1, // Current month (1-12)
    tahun: currentDate.getFullYear(), // Current year
  };
};

/**
 * Transform form data to CreatePakanDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformPakanFormData = (data: PakanFormData): CreatePakanDto => {
  return {
    namaPakan: data.namaPakan,
    stokKg: Number(data.stokKg),
    bulan: Number(data.bulan),
    tahun: Number(data.tahun),
  };
};

/**
 * Format stok for display
 * @param stokKg - Stock amount in kg
 * @returns Formatted string
 */
export const formatStok = (stokKg: number): string => {
  return `${stokKg.toLocaleString("id-ID")} kg`;
};

/**
 * Check if stock is low (below threshold)
 * @param stokKg - Current stock in kg
 * @param threshold - Low stock threshold (default: 100)
 * @returns Boolean indicating if stock is low
 */
export const isLowStock = (stokKg: number, threshold: number = 100): boolean => {
  return stokKg < threshold;
};

/**
 * Format month-year for display
 * @param bulan - Month (1-12)
 * @param tahun - Year
 * @returns Formatted string (e.g., "Januari 2025")
 */
export const formatMonthYear = (bulan: number, tahun: number): string => {
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  return `${monthNames[bulan - 1]} ${tahun}`;
};

/**
 * Format month-year in short format
 * @param bulan - Month (1-12)
 * @param tahun - Year
 * @returns Formatted string (e.g., "01/2025")
 */
export const formatMonthYearShort = (bulan: number, tahun: number): string => {
  return `${bulan.toString().padStart(2, '0')}/${tahun}`;
};
