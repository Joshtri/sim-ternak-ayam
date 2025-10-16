/**
 * Operasional Edit Helper Functions
 */

import type { UpdateOperasionalDto, Operasional } from "../types";
import type { SelectOption } from "@/types/form-fields";
import type { JenisKegiatan } from "@/features/jenis-kegiatan/types";
import type { Kandang } from "@/features/kandang/types";
import type { Pakan } from "@/features/pakan/types";
import type { Vaksin } from "@/features/vaksin/types";
import type { User } from "@/features/users-management/services/userService";

/**
 * Operasional edit form data interface
 */
export interface OperasionalEditFormData {
  jenisKegiatanId: string;
  tanggal: string;
  jumlah: number;
  petugasId: string;
  kandangId: string;
  pakanId?: string;
  vaksinId?: string;
}

/**
 * Get default form values from existing operasional data
 */
export const getDefaultOperasionalEditFormValues = (
  operasional?: Operasional
): Partial<OperasionalEditFormData> => {
  if (!operasional) {
    return {
      jenisKegiatanId: "",
      tanggal: new Date().toISOString().split("T")[0],
      jumlah: 0,
      petugasId: "",
      kandangId: "",
      pakanId: "",
      vaksinId: "",
    };
  }

  return {
    jenisKegiatanId: operasional.jenisKegiatanId || "",
    tanggal: operasional.tanggal
      ? new Date(operasional.tanggal).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    jumlah: operasional.jumlah || 0,
    petugasId: operasional.petugasId || "",
    kandangId: operasional.kandangId || "",
    pakanId: operasional.pakanId || "",
    vaksinId: operasional.vaksinId || "",
  };
};

/**
 * Transform form data to UpdateOperasionalDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformOperasionalEditFormData = (
  data: OperasionalEditFormData
): UpdateOperasionalDto => {
  const dto: UpdateOperasionalDto = {
    id: "", // Will be set in the component
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
