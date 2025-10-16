import type { FormSchema } from "@/types/form-fields";

import {
  validateNamaPakan,
  validateStok,
  validateBulan,
  validateTahun,
} from "../create/validations";

export const pakanEditSchema: FormSchema = {
  sections: [
    {
      title: "Edit Informasi Pakan",
      description: "Perbarui detail pakan untuk peternakan.",
      columns: 2,
      fields: [
        {
          type: "text",
          name: "namaPakan",
          label: "Nama Pakan",
          placeholder: "Masukkan nama pakan",
          required: true,
          colSpan: 2,
          helperText: "Nama atau jenis pakan",
          validation: validateNamaPakan,
        },

        {
          type: "number",
          name: "stokKg",
          label: "Stok (Kg)",
          placeholder: "Masukkan stok dalam kilogram",
          required: true,
          colSpan: 2,
          min: 0,
          step: 0.01,
          helperText: "Stok pakan dalam satuan kilogram (kg)",
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
