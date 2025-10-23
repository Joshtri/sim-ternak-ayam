/**
 * Kandang Asisten Form Validation Rules
 * Validation rules for kandang asisten create/edit forms
 */

/**
 * Validate kandangId
 */
export const validateKandangId = {
  required: "Kandang harus dipilih",
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID kandang tidak valid",
  },
};

/**
 * Validate asistenId
 */
export const validateAsistenId = {
  required: "Asisten harus dipilih",
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID asisten tidak valid",
  },
};

/**
 * Validate catatan (optional)
 */
export const validateCatatan = {
  maxLength: {
    value: 500,
    message: "Catatan maksimal 500 karakter",
  },
};
