# 🚀 Implementation Guide - New Features

Dokumentasi ini menjelaskan implementasi 3 fitur baru yang telah dibuat:

1. **Dashboard Charts** - Grafik analitik operasional kandang
2. **Jurnal Harian Petugas** - Sistem pencatatan aktivitas harian
3. **Sistem Notifikasi** - Komunikasi internal & alert

---

## 📊 1. Dashboard Charts

### Struktur Folder

```
src/features/charts/
├── types.ts
├── services/
│   └── chartsService.ts
├── hooks/
│   └── useCharts.ts
└── components/
    ├── ProduktivitasTrendChart.tsx
    ├── MortalitasStatistikChart.tsx
    ├── OperasionalBreakdownChart.tsx
    ├── FinancialAnalysisChart.tsx
    └── index.ts
```

### API Endpoints

| Method | Endpoint                            | Hook                         |
| ------ | ----------------------------------- | ---------------------------- |
| GET    | `/api/charts/produktivitas-trend`   | `useProduktivitasTrend()`    |
| GET    | `/api/charts/mortalitas-statistik`  | `useMortalitasStatistik()`   |
| GET    | `/api/charts/operasional-breakdown` | `useOperasionalBreakdown()`  |
| GET    | `/api/charts/financial-analysis`    | `useFinancialAnalysis()`     |

### Cara Penggunaan

```tsx
import {
  ProduktivitasTrendChart,
  MortalitasStatistikChart,
  OperasionalBreakdownChart,
  FinancialAnalysisChart,
} from "@/features/charts/components";

function DashboardPage() {
  const params = {
    periode_type: "bulanan",
    kandang_id: "123",
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <ProduktivitasTrendChart params={params} />
      <MortalitasStatistikChart params={params} />
      <OperasionalBreakdownChart params={params} />
      <FinancialAnalysisChart params={params} />
    </div>
  );
}
```

### Query Parameters

```typescript
interface ChartQueryParams {
  kandang_id?: string;
  start_date?: string;
  end_date?: string;
  periode_type?: 'mingguan' | 'bulanan' | 'tahunan';
  limit?: number;
}
```

---

## 📔 2. Jurnal Harian Petugas

### Struktur Folder

```
src/features/jurnal-harian/
├── types.ts
├── services/
│   └── jurnalHarianService.ts
├── hooks/
│   └── useJurnalHarian.ts
└── components/
    ├── JurnalHarianList.tsx
    ├── JurnalHarianForm.tsx
    └── index.ts
```

### API Endpoints

| Method | Endpoint                       | Hook                      |
| ------ | ------------------------------ | ------------------------- |
| GET    | `/api/jurnal-harian`           | `useJurnalHarianList()`   |
| GET    | `/api/jurnal-harian/{id}`      | `useJurnalHarianDetail()` |
| POST   | `/api/jurnal-harian`           | `useCreateJurnalHarian()` |
| PUT    | `/api/jurnal-harian/{id}`      | `useUpdateJurnalHarian()` |
| DELETE | `/api/jurnal-harian/{id}`      | `useDeleteJurnalHarian()` |
| GET    | `/api/jurnal-harian/laporan`   | `useJurnalHarianLaporan()`|

### Cara Penggunaan

#### List Jurnal

```tsx
import { JurnalHarianList } from "@/features/jurnal-harian/components";

function JurnalPage() {
  return (
    <JurnalHarianList
      params={{ user_id: "123" }}
      onAdd={() => console.log("Add clicked")}
      onEdit={(id) => console.log("Edit", id)}
      onView={(id) => console.log("View", id)}
    />
  );
}
```

#### Form Create/Edit

```tsx
import { JurnalHarianForm } from "@/features/jurnal-harian/components";

function CreateJurnalPage() {
  return (
    <JurnalHarianForm
      onSuccess={() => console.log("Success")}
      onCancel={() => console.log("Cancel")}
    />
  );
}
```

### Status Jurnal

- `draft` - Masih draft
- `submitted` - Sudah disubmit
- `approved` - Disetujui
- `rejected` - Ditolak

---

## 🔔 3. Sistem Notifikasi

### Struktur Folder

```
src/features/notifikasi/
├── types.ts
├── services/
│   └── notifikasiService.ts
├── hooks/
│   └── useNotifikasi.ts
└── components/
    ├── NotificationBell.tsx
    ├── NotificationList.tsx
    ├── BroadcastForm.tsx
    └── index.ts
```

