/**
 * Panen Management Helper Functions
 */

import type { CreatePanenDto } from "../types";
import type { SelectOption } from "@/types/form-fields";
import type { Ayam } from "@/features/ayams/interface";

/**
 * Panen form data interface
 */
export interface PanenFormData {
  ayamId: string;
  tanggalPanen: string;
  jumlahEkorPanen: number;
  beratRataRata: number;
}

/**
 * Get default form values
 */
export const getDefaultPanenFormValues = (): Partial<PanenFormData> => ({
  ayamId: "",
  tanggalPanen: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
  jumlahEkorPanen: 0,
  beratRataRata: 0,
});

/**
 * Transform form data to CreatePanenDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformPanenFormData = (data: PanenFormData): CreatePanenDto => {
  return {
    ayamId: data.ayamId,
    tanggalPanen: data.tanggalPanen,
    jumlahEkorPanen: Number(data.jumlahEkorPanen),
    beratRataRata: Number(data.beratRataRata),
  };
};

/**
 * Transform ayams data to select options for ayam dropdown
 * @param ayams - Array of ayams from API
 * @returns Array of select options
 */
export const transformAyamsToOptions = (ayams: Ayam[]): SelectOption[] => {
  if (!ayams || ayams.length === 0) {
    return [];
  }

  return ayams.map(ayam => ({
    label: `${ayam.kandangNama} - Masuk: ${new Date(ayam.tanggalMasuk).toLocaleDateString("id-ID")}`,
    value: ayam.id,
    description: `Jumlah: ${ayam.jumlahMasuk.toLocaleString("id-ID")} ekor`,
  }));
};

/**
 * Format date to Indonesian format
 * @param date - Date string or Date object
 * @returns Formatted date string
 */
export const formatDateIndonesian = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return dateObj.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Format weight for display
 * @param weight - Weight in kg
 * @returns Formatted string
 */
export const formatWeight = (weight: number): string => {
  return `${weight.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} kg`;
};

/**
 * Calculate total weight
 * @param jumlahEkor - Number of chickens
 * @param beratRataRata - Average weight per chicken
 * @returns Total weight in kg
 */
export const calculateTotalWeight = (
  jumlahEkor: number,
  beratRataRata: number
): number => {
  return jumlahEkor * beratRataRata;
};
