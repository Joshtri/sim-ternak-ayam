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
  ayamId: string;
  tanggalKematian: string;
  jumlahKematian: number;
  penyebabKematian: string;
}

/**
 * Get default form values from existing mortalitas data
 */
export const getDefaultMortalitasEditFormValues = (
  mortalitas?: Mortalitas
): Partial<MortalitasEditFormData> => {
  if (!mortalitas) {
    return {
      ayamId: "",
      tanggalKematian: new Date().toISOString().split("T")[0],
      jumlahKematian: 0,
      penyebabKematian: "",
    };
  }

  return {
    ayamId: mortalitas.ayamId || "",
    tanggalKematian: mortalitas.tanggalKematian
      ? new Date(mortalitas.tanggalKematian).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    jumlahKematian: mortalitas.jumlahKematian || 0,
    penyebabKematian: mortalitas.penyebabKematian || "",
  };
};

/**
 * Transform form data to UpdateMortalitasDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformMortalitasEditFormData = (
  data: MortalitasEditFormData
): UpdateMortalitasDto => {
  return {
    id: "", // Will be set in the component
    ayamId: data.ayamId,
    tanggalKematian: data.tanggalKematian,
    jumlahKematian: Number(data.jumlahKematian),
    penyebabKematian: data.penyebabKematian,
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
