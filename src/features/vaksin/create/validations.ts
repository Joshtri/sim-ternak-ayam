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

/**
 * Validate bulan (month 1-12)
 */
export const validateBulan = {
  required: "Bulan harus diisi",
  min: {
    value: 1,
    message: "Bulan minimal 1 (Januari)",
  },
  max: {
    value: 12,
    message: "Bulan maksimal 12 (Desember)",
  },
  valueAsNumber: true,
};

/**
 * Validate tahun (year 2000-2100)
 */
export const validateTahun = {
  required: "Tahun harus diisi",
  min: {
    value: 2000,
    message: "Tahun minimal 2000",
  },
  max: {
    value: 2100,
    message: "Tahun maksimal 2100",
  },
  valueAsNumber: true,
};
