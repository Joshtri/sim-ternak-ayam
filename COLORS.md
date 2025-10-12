# 🎨 Color Customization Guide - Poultry Farm Theme

Panduan lengkap untuk kustomisasi warna di aplikasi Sistem Manajemen Ternak Ayam Broiler.

## 🐔 Tema Warna Peternakan Ayam

Palet warna dirancang khusus untuk konteks peternakan ayam:
- **🟠 Orange**: Warna ayam, telur, hangat dan energik
- **🟤 Brown**: Natural, kandang, pakan ternak
- **🟢 Green**: Kesehatan, produktivitas, organik

## 📍 Lokasi File

Semua konfigurasi warna ada di: **`tailwind.config.js`**

## 🎯 Cara Mengubah Warna

### 1. Buka `tailwind.config.js`
### 2. Edit bagian `colors` di bagian atas file (baris 10-76)
### 3. Restart dev server (`npm run dev`)

## 📝 Format Warna

Warna menggunakan format **HSL** (Hue, Saturation, Lightness):

```js
'25 95% 53%'  // Format: Hue Saturation% Lightness%
```

**Contoh:**
- `'25 95% 53%'` = Orange (#ff6b1a) - Primary
- `'30 67% 44%'` = Brown (#b8792e) - Secondary
- `'142 71% 45%'` = Green (#22c55e) - Success

## ⚡ Optimasi Dark Mode

Setiap warna memiliki 2 varian:
- **Light mode**: Warna lebih gelap/saturated
- **Dark mode**: Warna lebih terang/cerah untuk kontras optimal

```js
primary: {
  light: '25 95% 53%',         // Orange gelap untuk light mode
  lightForeground: '0 0% 100%', // White text
  dark: '33 100% 60%',         // Orange terang untuk dark mode
  darkForeground: '20 14% 8%',  // Dark text
}
```

## 🎨 Available Colors

### 🟠 Primary (Orange - Warna Ayam)
**Konteks**: Warna utama aplikasi, melambangkan ayam dan telur yang hangat

```js
primary: {
  light: '25 95% 53%',         // #ff6b1a - Orange terang (light mode)
  lightForeground: '0 0% 100%',
  dark: '33 100% 60%',         // #ff9933 - Orange cerah (dark mode)
  darkForeground: '20 14% 8%',
}
```

**Digunakan untuk**: Button utama, link, highlight, navbar
**Contoh penggunaan:**
```tsx
<Button color="primary">Tambah Ternak</Button>
<Link className="text-primary">Lihat Detail</Link>
```

---

### 🟤 Secondary (Brown - Warna Kandang)
**Konteks**: Natural, peternakan, pakan ternak

```js
secondary: {
  light: '30 67% 44%',         // #b8792e - Brown (light mode)
  lightForeground: '0 0% 100%',
  dark: '36 60% 50%',          // #cc9952 - Lighter brown (dark mode)
  darkForeground: '30 15% 10%',
}
```

**Digunakan untuk**: Button sekunder, tag kategori
**Contoh penggunaan:**
```tsx
<Button color="secondary">Filter</Button>
<Badge color="secondary">Pakan</Badge>
```

---

### 🟢 Success (Green - Sehat & Produktif)
**Konteks**: Kesehatan ayam, produktivitas tinggi, organik

```js
success: {
  light: '142 71% 45%',        // #22c55e - Green (light mode)
  lightForeground: '0 0% 100%',
  dark: '142 76% 55%',         // #34d666 - Lighter green (dark mode)
  darkForeground: '142 90% 10%',
}
```

**Digunakan untuk**: Status sehat, notifikasi sukses, produksi tinggi
**Contoh penggunaan:**
```tsx
<Button color="success">Simpan Data</Button>
<Badge color="success">Sehat</Badge>
```

---

### 🟡 Warning (Amber - Perhatian)
**Konteks**: Peringatan, butuh perhatian, alert stok

```js
warning: {
  light: '38 92% 50%',         // #f59e0b - Amber (light mode)
  lightForeground: '20 14% 8%',
  dark: '43 96% 56%',          // #fbbf24 - Yellow (dark mode)
  darkForeground: '30 15% 10%',
}
```

**Digunakan untuk**: Alert stok menipis, perlu vaksinasi
**Contoh penggunaan:**
```tsx
<Button color="warning">Perhatian</Button>
<Alert color="warning">Stok pakan menipis!</Alert>
```

---

### 🔴 Danger (Red - Bahaya)
**Konteks**: Error, sakit, mortalitas, bahaya

```js
danger: {
  light: '0 72% 51%',          // #dc2626 - Red (light mode)
  lightForeground: '0 0% 100%',
  dark: '0 91% 71%',           // #fca5a5 - Lighter red (dark mode)
  darkForeground: '0 80% 10%',
}
```

**Digunakan untuk**: Hapus data, status sakit, mortalitas
**Contoh penggunaan:**
```tsx
<Button color="danger">Hapus</Button>
<Badge color="danger">Sakit</Badge>
```

---

### 🔵 Info (Blue - Informasi)
**Konteks**: Informasi tambahan, tooltip, dokumentasi

```js
info: {
  light: '199 89% 48%',        // #0ea5e9 - Sky blue (light mode)
  lightForeground: '0 0% 100%',
  dark: '199 89% 60%',         // Lighter blue (dark mode)
  darkForeground: '199 90% 10%',
}
```

**Digunakan untuk**: Info tooltip, dokumentasi
**Contoh penggunaan:**
```tsx
<Button color="info">Info</Button>
<Badge color="info">Baru</Badge>
```

---

### 🌅 Background (Warm Cream & Dark Brown)
Warna background utama aplikasi

```js
background: {
  light: '36 33% 97%',         // #faf8f5 - Warm cream (light mode)
  dark: '20 14% 8%',           // #141210 - Dark brown-gray (dark mode)
}
```

**Keuntungan**:
- Light mode: Warm cream mengurangi eye strain
- Dark mode: Dark brown lebih natural dari pure black

---

### 📄 Content (Card Background)
Warna background untuk card/konten

```js
content: {
  light: '0 0% 100%',          // #ffffff - Pure white (light mode)
  dark: '24 10% 12%',          // #1f1c19 - Dark brown (dark mode)
}
```

---

### 🎯 Focus (Focus Ring)
Warna ring/outline saat element di-focus

```js
focus: {
  light: '25 95% 53%',         // Orange
  dark: '33 100% 60%',         // Lighter orange untuk dark mode
}
```

## 🔧 Contoh Kustomisasi

### Mengubah Primary menjadi Biru
```js
primary: {
  DEFAULT: '217 91% 60%',      // Blue
  foreground: '0 0% 100%',     // White text
}
```

### Mengubah Danger menjadi Orange
```js
danger: {
  DEFAULT: '24 95% 53%',       // #ff5722 - Orange
  foreground: '0 0% 100%',     // White text
}
```

### Mengubah Success menjadi Teal
```js
success: {
  DEFAULT: '173 80% 40%',      // #14b8a6 - Teal
  foreground: '0 0% 100%',     // White text
}
```

## 🌈 Color Palette Reference

Berikut beberapa HSL values untuk warna umum:

| Warna | HSL | HEX |
|-------|-----|-----|
| Red | `0 84% 60%` | #ef4444 |
| Orange | `24 95% 53%` | #ff5722 |
| Amber | `38 92% 50%` | #f59e0b |
| Yellow | `48 96% 53%` | #fbbf24 |
| Green | `142 76% 36%` | #16a34a |
| Teal | `173 80% 40%` | #14b8a6 |
| Cyan | `187 92% 69%` | #22d3ee |
| Sky | `199 89% 48%` | #0ea5e9 |
| Blue | `217 91% 60%` | #3b82f6 |
| Indigo | `239 84% 67%` | #6366f1 |
| Purple | `271 81% 56%` | #8b5cf6 |
| Pink | `330 81% 60%` | #ec4899 |

## 🛠️ Tools untuk Convert Warna

### HEX to HSL Converter
1. Buka: https://www.rapidtables.com/convert/color/hex-to-hsl.html
2. Input HEX code (contoh: #16a34a)
3. Copy nilai HSL tanpa `hsl()` wrapper
4. Format: `142 76% 36%`

### Online Color Picker
- https://hslpicker.com/
- https://www.cssportal.com/css-color-picker/

## 💡 Tips

1. **Restart dev server** setelah mengubah warna di `tailwind.config.js`
2. **Gunakan HSL** untuk konsistensi dengan HeroUI
3. **Test di light & dark mode** untuk memastikan kontras yang baik
4. **Foreground color** harus kontras dengan background untuk readability
5. **Simpan backup** warna lama sebelum mengubah

## 📦 Automatic Application

Setelah mengubah warna di `tailwind.config.js`, warna akan **otomatis diterapkan** ke semua komponen HeroUI tanpa perlu mengubah code!

Contoh: Jika Anda ubah `primary` color, maka semua komponen yang menggunakan `color="primary"` akan otomatis berubah warnanya.

## 🎨 Example: Brand Color Theme

```js
const colors = {
  primary: {
    DEFAULT: '271 81% 56%',      // Purple - Brand color
    foreground: '0 0% 100%',     // White
  },
  secondary: {
    DEFAULT: '199 89% 48%',      // Sky blue
    foreground: '0 0% 100%',     // White
  },
  success: {
    DEFAULT: '142 76% 36%',      // Green
    foreground: '0 0% 100%',     // White
  },
  warning: {
    DEFAULT: '38 92% 50%',       // Amber
    foreground: '0 0% 0%',       // Black
  },
  danger: {
    DEFAULT: '0 84% 60%',        // Red
    foreground: '0 0% 100%',     // White
  },
};
```

---

**Happy Customizing! 🚀**

Jika ada pertanyaan atau butuh bantuan, silakan tanya!
