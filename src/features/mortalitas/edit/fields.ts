import type { FormSchema } from "@/types/form-fields";

import {
  validateAyamId,
  validateTanggalKematian,
  validateJumlahKematian,
  validatePenyebabKematian,
  validateFotoMortalitas,
} from "../create/validations";

export const mortalitasEditSchema: FormSchema = {
  sections: [
    {
      title: "Edit Informasi Mortalitas",
      description: "Perbarui detail kematian ayam broiler.",
      columns: 2,
      fields: [
        {
          type: "select",
          name: "ayamId",
          label: "Data Ayam",
          placeholder: "Pilih data ayam",
          required: true,
          colSpan: 2,
          helperText: "Pilih data ayam yang mengalami kematian",
          validation: validateAyamId,
          options: [], // Will be populated dynamically in the component
        },

        {
          type: "date",
          name: "tanggalKematian",
          label: "Tanggal Kematian",
          placeholder: "Pilih tanggal kematian",
          required: true,
          colSpan: 2,
          helperText: "Tanggal terjadinya kematian ayam",
          validation: validateTanggalKematian,
        },

        {
          type: "number",
          name: "jumlahKematian",
          label: "Jumlah Kematian (ekor)",
          placeholder: "Masukkan jumlah kematian",
          required: true,
          colSpan: 2,
          min: 1,
          helperText: "Jumlah ayam yang mati",
          validation: validateJumlahKematian,
        },

        {
          type: "textarea",
          name: "penyebabKematian",
          label: "Penyebab Kematian",
          placeholder: "Masukkan penyebab kematian",
          required: true,
          colSpan: 2,
          rows: 4,
          helperText: "Deskripsi penyebab kematian ayam",
          validation: validatePenyebabKematian,
        },

        {
          type: "custom",
          name: "fotoMortalitas",
          label: "Foto Mortalitas",
          required: false,
          colSpan: 2,
          helperText: "Upload foto mortalitas (opsional, maksimal 5MB)",
          validation: validateFotoMortalitas,
          render: () => null, // Will be rendered in the form component
        },
      ],
    },
  ],
};
