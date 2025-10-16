/**
 * Vaksin Edit Helper Functions
 */

import type { UpdateVaksinDto, Vaksin } from "../types";

/**
 * Vaksin edit form data interface
 */
export interface VaksinEditFormData {
  namaVaksin: string;
  stok: number;
  bulan: number;
  tahun: number;
}

/**
 * Get default form values from existing vaksin data
 */
export const getDefaultVaksinEditFormValues = (
  vaksin?: Vaksin
): Partial<VaksinEditFormData> => {
  if (!vaksin) {
    const now = new Date();

    return {
      namaVaksin: "",
      stok: 0,
      bulan: now.getMonth() + 1,
      tahun: now.getFullYear(),
    };
  }

  return {
    namaVaksin: vaksin.namaVaksin || "",
    stok: vaksin.stok || 0,
    bulan: vaksin.bulan || new Date().getMonth() + 1,
    tahun: vaksin.tahun || new Date().getFullYear(),
  };
};

/**
 * Transform form data to UpdateVaksinDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformVaksinEditFormData = (
  data: VaksinEditFormData,
  id: string
): UpdateVaksinDto => {
  return {
    id, // Will be set in the component
    namaVaksin: data.namaVaksin,
    stok: Number(data.stok),
    bulan: Number(data.bulan),
    tahun: Number(data.tahun),
  };
};

/**
 * Format stock in dosis for display
 * @param stok - Stock amount
 * @returns Formatted string
 */
export const formatStok = (stok: number): string => {
  return `${stok.toLocaleString("id-ID")} dosis`;
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
