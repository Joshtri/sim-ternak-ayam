/**
 * Jenis Kegiatan Edit Helper Functions
 */

import type { UpdateJenisKegiatanDto, JenisKegiatan } from "../types";

/**
 * Jenis Kegiatan edit form data interface
 */
export interface JenisKegiatanEditFormData {
  namaKegiatan: string;
  deskripsi: string;
  satuan: string;
  biayaDefault: number;
}

/**
 * Get default form values from existing jenis kegiatan data
 */
export const getDefaultJenisKegiatanEditFormValues = (
  jenisKegiatan?: JenisKegiatan
): Partial<JenisKegiatanEditFormData> => {
  if (!jenisKegiatan) {
    return {
      namaKegiatan: "",
      deskripsi: "",
      satuan: "",
      biayaDefault: 0,
    };
  }

  return {
    namaKegiatan: jenisKegiatan.namaKegiatan || "",
    deskripsi: jenisKegiatan.deskripsi || "",
    satuan: jenisKegiatan.satuan || "",
    biayaDefault: jenisKegiatan.biayaDefault || 0,
  };
};

/**
 * Transform form data to UpdateJenisKegiatanDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformJenisKegiatanEditFormData = (
  data: JenisKegiatanEditFormData
): UpdateJenisKegiatanDto => {
  return {
    id: "", // Will be set in the component
    namaKegiatan: data.namaKegiatan,
    deskripsi: data.deskripsi,
    satuan: data.satuan,
    biayaDefault: Number(data.biayaDefault),
  };
};

/**
 * Format currency for display
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Common satuan options for dropdown
 */
export const commonSatuanOptions = [
  { label: "Per Ekor", value: "ekor" },
  { label: "Per Kg", value: "kg" },
  { label: "Per Unit", value: "unit" },
  { label: "Per Hari", value: "hari" },
  { label: "Per Bulan", value: "bulan" },
  { label: "Per Kali", value: "kali" },
  { label: "Per Meter", value: "meter" },
  { label: "Per Liter", value: "liter" },
];
