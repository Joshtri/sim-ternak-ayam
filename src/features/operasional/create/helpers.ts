/**
 * Operasional Management Helper Functions
 */

import type { CreateOperasionalDto } from "../types";
import type { SelectOption } from "@/types/form-fields";
import type { JenisKegiatan } from "@/features/jenis-kegiatan/types";
import type { Kandang } from "@/features/kandang/types";
import type { Pakan } from "@/features/pakan/types";
import type { Vaksin } from "@/features/vaksin/types";
import type { User } from "@/features/users-management/services/userService";

/**
 * Operasional form data interface
 */
export interface OperasionalFormData {
  jenisKegiatanId: string;
  tanggal: string;
  jumlah: number;
  petugasId: string;
  kandangId: string;
  pakanId?: string;
  vaksinId?: string;
}

/**
 * Get default form values
 */
export const getDefaultOperasionalFormValues = (): Partial<OperasionalFormData> => ({
  jenisKegiatanId: "",
  tanggal: new Date().toISOString().split("T")[0], // Today's date in YYYY-MM-DD format
  jumlah: 0,
  petugasId: "",
  kandangId: "",
  pakanId: "",
  vaksinId: "",
});

/**
 * Transform form data to CreateOperasionalDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformOperasionalFormData = (
  data: OperasionalFormData
): CreateOperasionalDto => {
  const dto: CreateOperasionalDto = {
    jenisKegiatanId: data.jenisKegiatanId,
    tanggal: data.tanggal,
    jumlah: Number(data.jumlah),
    petugasId: data.petugasId,
    kandangId: data.kandangId,
  };

  // Only include optional fields if they have values
  if (data.pakanId && data.pakanId !== "") {
    dto.pakanId = data.pakanId;
  }

  if (data.vaksinId && data.vaksinId !== "") {
    dto.vaksinId = data.vaksinId;
  }

  return dto;
};

/**
 * Transform jenis kegiatans data to select options
 * @param jenisKegiatans - Array of jenis kegiatans from API
 * @returns Array of select options
 */
export const transformJenisKegiatansToOptions = (
  jenisKegiatans: JenisKegiatan[]
): SelectOption[] => {
  if (!jenisKegiatans || jenisKegiatans.length === 0) {
    return [];
  }

  return jenisKegiatans.map(item => ({
    label: item.namaKegiatan,
    value: item.id,
    description: `${item.deskripsi} (${item.satuan})`,
  }));
};

/**
 * Transform kandangs data to select options
 * @param kandangs - Array of kandangs from API
 * @returns Array of select options
 */
export const transformKandangsToOptions = (kandangs: Kandang[]): SelectOption[] => {
  if (!kandangs || kandangs.length === 0) {
    return [];
  }

  return kandangs.map(item => ({
    label: item.namaKandang,
    value: item.id,
    description: `Kapasitas: ${item.kapasitas.toLocaleString("id-ID")} ekor - ${item.lokasi}`,
  }));
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
 * Transform pakans data to select options
 * @param pakans - Array of pakans from API
 * @returns Array of select options
 */
export const transformPakansToOptions = (pakans: Pakan[]): SelectOption[] => {
  if (!pakans || pakans.length === 0) {
    return [];
  }

  return pakans.map(item => ({
    label: item.namaPakan,
    value: item.id,
    description: `Stok: ${item.stokKg.toLocaleString("id-ID")} kg`,
  }));
};

/**
 * Transform vaksins data to select options
 * @param vaksins - Array of vaksins from API
 * @returns Array of select options
 */
export const transformVaksinsToOptions = (vaksins: Vaksin[]): SelectOption[] => {
  if (!vaksins || vaksins.length === 0) {
    return [];
  }

  return vaksins.map(item => ({
    label: item.namaVaksin,
    value: item.id,
    description: `Stok: ${item.stok.toLocaleString("id-ID")} dosis`,
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

/**
 * Format quantity with unit
 * @param jumlah - Quantity value
 * @param satuan - Unit string
 * @returns Formatted string
 */
export const formatQuantityWithUnit = (jumlah: number, satuan: string): string => {
  return `${jumlah.toLocaleString("id-ID")} ${satuan}`;
};
