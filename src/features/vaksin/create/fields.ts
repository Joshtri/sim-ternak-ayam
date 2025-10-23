import type { FormSchema } from "@/types/form-fields";

import { validateNamaVaksin, validateStok, validateJenis, validateSatuan, validateHarga, validateBulan, validateTahun } from "./validations";

export const vaksinSchema: FormSchema = {
  sections: [
    {
      title: "Informasi Vaksin & Vitamin",
      description: "Masukkan detail vaksin atau vitamin ayam broiler.",
      columns: 2,
      fields: [
        {
          type: "radio",
          name: "tipe",
          label: "Tipe",
          required: true,
          colSpan: 2,
          helperText: "Pilih tipe: Vaksin atau Vitamin",
          options: [
            { label: "Vaksin", value: "0" },
            { label: "Vitamin", value: "1" },
          ],
        },

        {
          type: "text",
          name: "namaVaksin",
          label: "Nama",
          placeholder: "Masukkan nama vaksin/vitamin",
          required: true,
          colSpan: 2,
          helperText: "Nama vaksin atau vitamin",
          validation: validateNamaVaksin,
        },

        {
          type: "text",
          name: "jenis",
          label: "Jenis",
          placeholder: "Masukkan jenis",
          required: true,
          colSpan: 2,
          helperText: "Jenis vaksin atau vitamin (contoh: ND Vaccine, Vitamin B Complex)",
          validation: validateJenis,
        },

        {
          type: "number",
          name: "stok",
          label: "Stok",
          placeholder: "Masukkan jumlah stok",
          required: true,
          colSpan: 1,
          min: 0,
          helperText: "Jumlah stok",
          validation: validateStok,
        },

        {
          type: "text",
          name: "satuan",
          label: "Satuan",
          placeholder: "Masukkan satuan",
          required: true,
          colSpan: 1,
          helperText: "Satuan (contoh: vial, botol, sachet)",
          validation: validateSatuan,
        },

        {
          type: "currency",
          name: "hargaPerSatuan",
          label: "Harga Per Satuan",
          placeholder: "Masukkan harga",
          required: true,
          colSpan: 2,
          min: 0,
          helperText: "Harga per satuan dalam Rupiah",
          validation: validateHarga,
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
