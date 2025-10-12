/**
 * Vaksin Form Validation Rules
 * Validation rules for vaksin create/edit forms
 */

/**
 * Validate nama vaksin
 */
export const validateNamaVaksin = {
  required: "Nama vaksin harus diisi",
  minLength: {
    value: 3,
    message: "Nama vaksin minimal 3 karakter",
  },
  maxLength: {
    value: 100,
    message: "Nama vaksin maksimal 100 karakter",
  },
};

/**
 * Validate stok
 */
export const validateStok = {
  required: "Stok harus diisi",
  min: {
    value: 0,
    message: "Stok tidak boleh negatif",
  },
  max: {
    value: 1000000,
    message: "Stok maksimal 1.000.000 unit",
  },
  valueAsNumber: true,
};
