import type { FormSchema } from "@/types/form-fields";

import {
  validateJenisBiaya,
  validateTanggal,
  validateJumlah,
  validatePetugasId,
  validateOperasionalId,
  validateKandangId,
  validateBuktiUrl,
  validateKeterangan,
  validateCatatan,
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
          helperText:
            "Tanggal terjadinya pengeluaran (akan auto-populate bulan dan tahun)",
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
          name: "kandangId",
          label: "Kandang (Opsional)",
          placeholder: "Pilih kandang",
          required: false,
          colSpan: 1,
          helperText:
            "Opsional: Pilih kandang jika biaya spesifik untuk kandang tertentu",
          validation: validateKandangId,
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
          type: "number",
          name: "bulan",
          label: "Bulan",
          placeholder: "1-12",
          required: false,
          colSpan: 1,
          min: 1,
          max: 12,
          helperText:
            "Bulan (auto-populated dari tanggal, dapat diubah manual)",
        },

        {
          type: "number",
          name: "tahun",
          label: "Tahun",
          placeholder: "YYYY",
          required: false,
          colSpan: 1,
          min: 2000,
          max: 2100,
          helperText:
            "Tahun (auto-populated dari tanggal, dapat diubah manual)",
        },

        {
          type: "textarea",
          name: "keterangan",
          label: "Keterangan (Opsional)",
          placeholder: "Masukkan keterangan biaya",
          required: false,
          colSpan: 2,
          rows: 2,
          helperText: "Keterangan tambahan mengenai biaya",
          validation: validateKeterangan,
        },

        {
          type: "textarea",
          name: "catatan",
          label: "Catatan (Opsional)",
          placeholder: "Masukkan catatan",
          required: false,
          colSpan: 2,
          rows: 2,
          helperText: "Catatan internal mengenai biaya",
          validation: validateCatatan,
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