### API Endpoints

| Method | Endpoint                            | Hook                        |
| ------ | ----------------------------------- | --------------------------- |
| GET    | `/api/notifications`                | `useNotifications()`        |
| POST   | `/api/notifications`                | `useSendNotification()`     |
| PUT    | `/api/notifications/{id}/read`      | `useMarkAsRead()`           |
| DELETE | `/api/notifications/{id}`           | `useDeleteNotification()`   |
| GET    | `/api/notifications/unread-count`   | `useUnreadCount()`          |
| POST   | `/api/notifications/broadcast`      | `useBroadcastNotification()`|

### Cara Penggunaan

#### Notification Bell (di Navbar)

```tsx
import { NotificationBell } from "@/features/notifikasi/components";

function Navbar() {
  return (
    <nav>
      {/* ... other nav items */}
      <NotificationBell />
    </nav>
  );
}
```

#### Notification List

```tsx
import { NotificationList } from "@/features/notifikasi/components";

function NotificationPage() {
  return (
    <div>
      <h1>Notifikasi</h1>
      <NotificationList />
    </div>
  );
}
```

#### Broadcast Form (Pemilik Only)

```tsx
import { BroadcastForm } from "@/features/notifikasi/components";

function BroadcastPage() {
  return (
    <BroadcastForm
      onSuccess={() => console.log("Broadcast sent")}
    />
  );
}
```

### Tipe Notifikasi

- `info` - Informasi umum
- `warning` - Peringatan
- `error` - Error
- `success` - Sukses
- `reminder` - Pengingat
- `system` - Sistem
- `message` - Pesan

### Prioritas

- `low` - Rendah
- `medium` - Sedang
- `high` - Tinggi
- `urgent` - Mendesak

---

## 🎯 Integrasi ke Aplikasi

### 1. Update Navigation (contoh)

```tsx
// src/config/navigation.tsx
export const navigationItems = [
  // ... existing items
  {
    label: "Dashboard Analitik",
    href: "/charts/dashboard",
    icon: ChartBarIcon,
  },
  {
    label: "Jurnal Harian",
    href: "/jurnal-harian",
    icon: BookOpenIcon,
    roles: ["Petugas"], // Only for Petugas
  },
  {
    label: "Notifikasi",
    href: "/notifikasi",
    icon: BellIcon,
  },
];
```

### 2. Add NotificationBell ke Layout

```tsx
// src/components/layout/AppLayout/index.tsx
import { NotificationBell } from "@/features/notifikasi/components";

export function AppLayout({ children }) {
  return (
    <div>
      <nav>
        {/* ... other items */}
        <NotificationBell />
      </nav>
      <main>{children}</main>
    </div>
  );
}
```

### 3. Role-Based Access Control

```tsx
// Example: Restrict Jurnal Harian to Petugas only
import { useCurrentUser } from "@/features/auth/hooks/useAuth";

function JurnalHarianPage() {
  const { data: user } = useCurrentUser<{ role: string }>();

  if (user?.role !== "Petugas") {
    return <div>Akses ditolak. Halaman ini hanya untuk Petugas.</div>;
  }

  return <JurnalHarianList />;
}
```

---

## 🛠️ Dependensi yang Dibutuhkan

Pastikan package berikut sudah terinstall:

```bash
npm install @tanstack/react-query
npm install date-fns
npm install @heroicons/react
npm install @nextui-org/react
```

---

## 📝 Catatan Penting

1. **Auto-refresh Notifikasi**: Hook `useUnreadCount()` dan `useNotifications()` otomatis refresh setiap 15-30 detik
2. **Toast Notifications**: Semua operasi create/update/delete otomatis menampilkan toast notification
3. **Loading States**: Semua komponen sudah memiliki loading & error states
4. **Responsive Design**: Semua komponen sudah responsive untuk mobile & desktop
5. **Type Safety**: Semua API calls sudah fully typed dengan TypeScript

---

## 🔗 Referensi

- [CLAUDE.md](./CLAUDE.md) - Spesifikasi API endpoints
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [NextUI Docs](https://nextui.org/)
- [Heroicons](https://heroicons.com/)

---

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat issue di repository atau hubungi tim development.

**Happy Coding!** 🎉
