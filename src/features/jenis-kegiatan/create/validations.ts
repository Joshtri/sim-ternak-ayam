/**
 * Jenis Kegiatan Form Validation Rules
 * Validation rules for jenis kegiatan create/edit forms
 */

/**
 * Validate nama kegiatan
 */
export const validateNamaKegiatan = {
  required: "Nama kegiatan harus diisi",
  minLength: {
    value: 3,
    message: "Nama kegiatan minimal 3 karakter",
  },
  maxLength: {
    value: 100,
    message: "Nama kegiatan maksimal 100 karakter",
  },
};

/**
 * Validate deskripsi
 */
export const validateDeskripsi = {
  required: "Deskripsi harus diisi",
  minLength: {
    value: 10,
    message: "Deskripsi minimal 10 karakter",
  },
  maxLength: {
    value: 500,
    message: "Deskripsi maksimal 500 karakter",
  },
};

/**
 * Validate satuan
 */
export const validateSatuan = {
  required: "Satuan harus diisi",
  minLength: {
    value: 2,
    message: "Satuan minimal 2 karakter",
  },
  maxLength: {
    value: 50,
    message: "Satuan maksimal 50 karakter",
  },
};

/**
 * Validate biaya default
 */
export const validateBiayaDefault = {
  required: "Biaya default harus diisi",
  min: {
    value: 0,
    message: "Biaya default tidak boleh negatif",
  },
  max: {
    value: 1000000000,
    message: "Biaya default maksimal 1 Miliar",
  },
  valueAsNumber: true,
};
