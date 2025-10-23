import type { FormSchema } from "@/types/form-fields";

import {
  validateKandangId,
  validateAsistenId,
  validateCatatan,
} from "./validations";

export const kandangAsistenSchema: FormSchema = {
  sections: [
    {
      title: "Informasi Penugasan Asisten",
      description: "Masukkan detail penugasan asisten untuk kandang.",
      columns: 2,
      fields: [
        {
          type: "select",
          name: "kandangId",
          label: "Kandang",
          placeholder: "Pilih kandang",
          required: true,
          colSpan: 2,
          helperText: "Pilih kandang yang akan ditugaskan",
          validation: validateKandangId,
          options: [], // Will be populated dynamically in the component
        },

        {
          type: "select",
          name: "asistenId",
          label: "Asisten (Petugas)",
          placeholder: "Pilih asisten",
          required: true,
          colSpan: 2,
          helperText: "Pilih petugas yang akan menjadi asisten kandang",
          validation: validateAsistenId,
          options: [], // Will be populated dynamically in the component
        },

        {
          type: "switch",
          name: "isAktif",
          label: "Status Aktif",
          required: false,
          colSpan: 2,
          helperText: "Aktifkan atau nonaktifkan penugasan asisten",
        },

        {
          type: "textarea",
          name: "catatan",
          label: "Catatan (Opsional)",
          placeholder: "Masukkan catatan penugasan",
          required: false,
          colSpan: 2,
          rows: 3,
          helperText: "Catatan tambahan mengenai penugasan asisten",
          validation: validateCatatan,
        },
      ],
    },
  ],
};
