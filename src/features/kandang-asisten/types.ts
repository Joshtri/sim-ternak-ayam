import { BaseEntity } from "@/interfaces/common";

export interface KandangAsisten extends BaseEntity {
  kandangId: string;
  kandangNama: string;
  asistenId: string;
  asistenNama: string;
  asistenEmail?: string; // New
  asistenNoWA?: string;  // New
  catatan?: string;
  isAktif: boolean;
}

export interface CreateKandangAsistenDto {
  kandangId: string;      // UUID
  asistenId: string;      // UUID (must be Petugas role)
  catatan?: string;       // Optional notes
  isAktif: boolean;       // Default: true
}

export interface UpdateKandangAsistenDto {
  catatan?: string;
  isAktif?: boolean;
}

export interface KandangAsistenResponseDto extends BaseEntity {
  kandangId: string;
  kandangNama: string;
  asistenId: string;
  asistenNama: string;
  asistenEmail?: string; // New
  asistenNoWA?: string;  // New
  catatan?: string;
  isAktif: boolean;
}
