/**
 * Ayam Management Helper Functions
 */

import type { CreateAyamDto, Ayam } from "../interface";
import type { SelectOption } from "@/types/form-fields";
import type { Kandang } from "@/features/kandang/types";

/**
 * Ayam form data interface
 */
export interface AyamFormData {
  kandangId: string;
  tanggalMasuk: string;
  jumlahMasuk: number;
}

/**
 * Get default form values
 */
export const getDefaultAyamFormValues = (): Partial<AyamFormData> => ({
  kandangId: "",
  tanggalMasuk: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
  jumlahMasuk: 0,
});

/**
 * Transform form data to CreateAyamDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformAyamFormData = (data: AyamFormData): CreateAyamDto => {
  return {
    kandangId: data.kandangId,
    tanggalMasuk: data.tanggalMasuk,
    jumlahMasuk: Number(data.jumlahMasuk),
  };
};

/**
 * Format ayam data for display
 * @param ayam - Ayam data from API
 * @returns Formatted ayam data
 */
export const formatAyamForDisplay = (ayam: Ayam) => {
  return {
    ...ayam,
    jumlahMasukFormatted: `${ayam.jumlahMasuk.toLocaleString("id-ID")} ekor`,
    tanggalMasukFormatted: new Date(ayam.tanggalMasuk).toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    ),
  };
};

/**
 * Transform kandangs data to select options for kandang dropdown
 * @param kandangs - Array of kandangs from API
 * @returns Array of select options
 */
export const transformKandangsToOptions = (
  kandangs: Kandang[]
): SelectOption[] => {
  if (!kandangs || kandangs.length === 0) {
    return [];
  }

  return kandangs.map(kandang => ({
    label: `${kandang.namaKandang} (${kandang.lokasi}) - Kapasitas: ${kandang.kapasitas}`,
    value: kandang.id,
    description: `Petugas: ${kandang.petugasNama || "Belum ada"}`,
  }));
};

/**
 * Format jumlah for display
 * @param jumlah - Number of chickens
 * @returns Formatted string
 */
export const formatJumlahAyam = (jumlah: number): string => {
  return `${jumlah.toLocaleString("id-ID")} ekor`;
};

/**
 * Validate if jumlah is within reasonable range
 * @param jumlah - Amount to validate
 * @returns Boolean indicating if valid
 */
export const isValidJumlah = (jumlah: number): boolean => {
  return jumlah > 0 && jumlah <= 1000000;
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
