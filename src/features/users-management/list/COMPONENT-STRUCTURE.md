# User Management List - Visual Structure

## Desktop View

```
┌─────────────────────────────────────────────────────────────────────┐
│  Dashboard > Manajemen User                                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  📋 Manajemen User                          [+ Tambah User]         │
│  Kelola data pengguna sistem                                        │
│                                                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  🔍 [Cari user berdasarkan nama atau email...]                      │
│                                                                       │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ Nama      │ Email           │ Role    │ Phone  │ Status│ Aksi │  │
│  ├───────────────────────────────────────────────────────────────┤  │
│  │ John Doe  │ john@email.com  │[Admin▼] │ 08xxx  │[Aktif]│ 👁✏🛡🗑│  │
│  │ Jane Smith│ jane@email.com  │[Manager]│ 08xxx  │[Aktif]│ 👁✏🛡🗑│  │
│  │ Bob Wilson│ bob@email.com   │[Operator]│ -     │[Nonaktif]│👁✏🛡🗑│  │
│  │ ...       │ ...             │ ...     │ ...    │ ...   │ ...  │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                       │
│                    ◀  1  2  3  4  5  ▶                              │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Mobile View

```
┌───────────────────────────────┐
│ Dashboard > Manajemen User    │
├───────────────────────────────┤
│                               │
│ 📋 Manajemen User             │
│ Kelola data pengguna sistem   │
│                               │
│ [+ Tambah User]               │
│                               │
├───────────────────────────────┤
│                               │
│ 🔍 [Cari user...]            │
│                               │
├───────────────────────────────┤
│ ┌───────────────────────────┐ │
│ │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ │ │  ← Blue top border
│ │                           │ │
│ │ NAMA                      │ │
│ │ John Doe                  │ │
│ │ ─────────────────────────│ │
│ │ EMAIL                     │ │
│ │ john@email.com            │ │
│ │ ─────────────────────────│ │
│ │ ROLE                      │ │
│ │ [Admin ▼]                │ │
│ │ ─────────────────────────│ │
│ │ TELEPON                   │ │
│ │ 08123456789               │ │
│ │ ─────────────────────────│ │
│ │ STATUS                    │ │
│ │ [Aktif]                  │ │
│ │ ─────────────────────────│ │
│ │            [⋮ Menu]       │ │  ← Options menu
│ │                           │ │
│ └───────────────────────────┘ │
│                               │
│ ┌───────────────────────────┐ │
│ │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ │ │
│ │ Jane Smith                │ │
│ │ ...                       │ │
│ └───────────────────────────┘ │
│                               │
│      ◀  1  2  3  ▶           │
│                               │
└───────────────────────────────┘
```

## Component Hierarchy

```
UserManagementList
│
├─── ListGrid
│    │
│    ├─── PageHeader
│    │    ├─── Breadcrumbs
│    │    │    └─── "Dashboard > Manajemen User"
│    │    ├─── Title & Description
│    │    └─── Actions
│    │         └─── LinkButton (+ Tambah User)
│    │
│    ├─── SearchBar
│    │    └─── Input with Search Icon
│    │
│    └─── Content (Desktop/Mobile)
│         │
│         ├─── Desktop: Table
│         │    ├─── TableHeader
│         │    │    └─── Sortable Columns
│         │    ├─── TableBody
│         │    │    └─── TableRow (for each user)
│         │    │         ├─── Name
│         │    │         ├─── Email
│         │    │         ├─── Role Badge
│         │    │         ├─── Phone
│         │    │         ├─── Status Badge
│         │    │         └─── Actions
│         │    │              ├─── LinkButton (👁 Detail)
│         │    │              ├─── LinkButton (✏ Edit)
│         │    │              ├─── Button (🛡 Toggle)
│         │    │              └─── Button (🗑 Delete)
│         │    └─── Pagination
│         │
│         └─── Mobile: Cards
│              ├─── Card (for each user)
│              │    ├─── Blue Top Border
│              │    ├─── Field Rows
│              │    │    └─── Label + Value
│              │    └─── Dropdown Menu
│              │         └─── Action Items
│              └─── Pagination
│
└─── React Query Hooks
     ├─── useUsers (GET)
     ├─── useDeleteUser (DELETE)
     └─── useToggleUserStatus (PATCH)
