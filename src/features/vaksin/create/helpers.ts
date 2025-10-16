/**
 * Vaksin Management Helper Functions
 */

import type { CreateVaksinDto } from "../types";

/**
 * Vaksin form data interface
 */
export interface VaksinFormData {
  namaVaksin: string;
  stok: number;
  bulan: number;
  tahun: number;
}

/**
 * Get default form values
 */
export const getDefaultVaksinFormValues = (): Partial<VaksinFormData> => {
  const currentDate = new Date();
  return {
    namaVaksin: "",
    stok: 0,
    bulan: currentDate.getMonth() + 1, // Current month (1-12)
    tahun: currentDate.getFullYear(), // Current year
  };
};

/**
 * Transform form data to CreateVaksinDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformVaksinFormData = (data: VaksinFormData): CreateVaksinDto => {
  return {
    namaVaksin: data.namaVaksin,
    stok: Number(data.stok),
    bulan: Number(data.bulan),
    tahun: Number(data.tahun),
  };
};

/**
 * Format stok for display
 * @param stok - Stock amount
 * @returns Formatted string
 */
export const formatStok = (stok: number): string => {
  return `${stok.toLocaleString("id-ID")} unit`;
};

/**
 * Check if stock is low (below threshold)
 * @param stok - Current stock
 * @param threshold - Low stock threshold (default: 50 for vaksin)
 * @returns Boolean indicating if stock is low
 */
export const isLowStock = (stok: number, threshold: number = 50): boolean => {
  return stok < threshold;
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
