"use client";

import { Chip } from "@heroui/react";

import ExportPDFButton from "../../components/ExportPDFButton";

export default function TabByKandang({
  detailPerKandang,
  startDate,
  endDate,
}: {
  detailPerKandang: any;
  startDate?: string;
  endDate?: string;
}) {
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
          <div className="flex-1">
            <p className="font-semibold">{item.namaKandang}</p>
            <p className="text-sm text-default-500">{item.lokasi}</p>
            <p className="text-xs text-default-400 mt-1">
              Petugas: {item.namaPetugas}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Chip color="success" variant="flat">
              {item.jumlahOperasional} operasional
            </Chip>

            <ExportPDFButton
              endDate={endDate}
              kandangId={item.kandangId || item.id}
              kandangNama={item.namaKandang}
              reportType="operasional"
              size="sm"
              startDate={startDate}
              variant="bordered"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
