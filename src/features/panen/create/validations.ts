/**
 * Panen Form Validation Rules
 * Validation rules for panen create/edit forms
 */

/**
 * Validate ayamId
 */
export const validateAyamId = {
  required: "Data ayam harus dipilih",
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID ayam tidak valid",
  },
};

/**
 * Validate tanggal panen
 */
export const validateTanggalPanen = {
  required: "Tanggal panen harus diisi",
};

/**
 * Validate jumlah ekor panen
 */
export const validateJumlahEkorPanen = {
  required: "Jumlah ekor panen harus diisi",
  min: {
    value: 1,
    message: "Jumlah ekor panen minimal 1 ekor",
  },
  max: {
    value: 1000000,
    message: "Jumlah ekor panen maksimal 1.000.000 ekor",
  },
  valueAsNumber: true,
};

/**
 * Validate berat rata-rata
 */
export const validateBeratRataRata = {
  required: "Berat rata-rata harus diisi",
  min: {
    value: 0.01,
    message: "Berat rata-rata minimal 0.01 kg",
  },
  max: {
    value: 100,
    message: "Berat rata-rata maksimal 100 kg",
  },
  valueAsNumber: true,
};
