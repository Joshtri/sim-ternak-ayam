import type { FormSchema } from "@/types/form-fields";

import {
  validateFullName,
  validateEmail,
  validateNoWA,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
  validateRole,
} from "@/features/users-management/create/validations";
import { getRoleOptions } from "@/features/users-management/enums";

/**
 * User Management Form Schema
 * Matches C# CreateUserDto schema
 */
export const userFormSchema: FormSchema = {
  sections: [
    {
      title: "Informasi Pribadi",
      description: "Masukkan informasi pribadi pengguna",
      columns: 2,
      fields: [
        {
          type: "text",
          name: "fullName",
          label: "Nama Lengkap",
          placeholder: "Masukkan nama lengkap",
          required: true,
          colSpan: 2,
          validation: validateFullName,
        },
        {
          type: "email",
          name: "email",
          label: "Email",
          placeholder: "user@example.com",
          required: true,
          colSpan: 1,
          helperText: "Email untuk komunikasi",
          validation: validateEmail,
        },
        {
          type: "tel",
          name: "noWA",
          label: "No. WhatsApp",
          placeholder: "081234567890",
          required: true,
          colSpan: 1,
          helperText: "Nomor WhatsApp aktif",
          validation: validateNoWA,
        },
      ],
    },
    {
      title: "Informasi Akun",
      description: "Atur informasi akun dan akses pengguna",
      columns: 2,
      fields: [
        {
          type: "text",
          name: "username",
          label: "Username",
          placeholder: "username",
          required: true,
          colSpan: 2,
          helperText: "Username untuk login (huruf, angka, underscore)",
          validation: validateUsername,
        },
        {
          type: "password",
          name: "password",
          label: "Password",
          placeholder: "••••••••",
          required: true,
          colSpan: 1,
          helperText: "Min. 8 karakter, huruf besar, kecil, dan angka",
          validation: validatePassword,
        },
        {
          type: "password",
          name: "confirmPassword",
          label: "Konfirmasi Password",
          placeholder: "••••••••",
          required: true,
          colSpan: 1,
          helperText: "Ulangi password yang sama",
          validation: validateConfirmPassword,
        },
        {
          type: "select",
          name: "role",
          label: "Role Pengguna",
          placeholder: "Pilih role pengguna",
          required: true,
          colSpan: 2,
          validation: validateRole,
          options: getRoleOptions(),
        },
      ],
    },
  ],
};

/**
 * User Quick Create Form Schema
 * Simplified version for quick user creation
 */
export const userQuickCreateSchema: FormSchema = {
  sections: [
    {
      columns: 1,
      fields: [
        {
          type: "text",
          name: "fullName",
          label: "Nama Lengkap",
          placeholder: "Masukkan nama lengkap",
          required: true,
          validation: validateFullName,
        },
        {
          type: "text",
          name: "username",
          label: "Username",
          placeholder: "username",
          required: true,
          validation: validateUsername,
        },
        {
          type: "email",
          name: "email",
          label: "Email",
          placeholder: "user@example.com",
          required: true,
          validation: validateEmail,
        },
        {
          type: "tel",
          name: "noWA",
          label: "No. WhatsApp",
          placeholder: "081234567890",
          required: true,
          validation: validateNoWA,
        },
        {
          type: "password",
          name: "password",
          label: "Password",
          placeholder: "••••••••",
          required: true,
          validation: validatePassword,
        },
        {
          type: "password",
          name: "confirmPassword",
          label: "Konfirmasi Password",
          placeholder: "••••••••",
          required: true,
          validation: validateConfirmPassword,
        },
        {
          type: "select",
          name: "role",
          label: "Role",
          placeholder: "Pilih role",
          required: true,
          validation: validateRole,
          options: getRoleOptions(),
        },
      ],
    },
  ],
};
