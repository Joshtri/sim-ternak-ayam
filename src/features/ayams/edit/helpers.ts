/**
 * Ayam Edit Helper Functions
 */

import type { UpdateAyamDto, Ayam } from "../interface";
import type { SelectOption } from "@/types/form-fields";
import type { Kandang } from "@/features/kandang/types";

/**
 * Ayam edit form data interface
 */
export interface AyamEditFormData {
  kandangId: string;
  tanggalMasuk: string;
  jumlahMasuk: number;
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
 * Get default form values from existing ayam data
 */
export const getDefaultAyamEditFormValues = (
  ayam?: Ayam
): Partial<AyamEditFormData> => {
  if (!ayam) {
    return {
      kandangId: "",
      tanggalMasuk: formatDateToLocalInput(),
      jumlahMasuk: 0,
    };
  }

  return {
    kandangId: ayam.kandangId || "",
    tanggalMasuk: formatDateToLocalInput(ayam.tanggalMasuk),
    jumlahMasuk: ayam.jumlahMasuk || 0,
  };
};

/**
 * Transform form data to UpdateAyamDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformAyamEditFormData = (
  data: AyamEditFormData,
  id: string
): UpdateAyamDto => {
  return {
    id,
    kandangId: data.kandangId,
    tanggalMasuk: data.tanggalMasuk,
    jumlahMasuk: Number(data.jumlahMasuk),
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
