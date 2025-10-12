import { createFileRoute } from "@tanstack/react-router";
import { Users, Building2, Activity, TrendingUp } from "lucide-react";

import { GlassCard } from "@/components/ui/Glass";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-default-500">Total Kandang</p>
              <p className="text-3xl font-bold text-primary mt-2">12</p>
              <p className="text-xs text-success mt-1">+2 bulan ini</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="text-primary" size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-default-500">Total Ayam</p>
              <p className="text-3xl font-bold text-primary mt-2">5,240</p>
              <p className="text-xs text-success mt-1">+12% dari target</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <Activity className="text-success" size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-default-500">Petugas Aktif</p>
              <p className="text-3xl font-bold text-primary mt-2">8</p>
              <p className="text-xs text-default-500 mt-1">dari 10 petugas</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Users className="text-secondary" size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-default-500">Produktivitas</p>
              <p className="text-3xl font-bold text-primary mt-2">94%</p>
              <p className="text-xs text-success mt-1">+5% minggu ini</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center">
              <TrendingUp className="text-info" size={24} />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Recent Activity */}
      <GlassCard>
        <h2 className="text-xl font-bold mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-default-50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-success" />
            <div className="flex-1">
              <p className="font-medium">Pakan kandang A telah diisi</p>
              <p className="text-sm text-default-500">5 menit yang lalu</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-default-50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <div className="flex-1">
              <p className="font-medium">Stok pakan menipis - Kandang B</p>
              <p className="text-sm text-default-500">1 jam yang lalu</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-default-50 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-info" />
            <div className="flex-1">
              <p className="font-medium">Laporan harian tersedia</p>
              <p className="text-sm text-default-500">2 jam yang lalu</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
