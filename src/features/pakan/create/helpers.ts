/**
 * Pakan Management Helper Functions
 */

import type { CreatePakanDto } from "../types";

/**
 * Pakan form data interface
 */
export interface PakanFormData {
  namaPakan: string;
  stok: number;
}

/**
 * Get default form values
 */
export const getDefaultPakanFormValues = (): Partial<PakanFormData> => ({
  namaPakan: "",
  stok: 0,
});

/**
 * Transform form data to CreatePakanDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformPakanFormData = (data: PakanFormData): CreatePakanDto => {
  return {
    namaPakan: data.namaPakan,
    stok: Number(data.stok),
  };
};

/**
 * Format stok for display
 * @param stok - Stock amount
 * @returns Formatted string
 */
export const formatStok = (stok: number): string => {
  return `${stok.toLocaleString("id-ID")} kg`;
};

/**
 * Check if stock is low (below threshold)
 * @param stok - Current stock
 * @param threshold - Low stock threshold (default: 100)
 * @returns Boolean indicating if stock is low
 */
export const isLowStock = (stok: number, threshold: number = 100): boolean => {
  return stok < threshold;
};
