/**
 * Panen Management Helper Functions
 */

import type { SelectOption } from "@/types/form-fields";
import type { Ayam } from "@/features/ayams/interface";

/**
 * Panen form data interface
 */
export interface PanenFormData {
  kandangId: string;
  tanggalPanen: string;
  jumlahEkorPanen: number;
  beratRataRata: number;
  mode: "auto-fifo" | "manual-split";
  jumlahDariAyamLama?: number;
  jumlahDariAyamBaru?: number;
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
 * Get default form values
 */
export const getDefaultPanenFormValues = (): Partial<PanenFormData> => ({
  kandangId: "",
  tanggalPanen: formatDateToLocalInput(), // Uses local time YYYY-MM-DD
  jumlahEkorPanen: 0,
  beratRataRata: 0,
  mode: "manual-split",
  jumlahDariAyamLama: 0,
  jumlahDariAyamBaru: 0,
});

/**
 * Transform form data to CreatePanenAutoFifoDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformPanenFormData = (data: PanenFormData): any => {
  const payload: any = {
    kandangId: data.kandangId,
    tanggalPanen: new Date(data.tanggalPanen).toISOString(),
    jumlahEkorPanen: Number(data.jumlahEkorPanen),
    beratRataRata: Number(data.beratRataRata),
    mode: data.mode,
  };

  if (data.mode === "manual-split") {
    payload.jumlahDariAyamLama = Number(data.jumlahDariAyamLama || 0);
    payload.jumlahDariAyamBaru = Number(data.jumlahDariAyamBaru || 0);
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

  return ayams.map(ayam => {
    const masukDate = new Date(ayam.tanggalMasuk).toLocaleDateString("id-ID");
    const statusPanen = ayam.bisaDipanen ? "Siap Panen" : "Belum Siap";
    const statusKesehatan = ayam.perluPerhatianKesehatan
      ? "Perlu Perhatian"
      : "Sehat";
    const jumlahSisa = ayam.sisaAyamHidup?.toLocaleString("id-ID") ?? "0";
    const petugas = ayam.petugasKandangNama || "-";

    return {
      label: `${ayam.kandangNama} - Sisa: ${jumlahSisa} (Petugas: ${petugas})`,
      value: ayam.id,
      description: `Masuk: ${masukDate} | ${statusPanen} | ${statusKesehatan}`,
    };
  });
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
