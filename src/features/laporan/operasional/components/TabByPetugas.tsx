"use client";

import { Chip } from "@heroui/react";

export default function TabByPetugas({ detailPerPetugas }: any) {
  if (detailPerPetugas.length === 0) {
    return <p className="text-center text-default-500 py-8">Belum ada data</p>;
  }

  return (
    <div className="pt-4 space-y-3">
      {detailPerPetugas.map((item: any, idx: number) => (
        <div key={idx} className="p-4 bg-default-100 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">{item.namaPetugas}</p>
              <p className="text-sm text-default-500">@{item.username}</p>
            </div>
            <Chip color="warning" variant="flat">
              {item.jumlahOperasional} operasional
            </Chip>
          </div>
          {item.kandangDikelola.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-default-400 mb-1">Kandang Dikelola:</p>
              <div className="flex flex-wrap gap-1">
                {item.kandangDikelola.map((kandang: string, kidx: number) => (
                  <Chip key={kidx} size="sm" variant="flat">
                    {kandang}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
