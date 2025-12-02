/**
 * Mortalitas Management Helper Functions
 */

import type { CreateMortalitasDto } from "../types";
import type { SelectOption } from "@/types/form-fields";
import type { Ayam } from "@/features/ayams/interface";

/**
 * Mortalitas form data interface
 */
export interface MortalitasFormData {
  ayamId: string;
  tanggalKematian: string;
  jumlahKematian: number;
  penyebabKematian: string;
  fotoMortalitasBase64?: string;
  fotoMortalitasFileName?: string;
}

/**
 * Get default form values
 */
export const getDefaultMortalitasFormValues =
  (): Partial<MortalitasFormData> => ({
    ayamId: "",
    tanggalKematian: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
    jumlahKematian: 0,
    penyebabKematian: "",
    fotoMortalitasBase64: "",
    fotoMortalitasFileName: "",
  });

/**
 * Transform form data to CreateMortalitasDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformMortalitasFormData = (
  data: MortalitasFormData

): CreateMortalitasDto => {
  const payload: CreateMortalitasDto = {
    ayamId: data.ayamId,
    tanggalKematian: data.tanggalKematian,
    jumlahKematian: Number(data.jumlahKematian),
    penyebabKematian: data.penyebabKematian,
  };

  // Add photo fields if provided
  if (data.fotoMortalitasBase64) {
    payload.fotoMortalitasBase64 = data.fotoMortalitasBase64;
    payload.fotoMortalitasFileName = data.fotoMortalitasFileName;
  }

  return payload;
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
 * Format jumlah for display
 * @param jumlah - Number
 * @returns Formatted string
 */
export const formatJumlah = (jumlah: number): string => {
  return `${jumlah.toLocaleString("id-ID")} ekor`;
};

/**
 * Convert file to base64 string
 * @param file - File object
 * @returns Promise resolving to base64 string
 */
export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsDataURL(file);
  });
};
