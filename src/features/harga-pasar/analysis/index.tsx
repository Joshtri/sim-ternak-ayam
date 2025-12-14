import { Tabs, Tab } from "@heroui/react";
import { Calculator, Calendar, TrendingUp } from "lucide-react";

import { ProfitCalculator } from "./ProfitCalculator";
import { MonthlyAnalysis } from "./MonthlyAnalysis";
import { YearlyAnalysis } from "./YearlyAnalysis";

import { PageHeader } from "@/components/common/PageHeader";

export default function HargaPasarAnalysisPage() {
  return (
    <div className="p-6 space-y-6">
      <PageHeader
        description="Simulasi keuntungan dan laporan analisis pendapatan berdasarkan harga pasar."
        title="Analisis & Estimasi Keuntungan"
      />

      <Tabs
        aria-label="Opsi Analisis"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
        color="primary"
        variant="underlined"
      >
        <Tab
          key="calculator"
          title={
            <div className="flex items-center space-x-2">
              <Calculator size={18} />
              <span>Kalkulator Estimasi</span>
            </div>
          }
        >
          <div className="pt-4">
            <ProfitCalculator />
          </div>
        </Tab>
        <Tab
          key="monthly"
          title={
            <div className="flex items-center space-x-2">
              <Calendar size={18} />
              <span>Laporan Bulanan</span>
            </div>
          }
        >
          <div className="pt-4">
            <MonthlyAnalysis />
          </div>
        </Tab>
        <Tab
          key="yearly"
          title={
            <div className="flex items-center space-x-2">
              <TrendingUp size={18} />
              <span>Ringkasan Tahunan</span>
            </div>
          }
        >
          <div className="pt-4">
            <YearlyAnalysis />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
