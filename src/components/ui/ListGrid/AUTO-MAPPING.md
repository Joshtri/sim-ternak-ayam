# Auto-Mapping: Zero Manual Row Mapping! 🎉

## The Problem

Before, you had to manually map your data to rows:

```typescript
// ❌ OLD WAY - Manual mapping required
const rows = users?.map(user => ({
  key: user.id,
  id: user.id,
  name: user.fullName,
  ...user,
})) ?? [];

<ListGrid
  columns={columns}
  rows={rows} // Manual rows
  loading={isLoading}
/>
```

**Issues:**
- 😤 Repetitive boilerplate code
- 🐛 Easy to forget `key`, `id`, or `name` fields
- 📝 More code to write
- 🔄 Same pattern repeated in every list component

## The Solution: Auto-Mapping

Just pass your raw data array - ListGrid handles the rest!

```typescript
// ✅ NEW WAY - Zero manual mapping!
<ListGrid
  columns={columns}
  data={users} // Just pass raw data!
  loading={isLoading}
/>
```

**That's it!** No more manual mapping! 🎉

## How It Works

ListGrid automatically transforms your data:

```typescript
// You pass:
data={users}

// ListGrid automatically does:
const rows = users?.map(user => ({
  key: user.id,        // From keyField (default: "id")
  id: user.id,         // From idField (default: "id")
  name: user.name,     // From nameField (default: "name")
  ...user,             // All other data for column value functions
})) ?? [];
```

## Configuration

### Default Field Names

By default, ListGrid uses:
- `keyField="id"` - For React key
- `idField="id"` - For action button IDs
- `nameField="name"` - For delete confirmation message

```typescript
// If your data structure matches defaults:
interface User {
  id: string;      // ✅ Used as key and id
  name: string;    // ✅ Used in delete confirmation
  email: string;
  // ... other fields
}

<ListGrid
  data={users} // That's it!
  columns={columns}
/>
```

### Custom Field Names

If your fields are named differently, just specify them:

```typescript
// Your data structure:
interface User {
  userId: string;     // Different from "id"
  fullName: string;   // Different from "name"
  email: string;
}

<ListGrid
  data={users}
  keyField="userId"      // Use userId as React key
  idField="userId"       // Use userId for action buttons
  nameField="fullName"   // Use fullName in delete confirmation
  columns={columns}
/>
```

## Real-World Examples

### Example 1: Standard Structure (id, name)

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const columns = [
  {
    key: "name",
    label: "Product",
    value: (p) => p.name,
  },
  {
    key: "price",
    label: "Price",
    value: (p) => `Rp ${p.price.toLocaleString()}`,
  },
  { key: "actions", label: "Actions", align: "center" },
];

<ListGrid
  data={products} // ✅ Auto-mapping works!
  columns={columns}
  actionButtons={{
    edit: { href: (id) => `/products/${id}/edit` },
    delete: { onDelete: async (id) => await deleteProduct.mutateAsync(id) },
  }}
/>
```

### Example 2: Custom Field Names

```typescript
interface User {
  userId: string;
  fullName: string;
  email: string;
  role: string;
}

const columns = [
  {
    key: "fullName",
    label: "Name",
    value: (u) => u.fullName,
  },
  {
    key: "email",
    label: "Email",
    value: (u) => u.email,
  },
  {
    key: "role",
    label: "Role",
    value: (u) => <Badge>{u.role}</Badge>,
  },
  { key: "actions", label: "Actions", align: "center" },
];

<ListGrid
  data={users}
  keyField="userId"    // Custom key field
  idField="userId"     // Custom id field
  nameField="fullName" // Custom name field
  columns={columns}
  actionButtons={{
    show: { href: (id) => `/users/${id}` },
    edit: { href: (id) => `/users/${id}/edit` },
    delete: { onDelete: async (id) => await deleteUser.mutateAsync(id) },
  }}
  deleteConfirmMessage={(item) =>
    `Delete ${item.fullName}?` // nameField is "fullName"
  }
/>
```

### Example 3: Nested ID Field

```typescript
interface Order {
  orderId: string;
  customer: {
    name: string;
    email: string;
  };
  total: number;
}

// Use orderId for key/id, customer.name for delete message
<ListGrid
  data={orders}
  keyField="orderId"
  idField="orderId"
  nameField="customer.name" // ⚠️ Nested fields not supported yet
  columns={columns}
  // Workaround: Use custom delete message
  deleteConfirmMessage={(item) =>
    `Delete order for ${item.customer.name}?`
  }
