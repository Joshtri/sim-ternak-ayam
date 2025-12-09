import { Info, Activity, Home, TrendingUp } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/common/PageHeader";

export default function AboutPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tentang", href: "/about" },
        ]}
        description="Informasi mengenai metode perhitungan yang digunakan dalam dashboard sistem."
        title="Tentang & Rumus Perhitungan"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Productivity Formulas */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4 border-b border-default-100 pb-2">
            <TrendingUp className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-default-900">
              Statistik Produktivitas
            </h2>
          </div>
          <div className="space-y-4">
            <FormulaItem
              description="Menghitung rata-rata bobot ayam yang berhasil dipanen pada periode yang sama."
              formula="(Total Berat Panen) ÷ (Jumlah Ekor yang Dipanen)"
              title="Rata-rata Berat (kg)"
            />
            <FormulaItem
              description="Akumulasi jumlah ekor ayam yang dipanen dalam bulan ini. (Dapat juga menampilkan total kg panen jika dikonfigurasi)."
              formula="Jumlah Ekor Dipanen (bulan berjalan)"
              title="Total Panen Bulan Ini"
            />
            <FormulaItem
              description="Persentase tingkat kematian ayam dibandingkan dengan populasi awal pada periode tersebut."
              formula="(Total Mortalitas Periode ÷ Total Populasi Awal Periode) × 100%"
              title="Rata-rata Mortalitas (%)"
            />
            <FormulaItem
              description="Rasio efisiensi pakan. Semakin rendah nilai FCR, semakin efisien penggunaan pakan terhadap pembentukan bobot ayam."
              formula="(Total Pakan Dikonsumsi (kg)) ÷ (Total Bobot Panen (kg))"
              title="FCR (Feed Conversion Ratio)"
            />
            <FormulaItem
              description="Menghitung kandang yang memiliki populasi > 0 atau sedang dalam siklus produksi aktif."
              formula="Jumlah Kandang dengan Status Aktif"
              title="Kandang Aktif"
            />
          </div>
        </Card>

        {/* Coop Performance Formulas */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4 border-b border-default-100 pb-2">
            <Home className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-default-900">
              Performa Kandang
            </h2>
          </div>
          <div className="space-y-4">
            <FormulaItem
              description="Jumlah ekor ayam yang hidup dan ada di kandang saat ini."
              formula="Populasi Awal + Masuk – Mortalitas – Panen"
              title="Populasi Saat Ini"
            />
            <FormulaItem
              description="Persentase penggunaan kapasitas kandang. Menunjukkan seberapa optimal kandang terisi."
              formula="(Populasi Saat Ini ÷ Kapasitas Kandang) × 100%"
              title="Utilisasi (%)"
            />
            <FormulaItem
              description="Jumlah ekor mati dan persentasenya terhadap populasi awal untuk periode pelaporan tertentu."
              formula="(Jumlah Kematian ÷ Populasi Awal Kandang) × 100%"
              title="Mortalitas (Absolut & %)"
            />
            <FormulaItem
              description="Indikator kesehatan kandang (Normal, Warning, Critical) berdasarkan parameter seperti % Mortalitas atau % Utilisasi."
              formula="Berdasarkan Threshold (Batas Aman)"
              title="Status Kandang"
            />
            <div className="mt-4 p-3 bg-default-50 rounded-lg text-sm text-default-600">
              <span className="font-semibold text-default-700">
                Contoh Threshold:
              </span>
              <ul className="list-disc ml-5 mt-1 space-y-1">
                <li>
                  <span className="font-medium text-danger">Critical:</span>{" "}
                  Jika mortalitas {">"} X% atau utilisasi {"<"} Y%
                </li>
                <li>
                  <span className="font-medium text-warning">Warning:</span>{" "}
                  Jika mendekati batas threshold
                </li>
                <li>
                  <span className="font-medium text-success">Normal:</span> Jika
                  situasi terkendali di bawah threshold
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <Info className="text-blue-600 dark:text-blue-400 mt-1" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              Catatan Penting
            </h3>
            <p className="text-blue-800 dark:text-blue-200 mt-1">
              Data yang ditampilkan di dashboard diambil secara{" "}
              <strong>real-time</strong> atau <strong>periodik</strong> dari
              database sistem. Rumus di atas adalah logika dasar yang digunakan
              sistem untuk mengolah data mentah menjadi informasi statistik yang
              Anda lihat. Jika terdapat ketidaksesuaian, mohon periksa
              kelengkapan input data (seperti data panen, data kematian harian,
              dan pencatatan pakan).
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Helper component for formula items
function FormulaItem({
  title,
  formula,
  description,
}: {
  title: string;
  formula: string;
  description: string;
}) {
  return (
    <div className="border-b border-default-100 last:border-0 pb-3 last:pb-0">
      <h4 className="font-semibold text-default-800 flex items-center gap-2">
        <Activity className="text-default-400" size={16} />
        {title}
      </h4>
      <div className="mt-1 ml-6">
        <code className="block bg-default-100 p-2 rounded text-sm text-primary font-medium font-mono mb-1">
          {formula}
        </code>
        <p className="text-sm text-default-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
