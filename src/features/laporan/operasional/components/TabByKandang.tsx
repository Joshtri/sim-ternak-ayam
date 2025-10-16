"use client";

import { Chip } from "@heroui/react";

export default function TabByKandang({ detailPerKandang }: any) {
  if (detailPerKandang.length === 0) {
    return <p className="text-center text-default-500 py-8">Belum ada data</p>;
  }

  return (
    <div className="pt-4 space-y-3">
      {detailPerKandang.map((item: any, idx: number) => (
        <div
          key={idx}
          className="flex justify-between items-center p-4 bg-default-100 rounded-lg"
        >
          <div>
            <p className="font-semibold">{item.namaKandang}</p>
            <p className="text-sm text-default-500">{item.lokasi}</p>
            <p className="text-xs text-default-400 mt-1">
              Petugas: {item.namaPetugas}
            </p>
          </div>
          <Chip color="success" variant="flat">
            {item.jumlahOperasional} operasional
          </Chip>
        </div>
      ))}
    </div>
  );
}
