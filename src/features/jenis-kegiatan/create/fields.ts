import type { FormSchema } from "@/types/form-fields";

import {
  validateNamaKegiatan,
  validateDeskripsi,
  validateSatuan,
  validateBiayaDefault,
} from "./validations";
import { commonSatuanOptions } from "./helpers";

export const jenisKegiatanSchema: FormSchema = {
  sections: [
    {
      title: "Informasi Jenis Kegiatan",
      description: "Masukkan detail jenis kegiatan sebagai data master.",
      columns: 2,
      fields: [
        {
          type: "text",
          name: "namaKegiatan",
          label: "Nama Kegiatan",
          placeholder: "Masukkan nama kegiatan",
          required: true,
          colSpan: 2,
          helperText: "Nama jenis kegiatan (contoh: Vaksinasi, Pemberian Pakan)",
          validation: validateNamaKegiatan,
        },

        {
          type: "textarea",
          name: "deskripsi",
          label: "Deskripsi",
          placeholder: "Masukkan deskripsi kegiatan",
          required: true,
          colSpan: 2,
          rows: 4,
          helperText: "Deskripsi detail tentang jenis kegiatan ini",
          validation: validateDeskripsi,
        },

        // {
        //   type: "select",
        //   name: "satuan",
        //   label: "Satuan",
        //   placeholder: "Pilih satuan",
        //   required: true,
        //   colSpan: 1,
        //   helperText: "Satuan untuk kegiatan ini",
        //   validation: validateSatuan,
        //   options: commonSatuanOptions,
        // },

        // {
        //   type: "number",
        //   name: "biayaDefault",
        //   label: "Biaya Default (Rp)",
        //   placeholder: "Masukkan biaya default",
        //   required: true,
        //   colSpan: 1,
        //   min: 0,
        //   helperText: "Biaya standar untuk kegiatan ini",
        //   validation: validateBiayaDefault,
        // },
      ],
    },
  ],
};
