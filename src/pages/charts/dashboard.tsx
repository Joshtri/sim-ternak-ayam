import { useState } from "react";
import { Card, CardBody, Select, SelectItem } from "@heroui/react";
import {
  ProduktivitasTrendChart,
  MortalitasStatistikChart,
  OperasionalBreakdownChart,
  FinancialAnalysisChart,
} from "@/features/charts/components";
import { ChartQueryParams } from "@/features/charts/types";

export default function DashboardChartsPage() {
  const [params, setParams] = useState<ChartQueryParams>({
    periode_type: "bulanan",
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Analitik</h1>
        <Select
          label="Periode"
          className="w-48"
          selectedKeys={[params.periode_type || "bulanan"]}
          onChange={(e) =>
            setParams({ ...params, periode_type: e.target.value as any })
          }
        >
          <SelectItem key="mingguan" value="mingguan">
            Mingguan
          </SelectItem>
          <SelectItem key="bulanan" value="bulanan">
            Bulanan
          </SelectItem>
          <SelectItem key="tahunan" value="tahunan">
            Tahunan
          </SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProduktivitasTrendChart params={params} />
        <MortalitasStatistikChart params={params} />
        <OperasionalBreakdownChart params={params} />
        <FinancialAnalysisChart params={params} />
      </div>
    </div>
  );
}
