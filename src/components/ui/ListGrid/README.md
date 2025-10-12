# ListGrid Component - Refactored

A powerful, simplified data grid component with built-in CRUD action buttons and confirmation dialogs.

## Features

✅ **Simplified Action Buttons** - No more repetitive button code
✅ **Built-in Confirmation Dialog** - Using HeroUI Modal instead of window.confirm()
✅ **Pre-built CRUD Actions** - Show, Edit, Delete buttons ready to use
✅ **Custom Actions Support** - Add your own custom action buttons
✅ **Responsive Design** - Auto-switches between table (desktop) and cards (mobile)
✅ **Search & Filter** - Built-in search with debouncing
✅ **Sorting** - Click column headers to sort
✅ **Pagination** - Client-side pagination
✅ **Loading States** - Skeleton loaders

## Basic Usage

### Simplest Example (✨ NEW! Auto-mapping)

**Just pass raw data - no manual mapping needed!**

```typescript
import { ListGrid } from "@/components/ui/ListGrid";
import { Badge } from "@/components/ui/Badge";

function UserList() {
  const { data: users, isLoading } = useUsers();
  const deleteUser = useDeleteUser();

  // Define columns with value functions
  const columns = [
    {
      key: "name",
      label: "Name",
      value: (user) => user.name,
    },
    {
      key: "email",
      label: "Email",
      value: (user) => user.email,
    },
    {
      key: "role",
      label: "Role",
      value: (user) => <Badge>{user.role}</Badge>,
    },
    { key: "actions", label: "Actions", align: "center" },
  ];

  return (
    <ListGrid
      title="Users"
      description="Manage system users"
      columns={columns}

      // ✨ NEW! Just pass raw data array - automatic mapping!
      data={users}
      // nameField="fullName" // Optional: if your name field is different

      loading={isLoading}
      addButton={{
        href: "/users/create",
        label: "Add User",
      }}
      actionButtons={{
        show: { href: (id) => `/users/${id}` },
        edit: { href: (id) => `/users/${id}/edit` },
        delete: {
          onDelete: async (id) => await deleteUser.mutateAsync(id),
        },
      }}
    />
  );
}
```

### With Manual Rows (Old Way)

```typescript
// Manual mapping
const rows = users?.map(user => ({
  key: user.id,
  id: user.id,
  name: user.name,
  ...user,
})) ?? [];

<ListGrid
  columns={columns}
  rows={rows} // Manual rows
  loading={isLoading}
  // ... other props
/>
```

## Props API

### Core Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | ✅ | Page title |
| `description` | string | ❌ | Page description |
| `breadcrumbs` | array | ❌ | Breadcrumb navigation |
| `columns` | Column[] | ✅ | Table columns definition |
| `data` | any[] | ❌ | **NEW!** Raw data array (auto-mapped to rows) |
| `keyField` | string | ❌ | Field to use as React key (default: "id") |
| `idField` | string | ❌ | Field to use as id for actions (default: "id") |
| `nameField` | string | ❌ | Field to use in delete confirmation (default: "name") |
| `rows` | Row[] | ❌ | Manually mapped table rows (old way) |
| `loading` | boolean | ❌ | Show loading state |
| `pageSize` | number | ❌ | Items per page (default: 10) |
| `showPagination` | boolean | ❌ | Show pagination (default: true) |

**Note:** Use either `data` (recommended) OR `rows` (old way), not both.

### Action Button Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `addButton` | AddButtonConfig | ❌ | "Add" button configuration |
| `actionButtons` | ActionButtonConfig | ❌ | CRUD action buttons |

### Search Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `searchPlaceholder` | string | ❌ | Search input placeholder |
| `onSearch` | function | ❌ | Search callback |

### Delete Confirmation Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `deleteConfirmTitle` | string | ❌ | Dialog title (default: "Konfirmasi Hapus") |
| `deleteConfirmMessage` | function | ❌ | Custom message generator |

## Action Button Configurations

