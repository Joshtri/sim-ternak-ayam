import { BaseEntity } from "@/interfaces/common";

export interface KandangAsisten extends BaseEntity {
  kandangId: string;
  kandangNama: string;
  asistenId: string;
  asistenNama: string;
  catatan?: string;
  isAktif: boolean;
}

export interface CreateKandangAsistenDto {
  kandangId: string;      // UUIDbu
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
  catatan?: string;
  isAktif: boolean;
}
