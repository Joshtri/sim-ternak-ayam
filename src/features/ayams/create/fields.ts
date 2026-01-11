import type { FormSchema } from "@/types/form-fields";

import {
  validateKandangId,
  validateTanggalMasuk,
  validateJumlahMasuk,
} from "./validations";

export const ayamSchema: FormSchema = {
  sections: [
    {
      title: "Informasi Ayam",
      description: "Masukkan detail ayam yang masuk ke kandang.",
      columns: 2,
      fields: [
        {
          type: "select",
          name: "kandangId",
          label: "Kandang",
          placeholder: "Pilih kandang",
          required: true,
          colSpan: 2,
          helperText: "Pilih kandang tujuan untuk ayam",
          validation: validateKandangId,
          options: [], // Will be populated dynamically in the component
        },

        {
          type: "date",
          name: "tanggalMasuk",
          label: "Periode Tanggal Masuk",
          placeholder: "Pilih tanggal masuk",
          required: true,
          colSpan: 2,
          helperText: "Tanggal ayam masuk ke kandang",
          validation: validateTanggalMasuk,
        },

        {
          type: "number",
          name: "jumlahMasuk",
          label: "Jumlah Masuk (ekor)",
          placeholder: "Masukkan jumlah ayam",
          required: true,
          colSpan: 2,
          min: 1,
          helperText: "Jumlah ayam yang masuk ke kandang",
          validation: validateJumlahMasuk,
        },
      ],
    },
  ],
};