### AddButtonConfig

Configuration for the "Add/Create" button in the header.

```typescript
interface AddButtonConfig {
  href: string;              // Link to create page
  label?: string;            // Button text (default: "Tambah")
  icon?: ReactNode;          // Custom icon (default: Plus)
  color?: string;            // Button color (default: "primary")
  variant?: string;          // Button variant (default: "solid")
}
```

**Example:**
```typescript
addButton={{
  href: "/users/create",
  label: "Add New User",
  // icon: <UserPlus />,     // Optional
  // color: "success",       // Optional
}}
```

### ActionButtonConfig

Configuration for row action buttons (Show, Edit, Delete, Custom).

```typescript
interface ActionButtonConfig {
  show?: {
    href: (id: string) => string;
    label?: string;                    // Default: "Detail"
    icon?: ReactNode;                  // Default: Eye icon
  };
  edit?: {
    href: (id: string) => string;
    label?: string;                    // Default: "Edit"
    icon?: ReactNode;                  // Default: Pencil icon
  };
  delete?: {
    onDelete: (id: string, item?: any) => void | Promise<void>;
    label?: string;                    // Default: "Hapus"
    icon?: ReactNode;                  // Default: Trash icon
  };
  custom?: Array<{
    key: string;
    label: string;
    icon?: ReactNode;
    color?: string;
    variant?: string;
    onClick?: (id: string, item?: any) => void;
    href?: (id: string) => string;
  }>;
}
```

**Example:**
```typescript
actionButtons={{
  show: {
    href: (id) => `/users/${id}`,
    label: "View",
  },
  edit: {
    href: (id) => `/users/${id}/edit`,
  },
  delete: {
    onDelete: async (id) => {
      await deleteUser.mutateAsync(id);
    },
  },
  // Add custom buttons
  custom: [
    {
      key: "activate",
      label: "Activate",
      icon: <Check />,
      color: "success",
      onClick: (id) => activateUser(id),
    },
  ],
}}
```

## Advanced Examples

### With Custom Delete Message

```typescript
<ListGrid
  ...
  actionButtons={{
    delete: {
      onDelete: async (id, item) => {
        console.log("Deleting:", item);
        await deleteUser.mutateAsync(id);
      },
    },
  }}
  deleteConfirmMessage={(item) =>
    `Are you sure you want to delete "${item.name}"? This action cannot be undone.`
  }
  deleteConfirmTitle="Delete User"
/>
```

### With Custom Actions

```typescript
actionButtons={{
  show: { href: (id) => `/users/${id}` },
  edit: { href: (id) => `/users/${id}/edit` },
  delete: {
    onDelete: async (id) => await deleteUser.mutateAsync(id),
  },
  custom: [
    {
      key: "reset-password",
      label: "Reset Password",
      icon: <Key className="w-4 h-4" />,
      color: "warning",
      onClick: (id) => resetPassword(id),
    },
    {
      key: "send-email",
      label: "Send Email",
      icon: <Mail className="w-4 h-4" />,
      color: "primary",
      onClick: (id) => sendEmail(id),
    },
  ],
}}
```

### Only Show and Edit (No Delete)

```typescript
actionButtons={{
  show: { href: (id) => `/users/${id}` },
  edit: { href: (id) => `/users/${id}/edit` },
  // No delete button
}}
```

### Only Delete (No Show/Edit)

```typescript
actionButtons={{
  delete: {
    onDelete: async (id) => await deleteUser.mutateAsync(id),
  },
}}
```

### With Search

```typescript
const [searchQuery, setSearchQuery] = useState("");

const { data: users } = useUsers({
  search: searchQuery,
});

<ListGrid
  ...
  searchPlaceholder="Search by name or email..."
  onSearch={(value) => setSearchQuery(value)}
/>
```

### With Breadcrumbs

```typescript
<ListGrid
  ...
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Users", href: "/users" },
    { label: "List" },
  ]}
/>
```

