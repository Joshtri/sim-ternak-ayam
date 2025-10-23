/**
 * Biaya Form Validation Rules
 * Validation rules for biaya create/edit forms
 */

/**
 * Validate jenisBiaya
 */
export const validateJenisBiaya = {
  required: "Jenis biaya harus diisi",
  minLength: {
    value: 3,
    message: "Jenis biaya minimal 3 karakter",
  },
  maxLength: {
    value: 100,
    message: "Jenis biaya maksimal 100 karakter",
  },
};

/**
 * Validate tanggal
 */
export const validateTanggal = {
  required: "Tanggal biaya harus diisi",
};

/**
 * Validate jumlah (nominal rupiah)
 */
export const validateJumlah = {
  required: "Jumlah biaya harus diisi",
  min: {
    value: 0,
    message: "Jumlah biaya tidak boleh negatif",
  },
  max: {
    value: 999999999.99,
    message: "Jumlah biaya maksimal Rp 999.999.999,99",
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
 * Validate operasionalId (optional)
 */
export const validateOperasionalId = {
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID operasional tidak valid",
  },
};

/**
 * Validate kandangId (optional)
 */
export const validateKandangId = {
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID kandang tidak valid",
  },
};

/**
 * Validate buktiUrl (optional)
 */
export const validateBuktiUrl = {
  pattern: {
    value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    message: "Format URL tidak valid",
  },
};

/**
 * Validate keterangan (optional)
 */
export const validateKeterangan = {
  maxLength: {
    value: 500,
    message: "Keterangan maksimal 500 karakter",
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
