import {
  Activity,
  Home,
  TrendingUp,
  ArrowRight,
  Package,
  ClipboardList,
  DollarSign,
  CheckCircle2,
  Users,
  Layers,
  AlertTriangle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/common/PageHeader";

export default function AboutPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        description="Informasi mengenai metode perhitungan dan alur kerja (SOP) sistem."
        title="Tentang & Panduan Sistem"
      />

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Link to="/about-threshold">
          <Card className="p-5 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-danger">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center">
                <AlertTriangle className="text-danger" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-default-900 mb-1 flex items-center gap-2">
                  Threshold & Standar
                  <ArrowRight className="text-primary" size={16} />
                </h3>
                <p className="text-sm text-default-600">
                  Standar threshold mortalitas, utilisasi kandang, dan kategori
                  status berdasarkan best practice industri
                </p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Workflow / SOP Section */}
      <Card className="p-6 border-l-4 border-l-primary shadow-sm bg-gradient-to-r from-white to-default-50 dark:from-default-50 dark:to-default-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-default-900 flex items-center gap-2">
            <ClipboardList className="text-primary" size={28} />
            Alur Kerja Pengisian Data (SOP)
          </h2>
          <p className="text-default-600 mt-1 max-w-3xl">
            Panduan urutan pengisian data berdasarkan dependensi sistem.
            <span className="font-semibold text-primary block mt-1">
              Prinsip Utama: Data Induk (Parent) harus ada sebelum Data Anak
              (Child) bisa dibuat.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-default-200 -z-10 translate-y-4" />

          <WorkflowStep
            bgColor="bg-blue-600"
            checklist={[
              "Buat Akun Pengguna (Role: User/Petugas)",
              "Isi Master Jenis Kegiatan",
              "Buat Kandang & Assign Petugas",
              "Tambah Asisten Kandang (Opsional)",
            ]}
            color="text-blue-600"
            description="Fondasi sistem. User & Jenis Kegiatan harus tersedia sebelum membuat Kandang."
            icon={Users}
            step="1"
            title="Setup & Master Data"
          />

          <ArrowDivider className="hidden md:flex" />

          <WorkflowStep
            bgColor="bg-orange-600"
            checklist={[
              "Isi Master Stok (Pakan & Vaksin)",
              "Input Batch Ayam Masuk (Check-In)",
            ]}
            color="text-orange-600"
            description="Persiapan aset. Stok & Batch Ayam harus ada sebelum kegiatan harian dicatat."
            icon={Package}
            step="2"
            title="Inventaris & Produksi"
          />

          <ArrowDivider className="hidden md:flex" />

          <WorkflowStep
            bgColor="bg-green-600"
            checklist={[
              "Catat Operasional (Konsumsi Stok)",
              "Isi Jurnal Harian (Catatan Shift)",
              "Catat Mortalitas (Jika ada insiden)",
            ]}
            color="text-green-600"
            description="Rutin harian. Data ini membutuhkan referensi ke Kandang, Stok, & Jenis Kegiatan."
            icon={Activity}
            step="3"
            title="Harian & Operasional"
          />

          <ArrowDivider className="hidden md:flex" />

          <WorkflowStep
            bgColor="bg-purple-600"
            checklist={[
              "Catat Biaya (Pengeluaran)",
              "Input Realisasi Panen (Ayam Keluar)",
              "Tutup Periode (Selesai)",
            ]}
            color="text-purple-600"
            description="Hasil akhir. Biaya dicatat per kejadian, Panen menutup siklus batch ayam."
            icon={DollarSign}
            step="4"
            title="Keuangan & Panen"
          />
        </div>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg flex gap-3 text-sm text-yellow-800 dark:text-yellow-200">
          <AlertTriangle className="shrink-0 mt-0.5" size={18} />
          <div>
            <span className="font-bold">Kenapa urutan ini penting?</span>
            <p className="mt-1 opacity-90">
              Sistem menggunakan relasi data yang ketat. Contoh: Anda tidak bisa
              mencatat <em>Operasional/Pakan</em> jika <em>Stok Pakan</em> belum
              diinput, dan tidak bisa mencatat <em>Mortalitas</em> jika data{" "}
              <em>Ayam</em> belum masuk di kandang tersebut.
            </p>
          </div>
        </div>
      </Card>

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
              description="Akumulasi jumlah ekor ayam yang dipanen dalam bulan ini."
              formula="Jumlah Ekor Dipanen (bulan berjalan)"
              title="Total Panen Bulan Ini"
            />
            <FormulaItem
              description="Persentase tingkat kematian ayam dibandingkan dengan populasi awal pada periode tersebut."
              formula="(Total Mortalitas Periode ÷ Total Populasi Awal Periode) × 100%"
              title="Rata-rata Mortalitas (%)"
            />
            <FormulaItem
              description="Rasio efisiensi pakan. Semakin rendah nilai FCR, semakin efisien penggunaan pakan."
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
              description="Indikator kesehatan kandang (Normal, Warning, Critical) berdasarkan parameter."
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
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Helper component for workflow steps
function WorkflowStep({
  step,
  title,
  icon: Icon,
  description,
  checklist,
  color,
  bgColor,
}: {
  step: string;
  title: string;
  icon: any;
  description: string;
  checklist: string[];
  color: string;
  bgColor: string;
}) {
  return (
    <div className="relative bg-white dark:bg-default-50 p-4 rounded-xl border border-default-200 shadow-sm z-10 flex flex-col h-full hover:shadow-md transition-shadow">
      <div
        className={`absolute -top-3 -left-2 w-8 h-8 rounded-full ${bgColor} text-white flex items-center justify-center font-bold text-sm border-2 border-white dark:border-default-100 shadow-md`}
      >
        {step}
      </div>

      <div className={`mb-3 flex items-center gap-2 ${color}`}>
        <Icon size={24} />
        <h3 className="font-bold text-default-900">{title}</h3>
      </div>

      <p className="text-xs text-default-500 mb-4 h-[4.5em] overflow-hidden leading-relaxed">
        {description}
      </p>

      <div className="mt-auto bg-default-50 rounded-lg p-3">
        <ul className="space-y-2">
          {checklist.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-xs text-default-700"
            >
              <CheckCircle2
                className="text-primary shrink-0 mt-0.5"
                size={14}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Decorative arrow divider
function ArrowDivider({ className }: { className?: string }) {
  return (
    <div
      className={`items-center justify-center text-default-300 w-8 self-center -mx-6 z-0 ${className}`}
    >
      <ArrowRight size={24} />
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
        <Layers className="text-default-400" size={16} />
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
