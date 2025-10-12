/**
 * Mortalitas Form Validation Rules
 * Validation rules for mortalitas create/edit forms
 */

/**
 * Validate ayamId
 */
export const validateAyamId = {
  required: "Ayam harus dipilih",
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID ayam tidak valid",
  },
};

/**
 * Validate tanggal kematian
 */
export const validateTanggalKematian = {
  required: "Tanggal kematian harus diisi",
};

/**
 * Validate jumlah kematian
 */
export const validateJumlahKematian = {
  required: "Jumlah kematian harus diisi",
  min: {
    value: 1,
    message: "Jumlah kematian minimal 1 ekor",
  },
  max: {
    value: 1000000,
    message: "Jumlah kematian maksimal 1.000.000 ekor",
  },
  valueAsNumber: true,
};

/**
 * Validate penyebab kematian
 */
export const validatePenyebabKematian = {
  required: "Penyebab kematian harus diisi",
  minLength: {
    value: 3,
    message: "Penyebab kematian minimal 3 karakter",
  },
  maxLength: {
    value: 500,
    message: "Penyebab kematian maksimal 500 karakter",
  },
};
