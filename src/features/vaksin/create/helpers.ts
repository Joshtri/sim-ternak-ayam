/**
 * Vaksin Management Helper Functions
 */

import type { CreateVaksinDto } from "../types";

/**
 * Vaksin form data interface
 */
export interface VaksinFormData {
  namaVaksin: string;
  stok: number;
}

/**
 * Get default form values
 */
export const getDefaultVaksinFormValues = (): Partial<VaksinFormData> => ({
  namaVaksin: "",
  stok: 0,
});

/**
 * Transform form data to CreateVaksinDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformVaksinFormData = (data: VaksinFormData): CreateVaksinDto => {
  return {
    namaVaksin: data.namaVaksin,
    stok: Number(data.stok),
  };
};

/**
 * Format stok for display
 * @param stok - Stock amount
 * @returns Formatted string
 */
export const formatStok = (stok: number): string => {
  return `${stok.toLocaleString("id-ID")} unit`;
};

/**
 * Check if stock is low (below threshold)
 * @param stok - Current stock
 * @param threshold - Low stock threshold (default: 50 for vaksin)
 * @returns Boolean indicating if stock is low
 */
export const isLowStock = (stok: number, threshold: number = 50): boolean => {
  return stok < threshold;
};
