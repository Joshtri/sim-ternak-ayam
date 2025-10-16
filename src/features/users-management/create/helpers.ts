/**
 * User Management Helper Functions
 * Matches C# CreateUserDto schema
 */

import { UserFormData } from "@/features/users-management/types";
import { UserRole } from "@/features/users-management/enums";
import { CreateUserDto } from "@/features/users-management/services/userService";

/**
 * Get default form values
 */
export const getDefaultUserFormValues = (): Partial<UserFormData> => ({
  username: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  email: "",
  noWA: "",
  role: UserRole.PETUGAS, // Default to Petugas (0)
});

/**
 * Transform form data to CreateUserDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformUserFormData = (data: UserFormData): CreateUserDto => {
  return {
    username: data.username.trim(),
    password: data.password,
    confirmPassword: data.confirmPassword,
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    noWA: data.noWA.trim(),
    role: data.role,
  };
};

/**
 * Format user data for display
 * @param user - User data from API
 * @returns Formatted user data
 */
export const formatUserForDisplay = (user: any) => {
  return {
    ...user,
    roleLabel: getRoleLabel(user.role),
  };
};

/**
 * Get role label from value
 */
export const getRoleLabel = (role: string): string => {
  switch (role) {
    case UserRole.PETUGAS:
      return "Petugas";
    case UserRole.OPERATOR:
      return "Operator";
    case UserRole.PEMILIK:
      return "Pemilik";
    default:
      return "Unknown";
  }
};

/**
 * Validate if user can be deleted
 */
export const canDeleteUser = (user: any, currentUserId: string): boolean => {
  // Cannot delete yourself
  if (user.id === currentUserId) {
    return false;
  }

  // Cannot delete owner/pemilik users (optional business rule)
  if (user.role === UserRole.PEMILIK) {
    return false;
  }

  return true;
};

/**
 * Generate username suggestion from full name
 */
export const suggestUsername = (fullName: string): string => {
  const cleaned = fullName.toLowerCase().trim();
  const username = cleaned.replace(/\s+/g, ".");

  return username.replace(/[^a-z0-9._]/g, "");
};

/**
 * Check if password is strong enough
 */
export const isPasswordStrong = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return minLength && hasUpperCase && hasLowerCase && hasNumber;
};

/**
 * Get password strength level
 */
export const getPasswordStrength = (
  password: string
): "weak" | "medium" | "strong" => {
  if (!password) return "weak";

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const score = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  if (score <= 2) return "weak";
  if (score <= 4) return "medium";

  return "strong";
};

/**
 * Validate passwords match
 */
export const doPasswordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword && password.length > 0;
};

/**
 * Format WhatsApp number for display
 */
export const formatWhatsAppNumber = (noWA: string): string => {
  // Remove all non-digits
  const cleaned = noWA.replace(/\D/g, "");

  // Format as: 0812-3456-7890
  if (cleaned.length >= 10) {
    return cleaned.replace(/(\d{4})(\d{4})(\d+)/, "$1-$2-$3");
  }

  return noWA;
};

/**
 * Validate WhatsApp number format
 */
export const isValidWhatsAppNumber = (noWA: string): boolean => {
  const cleaned = noWA.replace(/\D/g, "");

  // Must start with 0 or 62 and have 10-13 digits
  return /^(0|62)[0-9]{9,12}$/.test(cleaned);
};