/>
```

## Before vs After Comparison

### User Management List

**BEFORE (Manual Mapping):**
```typescript
export default function UserManagementList() {
  const { data: users, isLoading } = useUsers({ search: searchQuery });
  const deleteUser = useDeleteUser();

  const columns = [
    { key: "fullName", label: "Nama", value: (u) => u.fullName },
    { key: "email", label: "Email", value: (u) => u.email },
    { key: "role", label: "Role", value: (u) => <Badge>{u.role}</Badge> },
    { key: "actions", label: "Aksi", align: "center" },
  ];

  // ❌ Manual mapping - repetitive code
  const rows = users?.map((user: User) => ({
    key: user.id,
    id: user.id,
    name: user.fullName,
    ...user,
  })) ?? [];

  return (
    <ListGrid
      title="Manajemen User"
      columns={columns}
      rows={rows} // Manual rows
      loading={isLoading}
      actionButtons={{
        show: { href: (id) => `/users/${id}` },
        edit: { href: (id) => `/users/${id}/edit` },
        delete: { onDelete: async (id) => await deleteUser.mutateAsync(id) },
      }}
    />
  );
}
```

**AFTER (Auto-Mapping):**
```typescript
export default function UserManagementList() {
  const { data: users, isLoading } = useUsers({ search: searchQuery });
  const deleteUser = useDeleteUser();

  const columns = [
    { key: "fullName", label: "Nama", value: (u) => u.fullName },
    { key: "email", label: "Email", value: (u) => u.email },
    { key: "role", label: "Role", value: (u) => <Badge>{u.role}</Badge> },
    { key: "actions", label: "Aksi", align: "center" },
  ];

  return (
    <ListGrid
      title="Manajemen User"
      columns={columns}
      data={users}           // ✅ Just pass raw data!
      nameField="fullName"   // ✅ Specify custom name field
      loading={isLoading}
      actionButtons={{
        show: { href: (id) => `/users/${id}` },
        edit: { href: (id) => `/users/${id}/edit` },
        delete: { onDelete: async (id) => await deleteUser.mutateAsync(id) },
      }}
    />
  );
}
```

**Result:**
- 🎯 **5 lines removed** (rows mapping)
- 🎨 **Cleaner code**
- 🚀 **Faster to write**
- 🐛 **Fewer bugs**

## Migration Guide

### Step 1: Remove Manual Rows Mapping

```typescript
// Remove this:
const rows = users?.map(user => ({
  key: user.id,
  id: user.id,
  name: user.fullName,
  ...user,
})) ?? [];
```

### Step 2: Replace `rows` with `data`

```typescript
// Before:
<ListGrid
  columns={columns}
  rows={rows}
  loading={isLoading}
/>

// After:
<ListGrid
  columns={columns}
  data={users}
  loading={isLoading}
/>
```

### Step 3: Specify Custom Field Names (if needed)

```typescript
// If your name field is not "name":
<ListGrid
  columns={columns}
  data={users}
  nameField="fullName" // Or "displayName", "userName", etc.
  loading={isLoading}
/>

// If your id field is not "id":
<ListGrid
  columns={columns}
  data={products}
  keyField="productId"
  idField="productId"
  nameField="productName"
  loading={isLoading}
/>
```

### Step 4: Test

That's it! Your table should work exactly the same but with less code.

## Best Practices

### ✅ DO

```typescript
// Use data prop for auto-mapping
<ListGrid
  data={users}
  nameField="fullName"
  columns={columns}
/>
```

### ❌ DON'T

```typescript
// Don't use both data and rows
<ListGrid
  data={users}     // ❌ Don't use both
  rows={manualRows} // ❌ Pick one!
  columns={columns}
/>

// Don't forget to specify custom field names
<ListGrid
  data={users} // Has "fullName" field
  // ❌ Missing nameField="fullName"
  // Delete confirmation will look for "name" field (undefined!)
/>
```

## TypeScript Support

Full TypeScript support with type safety:

```typescript
interface User {
  id: string;
  fullName: string;
  email: string;
}

// Type-safe!
<ListGrid
  data={users}              // Type: User[]
  nameField="fullName"      // ✅ Must be keyof User
  // nameField="invalid"    // ❌ TypeScript error
  columns={columns}
/>
```

## Performance

Auto-mapping happens once per render using `useMemo`, so performance is excellent even with large datasets. The overhead is negligible compared to manual mapping.

## Backwards Compatibility

The old way (manual `rows` prop) still works! You can:
- Use `data` for auto-mapping (recommended)
- Use `rows` for manual mapping (old way)
- Gradually migrate existing code

```typescript
// Both work:

// 1. New way (recommended)
<ListGrid data={users} columns={columns} />

// 2. Old way (still supported)
const rows = users?.map(u => ({ key: u.id, id: u.id, ...u })) ?? [];
<ListGrid rows={rows} columns={columns} />
```

## When to Use Manual Rows

Use manual `rows` prop if you need:
- Complex pre-processing before rendering
- Filtering/transforming data before display
- Derived fields not in original data

```typescript
// Complex pre-processing
const rows = users
  ?.filter(u => u.isActive)
  .map(u => ({
    key: u.id,
    id: u.id,
    fullName: `${u.firstName} ${u.lastName}`, // Derived field
    isVIP: u.orders > 100, // Computed field
    ...u,
  })) ?? [];

<ListGrid rows={rows} columns={columns} />
```

For simple cases, use `data` with column value functions instead:

```typescript
// Better: Use data + column value functions
<ListGrid
  data={users?.filter(u => u.isActive)}
  columns={[
    {
      key: "fullName",
      label: "Name",
      value: (u) => `${u.firstName} ${u.lastName}`,
    },
    {
      key: "vipStatus",
      label: "VIP",
      value: (u) => u.orders > 100 ? <Badge>VIP</Badge> : null,
    },
  ]}
/>
```

## Summary

Auto-mapping eliminates manual row mapping boilerplate:

- 📉 **Less code** - Remove 5-10 lines per list component
- 🎯 **Simpler** - Just pass raw data
- 🐛 **Fewer bugs** - No more missing fields
- ⚡ **Faster** - Write lists in seconds
- ✨ **Cleaner** - More maintainable code

Start using auto-mapping in your tables today! 🚀

## Quick Reference

```typescript
// Minimal usage (id, name fields)
<ListGrid data={users} columns={columns} />

// With custom field names
<ListGrid
  data={users}
  keyField="userId"
  idField="userId"
  nameField="fullName"
  columns={columns}
/>

// Old way (still works)
const rows = users?.map(u => ({ key: u.id, id: u.id, ...u })) ?? [];
<ListGrid rows={rows} columns={columns} />
```
