/**
 * Kandang Edit Helper Functions
 */

import type { UpdateKandangDto, Kandang } from "../types";
import type { SelectOption } from "@/types/form-fields";
import type { User } from "@/features/users-management/services/userService";

/**
 * Kandang edit form data interface
 */
export interface KandangEditFormData {
  namaKandang: string;
  kapasitas: number;
  lokasi: string;
  petugasId: string;
}

/**
 * Get default form values from existing kandang data
 */
export const getDefaultKandangEditFormValues = (
  kandang?: Kandang
): Partial<KandangEditFormData> => {
  if (!kandang) {
    return {
      namaKandang: "",
      kapasitas: 0,
      lokasi: "Kelapa Lima",
      petugasId: "",
    };
  }

  return {
    namaKandang: kandang.namaKandang || "",
    kapasitas: kandang.kapasitas || 0,
    lokasi: kandang.lokasi || "Kelapa Lima",
    petugasId: kandang.petugasId || "",
  };
};

/**
 * Transform form data to UpdateKandangDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformKandangEditFormData = (
  data: KandangEditFormData
): UpdateKandangDto => {
  return {
    namaKandang: data.namaKandang.trim(),
    kapasitas: Number(data.kapasitas),
    lokasi: data.lokasi.trim(),
    petugasId: data.petugasId,
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
