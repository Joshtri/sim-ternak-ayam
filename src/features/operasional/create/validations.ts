/**
 * Operasional Form Validation Rules
 * Validation rules for operasional create/edit forms
 */

/**
 * Validate jenisKegiatanId
 */
export const validateJenisKegiatanId = {
  required: "Jenis kegiatan harus dipilih",
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID jenis kegiatan tidak valid",
  },
};

/**
 * Validate tanggal
 */
export const validateTanggal = {
  required: "Tanggal kegiatan harus diisi",
};

/**
 * Validate jumlah
 */
export const validateJumlah = {
  required: "Jumlah kegiatan harus diisi",
  min: {
    value: 1,
    message: "Jumlah kegiatan minimal 1",
  },
  max: {
    value: 1000000,
    message: "Jumlah kegiatan maksimal 1.000.000",
  },
  valueAsNumber: true,
};

/**
 * Validate petugasId
 */
export const validatePetugasId = {
  required: "Petugas harus dipilih",
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID petugas tidak valid",
  },
};

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
 * Validate pakanId (optional)
 */
export const validatePakanId = {
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID pakan tidak valid",
  },
};

/**
 * Validate vaksinId (optional)
 */
export const validateVaksinId = {
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID vaksin tidak valid",
  },
};