### With Custom Empty State

```typescript
<ListGrid
  ...
  empty={
    <div className="text-center py-12">
      <p className="text-gray-400 mb-4">No users found</p>
      <Button onClick={handleAddUser}>Add First User</Button>
    </div>
  }
/>
```

### Using Old Custom Actions (Fallback)

If you need full control, you can still use the old way:

```typescript
<ListGrid
  ...
  actions={
    <div className="flex gap-2">
      <Button>Export</Button>
      <Button>Import</Button>
      <LinkButton href="/users/create">Add User</LinkButton>
    </div>
  }
  // Don't use addButton when using custom actions
/>

// And manually build action columns in rows
const rows = users?.map(user => ({
  ...user,
  actions: (
    <div className="flex gap-2">
      <LinkButton href={`/users/${user.id}`}>View</LinkButton>
      <LinkButton href={`/users/${user.id}/edit`}>Edit</LinkButton>
      <Button onClick={() => handleDelete(user.id)}>Delete</Button>
    </div>
  ),
}));
```

## Row Data Requirements

**Important:** Each row MUST have these fields:

```typescript
{
  key: string;        // Unique identifier for React keys
  id: string;         // ID for action buttons (show, edit, delete)
  name?: string;      // Optional: used in default delete message
  // ... your other data fields
}
```

## Column Definition

```typescript
interface Column {
  key: string;                        // Field key in row data
  label: string;                      // Column header label
  align?: "start" | "center" | "end"; // Text alignment
  value?: (item: any) => ReactNode;   // NEW! Value renderer function
}
```

### Using Value Functions (Recommended)

**Benefits:**
- ✅ No more duplicating field names between columns and rows
- ✅ All display logic in one place
- ✅ Easier to maintain
- ✅ Less code to write

**Example:**
```typescript
const columns = [
  {
    key: "name",
    label: "Name",
    value: (user) => user.fullName, // Direct field access
  },
  {
    key: "email",
    label: "Email",
    value: (user) => user.email,
  },
  {
    key: "status",
    label: "Status",
    value: (user) => ( // Custom rendering with JSX
      <Badge color={user.isActive ? "success" : "danger"}>
        {user.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    key: "phone",
    label: "Phone",
    value: (user) => user.phone || "-", // Default values
  },
  { key: "actions", label: "Actions", align: "center" },
];

// Rows are simpler - just pass the raw data!
const rows = users?.map(user => ({
  key: user.id,
  id: user.id,
  name: user.fullName, // For delete confirmation
  ...user, // Spread all user data for column value functions
})) ?? [];
```

### Without Value Functions (Old Way)

```typescript
const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role", align: "center" },
  { key: "actions", label: "Actions", align: "center" },
];

// Manual mapping required
const rows = users?.map(user => ({
  key: user.id,
  id: user.id,
  name: user.fullName, // Duplicate field mapping
  email: user.email,   // Duplicate field mapping
  role: <Badge>{user.role}</Badge>, // Duplicate field mapping
})) ?? [];
```

## Styling

### Custom Badge Colors

```typescript
const rows = users?.map(user => ({
  ...user,
  status: (
    <Badge
      color={user.isActive ? "success" : "danger"}
      variant="flat"
    >
      {user.isActive ? "Active" : "Inactive"}
    </Badge>
  ),
}));
```

### Custom Cell Content

You can use JSX in any row field:

```typescript
const rows = users?.map(user => ({
  ...user,
  avatar: (
    <Avatar src={user.avatarUrl} name={user.name} />
  ),
  name: (
    <div>
      <p className="font-bold">{user.name}</p>
      <p className="text-sm text-gray-500">{user.title}</p>
    </div>
  ),
}));
```

## Confirmation Dialog

The delete confirmation dialog uses HeroUI Modal with:
- **Backdrop blur** - For better UX
- **Loading state** - Shows spinner during delete
- **Non-dismissable** - When loading
- **Custom messages** - Per-item messages
- **Accessible** - ARIA labels and keyboard navigation

