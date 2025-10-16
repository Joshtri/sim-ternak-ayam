"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { Calendar } from "lucide-react";

import { LaporanOperasionalResponse } from "../types";
// import { LaporanOperasionalResponse } from "../types";

interface DatePresetsProps {
  activePreset: string;
  onChange: (preset: string) => void;
  laporan?: LaporanOperasionalResponse;
}

const getDatePresets = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return {
    thisWeek: {
      label: "Minggu Ini",
      startDate: new Date(
        today.getTime() - ((today.getDay() || 7) - 1) * 24 * 60 * 60 * 1000
      ),
      endDate: now,
    },
    lastWeek: {
      label: "Minggu Lalu",
      startDate: new Date(
        today.getTime() - ((today.getDay() || 7) + 6) * 24 * 60 * 60 * 1000
      ),
      endDate: new Date(
        today.getTime() - (today.getDay() || 7) * 24 * 60 * 60 * 1000
      ),
    },
    thisMonth: {
      label: "Bulan Ini",
      startDate: new Date(now.getFullYear(), now.getMonth(), 1),
      endDate: now,
    },
    lastMonth: {
      label: "Bulan Lalu",
      startDate: new Date(now.getFullYear(), now.getMonth() - 1, 1),
      endDate: new Date(now.getFullYear(), now.getMonth(), 0),
    },
  };
};

export default function DatePresets({
  activePreset,
  onChange,
  laporan,
}: DatePresetsProps) {
  const datePresets = getDatePresets();

  return (
    <Card>
      <CardBody>
        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="text-default-500" size={18} />
          <span className="text-sm font-medium">Periode:</span>
          {Object.entries(datePresets).map(([key, preset]) => (
            <Button
              key={key}
              color={activePreset === key ? "primary" : "default"}
              size="sm"
              variant={activePreset === key ? "solid" : "flat"}
              onPress={() => onChange(key)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
        {laporan && (
          <div className="mt-3 text-sm text-default-500">
            {laporan.periode}:{" "}
            {new Date(laporan.tanggalMulai).toLocaleDateString("id-ID")} -{" "}
            {new Date(laporan.tanggalSelesai).toLocaleDateString("id-ID")}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
