/**
 * User Management Validation Rules
 * Using React Hook Form validation (not Zod)
 */

/**
 * Validation for full name
 */
export const validateFullName = {
  required: "Nama lengkap wajib diisi",
  minLength: {
    value: 3,
    message: "Nama lengkap minimal 3 karakter",
  },
  maxLength: {
    value: 100,
    message: "Nama lengkap maksimal 100 karakter",
  },
  pattern: {
    value: /^[a-zA-Z\s]+$/,
    message: "Nama lengkap hanya boleh berisi huruf dan spasi",
  },
};

/**
 * Validation for email
 */
export const validateEmail = {
  required: "Email wajib diisi",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Format email tidak valid",
  },
};

/**
 * Validation for WhatsApp number (noWA)
 */
export const validateNoWA = {
  required: "Nomor WhatsApp wajib diisi",
  pattern: {
    value: /^(\+62|62|0)[0-9]{9,12}$/,
    message: "Format nomor WhatsApp tidak valid (contoh: 081234567890)",
  },
};

/**
 * Validation for username
 */
export const validateUsername = {
  required: "Username wajib diisi",
  minLength: {
    value: 3,
    message: "Username minimal 3 karakter",
  },
  maxLength: {
    value: 20,
    message: "Username maksimal 20 karakter",
  },
  pattern: {
    value: /^[a-zA-Z0-9_]+$/,
    message: "Username hanya boleh huruf, angka, dan underscore",
  },
};

/**
 * Validation for password
 */
export const validatePassword = {
  required: "Password wajib diisi",
  minLength: {
    value: 8,
    message: "Password minimal 8 karakter",
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: "Password harus mengandung huruf besar, huruf kecil, dan angka",
  },
};

/**
 * Validation for password confirmation
 */
export const validateConfirmPassword = {
  required: "Konfirmasi password wajib diisi",
};

/**
 * Helper to create dynamic confirm password validation
 * Used with React Hook Form's validate function
 */
export const createValidatePasswordMatch = (password: string) => ({
  required: "Konfirmasi password wajib diisi",
  validate: (value: string) => value === password || "Password tidak cocok",
});

/**
 * Validation for role
 */
export const validateRole = {
  required: "Role wajib dipilih",
};

/**
 * Validation for status
 */
export const validateStatus = {
  required: "Status wajib dipilih",
};

/**
 * All validation rules combined
 * Matches C# CreateUserDto schema
 */
export const userValidationRules = {
  username: validateUsername,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  fullName: validateFullName,
  email: validateEmail,
  noWA: validateNoWA,
  role: validateRole,
};