```

## Badge Color Scheme

### Role Badges
```
┌─────────────────────────────────┐
│ Admin     │ [●●● Admin ▼]  Red  │
│ Manager   │ [●●● Manager] Orange│
│ Operator  │ [●●● Operator] Blue │
└─────────────────────────────────┘
```

### Status Badges
```
┌─────────────────────────────────┐
│ Active    │ [● Aktif]    Green  │
│ Inactive  │ [○ Nonaktif] Gray   │
└─────────────────────────────────┘
```

## Action Buttons

### Desktop View
```
┌──────────────────────────────────────────┐
│ [👁 Detail] [✏ Edit] [🛡] [🗑]         │
│   Primary    Warning  Default  Danger    │
│   Light      Light    Light    Plain     │
└──────────────────────────────────────────┘
```

### Mobile Dropdown Menu
```
┌────────────────────────┐
│ [⋮]                   │  ← Trigger button
└──┬─────────────────────┘
   │
   ▼
┌──────────────────────────┐
│ 👁  Lihat Detail        │
│ ✏  Edit                 │
│ 🛡  Toggle Status        │
│ 🗑  Hapus (Red)          │
└──────────────────────────┘
```

## States

### Loading State
```
┌─────────────────────────────────┐
│ [Skeleton Table/Cards Animation]│
│ ▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░    │
│ ▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░    │
│ ▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░░░░    │
└─────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────┐
│                                 │
│         📭                       │
│     Data kosong.                │
│                                 │
└─────────────────────────────────┘
```

### Confirmation Dialog
```
┌─────────────────────────────────┐
│  ⚠ Konfirmasi                   │
│                                 │
│  Apakah Anda yakin ingin        │
│  menghapus user John Doe?       │
│                                 │
│         [Batal]  [Hapus]        │
│                   ^^^^^ Danger  │
└─────────────────────────────────┘
```

## Data Flow Visualization

```
User Interaction
      │
      ▼
┌─────────────────────────────────────────────┐
│ Component State                             │
│ - searchQuery                               │
│ - roleFilter                                │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│ useUsers Hook                               │
│ - Fetches data from API                     │
│ - Returns: { data: User[], isLoading }     │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│ Data Transformation                         │
│ User[] → Row[] with JSX elements            │
│ - Badges for role & status                  │
│ - Action buttons                            │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│ ListGrid Component                          │
│ - Renders table/cards                       │
│ - Handles search, sort, pagination          │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│ User Interface                              │
│ - Responsive layout                         │
│ - Interactive elements                      │
└─────────────────────────────────────────────┘
```

## Mutation Flow

```
User clicks Delete
      │
      ▼
Confirmation Dialog
      │
      ▼ (Yes)
deleteUser.mutate(id)
      │
      ▼
API Call: DELETE /User/{id}
      │
      ▼
Success Response
      │
      ▼
Cache Invalidation
      │
      ▼
Refetch Users List
      │
      ▼
UI Updates
```

## Responsive Breakpoints

```
Desktop (≥768px)          Mobile (<768px)
┌──────────────┐          ┌──────────┐
│  Table View  │          │   Card   │
│              │          │   View   │
│ ┌──┬──┬──┬──┐│          │ ┌──────┐ │
│ │  │  │  │  ││          │ │ NAME │ │
│ ├──┼──┼──┼──┤│          │ │ DATA │ │
│ │  │  │  │  ││          │ └──────┘ │
│ └──┴──┴──┴──┘│          │          │
└──────────────┘          │ ┌──────┐ │
                          │ │ NAME │ │
                          │ │ DATA │ │
                          │ └──────┘ │
                          └──────────┘
```

## Summary

The component provides:
- ✅ Clean, modern UI using existing components
- ✅ Full CRUD operations (Create via button, Read/Update/Delete in table)
- ✅ Responsive design (table → cards on mobile)
- ✅ Real-time search with debouncing
- ✅ Client-side sorting and pagination
- ✅ Loading states and error handling
- ✅ Confirmation dialogs for destructive actions
- ✅ Color-coded badges for quick visual identification
- ✅ Icon-based actions for better UX
- ✅ Full TypeScript type safety
- ✅ React Query integration for optimal data fetching
