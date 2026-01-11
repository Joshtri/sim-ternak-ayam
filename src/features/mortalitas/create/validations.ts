/**
 * Mortalitas Form Validation Rules
 * Validation rules for mortalitas create/edit forms
 */

export const validateKandangId = {
  required: "Kandang harus dipilih",
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID kandang tidak valid",
  },
};

/**
 * Validate ayamId (legacy/edit support)
 */
export const validateAyamId = {
  required: "Ayam harus dipilih",
  pattern: {
    value: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    message: "Format ID ayam tidak valid",
  },
};

/**
 * Validate tanggal kematian
 */
export const validateTanggalKematian = {
  required: "Tanggal kematian harus diisi",
};

/**
 * Validate jumlah kematian
 */
export const validateJumlahKematian = {
  required: "Jumlah kematian harus diisi",
  min: {
    value: 1,
    message: "Jumlah kematian minimal 1 ekor",
  },
  max: {
    value: 1000000,
    message: "Jumlah kematian maksimal 1.000.000 ekor",
  },
  valueAsNumber: true,
};

/**
 * Validate penyebab kematian
 */
export const validatePenyebabKematian = {
  required: "Penyebab kematian harus diisi",
  minLength: {
    value: 3,
    message: "Penyebab kematian minimal 3 karakter",
  },
  maxLength: {
    value: 500,
    message: "Penyebab kematian maksimal 500 karakter",
  },
};

/**
 * Validate foto mortalitas
 */
export const validateFotoMortalitas = {
  validate: {
    fileSize: (value: string) => {
      if (!value) return true; // Optional field

      // Check if it's a base64 string
      if (!value.startsWith("data:image/")) {
        return "Format foto tidak valid";
      }

      // Estimate file size from base64 (base64 is ~33% larger than original)
      const base64Length = value.split(",")[1]?.length || 0;
      const fileSizeInBytes = (base64Length * 3) / 4;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

      if (fileSizeInMB > 5) {
        return "Ukuran foto maksimal 5MB";
      }

      return true;
    },
    fileType: (value: string) => {
      if (!value) return true; // Optional field

      // Check if it's a valid image type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      const fileType = value.split(";")[0]?.split(":")[1];

      if (!fileType || !validTypes.includes(fileType)) {
        return "Format foto harus JPG, PNG, GIF, atau WebP";
      }

      return true;
    },
  },
};
