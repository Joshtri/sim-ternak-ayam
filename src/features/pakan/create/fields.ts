import type { FormSchema } from "@/types/form-fields";

import { validateNamaPakan, validateStok, validateBulan, validateTahun } from "./validations";

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
          name: "stokKg",
          label: "Stok (Kg)",
          placeholder: "Masukkan jumlah stok",
          required: true,
          colSpan: 2,
          min: 0,
          step: 0.01,
          helperText: "Jumlah stok pakan dalam kilogram",
          validation: validateStok,
        },

        {
          type: "select",
          name: "bulan",
          label: "Bulan",
          placeholder: "Pilih bulan",
          required: true,
          colSpan: 1,
          helperText: "Bulan pencatatan stok",
          validation: validateBulan,
          options: [
            { label: "Januari", value: "1" },
            { label: "Februari", value: "2" },
            { label: "Maret", value: "3" },
            { label: "April", value: "4" },
            { label: "Mei", value: "5" },
            { label: "Juni", value: "6" },
            { label: "Juli", value: "7" },
            { label: "Agustus", value: "8" },
            { label: "September", value: "9" },
            { label: "Oktober", value: "10" },
            { label: "November", value: "11" },
            { label: "Desember", value: "12" },
          ],
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
          helperText: "Tahun pencatatan stok (2000-2100)",
          validation: validateTahun,
        },
      ],
    },
  ],
};
