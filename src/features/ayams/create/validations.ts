/**
 * Ayam Form Validation Rules
 * Validation rules for ayam create/edit forms
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
 * Validate tanggal masuk
 */
export const validateTanggalMasuk = {
  required: "Tanggal masuk harus diisi",
};

/**
 * Validate jumlah masuk
 */
export const validateJumlahMasuk = {
  required: "Jumlah ayam masuk harus diisi",
  min: {
    value: 1,
    message: "Jumlah ayam minimal 1 ekor",
  },
  max: {
    value: 1000000,
    message: "Jumlah ayam maksimal 1.000.000 ekor",
  },
  valueAsNumber: true,
};
