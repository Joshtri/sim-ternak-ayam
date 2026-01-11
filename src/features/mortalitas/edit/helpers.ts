/**
 * Mortalitas Edit Helper Functions
 */

import type { UpdateMortalitasDto, Mortalitas } from "../types";
import type { SelectOption } from "@/types/form-fields";
import type { Ayam } from "@/features/ayams/interface";

/**
 * Mortalitas edit form data interface
 */
export interface MortalitasEditFormData {
  id: string;
  ayamId: string;
  tanggalKematian: string;
  jumlahKematian: number;
  penyebabKematian: string;
  fotoMortalitasBase64?: string;
  fotoMortalitasFileName?: string;
}

/**
 * Helper to format date to YYYY-MM-DD using local time
 */
const formatDateToLocalInput = (dateString?: string): string => {
  const date = dateString ? new Date(dateString) : new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Get default form values from existing mortalitas data
 */
export const getDefaultMortalitasEditFormValues = (
  mortalitas?: Mortalitas
): Partial<MortalitasEditFormData> => {
  if (!mortalitas) {
    return {
      ayamId: "",

      tanggalKematian: formatDateToLocalInput(),
      jumlahKematian: 0,
      penyebabKematian: "",
      fotoMortalitasBase64: "",
      fotoMortalitasFileName: "",
    };
  }

  return {
    ayamId: mortalitas.ayamId || "",
    tanggalKematian: formatDateToLocalInput(mortalitas.tanggalKematian),
    jumlahKematian: mortalitas.jumlahKematian || 0,
    penyebabKematian: mortalitas.penyebabKematian || "",
    fotoMortalitasBase64: "",
    fotoMortalitasFileName: "",
  };
};

/**
 * Transform form data to UpdateMortalitasDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformMortalitasEditFormData = (
  data: MortalitasEditFormData,
  id: string
): UpdateMortalitasDto => {
  const payload: UpdateMortalitasDto = {
    id, // Will be set in the component
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
