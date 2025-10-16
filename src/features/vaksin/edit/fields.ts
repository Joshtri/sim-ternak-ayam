import type { FormSchema } from "@/types/form-fields";

import {
  validateNamaVaksin,
  validateStok,
  validateBulan,
  validateTahun,
} from "../create/validations";

export const vaksinEditSchema: FormSchema = {
  sections: [
    {
      title: "Edit Informasi Vaksin",
      description: "Perbarui detail vaksin untuk peternakan.",
      columns: 2,
      fields: [
        {
          type: "text",
          name: "namaVaksin",
          label: "Nama Vaksin",
          placeholder: "Masukkan nama vaksin",
          required: true,
          colSpan: 2,
          helperText: "Nama atau jenis vaksin",
          validation: validateNamaVaksin,
        },

        {
          type: "number",
          name: "stok",
          label: "Stok (dosis)",
          placeholder: "Masukkan stok dalam dosis",
          required: true,
          colSpan: 2,
          min: 0,
          helperText: "Stok vaksin dalam satuan dosis",
          validation: validateStok,
        },

        {
          type: "number",
          name: "bulan",
          label: "Bulan",
          placeholder: "Masukkan bulan (1-12)",
          required: true,
          colSpan: 1,
          min: 1,
          max: 12,
          helperText: "Bulan pencatatan (1-12)",
          validation: validateBulan,
        },

        {
          type: "number",
          name: "tahun",
          label: "Tahun",
          placeholder: "Masukkan tahun",
          required: true,
          colSpan: 1,
          min: 2000,
          max: 2100,
          helperText: "Tahun pencatatan",
          validation: validateTahun,
        },
      ],
    },
  ],
};
