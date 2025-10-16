/**
 * User Management Type Definitions
 */

/**
 * User form data type
 * Matches C# CreateUserDto schema
 */
export interface UserFormData {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  noWA: string;
  role: string; // "Petugas" | "Operator" | "Pemilik"
}

/**
 * User display type (with computed fields)
 */
export interface UserDisplay extends UserFormData {
  id: string;
  fullName: string;
  roleLabel: string;
  statusLabel: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * User role type
 */
export type UserRole = "admin" | "manager" | "staff";

/**
 * User status type
 */
export type UserStatus = "active" | "inactive" | "suspended";
