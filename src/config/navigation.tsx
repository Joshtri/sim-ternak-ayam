import {
  Home,
  Users,
  Building2,
  Package,
  Activity,
  FileText,
  Settings,
  TrendingUp,
  DollarSign,
  AlertCircle,
  HeartPulse,
  BarChart3,
  Calendar,
  Bell,
} from "lucide-react";

import { NavigationSection, UserRole } from "@/types/navigation";
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  role?: string[];
}
// ============================================
// 🧭 NAVIGATION CONFIGURATION
// ============================================
// Role-based navigation items untuk Sistem Manajemen Ternak Ayam

/**
 * Main navigation sections dengan role-based access
 */
export const navigationSections: NavigationSection[] = [
  // Dashboard - Semua role bisa akses
  {
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home size={20} />,
        href: "/dashboard",
        allowedRoles: ["pemilik", "operator", "petugas"],
      },
      {
        id: "users-management",
        label: "Manajemen Pengguna",
        icon: <Users size={20} />,
        href: "/users-management",
        allowedRoles: ["pemilik", "operator"],
      },
    ],
  },

  // Manajemen Kandang - Operator & Pemilik
  {
    title: "Manajemen Kandang",
    items: [
      {
        id: "kandang",
        label: "Kandang",
        icon: <Building2 size={20} />,
        href: "/daftar-kandang",
        allowedRoles: ["pemilik", "operator"],
      },
      {
        id: "kandang-asisten",
        label: "Kandang Asisten",
        icon: <Users size={20} />,
        href: "/kandang-asistens",
        allowedRoles: ["pemilik", "operator"],
      },
      {
        id: "ayam",
        label: "Data Ayam",
        icon: <Activity size={20} />,
        href: "/daftar-ayam",
        allowedRoles: ["pemilik", "operator", "petugas"],
      },
      {
        id: "mortalitas",
        label: "Data Mortalitas",
        icon: <AlertCircle size={20} />,
        href: "/daftar-mortalitas",
        allowedRoles: ["pemilik", "operator", "petugas"],
      },
      {
        id: "panen",
        label: "Data Panen",
        icon: <Package size={20} />,
        href: "/daftar-panen",
        allowedRoles: ["pemilik", "operator", "petugas"],
      },
    ],
  },

  // Vaksin - Semua role
  {
    title: "Manajemen Lainnya",
    items: [
      {
        id: "vaksin",
        label: "Vaksin & Vitamin",
        icon: <Package size={20} />,
        href: "/daftar-vaksin-dan-vitamin",
        allowedRoles: ["pemilik", "operator"],
      },
      {
        id: "pakan",
        label: "Pakan",
        icon: <Package size={20} />,
        href: "/daftar-pakan",
        allowedRoles: ["pemilik", "operator"],
      },
      {
        id: "jenis-kegiatan",
        label: "Jenis Kegiatan ( Master Data )",
        icon: <Activity size={20} />,
        href: "/daftar-jenis-kegiatan",
        allowedRoles: ["pemilik", "operator"],
      },
    ],
  },

  {
    title: "Transaksi",
    items: [
      {
        id: "operasional",
        label: "Operasional",
        icon: <Activity size={20} />,
        href: "/daftar-operasional",
        allowedRoles: ["pemilik", "operator", "petugas"],
      },

      {
        id: "biaya",
        label: "Biaya",
        icon: <DollarSign size={20} />,
        href: "/daftar-biaya",
        allowedRoles: ["pemilik", "operator", "petugas"],
        children: [
          {
            id: "biaya-list",
            label: "Daftar Biaya",
            icon: <DollarSign size={18} />,
            href: "/daftar-biaya",
            allowedRoles: ["pemilik", "operator", "petugas"],
          },
          {
            id: "biaya-bulanan",
            label: "Rekap Bulanan",
            icon: <Calendar size={18} />,
            href: "/daftar-biaya/bulanan",
            allowedRoles: ["pemilik", "operator", "petugas"],
          },
        ],
      },
    ],
  },

  // Laporan & Analisis - Pemilik & Operator
  {
    title: "Laporan & Analisis",
    items: [
      {
        id: "laporan-kesehatan-ayam",
        label: "Kesehatan Ayam",
        icon: <HeartPulse size={20} />,
        href: "/laporan-kesehatan-ayam",
        allowedRoles: ["pemilik", "operator"],
      },
      {
        id: "laporan-operasional",
        label: "Laporan Operasional",
        icon: <BarChart3 size={20} />,
        href: "/laporan-operasional",
        allowedRoles: ["pemilik", "operator"],
      },
      {
        id: "laporan-produktivitas",
        label: "Produktivitas",
        icon: <TrendingUp size={20} />,
        href: "/laporan-produktivitas",
        allowedRoles: ["pemilik", "operator"],
      },
      {
        id: "jurnal-harian",
        label: "Jurnal Harian",
        icon: <FileText size={20} />,
        href: "/jurnal-harian",
        allowedRoles: ["pemilik", "operator", "petugas"],
      },
      {
        id: "charts-dashboard",
        label: "Dashboard Charts",
        icon: <BarChart3 size={20} />,
        href: "/charts-board",
        allowedRoles: ["pemilik", "operator"],
      },
    ],
  },

  // User Management - Pemilik only
  {
    title: "Pengaturan",
    items: [
      {
        id: "users",
        label: "Manajemen Pengguna",
        icon: <Users size={20} />,
        href: "/users-management",
        allowedRoles: ["pemilik"],
      },
      // {
      //   id: "settings",
      //   label: "Pengaturan Sistem",
      //   icon: <Settings size={20} />,
      //   href: "/settings",
      //   allowedRoles: ["pemilik", "operator"],
      // },
      {
        id: "Notifications",
        label: "Pemberitahuan",
        icon: <Bell size={20} />,
        href: "/notifications",
        allowedRoles: ["pemilik", "operator"],
      },
    ],
  },
];

/**
 * Filter navigation items berdasarkan user role
 */
export function getNavigationByRole(userRole: UserRole): NavigationSection[] {
  return navigationSections
    .map(section => ({
      ...section,
      items: section.items.filter(
        item => !item.allowedRoles || item.allowedRoles.includes(userRole)
      ),
    }))
    .filter(section => section.items.length > 0); // Remove empty sections
}

/**
 * Get all available navigation items (for breadcrumbs mapping)
 */
export function getAllNavigationItems(): NavigationItem[] {
  return navigationSections.flatMap(section => section.items);
}
