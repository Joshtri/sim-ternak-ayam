import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Home,
  ArrowLeft,
  Package,
  HeartPulse,
  Layers,
  Activity,
  Bell,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/common/PageHeader";

export default function ThresholdPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Back Button */}
      <Link
        className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
        to="/about"
      >
        <ArrowLeft size={18} />
        <span>Kembali ke Tentang Sistem</span>
      </Link>

      <PageHeader
        description="Dokumentasi lengkap threshold, status level stok, tracking logic, dan alert system berdasarkan best practice industri."
        title="Threshold & Standar Sistem"
      />

      {/* Quick Navigation */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200">
        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
          Daftar Isi Halaman:
        </h3>
        <ul className="list-disc ml-5 text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>Threshold Mortalitas</li>
          <li>Threshold Utilisasi Kandang</li>
          <li>Status Level Stok (Pakan & Vaksin)</li>
          <li>Logika Tracking Stok (Pakan & Vaksin)</li>
          <li>Sistem Alert Otomatis</li>
        </ul>
      </Card>

      {/* Threshold Mortalitas Section */}
      <Card className="p-6 border-l-4 border-l-danger shadow-sm bg-gradient-to-r from-white to-default-50 dark:from-default-50 dark:to-default-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-default-900 flex items-center gap-2">
            <AlertTriangle className="text-danger" size={28} />
            1. Threshold Mortalitas
          </h2>
          <p className="text-default-600 mt-1 max-w-3xl">
            Standar kategori status dampak mortalitas berdasarkan persentase
            kematian ayam.
          </p>
        </div>

        {/* Threshold Table */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-default-800 mb-4">
            Kategori Status Dampak Mortalitas
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-default-200 text-sm">
              <thead>
                <tr className="bg-default-100">
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Persentase
                  </th>
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Status Dampak
                  </th>
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Deskripsi & Rekomendasi
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Critical */}
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 font-mono font-semibold text-danger">
                    ≥ 10%
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger text-white font-semibold text-xs">
                      Critical
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    <p className="font-semibold mb-1">
                      Tingkat mortalitas sangat tinggi.
                    </p>
                    <p className="text-xs">
                      <strong>Rekomendasi:</strong> Segera lakukan investigasi
                      mendalam dan tindakan darurat (karantina, treatment
                      khusus)
                    </p>
                  </td>
                </tr>

                {/* High */}
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 font-mono font-semibold text-orange-600">
                    5% - 9.9%
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500 text-white font-semibold text-xs">
                      High
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    <p className="font-semibold mb-1">
                      Tingkat mortalitas tinggi.
                    </p>
                    <p className="text-xs">
                      <strong>Rekomendasi:</strong> Monitoring ketat, review
                      kondisi kandang (ventilasi, kebersihan, suhu)
                    </p>
                  </td>
                </tr>

                {/* Medium */}
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 font-mono font-semibold text-warning">
                    2% - 4.9%
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning text-white font-semibold text-xs">
                      Medium
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    <p className="font-semibold mb-1">
                      Tingkat mortalitas sedang.
                    </p>
                    <p className="text-xs">
                      <strong>Rekomendasi:</strong> Tingkatkan pencegahan dan
                      monitoring rutin, evaluasi program vaksinasi
                    </p>
                  </td>
                </tr>

                {/* Low */}
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 font-mono font-semibold text-success">
                    &lt; 2%
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success text-white font-semibold text-xs">
                      Low
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    <p className="font-semibold mb-1">
                      Tingkat mortalitas rendah - kondisi normal.
                    </p>
                    <p className="text-xs">
                      <strong>Rekomendasi:</strong> Pertahankan kondisi kandang
                      dan lanjutkan monitoring rutin
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Formula */}
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-5 mb-6">
          <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3">
            Rumus Perhitungan
          </h4>
          <div className="bg-white dark:bg-default-50 rounded-lg p-4">
            <code className="text-sm text-blue-900 dark:text-blue-100 font-mono block text-center">
              Persentase Mortalitas = (Jumlah Kematian / Total Ayam Sebelum
              Mati) × 100%
            </code>
          </div>
        </div>

        {/* Basis Ilmiah */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
          <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} />
            Basis Ilmiah & Standar Industri
          </h4>
          <div className="space-y-3 text-sm text-purple-800 dark:text-purple-200">
            <div className="bg-white dark:bg-default-50 rounded-lg p-3">
              <p className="font-semibold mb-2">Standar WHO/FAO:</p>
              <p>Untuk peternakan unggas yang sehat: mortalitas &lt; 5%</p>
            </div>
            <div className="bg-white dark:bg-default-50 rounded-lg p-3">
              <p className="font-semibold mb-2">Penelitian Industri:</p>
              <p>
                Mortalitas 2-3% adalah tingkat normal untuk peternakan dengan
                manajemen baik
              </p>
            </div>
            <div className="bg-white dark:bg-default-50 rounded-lg p-3">
              <p className="font-semibold mb-2">Indikator Masalah Serius:</p>
              <p>
                Mortalitas &gt; 10% mengindikasikan masalah serius (wabah
                penyakit, kondisi kandang buruk, dll)
              </p>
            </div>
          </div>
        </div>

        {/* Mengapa Penting */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
          <h4 className="font-bold text-green-900 dark:text-green-100 mb-4">
            Mengapa Threshold Ini Penting?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-default-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h5 className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">
                    Early Warning System
                  </h5>
                  <p className="text-xs text-green-700 dark:text-green-200">
                    Mendeteksi masalah kesehatan sebelum menjadi wabah besar
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-default-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h5 className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">
                    Indikator Kesehatan
                  </h5>
                  <p className="text-xs text-green-700 dark:text-green-200">
                    Mortalitas adalah parameter kunci untuk menilai kondisi
                    kandang
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-default-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h5 className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">
                    Pencegahan Kerugian
                  </h5>
                  <p className="text-xs text-green-700 dark:text-green-200">
                    Tindakan cepat saat mortalitas 5-10% dapat mencegah kerugian
                    lebih besar
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-default-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h5 className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">
                    Standar Industri
                  </h5>
                  <p className="text-xs text-green-700 dark:text-green-200">
                    Memastikan operasional sesuai dengan best practice
                    peternakan modern
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contoh Kasus */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Contoh Kasus Nyata
          </h4>
          <div className="space-y-3">
            {/* Kasus 1 - Low */}
            <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-success">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h5 className="font-semibold text-default-900 mb-1">
                    Kandang A
                  </h5>
                  <p className="text-sm text-default-700">
                    100 ayam, kematian 1 ekor
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-success">1%</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success font-semibold text-xs mt-1">
                    Low - Normal
                  </span>
                </div>
              </div>
            </div>

            {/* Kasus 2 - High */}
            <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-orange-500">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h5 className="font-semibold text-default-900 mb-1">
                    Kandang B
                  </h5>
                  <p className="text-sm text-default-700">
                    100 ayam, kematian 8 ekor
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-600">8%</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 font-semibold text-xs mt-1">
                    High - Monitoring Ketat
                  </span>
                </div>
              </div>
            </div>

            {/* Kasus 3 - Critical */}
            <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-danger">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h5 className="font-semibold text-default-900 mb-1">
                    Kandang C
                  </h5>
                  <p className="text-sm text-default-700">
                    100 ayam, kematian 15 ekor
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-danger">15%</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/10 text-danger font-semibold text-xs mt-1">
                    Critical - Darurat!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Threshold Utilisasi Kandang Section */}
      <Card className="p-6 border-l-4 border-l-warning shadow-sm bg-gradient-to-r from-white to-default-50 dark:from-default-50 dark:to-default-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-default-900 flex items-center gap-2">
            <Home className="text-warning" size={28} />
            2. Threshold Utilisasi Kandang
          </h2>
          <p className="text-default-600 mt-1 max-w-3xl">
            Standar status kandang berdasarkan utilisasi dan mortalitas sesuai
            Animal Welfare.
          </p>
        </div>

        {/* Status Table */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-default-800 mb-4">
            Status Kandang Berdasarkan Utilisasi dan Mortalitas
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-default-200 text-sm">
              <thead>
                <tr className="bg-default-100">
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Kondisi
                  </th>
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Status
                  </th>
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Penjelasan & Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Critical */}
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    <p className="font-semibold mb-1">Mortalitas &gt; 10%</p>
                    <p className="text-xs text-default-500">ATAU</p>
                    <p className="font-semibold">Utilisasi &gt; 95%</p>
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger text-white font-semibold text-xs">
                      Critical
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    <p className="font-semibold mb-2">
                      Masalah kesehatan serius
                    </p>
                    <div className="space-y-1 text-xs">
                      <p>
                        <strong>Action:</strong> Investigasi mendalam, karantina
                      </p>
                      <p>
                        <strong>Action:</strong> Reduksi populasi (panen dini)
                      </p>
                    </div>
                  </td>
                </tr>

                {/* Warning */}
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    <p className="font-semibold mb-1">Mortalitas &gt; 5%</p>
                    <p className="text-xs text-default-500">ATAU</p>
                    <p className="font-semibold">Utilisasi &gt; 85%</p>
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning text-white font-semibold text-xs">
                      Warning
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    <p className="font-semibold mb-2">Perlu monitoring ketat</p>
                    <div className="space-y-1 text-xs">
                      <p>
                        <strong>Action:</strong> Review kondisi kandang
                      </p>
                      <p>
                        <strong>Action:</strong> Persiapkan ekspansi/rotasi
                      </p>
                    </div>
                  </td>
                </tr>

                {/* Good */}
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    <p className="font-semibold mb-1">Mortalitas ≤ 5%</p>
                    <p className="text-xs text-default-500">DAN</p>
                    <p className="font-semibold">Utilisasi ≤ 85%</p>
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success text-white font-semibold text-xs">
                      Good
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    <p className="font-semibold mb-2">Kondisi optimal</p>
                    <div className="space-y-1 text-xs">
                      <p>
                        <strong>Action:</strong> Maintenance rutin
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Formula */}
        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-5 mb-6">
          <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3">
            Rumus Perhitungan
          </h4>
          <div className="bg-white dark:bg-default-50 rounded-lg p-4">
            <code className="text-sm text-blue-900 dark:text-blue-100 font-mono block text-center">
              Persentase Utilisasi = (Jumlah Ayam Saat Ini / Kapasitas Kandang)
              × 100%
            </code>
          </div>
        </div>

        {/* Basis Ilmiah Utilisasi */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
          <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} />
            Basis Ilmiah - Animal Welfare Standards
          </h4>
          <div className="space-y-3 text-sm text-purple-800 dark:text-purple-200">
            <div className="bg-white dark:bg-default-50 rounded-lg p-3">
              <p className="font-semibold mb-2">Standar Internasional:</p>
              <p>
                Utilisasi maksimal 80-85% untuk pertumbuhan optimal dan
                kesejahteraan hewan
              </p>
            </div>
            <div className="bg-white dark:bg-default-50 rounded-lg p-3">
              <p className="font-semibold mb-2">
                Dampak Kepadatan Berlebih (&gt;90%):
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Tingkat stres pada ayam meningkat</li>
                <li>Risiko penyebaran penyakit lebih tinggi</li>
                <li>Persaingan makanan/air</li>
                <li>Kualitas udara memburuk (amonia tinggi)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Detail per Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Good */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-2 border-green-300 dark:border-green-800 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-success flex items-center justify-center">
                <CheckCircle2 className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-green-900 dark:text-green-100">
                  Good
                </h4>
                <p className="text-xs text-green-700 dark:text-green-200">
                  Utilisasi ≤ 85%
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-green-800 dark:text-green-200">
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <span>Ayam memiliki ruang gerak cukup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <span>Sirkulasi udara optimal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <span>Akses mudah ke pakan dan air</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                <span>Pertumbuhan dan kesehatan optimal</span>
              </li>
            </ul>
          </div>

          {/* Warning */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 border-2 border-yellow-300 dark:border-yellow-800 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-warning flex items-center justify-center">
                <AlertTriangle className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-yellow-900 dark:text-yellow-100">
                  Warning
                </h4>
                <p className="text-xs text-yellow-700 dark:text-yellow-200">
                  Utilisasi 85-95%
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-yellow-800 dark:text-yellow-200">
              <li className="flex items-start gap-2">
                <span className="text-warning">⚠</span>
                <span>Kandang mendekati kapasitas penuh</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">⚠</span>
                <span>Mulai terjadi kompetisi sumber daya</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">⚠</span>
                <span>Perlu panen bertahap</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning">⚠</span>
                <span>Atau penambahan kapasitas</span>
              </li>
            </ul>
          </div>

          {/* Critical */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border-2 border-red-300 dark:border-red-800 rounded-lg p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-danger flex items-center justify-center">
                <AlertTriangle className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-red-900 dark:text-red-100">
                  Critical
                </h4>
                <p className="text-xs text-red-700 dark:text-red-200">
                  Utilisasi &gt; 95%
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-red-800 dark:text-red-200">
              <li className="flex items-start gap-2">
                <span className="text-danger">✗</span>
                <span>Overcrowding - kepadatan berlebihan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-danger">✗</span>
                <span>Risiko tinggi: stres, penyakit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-danger">✗</span>
                <span>Mortalitas cenderung meningkat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-danger">✗</span>
                <span>Action: Panen dini atau redistribusi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contoh Kasus Utilisasi */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Contoh Kasus Utilisasi
          </h4>
          <div className="space-y-3">
            {/* Kasus 1 - Good */}
            <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-success">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h5 className="font-semibold text-default-900 mb-1">
                    Kandang Kapasitas 1000
                  </h5>
                  <p className="text-sm text-default-700">Terisi 800 ekor</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-success">80%</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success font-semibold text-xs mt-1">
                    Good
                  </span>
                </div>
              </div>
            </div>

            {/* Kasus 2 - Warning */}
            <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-warning">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h5 className="font-semibold text-default-900 mb-1">
                    Kandang Kapasitas 1000
                  </h5>
                  <p className="text-sm text-default-700">Terisi 920 ekor</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-warning">92%</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning/10 text-warning font-semibold text-xs mt-1">
                    Warning - Persiapkan Panen
                  </span>
                </div>
              </div>
            </div>

            {/* Kasus 3 - Critical */}
            <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-danger">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h5 className="font-semibold text-default-900 mb-1">
                    Kandang Kapasitas 1000
                  </h5>
                  <p className="text-sm text-default-700">Terisi 980 ekor</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-danger">98%</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/10 text-danger font-semibold text-xs mt-1">
                    Critical - Panen Segera!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Status Level Stok Section */}
      <Card className="p-6 border-l-4 border-l-success shadow-sm bg-gradient-to-r from-white to-default-50 dark:from-default-50 dark:to-default-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-default-900 flex items-center gap-2">
            <Layers className="text-success" size={28} />
            3. Sistem Level Status Stok
          </h2>
          <p className="text-default-600 mt-1 max-w-3xl">
            Sistem menggunakan 4 tingkatan (Level 0 - Level 3) untuk
            menggambarkan kondisi stok secara objektif dan terukur.
          </p>
        </div>

        {/* Status Stok Pakan */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-default-800 mb-4 flex items-center gap-2">
            <Package className="text-orange-600" size={22} />
            A. Status Stok Pakan
          </h3>

          {/* Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-default-200 text-sm">
              <thead>
                <tr className="bg-default-100">
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Stok (kg)
                  </th>
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Status Level
                  </th>
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Penjelasan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 font-mono text-danger font-semibold">
                    0
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/10 text-danger font-semibold text-xs">
                      Level 0
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    Habis - Operasional terhenti
                  </td>
                </tr>
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 font-mono">
                    0.1 - 10
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/10 text-danger font-semibold text-xs">
                      Level 1 - Perlu Restock Segera
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    Sangat Rendah - &lt; 2 hari
                  </td>
                </tr>
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 font-mono">
                    10.1 - 50
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning/10 text-warning font-semibold text-xs">
                      Level 2 - Perlu Restock
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    Rendah - Cukup 3-7 hari
                  </td>
                </tr>
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 font-mono">
                    &gt; 50
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success font-semibold text-xs">
                      Level 3 - Stok Cukup
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    Aman - Cukup &gt; 7 hari
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Detailed Explanation */}
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-5">
            <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
              <CheckCircle2 size={18} />
              Penjelasan Detail Sistem Level Stok Pakan
            </h4>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4 leading-relaxed">
              Sistem Level Stok Pakan dirancang berdasarkan estimasi konsumsi
              harian:
            </p>
            <ul className="list-disc ml-5 mb-4 space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li>
                <strong>Asumsi konsumsi:</strong> 5-7 kg/hari per kandang
              </li>
              <li>
                <strong>Perhitungan threshold:</strong> Disesuaikan dengan waktu
                yang dibutuhkan untuk proses pemesanan dan pengiriman
              </li>
            </ul>

            <div className="space-y-4">
              {/* Level 0 */}
              <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-danger">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-danger">0</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-danger mb-1">
                      Level 0 (0 kg): Stok Habis Total
                    </h5>
                    <p className="text-sm text-default-700 mb-2">
                      Stok habis total. Operasional pemberian pakan terhenti.
                    </p>
                    <div className="bg-danger/5 rounded px-3 py-2 text-sm">
                      <span className="font-semibold text-danger">Action:</span>{" "}
                      <span className="text-default-700">
                        Pembelian darurat diperlukan segera.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 1 */}
              <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-danger">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-danger">1</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-danger mb-1">
                      Level 1 - Perlu Restock Segera (≤10 kg)
                    </h5>
                    <p className="text-sm text-default-700 mb-2">
                      Stok sangat rendah, hanya cukup untuk 1-2 hari.
                    </p>
                    <div className="bg-danger/5 rounded px-3 py-2 text-sm">
                      <span className="font-semibold text-danger">Action:</span>{" "}
                      <span className="text-default-700">
                        Segera lakukan pemesanan untuk menghindari kekosongan
                        stok.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 2 */}
              <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-warning">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-warning">2</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-warning mb-1">
                      Level 2 - Perlu Restock (≤50 kg)
                    </h5>
                    <p className="text-sm text-default-700 mb-2">
                      Stok rendah, cukup untuk 3-7 hari.
                    </p>
                    <div className="bg-warning/5 rounded px-3 py-2 text-sm">
                      <span className="font-semibold text-warning">
                        Action:
                      </span>{" "}
                      <span className="text-default-700">
                        Rencanakan pemesanan dalam 1-2 hari ke depan.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 3 */}
              <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-success">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-success">3</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-success mb-1">
                      Level 3 - Stok Cukup (&gt;50 kg)
                    </h5>
                    <p className="text-sm text-default-700 mb-2">
                      Stok mencukupi untuk lebih dari seminggu.
                    </p>
                    <div className="bg-success/5 rounded px-3 py-2 text-sm">
                      <span className="font-semibold text-success">
                        Status:
                      </span>{" "}
                      <span className="text-default-700">
                        Kondisi ideal, monitoring rutin.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Stok Vaksin/Vitamin */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-default-800 mb-4 flex items-center gap-2">
            <HeartPulse className="text-purple-600" size={22} />
            B. Status Stok Vaksin/Vitamin
          </h3>

          {/* Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-default-200 text-sm">
              <thead>
                <tr className="bg-default-100">
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Stok (unit)
                  </th>
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Status Level
                  </th>
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Penjelasan
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 font-mono text-danger font-semibold">
                    0
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/10 text-danger font-semibold text-xs">
                      Level 0
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    Habis - Program vaksinasi terhenti
                  </td>
                </tr>
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 font-mono">
                    1 - 2
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger/10 text-danger font-semibold text-xs">
                      Level 1 - Perlu Restock Segera
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    Sangat Rendah - &lt; 1 sesi
                  </td>
                </tr>
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 font-mono">
                    3 - 5
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning/10 text-warning font-semibold text-xs">
                      Level 2 - Perlu Restock
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    Rendah - Cukup 1-2 sesi
                  </td>
                </tr>
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3 font-mono">
                    &gt; 5
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success font-semibold text-xs">
                      Level 3 - Stok Cukup
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    Aman - Cukup &gt; 2 sesi
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Detailed Explanation */}
          <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-lg p-5">
            <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
              <CheckCircle2 size={18} />
              Penjelasan Detail Sistem Level Stok Vaksin/Vitamin
            </h4>
            <p className="text-sm text-purple-800 dark:text-purple-200 mb-4 leading-relaxed">
              Sistem Level Stok Vaksin/Vitamin dirancang berdasarkan jadwal
              vaksinasi rutin:
            </p>
            <ul className="list-disc ml-5 mb-4 space-y-1 text-sm text-purple-800 dark:text-purple-200">
              <li>
                <strong>Asumsi penggunaan:</strong> 1-3 unit per sesi vaksinasi
                per kandang
              </li>
              <li>
                <strong>Jadwal vaksinasi:</strong> Mingguan atau bulanan
                tergantung jenis
              </li>
            </ul>

            <div className="space-y-4">
              {/* Level 0 */}
              <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-danger">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-danger">0</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-danger mb-1">
                      Level 0 (0 unit): Stok Habis
                    </h5>
                    <p className="text-sm text-default-700 mb-2">
                      Stok habis. Program vaksinasi tidak dapat dilaksanakan.
                    </p>
                    <div className="bg-danger/5 rounded px-3 py-2 text-sm">
                      <span className="font-semibold text-danger">Action:</span>{" "}
                      <span className="text-default-700">
                        Pembelian darurat diperlukan segera.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 1 */}
              <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-danger">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-danger">1</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-danger mb-1">
                      Level 1 - Perlu Restock Segera (≤2 unit)
                    </h5>
                    <p className="text-sm text-default-700 mb-2">
                      Hanya cukup untuk 1 sesi vaksinasi atau kurang.
                    </p>
                    <div className="bg-danger/5 rounded px-3 py-2 text-sm">
                      <span className="font-semibold text-danger">Action:</span>{" "}
                      <span className="text-default-700">
                        Segera pesan untuk memastikan jadwal vaksinasi tidak
                        terlewat.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 2 */}
              <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-warning">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-warning">2</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-warning mb-1">
                      Level 2 - Perlu Restock (≤5 unit)
                    </h5>
                    <p className="text-sm text-default-700 mb-2">
                      Cukup untuk 1-2 sesi vaksinasi.
                    </p>
                    <div className="bg-warning/5 rounded px-3 py-2 text-sm">
                      <span className="font-semibold text-warning">
                        Action:
                      </span>{" "}
                      <span className="text-default-700">
                        Rencanakan pemesanan sebelum stok habis.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level 3 */}
              <div className="bg-white dark:bg-default-50 rounded-lg p-4 border-l-4 border-l-success">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-success">3</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-success mb-1">
                      Level 3 - Stok Cukup (&gt;5 unit)
                    </h5>
                    <p className="text-sm text-default-700 mb-2">
                      Stok mencukupi untuk beberapa sesi.
                    </p>
                    <div className="bg-success/5 rounded px-3 py-2 text-sm">
                      <span className="font-semibold text-success">
                        Status:
                      </span>{" "}
                      <span className="text-default-700">Kondisi aman.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder for other status types */}
        <div className="mt-6 p-4 bg-default-100 dark:bg-default-200 border border-default-200 dark:border-default-300 rounded-lg">
          <p className="text-sm text-default-600 dark:text-default-700 italic">
            <strong>Catatan:</strong> Sistem level status serupa juga diterapkan
            untuk modul lain seperti Mortalitas dan Kandang dengan threshold
            yang disesuaikan dengan kebutuhan masing-masing.
          </p>
        </div>
      </Card>

      {/* Logika Tracking Stok Section */}
      <Card className="p-6 border-l-4 border-l-primary shadow-sm bg-gradient-to-r from-white to-default-50 dark:from-default-50 dark:to-default-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-default-900 flex items-center gap-2">
            <Activity className="text-primary" size={28} />
            4. Logika Tracking Stok
          </h2>
          <p className="text-default-600 mt-1 max-w-3xl">
            Penjelasan detail mengenai bagaimana sistem secara otomatis melacak
            pergerakan stok dari inventaris gudang hingga konsumsi di kandang.
          </p>
        </div>

        {/* Tracking Stok Pakan */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-default-800 mb-4 flex items-center gap-2">
            <Package className="text-orange-600" size={22} />
            A. Logika Tracking Stok Pakan
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Flow Diagram */}
            <div className="bg-white dark:bg-default-50 p-5 rounded-lg border border-default-200 shadow-sm">
              <h4 className="font-bold text-default-900 mb-4 text-center border-b pb-2">
                Alur Pergerakan Stok
              </h4>
              <div className="space-y-4 relative">
                {/* Step 1 */}
                <div className="relative z-10 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800 text-center">
                  <span className="block text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">
                    INPUT AWAL
                  </span>
                  <div className="font-bold text-default-800">
                    Master Stok Pakan
                  </div>
                  <div className="text-xs text-default-500">(Gudang Utama)</div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center -my-2 relative z-0">
                  <div className="h-8 w-0.5 bg-default-300" />
                </div>

                {/* Step 2 */}
                <div className="relative z-10 bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800 text-center">
                  <span className="block text-xs font-bold text-orange-600 dark:text-orange-400 mb-1">
                    KEGIATAN HARIAN
                  </span>
                  <div className="font-bold text-default-800">
                    Pencatatan Pemberian Pakan
                  </div>
                  <div className="text-xs text-default-500">(Per Kandang)</div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center -my-2 relative z-0">
                  <div className="h-8 w-0.5 bg-default-300" />
                </div>

                {/* Step 3 */}
                <div className="relative z-10 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800 text-center">
                  <span className="block text-xs font-bold text-green-600 dark:text-green-400 mb-1">
                    VALIDASI SYSTEM
                  </span>
                  <div className="font-bold text-default-800">
                    Pengecekan Stok Tersedia
                  </div>
                  <div className="text-xs text-default-500">
                    Jika Stok &lt; Input = Error
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center -my-2 relative z-0">
                  <div className="h-8 w-0.5 bg-default-300" />
                </div>

                {/* Step 4 */}
                <div className="relative z-10 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800 text-center">
                  <span className="block text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">
                    AUTO UPDATE
                  </span>
                  <div className="font-bold text-default-800">
                    Pengurangan Stok Otomatis
                  </div>
                  <div className="text-xs text-default-500">
                    Stok Akhir = Awal - Input
                  </div>
                </div>
              </div>
            </div>

            {/* Formula & Explanation */}
            <div className="space-y-4">
              <div className="bg-default-50 dark:bg-default-100 p-5 rounded-lg border border-default-200 h-full">
                <h4 className="font-bold text-default-900 mb-3">
                  Rumus Otomatis
                </h4>

                <div className="mb-4">
                  <code className="block bg-white dark:bg-default-200 p-3 rounded border border-default-200 text-sm font-mono text-primary mb-2">
                    Stok Akhir = Stok Awal - (Jumlah Sak × Berat per Sak)
                  </code>
                  <p className="text-xs text-default-600">
                    *Sistem secara otomatis mengkonversi jumlah sak ke kilogram
                    jika berat per sak dikonfigurasi (misal 50kg).
                  </p>
                </div>

                <h4 className="font-bold text-default-900 mb-3 mt-6">
                  Validasi Ketat
                </h4>
                <ul className="space-y-2 text-sm text-default-700">
                  <li className="flex gap-2">
                    <AlertTriangle
                      className="text-warning shrink-0"
                      size={16}
                    />
                    <span>
                      Sistem <strong>mencegah input negatif</strong> (tidak bisa
                      input pakan jika stok 0).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="text-success shrink-0" size={16} />
                    <span>
                      Perhitungan dilakukan <strong>real-time</strong> saat
                      tombol "Simpan" ditekan.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <Activity className="text-primary shrink-0" size={16} />
                    <span>
                      Riwayat pengurangan tercatat di{" "}
                      <strong>Log Transaksi</strong> untuk audit.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Skenario Real */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/10 dark:to-slate-900/10 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Skenario Real: Siklus 10 Hari
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th className="px-4 py-2 rounded-l-lg">Hari</th>
                    <th className="px-4 py-2">Aktivitas</th>
                    <th className="px-4 py-2">Input</th>
                    <th className="px-4 py-2">Kalkulasi Sistem</th>
                    <th className="px-4 py-2 rounded-r-lg text-right">
                      Sisa Stok
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white dark:bg-transparent">
                    <td className="px-4 py-2 font-medium">Hari 1</td>
                    <td className="px-4 py-2 text-green-600 font-semibold">
                      Stok Awal (Beli)
                    </td>
                    <td className="px-4 py-2">Masuk 2 Sak (50kg)</td>
                    <td className="px-4 py-2 text-gray-500">
                      2 × 50 = +100 kg
                    </td>
                    <td className="px-4 py-2 text-right font-bold text-green-600">
                      100 kg
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-transparent">
                    <td className="px-4 py-2 font-medium">Hari 2</td>
                    <td className="px-4 py-2 text-blue-600">
                      Beri Pakan Kandang A
                    </td>
                    <td className="px-4 py-2">5 kg</td>
                    <td className="px-4 py-2 text-gray-500">100 - 5 = 95 kg</td>
                    <td className="px-4 py-2 text-right font-bold">95 kg</td>
                  </tr>
                  <tr className="bg-white dark:bg-transparent">
                    <td className="px-4 py-2 font-medium">Hari 3</td>
                    <td className="px-4 py-2 text-blue-600">
                      Beri Pakan Kandang B
                    </td>
                    <td className="px-4 py-2">5 kg</td>
                    <td className="px-4 py-2 text-gray-500">95 - 5 = 90 kg</td>
                    <td className="px-4 py-2 text-right font-bold">90 kg</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="px-4 py-2 font-medium">...</td>
                    <td className="px-4 py-2 italic text-gray-500">
                      Berlanjut harian...
                    </td>
                    <td className="px-4 py-2">-</td>
                    <td className="px-4 py-2">-</td>
                    <td className="px-4 py-2 text-right font-bold">...</td>
                  </tr>
                  <tr className="bg-red-50 dark:bg-red-900/10 border-l-4 border-l-red-500">
                    <td className="px-4 py-2 font-medium text-red-700">
                      Hari 10
                    </td>
                    <td className="px-4 py-2 font-bold text-red-700">
                      Alert Triggered!
                    </td>
                    <td className="px-4 py-2 text-red-600">
                      Stok mencapai batas
                    </td>
                    <td className="px-4 py-2 text-red-600">Sisa ≤ 10 kg</td>
                    <td className="px-4 py-2 text-right font-bold text-red-600">
                      10 kg
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="shrink-0 text-yellow-600 mt-0.5">💡</div>
              <div className="text-xs text-yellow-800 dark:text-yellow-200">
                <strong>Key Insight:</strong> Pada Hari ke-10, sistem otomatis
                mendeteksi sisa stok 10kg. Karena ini menyentuh{" "}
                <strong>Level 1 (Critical)</strong>, dashboard akan memunculkan
                alert merah "Stok Pakan Kritis" agar admin segera beli.
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Stok Vaksin/Vitamin */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-default-800 mb-4 flex items-center gap-2">
            <HeartPulse className="text-purple-600" size={22} />
            B. Logika Tracking Stok Vaksin/Vitamin
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Flow Diagram */}
            <div className="bg-white dark:bg-default-50 p-5 rounded-lg border border-default-200 shadow-sm order-2 lg:order-1">
              <h4 className="font-bold text-default-900 mb-3">
                Rumus Otomatis
              </h4>

              <div className="mb-4">
                <code className="block bg-white dark:bg-default-200 p-3 rounded border border-default-200 text-sm font-mono text-purple-600 mb-2">
                  Stok Akhir = Stok Awal - Jumlah Unit Terpakai
                </code>
                <p className="text-xs text-default-600">
                  *Berbeda dengan pakan yang dikilo, vaksin dihitung per
                  unit/botol/sachet.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="font-bold text-default-900 mb-3">
                  Karakteristik Khusus
                </h4>
                <ul className="space-y-3 text-sm text-default-700">
                  <li className="flex items-start gap-2">
                    <div className="bg-purple-100 p-1 rounded-full text-purple-600 shrink-0 mt-0.5">
                      <Activity size={12} />
                    </div>
                    <div className="flex-1">
                      <strong>Trigger Berbasis Kegiatan:</strong> Stok hanya
                      berkurang saat user menginput kegiatan "Pemberian
                      Vitamin/Vaksin".
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="bg-purple-100 p-1 rounded-full text-purple-600 shrink-0 mt-0.5">
                      <Layers size={12} />
                    </div>
                    <div className="flex-1">
                      <strong>Batch Tracking:</strong> Jika ada, sistem akan
                      mengurangi dari batch yang masuk lebih dulu (FIFO) -{" "}
                      <em>(Fitur Lanjutan)</em>.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Steps Visual */}
            <div className="space-y-4 order-1 lg:order-2">
              <div className="bg-default-50 dark:bg-default-100 p-5 rounded-lg border border-default-200 h-full">
                <h4 className="font-bold text-default-900 mb-4 text-center border-b pb-2">
                  Alur Konsumsi Vaksin
                </h4>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 bg-white dark:bg-default-50 p-3 rounded border border-default-200">
                    <div className="font-bold text-2xl text-purple-200">1</div>
                    <div>
                      <div className="font-bold text-sm">
                        Jadwal Vaksinasi Tiba
                      </div>
                      <div className="text-xs text-default-500">
                        Notifikasi muncul di dashboard
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-default-50 p-3 rounded border border-default-200">
                    <div className="font-bold text-2xl text-purple-400">2</div>
                    <div>
                      <div className="font-bold text-sm">
                        Petugas Ambil Stok
                      </div>
                      <div className="text-xs text-default-500">
                        Fisik barang keluar dari kulkas
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-default-50 p-3 rounded border border-default-200 shadow-md border-l-4 border-l-purple-500">
                    <div className="font-bold text-2xl text-purple-600">3</div>
                    <div>
                      <div className="font-bold text-sm">Input di Sistem</div>
                      <div className="text-xs text-default-500">
                        "Pemberian Vaksin ND - 2 Botol"
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white dark:bg-default-50 p-3 rounded border border-default-200">
                    <div className="font-bold text-2xl text-purple-800">4</div>
                    <div>
                      <div className="font-bold text-sm">Update Otomatis</div>
                      <div className="text-xs text-default-500">
                        Stok berkurang instan
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skenario Real Vaksin */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
            <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Skenario: Program Vaksinasi 1 Bulan
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-purple-900 uppercase bg-purple-100 dark:bg-purple-900/50 dark:text-purple-200">
                  <tr>
                    <th className="px-4 py-2 rounded-l-lg">Minggu</th>
                    <th className="px-4 py-2">Kegiatan</th>
                    <th className="px-4 py-2">Input</th>
                    <th className="px-4 py-2 rounded-r-lg text-right">
                      Sisa Stok
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-200 dark:divide-purple-800">
                  <tr className="bg-white dark:bg-transparent">
                    <td className="px-4 py-2 font-medium">Awal</td>
                    <td className="px-4 py-2 text-green-600 font-semibold">
                      Stok Opname (Beli)
                    </td>
                    <td className="px-4 py-2">30 Botol</td>
                    <td className="px-4 py-2 text-right font-bold text-green-600">
                      30
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-transparent">
                    <td className="px-4 py-2 font-medium">Minggu 1</td>
                    <td className="px-4 py-2">Vaksin ND (Kandang A, B, C)</td>
                    <td className="px-4 py-2 text-red-500">-3 Botol</td>
                    <td className="px-4 py-2 text-right font-bold">27</td>
                  </tr>
                  <tr className="bg-white dark:bg-transparent">
                    <td className="px-4 py-2 font-medium">Minggu 2</td>
                    <td className="px-4 py-2">Vitamin Stress (Pasca Panen)</td>
                    <td className="px-4 py-2 text-red-500">-5 Botol</td>
                    <td className="px-4 py-2 text-right font-bold">22</td>
                  </tr>
                  <tr className="bg-white dark:bg-transparent">
                    <td className="px-4 py-2 font-medium">...</td>
                    <td className="px-4 py-2 italic text-gray-500">
                      Pemakaian rutin...
                    </td>
                    <td className="px-4 py-2 text-red-500">-20 Botol</td>
                    <td className="px-4 py-2 text-right font-bold">2</td>
                  </tr>
                  <tr className="bg-red-50 dark:bg-red-900/10 border-l-4 border-l-red-500">
                    <td className="px-4 py-2 font-medium text-red-700">
                      Minggu 5
                    </td>
                    <td className="px-4 py-2 font-bold text-red-700">
                      Alert Triggered!
                    </td>
                    <td className="px-4 py-2 text-red-600">Sisa Stok ≤ 2</td>
                    <td className="px-4 py-2 text-right font-bold text-red-600">
                      2
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex gap-3 p-3 bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-lg">
              <div className="shrink-0 text-purple-600 mt-0.5">🎯</div>
              <div className="text-xs text-purple-800 dark:text-purple-200">
                <strong>Key Insight:</strong> Sistem membedakan satuan. Pakan
                pakai KG (bisa koma), Vaksin pakai UNIT (bilangan bulat). Alert
                vaksin lebih sensitif (sisa 2 sudah merah) karena lead time beli
                vaksin biasanya lebih lama/sulit.
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Alert System Section */}
      <Card className="p-6 border-l-4 border-l-danger shadow-sm bg-gradient-to-r from-white to-default-50 dark:from-default-50 dark:to-default-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-default-900 flex items-center gap-2">
            <Bell className="text-danger" size={28} />
            5. Sistem Alert Otomatis
          </h2>
          <p className="text-default-600 mt-1 max-w-3xl">
            Sistem dilengkapi dengan fitur Early Warning untuk memberikan
            notifikasi otomatis saat parameter kritis terdeteksi.
          </p>
        </div>

        {/* Tabel Trigger Alert */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-default-800 mb-4">
            Kondisi Trigger & Notifikasi
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-default-200 text-sm">
              <thead>
                <tr className="bg-default-100">
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Jenis Alert
                  </th>
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Kondisi Trigger (Batas)
                  </th>
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Severity
                  </th>
                  <th className="border border-default-200 px-4 py-3 text-left font-semibold text-default-900">
                    Tujuan / Benefit
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3">
                    <div className="font-semibold text-default-900 flex items-center gap-2">
                      <Package className="text-orange-600" size={16} />
                      Stok Pakan Kritis
                    </div>
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    Stok &le; 10 kg
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-danger/10 text-danger border border-danger/20">
                      CRITICAL
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    Mencegah ayam kelaparan (puasa paksa) yang hambat
                    pertumbuhan.
                  </td>
                </tr>
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3">
                    <div className="font-semibold text-default-900 flex items-center gap-2">
                      <Package className="text-warning" size={16} />
                      Stok Pakan Menipis
                    </div>
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    Stok &le; 50 kg
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-warning/10 text-warning border border-warning/20">
                      WARNING
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    Memberi waktu 2-3 hari untuk proses pembelian/pengiriman.
                  </td>
                </tr>
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3">
                    <div className="font-semibold text-default-900 flex items-center gap-2">
                      <HeartPulse className="text-purple-600" size={16} />
                      Stok Vaksin Habis
                    </div>
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    Stok &le; 2 unit
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-danger/10 text-danger border border-danger/20">
                      CRITICAL
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    Memastikan jadwal vaksinasi tidak terlewat (risiko
                    penyakit).
                  </td>
                </tr>
                <tr className="hover:bg-default-50">
                  <td className="border border-default-200 px-4 py-3">
                    <div className="font-semibold text-default-900 flex items-center gap-2">
                      <AlertTriangle className="text-danger" size={16} />
                      Mortalitas Tinggi
                    </div>
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    Kematian Harian &gt; 2% Populasi
                  </td>
                  <td className="border border-default-200 px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-danger/10 text-danger border border-danger/20">
                      CRITICAL
                    </span>
                  </td>
                  <td className="border border-default-200 px-4 py-3 text-default-700">
                    Indikasi wabah penyakit - perlu karantina segera.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Penjelasan Detail */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card Alert Pakan */}
          <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-2 flex items-center gap-2">
              <Package size={18} /> Alert Pakan
            </h4>
            <p className="text-xs text-orange-700 dark:text-orange-300 leading-relaxed">
              Sistem menghitung sisa stok vs rata-rata konsumsi harian. Jika
              estimasi habis dalam &lt; 2 hari, alert merah muncul mencolok di
              dashboard admin.
            </p>
          </div>

          {/* Card Alert Vaksin */}
          <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2 flex items-center gap-2">
              <HeartPulse size={18} /> Alert Vaksin
            </h4>
            <p className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
              Sangat krusial untuk kesehatan. Notifikasi muncul H-7 sebelum stok
              habis total, mengingat pengadaan vaksin/obat butuh waktu (lead
              time) lebih lama.
            </p>
          </div>

          {/* Card Alert Mortalitas */}
          <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-bold text-red-800 dark:text-red-200 mb-2 flex items-center gap-2">
              <AlertTriangle size={18} /> Alert Mortalitas
            </h4>
            <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
              Dihitung per kandang per hari. Jika ada lonjakan kematian
              mendadak, sistem menandai kandang tersebut dengan status "Wabah"
              untuk isolasi.
            </p>
          </div>
        </div>
      </Card>

      {/* Logic Status Operasional Section */}
      <Card className="p-6 border-l-4 border-l-info shadow-sm bg-gradient-to-r from-white to-default-50 dark:from-default-50 dark:to-default-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-default-900 flex items-center gap-2">
            <Activity className="text-info" size={28} />
            6. Logika Status Operasional
          </h2>
          <p className="text-default-600 mt-1 max-w-3xl">
            Sistem menentukan status operasional kandang berdasarkan dua
            indikator kunci yang dihitung secara otomatis dari data real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Status 1: Bisa Dipanen */}
          <div className="bg-white dark:bg-default-50 rounded-xl border border-default-200 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Package className="text-success" size={64} />
            </div>
            <h3 className="text-lg font-bold text-default-800 mb-3 flex items-center gap-2">
              <CheckCircle2 className="text-success" size={20} />
              A. Indikator "Bisa Dipanen"
            </h3>
            <p className="text-sm text-default-600 mb-4">
              Menentukan apakah kandang masih memiliki stok ayam hidup yang
              tersedia untuk dipanen.
            </p>

            <div className="bg-success/5 border border-success/20 rounded-lg p-3 mb-4">
              <p className="text-xs font-semibold text-success uppercase tracking-wider mb-1">
                Logic System:
              </p>
              <code className="text-sm font-mono text-default-800 font-bold block">
                bisaDipanen = sisaHidup &gt; 0
              </code>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-default-500 mb-1">
                Rumus Sisa Hidup:
              </p>
              <div className="text-sm bg-default-100 p-2 rounded font-mono">
                Jumlah Masuk - Total Panen - Total Kematian
              </div>
            </div>

            <div className="text-xs text-default-500 italic border-t border-default-100 pt-3 mt-3">
              <strong>Contoh:</strong> Masuk 1000, Panen 0, Mati 50.
              <br />
              Sisa = 950 (&gt; 0). Output:{" "}
              <span className="text-success font-bold">TRUE (Aktif)</span>
            </div>
          </div>

          {/* Status 2: Perlu Perhatian Kesehatan */}
          <div className="bg-white dark:bg-default-50 rounded-xl border border-default-200 p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <AlertTriangle className="text-danger" size={64} />
            </div>
            <h3 className="text-lg font-bold text-default-800 mb-3 flex items-center gap-2">
              <AlertTriangle className="text-danger" size={20} />
              B. Indikator "Perlu Perhatian"
            </h3>
            <p className="text-sm text-default-600 mb-4">
              Flag otomatis untuk menandai kandang dengan performa kesehatan
              buruk (akumulatif).
            </p>

            <div className="bg-danger/5 border border-danger/20 rounded-lg p-3 mb-4">
              <p className="text-xs font-semibold text-danger uppercase tracking-wider mb-1">
                Logic System:
              </p>
              <code className="text-sm font-mono text-default-800 font-bold block">
                perluPerhatian = % Mortalitas &gt; 10%
              </code>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-default-500 mb-1">
                Rumus % Mortalitas:
              </p>
              <div className="text-sm bg-default-100 p-2 rounded font-mono">
                (Total Kematian / Jumlah Masuk) × 100
              </div>
            </div>

            <div className="text-xs text-default-500 italic border-t border-default-100 pt-3 mt-3">
              <strong>Contoh:</strong> Masuk 1000, Mati 50 (5%).
              <br />
              5% &lt; 10%. Output:{" "}
              <span className="text-success font-bold">FALSE (Aman)</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
