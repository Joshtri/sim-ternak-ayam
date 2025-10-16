"use client";

import { useMemo, useState } from "react";
import { Spinner } from "@heroui/react";
import { Activity, Building2, Users } from "lucide-react";

import { useLaporanOperasional } from "../hooks/useLaporan";
import { LaporanOperasionalFilters } from "../types";

import LaporanHeader from "./components/LaporanHeader";
import DatePresets from "./components/DatePresets";
import SummaryCard from "./components/SummaryCard";
import LaporanTabs from "./components/LaporanTabs";

export default function LaporanOperasional() {
  const [activePreset, setActivePreset] = useState("thisMonth");

  const filters: LaporanOperasionalFilters = useMemo(() => {
    if (activePreset === "custom") {
      return {};
    }

    return {
      preset: activePreset as
        | "thisWeek"
        | "lastWeek"
        | "thisMonth"
        | "lastMonth",
    };
  }, [activePreset]);

  const { data: laporan, isLoading } = useLaporanOperasional(filters);

  return (
    <div className="space-y-6">
      <LaporanHeader />
      <DatePresets
        activePreset={activePreset}
        laporan={laporan}
        onChange={setActivePreset}
      />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : laporan ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard
              color="primary"
              icon={<Activity size={24} />}
              label="Total Operasional"
              value={laporan.totalOperasional.toLocaleString("id-ID")}
            />
            <SummaryCard
              color="success"
              icon={<Building2 size={24} />}
              label="Kandang Terlibat"
              value={laporan.totalKandang.toLocaleString("id-ID")}
            />
            <SummaryCard
              color="warning"
              icon={<Users size={24} />}
              label="Petugas Terlibat"
              value={laporan.totalPetugas.toLocaleString("id-ID")}
            />
          </div>

          <LaporanTabs laporan={laporan} />
        </>
      ) : (
        <div className="text-center text-default-500 py-12">
          Belum ada data laporan operasional
        </div>
      )}
    </div>
  );
}
