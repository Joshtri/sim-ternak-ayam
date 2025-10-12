import { BaseEntity } from "@/interfaces/common";

export interface Pakan extends BaseEntity {
  namaPakan: string;
  stok: number;
}

export interface CreatePakanDto {
  namaPakan: string;
  stok: number;
}

export interface UpdatePakanDto extends Pick<BaseEntity, "id"> {
  namaPakan?: string;
  stok?: number;
}

export interface UpdateStockDto {
  stok: number;
}
