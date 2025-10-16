import type { FormSchema } from "@/types/form-fields";

import {
  validateNamaKandang,
  validateKapasitas,
  validateLokasi,
  validatePetugasId,
} from "../create/validations";

export const kandangEditSchema: FormSchema = {
  sections: [
    {
      title: "Edit Informasi Kandang",
      description: "Perbarui detail kandang ayam broiler.",
      columns: 2,
      fields: [
        {
          type: "text",
          name: "namaKandang",
          label: "Nama Kandang",
          placeholder: "Masukkan nama kandang",
          required: true,
          colSpan: 2,
          validation: validateNamaKandang,
        },

        {
          type: "number",
          name: "kapasitas",
          label: "Kapasitas (ekor)",
          placeholder: "Masukkan kapasitas kandang",
          required: true,
          colSpan: 2,
          min: 1,
          validation: validateKapasitas,
        },

        {
          type: "text",
          name: "lokasi",
          label: "Lokasi",
          placeholder: "Masukkan lokasi kandang",
          required: true,
          colSpan: 2,
          helperText: "Lokasi kandang berada",
          validation: validateLokasi,
        },

        {
          type: "select",
          name: "petugasId",
          label: "Petugas Kandang",
          placeholder: "Pilih petugas kandang",
          required: true,
          colSpan: 2,
          helperText: "Pilih petugas yang bertanggung jawab untuk kandang ini",
          validation: validatePetugasId,
          options: [], // Will be populated dynamically in the component
        },
      ],
    },
  ],
};
