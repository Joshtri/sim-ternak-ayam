import type { FormSchema } from "@/types/form-fields";

import {
  validateKandangId,
  validateTanggalPanen,
  validateJumlahEkorPanen,
  validateBeratRataRata,
} from "./validations";

export const panenSchema: FormSchema = {
  sections: [
    {
      title: "Informasi Panen",
      description: "Masukkan detail pemanenan ayam broiler.",
      columns: 2,
      fields: [
        {
          type: "select",
          name: "kandangId",
          label: "Kandang",
          placeholder: "Pilih kandang",
          required: true,
          colSpan: 2,
          helperText: "Pilih kandang yang akan dipanen",
          validation: validateKandangId,
          options: [], // Will be populated dynamically in the component
        },

        {
          type: "date",
          name: "tanggalPanen",
          label: "Tanggal Panen",
          placeholder: "Pilih tanggal panen",
          required: true,
          colSpan: 2,
          helperText: "Tanggal pelaksanaan panen",
          validation: validateTanggalPanen,
        },

        {
          type: "number",
          name: "jumlahEkorPanen",
          label: "Jumlah Ekor Panen",
          placeholder: "Masukkan jumlah ekor",
          required: true,
          colSpan: 1,
          min: 1,
          helperText: "Jumlah ayam yang dipanen",
          validation: validateJumlahEkorPanen,
        },

        {
          type: "number",
          name: "beratRataRata",
          label: "Berat Rata-Rata (kg)",
          placeholder: "Masukkan berat rata-rata",
          required: true,
          colSpan: 1,
          min: 0.01,
          step: 0.01,
          helperText: "Berat rata-rata per ekor dalam kg",
          validation: validateBeratRataRata,
        },
      ],
    },
  ],
};
