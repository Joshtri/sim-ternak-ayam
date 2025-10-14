/**
 * User Role Enum
 * Matches C# backend enum values
 */
export enum UserRole {
  PETUGAS = "Petugas",
  OPERATOR = "Operator",
  PEMILIK = "Pemilik",
}

/**
 * Helper to get role label
 */
// export const getRoleLabel = (role: UserRole): string => {
//   switch (role) {
//     case UserRole.PETUGAS:
//       return "Petugas";
//     case UserRole.OPERATOR:
//       return "Operator";
//     case UserRole.PEMILIK:
//       return "Pemilik";
//     default:
//       return "Unknown";
//   }
// };

/**
 * Helper to get role options for forms
 */
export const getRoleOptions = () => [
  {
    label: "Petugas",
    value: UserRole.PETUGAS,
    description: "Petugas lapangan",
  },
  {
    label: "Operator",
    value: UserRole.OPERATOR,
    description: "Operator sistem",
  },
  { label: "Pemilik", value: UserRole.PEMILIK, description: "Pemilik usaha" },
];
