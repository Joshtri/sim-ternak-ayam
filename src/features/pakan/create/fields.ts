import type { FormSchema } from "@/types/form-fields";

import { validateNamaPakan, validateStok } from "./validations";

export const pakanSchema: FormSchema = {
  sections: [
    {
      title: "Informasi Pakan",
      description: "Masukkan detail pakan ayam broiler.",
      columns: 2,
      fields: [
        {
          type: "text",
          name: "namaPakan",
          label: "Nama Pakan",
          placeholder: "Masukkan nama pakan",
          required: true,
          colSpan: 2,
          helperText: "Nama jenis pakan",
          validation: validateNamaPakan,
        },

        {
          type: "number",
          name: "stok",
          label: "Stok (kg)",
          placeholder: "Masukkan jumlah stok",
          required: true,
          colSpan: 2,
          min: 0,
          helperText: "Jumlah stok pakan dalam kilogram",
          validation: validateStok,
        },
      ],
    },
  ],
};
