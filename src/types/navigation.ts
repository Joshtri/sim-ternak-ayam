import { ReactNode } from "react";

// ============================================
// 🧭 NAVIGATION TYPES
// ============================================

/**
 * User roles untuk role-based navigation
 */
export type UserRole = "pemilik" | "operator" | "petugas";

/**
 * Navigation item interface
 */
export interface NavigationItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon component */
  icon: ReactNode;
  /** Route path */
  href: string;
  /** Optional badge (e.g., notification count) */
  badge?: number | string;
  /** Roles yang bisa akses menu ini */
  allowedRoles?: UserRole[];
  /** Sub-menu items (untuk nested navigation) */
  children?: NavigationItem[];
  /** External link? */
  external?: boolean;
}

/**
 * Navigation section (group of items)
 */
export interface NavigationSection {
  /** Section title */
  title?: string;
  /** Items dalam section ini */
  items: NavigationItem[];
}
