import type { FormSchema } from "@/types/form-fields";

import {
  validateFullName,
  validateEmail,
  validateNoWA,
  validateUsername,
  validateRole,
} from "@/features/users-management/create/validations";
import { getRoleOptions } from "@/features/users-management/enums";

/**
 * User Edit Form Schema
 * Note: Password fields are excluded from edit form
 * Use separate change password feature for updating passwords
 */
export const userEditSchema: FormSchema = {
  sections: [
    {
      title: "Informasi Pribadi",
      description: "Perbarui informasi pribadi pengguna",
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
      description: "Perbarui informasi akun pengguna",
      columns: 2,
      fields: [
        {
          type: "text",
          name: "username",
          label: "Username",
          placeholder: "username",
          required: true,
          colSpan: 2,
          helperText: "Username tidak dapat diubah",
          disabled: true,
          validation: validateUsername,
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
