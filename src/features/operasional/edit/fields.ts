import type { FormSchema } from "@/types/form-fields";

import {
  validateJenisKegiatanId,
  validateTanggal,
  validateJumlah,
  validatePetugasId,
  validateKandangId,
  validatePakanId,
  validateVaksinId,
} from "../create/validations";

export const operasionalEditSchema: FormSchema = {
  sections: [
    {
      title: "Edit Informasi Kegiatan Operasional",
      description: "Perbarui detail kegiatan harian peternakan.",
      columns: 2,
      fields: [
        {
          type: "select",
          name: "jenisKegiatanId",
          label: "Jenis Kegiatan",
          placeholder: "Pilih jenis kegiatan",
          required: true,
          colSpan: 2,
          helperText: "Pilih jenis kegiatan yang akan dilakukan",
          validation: validateJenisKegiatanId,
          options: [], // Will be populated dynamically in the component
        },

        {
          type: "date",
          name: "tanggal",
          label: "Tanggal Kegiatan",
          placeholder: "Pilih tanggal kegiatan",
          required: true,
          colSpan: 1,
          helperText: "Tanggal pelaksanaan kegiatan",
          validation: validateTanggal,
        },

        {
          type: "number",
          name: "jumlah",
          label: "Jumlah",
          placeholder: "Masukkan jumlah kegiatan",
          required: true,
          colSpan: 1,
          min: 1,
          helperText: "Jumlah/quantity kegiatan yang dilakukan",
          validation: validateJumlah,
        },

        {
          type: "select",
          name: "kandangId",
          label: "Kandang",
          placeholder: "Pilih kandang",
          required: true,
          colSpan: 1,
          helperText: "Pilih kandang tempat kegiatan dilakukan",
          validation: validateKandangId,
          options: [], // Will be populated dynamically in the component
        },

        {
          type: "select",
          name: "petugasId",
          label: "Petugas",
          placeholder: "Pilih petugas",
          required: true,
          colSpan: 1,
          helperText: "Pilih petugas yang melakukan kegiatan",
          validation: validatePetugasId,
          options: [], // Will be populated dynamically in the component
        },

        {
          type: "select",
          name: "pakanId",
          label: "Pakan (Opsional)",
          placeholder: "Pilih pakan",
          required: false,
          colSpan: 1,
          helperText: "Pilih pakan jika kegiatan terkait pemberian pakan",
          validation: validatePakanId,
          options: [], // Will be populated dynamically in the component
        },

        {
          type: "select",
          name: "vaksinId",
          label: "Vaksin (Opsional)",
          placeholder: "Pilih vaksin",
          required: false,
          colSpan: 1,
          helperText: "Pilih vaksin jika kegiatan terkait vaksinasi",
          validation: validateVaksinId,
          options: [], // Will be populated dynamically in the component
        },
      ],
    },
  ],
};
