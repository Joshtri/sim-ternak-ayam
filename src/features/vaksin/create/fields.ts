import type { FormSchema } from "@/types/form-fields";

import { validateNamaVaksin, validateStok } from "./validations";

export const vaksinSchema: FormSchema = {
  sections: [
    {
      title: "Informasi Vaksin",
      description: "Masukkan detail vaksin ayam broiler.",
      columns: 2,
      fields: [
        {
          type: "text",
          name: "namaVaksin",
          label: "Nama Vaksin",
          placeholder: "Masukkan nama vaksin",
          required: true,
          colSpan: 2,
          helperText: "Nama jenis vaksin",
          validation: validateNamaVaksin,
        },

        {
          type: "number",
          name: "stok",
          label: "Stok (unit)",
          placeholder: "Masukkan jumlah stok",
          required: true,
          colSpan: 2,
          min: 0,
          helperText: "Jumlah stok vaksin dalam unit",
          validation: validateStok,
        },
      ],
    },
  ],
};
