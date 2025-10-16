/**
 * User Management Edit Helper Functions
 */

import { User } from "../services/userService";
import { UserRole } from "@/features/users-management/enums";

/**
 * User edit form data interface
 * Note: Password fields are NOT included in edit form
 * Use separate change password feature for updating passwords
 */
export interface UserEditFormData {
  username: string;
  fullName: string;
  email: string;
  noWA: string;
  role: string; // Changed from number to string to match UserRole enum
}

/**
 * UpdateUserDto interface that matches backend expectations
 * Maps to the actual API service interface
 */
export interface UpdateUserDto {
  username?: string;
  fullName?: string;
  email?: string;
  role?: "Petugas" | "Operator" | "Pemilik";
  noWA?: string;
  isActive?: boolean;
}

/**
 * Get default form values from existing user data
 */
export const getDefaultUserEditFormValues = (
  user?: User
): Partial<UserEditFormData> => {
  if (!user) {
    return {
      username: "",
      fullName: "",
      email: "",
      noWA: "",
      role: UserRole.PETUGAS,
    };
  }

  // Map backend role string to UserRole enum
  let roleValue = UserRole.PETUGAS;
  if (user.role) {
    const roleStr = String(user.role).toLowerCase();
    // Map API roles to our enum values
    // API returns: "Operator", "Petugas", "Pemilik"
    if (roleStr === "pemilik" || roleStr === "admin") {
      roleValue = UserRole.PEMILIK;
    } else if (roleStr === "operator") {
      roleValue = UserRole.OPERATOR;
    } else if (roleStr === "petugas" || roleStr === "manager") {
      roleValue = UserRole.PETUGAS;
    }
  }

  return {
    username: user.username || "",
    fullName: user.fullName || "",
    email: user.email || "",
    noWA: user.noWA || "",
    role: roleValue,
  };
};

/**
 * Transform form data to UpdateUserDto before submission
 * @param data - Raw form data
 * @returns Transformed data ready for API
 */
export const transformUserEditFormData = (
  data: UserEditFormData
): UpdateUserDto => {
  // Role is already in correct format from UserRole enum
  const role = data.role as "Petugas" | "Operator" | "Pemilik";

  return {
    username: data.username.trim(),
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    noWA: data.noWA.trim(),
    role: role,
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
