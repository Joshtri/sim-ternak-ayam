/**
 * Jenis Kegiatan Management Helper Functions
 */

import type { CreateJenisKegiatanDto } from "../types";

/**
 * Jenis Kegiatan form data interface
 */
export interface JenisKegiatanFormData {
  namaKegiatan: string;
  deskripsi: string;
  satuan: string;
  biayaDefault: number;
}

/**
 * Get default form values
 */
export const getDefaultJenisKegiatanFormValues =
  (): Partial<JenisKegiatanFormData> => ({
    namaKegiatan: "",
    deskripsi: "",
    satuan: "",
    biayaDefault: 0,
  });

/**
 * Transform form data to CreateJenisKegiatanDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformJenisKegiatanFormData = (
  data: JenisKegiatanFormData
): CreateJenisKegiatanDto => {
  return {
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
