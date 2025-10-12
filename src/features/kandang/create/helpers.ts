/**
 * Kandang Management Helper Functions
 */

import type { CreateKandangDto, Kandang } from "../types";
import type { SelectOption } from "@/types/form-fields";
import type { User } from "@/features/users-management/services/userService";

/**
 * Kandang form data interface
 */
export interface KandangFormData {
  namaKandang: string;
  kapasitas: number;
  lokasi: string;
  petugasId: string;
}

/**
 * Get default form values with Kelapa Lima as default location
 */
export const getDefaultKandangFormValues = (): Partial<KandangFormData> => ({
  namaKandang: "",
  kapasitas: 0,
  lokasi: "Kelapa Lima", // Default lokasi
  petugasId: "",
});

/**
 * Transform form data to CreateKandangDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformKandangFormData = (
  data: KandangFormData
): CreateKandangDto => {
  return {
    namaKandang: data.namaKandang.trim(),
    kapasitas: Number(data.kapasitas),
    lokasi: data.lokasi.trim(),
    petugasId: data.petugasId,
  };
};

/**
 * Format kandang data for display
 * @param kandang - Kandang data from API
 * @returns Formatted kandang data
 */
export const formatKandangForDisplay = (kandang: Kandang) => {
  return {
    ...kandang,
    kapasitasFormatted: `${kandang.kapasitas.toLocaleString("id-ID")} ekor`,
    petugasLabel: kandang.petugasNama || "Tidak ada petugas",
  };
};

/**
 * Transform users data to select options for petugas dropdown
 * @param users - Array of users from API
 * @returns Array of select options
 */
export const transformUsersToOptions = (users: User[]): SelectOption[] => {
  if (!users || users.length === 0) {
    return [];
  }

  return users.map((user) => ({
    label: `${user.fullName} (${user.role})`,
    value: user.id,
    description: user.email,
  }));
};

/**
 * Validate if kandang can be deleted
 * @param kandang - Kandang data
 * @returns Boolean indicating if kandang can be deleted
 */
export const canDeleteKandang = (kandang: Kandang): boolean => {
  // Add business rules here
  // For example: cannot delete if there are active chickens
  return true;
};

/**
 * Format kapasitas number for display
 * @param kapasitas - Capacity number
 * @returns Formatted string
 */
export const formatKapasitas = (kapasitas: number): string => {
  return `${kapasitas.toLocaleString("id-ID")} ekor`;
};

/**
 * Generate kandang name suggestion based on location and index
 * @param lokasi - Location name
 * @param index - Kandang index
 * @returns Suggested kandang name
 */
export const suggestKandangName = (lokasi: string, index: number): string => {
  const cleanedLokasi = lokasi
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return `Kandang ${cleanedLokasi}-${index}`;
};

/**
 * Validate if kapasitas is within reasonable range
 * @param kapasitas - Capacity to validate
 * @returns Boolean indicating if valid
 */
export const isValidKapasitas = (kapasitas: number): boolean => {
  return kapasitas > 0 && kapasitas <= 1000000;
};
