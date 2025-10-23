/**
 * Vaksin Form Validation Rules
 * Validation rules for vaksin create/edit forms
 */

/**
 * Validate nama vaksin
 */
export const validateNamaVaksin = {
  required: "Nama vaksin/vitamin harus diisi",
  minLength: {
    value: 3,
    message: "Nama minimal 3 karakter",
  },
  maxLength: {
    value: 100,
    message: "Nama maksimal 100 karakter",
  },
};

/**
 * Validate jenis
 */
export const validateJenis = {
  required: "Jenis harus diisi",
  minLength: {
    value: 2,
    message: "Jenis minimal 2 karakter",
  },
  maxLength: {
    value: 100,
    message: "Jenis maksimal 100 karakter",
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
    message: "Stok maksimal 1.000.000",
  },
  valueAsNumber: true,
};

/**
 * Validate satuan
 */
export const validateSatuan = {
  required: "Satuan harus diisi",
  minLength: {
    value: 1,
    message: "Satuan minimal 1 karakter",
  },
  maxLength: {
    value: 20,
    message: "Satuan maksimal 20 karakter",
  },
};

/**
 * Validate harga per satuan
 */
export const validateHarga = {
  required: "Harga harus diisi",
  min: {
    value: 0,
    message: "Harga tidak boleh negatif",
  },
  max: {
    value: 100000000,
    message: "Harga maksimal 100.000.000",
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
