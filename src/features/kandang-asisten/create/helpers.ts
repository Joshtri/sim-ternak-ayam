/**
 * Kandang Asisten Management Helper Functions
 */

import type { CreateKandangAsistenDto, UpdateKandangAsistenDto } from "../types";
import type { SelectOption } from "@/types/form-fields";

/**
 * Kandang Asisten form data interface
 */
export interface KandangAsistenFormData {
  kandangId: string;
  asistenId: string;
  catatan?: string;
  isAktif: boolean;
}

/**
 * Get default form values
 */
export const getDefaultKandangAsistenFormValues = (): Partial<KandangAsistenFormData> => ({
  kandangId: "",
  asistenId: "",
  catatan: "",
  isAktif: true, // Default to active
});

/**
 * Transform form data to CreateKandangAsistenDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformKandangAsistenFormData = (
  data: KandangAsistenFormData
): CreateKandangAsistenDto => {
  const dto: CreateKandangAsistenDto = {
    kandangId: data.kandangId,
    asistenId: data.asistenId,
    isAktif: Boolean(data.isAktif),
  };

  // Only include optional fields if they have values
  if (data.catatan && data.catatan !== "") {
    dto.catatan = data.catatan;
  }

  return dto;
};

/**
 * Transform form data to UpdateKandangAsistenDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformUpdateKandangAsistenFormData = (
  data: Partial<KandangAsistenFormData>
): UpdateKandangAsistenDto => {
  const dto: UpdateKandangAsistenDto = {};

  if (data.catatan !== undefined) {
    dto.catatan = data.catatan;
  }

  if (data.isAktif !== undefined) {
    dto.isAktif = Boolean(data.isAktif);
  }

  return dto;
};

/**
 * Transform kandang data to select options
 */
export const transformKandangsToOptions = (kandangs: any[]): SelectOption[] => {
  if (!kandangs || kandangs.length === 0) {
    return [];
  }

  return kandangs.map((kandang) => ({
    label: kandang.namaKandang || kandang.nama,
    value: kandang.id,
    description: `Lokasi: ${kandang.lokasi || "-"} | Kapasitas: ${kandang.kapasitas || "-"}`,
  }));
};

/**
 * Transform petugas (users) data to select options
 * Only show users with role "Petugas"
 */
export const transformPetugasToOptions = (users: any[]): SelectOption[] => {
  if (!users || users.length === 0) {
    return [];
  }

  // Filter only Petugas role
  const petugasOnly = users.filter((user) => user.role === "Petugas");

  return petugasOnly.map((user) => ({
    label: user.fullName || user.nama,
    value: user.id,
    description: `${user.email || "-"} | ${user.noWA || "-"}`,
  }));
};
