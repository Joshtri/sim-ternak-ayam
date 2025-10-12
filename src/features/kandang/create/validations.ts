/**
 * Kandang Form Validation Rules
 * Validation rules for kandang create/edit forms
 */

/**
 * Validate nama kandang
 */
export const validateNamaKandang = {
  required: "Nama kandang harus diisi",
  minLength: {
    value: 3,
    message: "Nama kandang minimal 3 karakter",
  },
  maxLength: {
    value: 100,
    message: "Nama kandang maksimal 100 karakter",
  },
  pattern: {
    value: /^[a-zA-Z0-9\s\-_]+$/,
    message: "Nama kandang hanya boleh mengandung huruf, angka, spasi, dan tanda -_",
  },
};

/**
 * Validate kapasitas
 */
export const validateKapasitas = {
  required: "Kapasitas kandang harus diisi",
  min: {
    value: 1,
    message: "Kapasitas minimal 1 ekor",
  },
  max: {
    value: 1000000,
    message: "Kapasitas maksimal 1.000.000 ekor",
  },
  valueAsNumber: true,
};

/**
 * Validate lokasi
 */
export const validateLokasi = {
  required: "Lokasi kandang harus diisi",
  minLength: {
    value: 3,
    message: "Lokasi minimal 3 karakter",
  },
  maxLength: {
    value: 200,
    message: "Lokasi maksimal 200 karakter",
  },
};

/**
 * Validate petugasId
 */
export const validatePetugasId = {
  required: "Petugas kandang harus dipilih",
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID petugas tidak valid",
  },
};
