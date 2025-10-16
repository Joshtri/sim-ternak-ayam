/**
 * Biaya Edit Helper Functions
 */

import type { UpdateBiayaDto, Biaya } from "../types";
import type { SelectOption } from "@/types/form-fields";
import type { Operasional } from "@/features/operasional/types";
import type { User } from "@/features/users-management/services/userService";

/**
 * Biaya edit form data interface
 */
export interface BiayaEditFormData {
  jenisBiaya: string;
  tanggal: string;
  jumlah: number;
  petugasId: string;
  operasionalId?: string;
  buktiUrl?: string;
}

/**
 * Get default form values from existing biaya data
 */
export const getDefaultBiayaEditFormValues = (
  biaya?: Biaya
): Partial<BiayaEditFormData> => {
  if (!biaya) {
    return {
      jenisBiaya: "",
      tanggal: new Date().toISOString().split("T")[0],
      jumlah: 0,
      petugasId: "",
      operasionalId: "",
      buktiUrl: "",
    };
  }

  return {
    jenisBiaya: biaya.jenisBiaya || "",
    tanggal: biaya.tanggal
      ? new Date(biaya.tanggal).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    jumlah: biaya.jumlah || 0,
    petugasId: biaya.petugasId || "",
    operasionalId: biaya.operasionalId || "",
    buktiUrl: biaya.buktiUrl || "",
  };
};

/**
 * Transform form data to UpdateBiayaDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformBiayaEditFormData = (
  data: BiayaEditFormData,
  id: string
): UpdateBiayaDto => {
  const dto: UpdateBiayaDto = {
    id,
    jenisBiaya: data.jenisBiaya,
    tanggal: data.tanggal,
    jumlah: Number(data.jumlah),
    petugasId: data.petugasId,
  };

  // Only include optional fields if they have values
  if (data.operasionalId && data.operasionalId !== "") {
    dto.operasionalId = data.operasionalId;
  }

  if (data.buktiUrl && data.buktiUrl !== "") {
    dto.buktiUrl = data.buktiUrl;
  }

  return dto;
};

/**
 * Transform users data to select options for petugas
 * @param users - Array of users from API
 * @returns Array of select options
 */
export const transformUsersToOptions = (users: User[]): SelectOption[] => {
  if (!users || users.length === 0) {
    return [];
  }

  return users.map(user => ({
    label: user.fullName,
    value: user.id,
    description: `${user.email} - ${user.role}`,
  }));
};

/**
 * Transform operasionals data to select options
 * @param operasionals - Array of operasionals from API
 * @returns Array of select options
 */
export const transformOperasionalsToOptions = (
  operasionals: Operasional[]
): SelectOption[] => {
  if (!operasionals || operasionals.length === 0) {
    return [];
  }

  return operasionals.map(item => ({
    label: `${item.jenisKegiatanNama} - ${item.kandangNama}`,
    value: item.id,
    description: `${formatDateIndonesian(item.tanggal)} - ${item.jumlah} unit`,
  }));
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
