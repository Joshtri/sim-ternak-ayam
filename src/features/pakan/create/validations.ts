/**
 * Pakan Form Validation Rules
 * Validation rules for pakan create/edit forms
 */

/**
 * Validate nama pakan
 */
export const validateNamaPakan = {
  required: "Nama pakan harus diisi",
  minLength: {
    value: 3,
    message: "Nama pakan minimal 3 karakter",
  },
  maxLength: {
    value: 100,
    message: "Nama pakan maksimal 100 karakter",
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
    message: "Stok maksimal 1.000.000 kg",
  },
  valueAsNumber: true,
};
