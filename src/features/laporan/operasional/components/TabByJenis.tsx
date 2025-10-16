"use client";

import { Chip } from "@heroui/react";

export default function TabByJenis({ detailPerJenis }: any) {
  if (detailPerJenis.length === 0) {
    return <p className="text-center text-default-500 py-8">Belum ada data</p>;
  }

  return (
    <div className="pt-4 space-y-3">
      {detailPerJenis.map((item: any, idx: number) => (
        <div
          key={idx}
          className="flex justify-between items-center p-4 bg-default-100 rounded-lg"
        >
          <div>
            <p className="font-semibold">{item.namaJenisKegiatan}</p>
            <p className="text-sm text-default-500">
              Total Jumlah: {item.totalJumlah.toLocaleString("id-ID")}
            </p>
          </div>
          <Chip color="primary" variant="flat">
            {item.jumlahKegiatan} kegiatan
          </Chip>
        </div>
      ))}
    </div>
  );
}
