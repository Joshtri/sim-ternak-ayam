"use client";

import { Card, CardBody, Tabs, Tab } from "@heroui/react";
import { Activity, Building2, Users } from "lucide-react";

import TabByJenis from "./TabByJenis";
import TabByKandang from "./TabByKandang";
import TabByPetugas from "./TabByPetugas";

export default function LaporanTabs({
  laporan,
  startDate,
  endDate,
}: {
  laporan: any;
  startDate?: string;
  endDate?: string;
}) {
  return (
    <Card>
      <CardBody>
        <Tabs fullWidth aria-label="Laporan Detail" variant="underlined">
          <Tab
            key="by-activity"
            title={
              <div className="flex items-center gap-2">
                <Activity size={18} />
                <span>Per Jenis Kegiatan</span>
              </div>
            }
          >
            <TabByJenis detailPerJenis={laporan.detailPerJenis} />
          </Tab>

          <Tab
            key="by-kandang"
            title={
              <div className="flex items-center gap-2">
                <Building2 size={18} />
                <span>Per Kandang</span>
              </div>
            }
          >
            <TabByKandang
              detailPerKandang={laporan.detailPerKandang}
              endDate={endDate}
              startDate={startDate}
            />
          </Tab>

          <Tab
            key="by-petugas"
            title={
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>Per Petugas</span>
              </div>
            }
          >
            <TabByPetugas detailPerPetugas={laporan.detailPerPetugas} />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
