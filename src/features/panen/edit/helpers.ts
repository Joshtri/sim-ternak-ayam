/**
 * Panen Edit Helper Functions
 */

import type { UpdatePanenDto, Panen } from "../types";
import type { SelectOption } from "@/types/form-fields";
import type { Ayam } from "@/features/ayams/interface";

/**
 * Panen edit form data interface
 */
export interface PanenEditFormData {
  ayamId: string;
  tanggalPanen: string;
  jumlahEkorPanen: number;
  beratRataRata: number;
}

/**
 * Get default form values from existing panen data
 */
export const getDefaultPanenEditFormValues = (
  panen?: Panen
): Partial<PanenEditFormData> => {
  if (!panen) {
    return {
      ayamId: "",
      tanggalPanen: new Date().toISOString().split("T")[0],
      jumlahEkorPanen: 0,
      beratRataRata: 0,
    };
  }

  return {
    ayamId: panen.ayamId || "",
    tanggalPanen: panen.tanggalPanen
      ? new Date(panen.tanggalPanen).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    jumlahEkorPanen: panen.jumlahEkorPanen || 0,
    beratRataRata: panen.beratRataRata || 0,
  };
};

/**
 * Transform form data to UpdatePanenDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformPanenEditFormData = (
  data: PanenEditFormData
): UpdatePanenDto => {
  return {
    id: "", // Will be set in the component
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