### Customizing Dialog

```typescript
<ListGrid
  ...
  deleteConfirmTitle="Remove User"
  deleteConfirmMessage={(item) =>
    `Remove ${item.name}? They will lose access immediately.`
  }
/>
```

## Comparison: Before vs After

### Before (Repetitive Code)

```typescript
const rows = users?.map(user => ({
  ...user,
  actions: (
    <div className="flex items-center justify-center gap-2">
      <LinkButton
        color="primary"
        href={`/users/${user.id}`}
        size="sm"
        startContent={<Eye className="w-4 h-4" />}
        variant="light"
      >
        Detail
      </LinkButton>
      <LinkButton
        color="warning"
        href={`/users/${user.id}/edit`}
        size="sm"
        startContent={<Pencil className="w-4 h-4" />}
        variant="light"
      >
        Edit
      </LinkButton>
      <button
        className="text-danger hover:text-danger-600 transition-colors"
        onClick={() => {
          if (confirm(`Delete ${user.name}?`)) {
            deleteUser.mutate(user.id);
          }
        }}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  ),
}));

<ListGrid
  ...
  actions={
    <LinkButton
      color="primary"
      href="/users/create"
      startContent={<UserPlus />}
      variant="solid"
    >
      Tambah User
    </LinkButton>
  }
/>
```

### After (Clean & Simple)

```typescript
const rows = users?.map(user => ({
  key: user.id,
  id: user.id,
  name: user.name,
  email: user.email,
})) ?? [];

<ListGrid
  ...
  addButton={{
    href: "/users/create",
    label: "Tambah User",
  }}
  actionButtons={{
    show: { href: (id) => `/users/${id}` },
    edit: { href: (id) => `/users/${id}/edit` },
    delete: {
      onDelete: async (id) => await deleteUser.mutateAsync(id),
    },
  }}
/>
```

**Result:** 90% less code, more maintainable, consistent UI!

## TypeScript Support

All types are fully typed with TypeScript:

```typescript
import {
  ListGrid,
  ActionButtonConfig,
  AddButtonConfig,
} from "@/components/ui/ListGrid";
```

## Best Practices

1. ✅ Always include `key` and `id` in rows
2. ✅ Use `mutateAsync` for delete operations
3. ✅ Customize delete messages for better UX
4. ✅ Use consistent action button patterns across your app
5. ✅ Leverage custom actions for domain-specific operations
6. ❌ Don't mix `addButton` with custom `actions` prop
7. ❌ Don't use `window.confirm()` - use built-in dialog

## Troubleshooting

### Actions not showing

Make sure each row has an `id` field:
```typescript
const rows = users?.map(user => ({
  key: user.id,
  id: user.id, // ← Important!
  ...
}));
```

### Delete not working

Use `mutateAsync` instead of `mutate`:
```typescript
delete: {
  onDelete: async (id) => {
    await deleteUser.mutateAsync(id); // ← Use mutateAsync
  },
}
```

### Custom message not showing

Pass the item's name or custom field:
```typescript
const rows = users?.map(user => ({
  ...user,
  name: user.fullName, // ← Used in delete message
}));
```

## Related Components

- `Badge` - For status indicators
- `LinkButton` - For navigation buttons
- `ConfirmDialog` - Standalone confirmation dialog
- `SearchBar` - Search input component
- `Pagination` - Pagination controls
- `SkeletonTable` - Loading skeleton

## Examples in Codebase

See full working example:
- `src/features/users-management/list/index.tsx`

## Migration Guide

If you're upgrading from the old ListGrid:

1. Remove manual action button code from rows
2. Add `addButton` prop for create button
3. Add `actionButtons` prop for CRUD actions
4. Ensure rows have `id` field
5. Replace `window.confirm` with built-in dialog
6. Update delete handlers to use `mutateAsync`

Done! Your code is now 90% cleaner! 🎉
