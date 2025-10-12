import type { FormSchema } from "@/types/form-fields";

import {
  validateJenisBiaya,
  validateTanggal,
  validateJumlah,
  validatePetugasId,
  validateOperasionalId,
  validateBuktiUrl,
} from "./validations";

export const biayaSchema: FormSchema = {
  sections: [
    {
      title: "Informasi Biaya",
      description: "Masukkan detail pengeluaran/biaya peternakan.",
      columns: 2,
      fields: [
        {
          type: "text",
          name: "jenisBiaya",
          label: "Jenis Biaya",
          placeholder: "Masukkan jenis biaya (contoh: Pakan, Obat, Listrik)",
          required: true,
          colSpan: 2,
          helperText: "Jenis atau kategori pengeluaran",
          validation: validateJenisBiaya,
        },

        {
          type: "date",
          name: "tanggal",
          label: "Tanggal Biaya",
          placeholder: "Pilih tanggal biaya",
          required: true,
          colSpan: 1,
          helperText: "Tanggal terjadinya pengeluaran",
          validation: validateTanggal,
        },

        {
          type: "number",
          name: "jumlah",
          label: "Jumlah (Rp)",
          placeholder: "Masukkan nominal biaya",
          required: true,
          colSpan: 1,
          min: 0,
          step: 0.01,
          helperText: "Nominal biaya dalam rupiah",
          validation: validateJumlah,
        },

        {
          type: "select",
          name: "petugasId",
          label: "Petugas",
          placeholder: "Pilih petugas",
          required: true,
          colSpan: 1,
          helperText: "Pilih petugas yang mencatat biaya",
          validation: validatePetugasId,
          options: [], // Will be populated dynamically in the component
        },

        {
          type: "select",
          name: "operasionalId",
          label: "Operasional (Opsional)",
          placeholder: "Pilih kegiatan operasional",
          required: false,
          colSpan: 1,
          helperText: "Opsional: Pilih jika biaya terkait kegiatan operasional",
          validation: validateOperasionalId,
          options: [], // Will be populated dynamically in the component
        },

        {
          type: "text",
          name: "buktiUrl",
          label: "Bukti URL (Opsional)",
          placeholder: "https://contoh.com/bukti-nota.jpg",
          required: false,
          colSpan: 2,
          helperText: "URL bukti pengeluaran (nota/kwitansi)",
          validation: validateBuktiUrl,
        },
      ],
    },
  ],
};
