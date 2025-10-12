# DetailCard Component

Reusable component for displaying detail information in a beautifully formatted card layout.

## Features

✅ **Multi-Section Support** - Display data in multiple organized sections
✅ **Flexible Grid Layout** - 1, 2, or 3 column layouts
✅ **Custom Value Rendering** - Support for JSX, links, badges, and more
✅ **Full-Width Items** - Span items across all columns
✅ **Conditional Display** - Hide items with `hidden` prop
✅ **Loading State** - Built-in skeleton component
✅ **Icons** - Add icons to section headers
✅ **Responsive** - Mobile-friendly grid layout

## Basic Usage

```typescript
import { DetailCard } from "@/components/ui/DetailCard";
import { Badge } from "@/components/ui/Badge";
import { User, Calendar } from "lucide-react";

function UserDetail() {
  return (
    <DetailCard
      sections={[
        {
          title: "User Information",
          description: "Basic user details",
          icon: <User className="w-5 h-5" />,
          columns: 2,
          items: [
            {
              key: "name",
              label: "Full Name",
              value: "John Doe",
            },
            {
              key: "email",
              label: "Email",
              value: "john@example.com",
            },
            {
              key: "role",
              label: "Role",
              value: <Badge color="primary">Admin</Badge>,
            },
            {
              key: "status",
              label: "Status",
              value: <Badge color="success">Active</Badge>,
            },
          ],
        },
        {
          title: "System Information",
          icon: <Calendar className="w-5 h-5" />,
          columns: 2,
          items: [
            {
              key: "createdAt",
              label: "Created At",
              value: "January 1, 2024",
            },
            {
              key: "updatedAt",
              label: "Updated At",
              value: "January 15, 2024",
            },
          ],
        },
      ]}
    />
  );
}
```

## Props API

### DetailCard Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sections` | DetailSection[] | ✅ | Array of sections to display |
| `header` | ReactNode | ❌ | Custom header content (shows in first section) |
| `footer` | ReactNode | ❌ | Custom footer content (shows in last section) |
| `shadow` | "none" \| "sm" \| "md" \| "lg" | ❌ | Card shadow (default: "sm") |
| `className` | string | ❌ | Additional CSS classes |

### DetailSection Interface

```typescript
interface DetailSection {
  title?: string;           // Section title
  description?: string;     // Section description
  icon?: ReactNode;         // Icon to display next to title
  items: DetailItem[];      // Array of items to display
  columns?: 1 | 2 | 3;     // Grid columns (default: 2)
}
```

### DetailItem Interface

```typescript
interface DetailItem {
  key: string;              // Unique key for React
  label: string;            // Label/title for the field
  value: ReactNode;         // Value (can be string, JSX, component)
  fullWidth?: boolean;      // Span across all columns
  hidden?: boolean;         // Hide this item conditionally
}
```

## Examples

### 1. Simple Detail Card

```typescript
<DetailCard
  sections={[
    {
      title: "Product Information",
      columns: 2,
      items: [
        { key: "name", label: "Name", value: "iPhone 15" },
        { key: "price", label: "Price", value: "$999" },
        { key: "stock", label: "Stock", value: "50 units" },
        { key: "category", label: "Category", value: "Electronics" },
      ],
    },
  ]}
/>
```

### 2. With Icons and Badges

```typescript
<DetailCard
  sections={[
    {
      title: "User Profile",
      icon: <User className="w-5 h-5" />,
      columns: 2,
      items: [
        {
          key: "name",
          label: "Full Name",
          value: "Jane Smith",
        },
        {
          key: "role",
          label: "Role",
          value: <Badge color="danger">Administrator</Badge>,
        },
        {
          key: "status",
          label: "Status",
          value: (
            <Badge color="success" variant="flat">
              Active
            </Badge>
          ),
        },
      ],
    },
  ]}
/>
```

### 3. With Custom Rendering

```typescript
<DetailCard
  sections={[
    {
      title: "Contact Information",
      icon: <Phone className="w-5 h-5" />,
      columns: 2,
      items: [
        {
          key: "email",
          label: "Email",
          value: (
            <a href="mailto:john@example.com" className="text-primary hover:underline">
              john@example.com
            </a>
          ),
        },
        {
          key: "phone",
          label: "Phone",
          value: (
            <a href="tel:+1234567890" className="text-primary hover:underline">
              +1 (234) 567-890
            </a>
          ),
        },
        {
          key: "whatsapp",
          label: "WhatsApp",
          value: (
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Open WhatsApp
            </a>
          ),
        },
      ],
    },
  ]}
/>
```

### 4. With Full-Width Items

```typescript
<DetailCard
  sections={[
    {
      title: "Order Details",
      columns: 2,
      items: [
        {
          key: "orderId",
          label: "Order ID",
          value: <code>#ORD-2024-001</code>,
          fullWidth: true, // Spans 2 columns
        },
        { key: "customer", label: "Customer", value: "John Doe" },
        { key: "date", label: "Date", value: "Jan 15, 2024" },
        {
          key: "address",
          label: "Shipping Address",
          value: "123 Main St, City, Country 12345",
          fullWidth: true, // Spans 2 columns
        },
      ],
    },
  ]}
/>
```

### 5. With Conditional Items

```typescript
const user = {
  name: "John",
  email: "john@example.com",
  phone: null, // Optional field
  isAdmin: true,
};

<DetailCard
  sections={[
    {
      title: "User Info",
      columns: 2,
      items: [
        { key: "name", label: "Name", value: user.name },
        { key: "email", label: "Email", value: user.email },
        {
          key: "phone",
          label: "Phone",
          value: user.phone || "-",
          hidden: !user.phone, // Hide if no phone
        },
        {
          key: "role",
          label: "Role",
          value: <Badge color="danger">Admin</Badge>,
          hidden: !user.isAdmin, // Only show for admins
        },
      ],
    },
  ]}
/>
```

### 6. Multiple Sections

```typescript
<DetailCard
  sections={[
    {
      title: "Basic Information",
      description: "User's basic details",
      icon: <User className="w-5 h-5" />,
      columns: 2,
      items: [
        { key: "name", label: "Name", value: "John Doe" },
        { key: "email", label: "Email", value: "john@example.com" },
      ],
    },
    {
      title: "Contact Details",
      description: "How to reach the user",
      icon: <Phone className="w-5 h-5" />,
      columns: 2,
      items: [
        { key: "phone", label: "Phone", value: "+1234567890" },
        { key: "address", label: "Address", value: "123 Main St" },
      ],
    },
    {
      title: "System Info",
      icon: <Calendar className="w-5 h-5" />,
      columns: 2,
      items: [
        { key: "createdAt", label: "Created", value: "Jan 1, 2024" },
        { key: "updatedAt", label: "Updated", value: "Jan 15, 2024" },
      ],
    },
  ]}
/>
```

### 7. Different Column Layouts

```typescript
// Single column layout
<DetailCard
  sections={[
    {
      title: "Full Width Content",
      columns: 1,
      items: [
        { key: "description", label: "Description", value: "Long text..." },
        { key: "notes", label: "Notes", value: "More long text..." },
      ],
    },
  ]}
/>

// Three column layout
<DetailCard
  sections={[
    {
      title: "Compact Grid",
      columns: 3,
      items: [
        { key: "field1", label: "Field 1", value: "Value 1" },
        { key: "field2", label: "Field 2", value: "Value 2" },
        { key: "field3", label: "Field 3", value: "Value 3" },
        { key: "field4", label: "Field 4", value: "Value 4" },
        { key: "field5", label: "Field 5", value: "Value 5" },
        { key: "field6", label: "Field 6", value: "Value 6" },
      ],
    },
  ]}
/>
```

### 8. With Header and Footer

```typescript
<DetailCard
  header={
    <div className="flex items-center gap-3">
      <Avatar src="/avatar.jpg" name="John Doe" />
      <div>
        <h2 className="text-xl font-bold">John Doe</h2>
        <p className="text-sm text-default-500">Administrator</p>
      </div>
    </div>
  }
  footer={
    <div className="flex justify-end gap-2">
      <Button color="default" variant="light">Cancel</Button>
      <Button color="primary">Edit</Button>
    </div>
  }
  sections={[
    {
      title: "User Information",
      columns: 2,
      items: [
        { key: "email", label: "Email", value: "john@example.com" },
        { key: "phone", label: "Phone", value: "+1234567890" },
      ],
    },
  ]}
/>
```

## Loading State

Use `DetailCardSkeleton` for loading state:

```typescript
import { DetailCardSkeleton } from "@/components/ui/DetailCard";

function UserDetail() {
  const { data: user, isLoading } = useUser(id);

  if (isLoading) {
    return (
      <DetailCardSkeleton
        sections={3}           // Number of sections
        itemsPerSection={4}    // Items per section
        columns={2}            // Grid columns
      />
    );
  }

  return <DetailCard sections={...} />;
}
```

## Real-World Example: User Detail Page

```typescript
import { DetailCard, DetailCardSkeleton } from "@/components/ui/DetailCard";
import { Badge } from "@/components/ui/Badge";
import { User, Phone, Calendar } from "lucide-react";

function UserDetailPage() {
  const { id } = useParams();
  const { data: user, isLoading } = useUser(id);

  if (isLoading) {
    return <DetailCardSkeleton sections={3} itemsPerSection={4} />;
  }

  return (
    <DetailCard
      sections={[
        {
          title: "Account Information",
          description: "User's account and authentication details",
          icon: <User className="w-5 h-5" />,
          columns: 2,
          items: [
            {
              key: "username",
              label: "Username",
              value: user.username,
            },
            {
              key: "email",
              label: "Email",
              value: user.email,
            },
            {
              key: "role",
              label: "Role",
              value: (
                <Badge color="danger" variant="flat">
                  {user.role}
                </Badge>
              ),
            },
            {
              key: "status",
              label: "Status",
              value: (
                <Badge
                  color={user.isActive ? "success" : "danger"}
                  variant="flat"
                >
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              ),
            },
          ],
        },
        {
          title: "Contact Information",
          description: "User's contact details",
          icon: <Phone className="w-5 h-5" />,
          columns: 2,
          items: [
            {
              key: "fullName",
              label: "Full Name",
              value: user.fullName,
              fullWidth: true,
            },
            {
              key: "phone",
              label: "Phone",
              value: user.phone ? (
                <a href={`tel:${user.phone}`} className="text-primary">
                  {user.phone}
                </a>
              ) : (
                "-"
              ),
            },
            {
              key: "email",
              label: "Email",
              value: (
                <a href={`mailto:${user.email}`} className="text-primary">
                  {user.email}
                </a>
              ),
            },
          ],
        },
        {
          title: "System Information",
          description: "System and activity data",
          icon: <Calendar className="w-5 h-5" />,
          columns: 2,
          items: [
            {
              key: "id",
              label: "User ID",
              value: <code className="text-xs bg-default-100 px-2 py-1 rounded">{user.id}</code>,
              fullWidth: true,
            },
            {
              key: "createdAt",
              label: "Created At",
              value: new Date(user.createdAt).toLocaleDateString(),
            },
            {
              key: "updatedAt",
              label: "Last Updated",
              value: new Date(user.updatedAt).toLocaleDateString(),
            },
          ],
        },
      ]}
    />
  );
}
```

## Styling

DetailCard uses HeroUI styling and is fully customizable:

```typescript
<DetailCard
  className="max-w-4xl mx-auto" // Custom container class
  shadow="lg"                     // Larger shadow
  sections={[...]}
/>
```

## Best Practices

### ✅ DO

```typescript
// Use descriptive labels
{ key: "email", label: "Email Address", value: user.email }

// Handle missing values gracefully
{ key: "phone", label: "Phone", value: user.phone || "-" }

// Use appropriate components for values
{
  key: "status",
  label: "Status",
  value: <Badge color="success">Active</Badge>
}

// Group related information in sections
sections={[
  { title: "Personal Info", items: [...] },
  { title: "Contact Info", items: [...] },
]}
```

### ❌ DON'T

```typescript
// Don't use unclear labels
{ key: "email", label: "E", value: user.email } // ❌

// Don't show undefined/null without handling
{ key: "phone", label: "Phone", value: user.phone } // ❌ May show "undefined"

// Don't put too many items in one section
items: [/* 20 items */] // ❌ Split into multiple sections

// Don't mix unrelated information
{
  title: "Info", // ❌ Too generic
  items: [
    { key: "name", ... },
    { key: "createdAt", ... }, // Different category
  ]
}
```

## TypeScript

Full TypeScript support with type safety:

```typescript
import type { DetailSection, DetailItem } from "@/components/ui/DetailCard";

const sections: DetailSection[] = [
  {
    title: "User Info",
    columns: 2,
    items: [
      { key: "name", label: "Name", value: "John" },
      { key: "email", label: "Email", value: "john@example.com" },
    ],
  },
];
```

## Summary

DetailCard is a powerful, flexible component for displaying structured detail information:

- 📊 **Multi-section** - Organize data in logical groups
- 🎨 **Customizable** - Support for JSX, badges, links, and more
- 📱 **Responsive** - Mobile-friendly grid layouts
- ⚡ **Fast** - Built with performance in mind
- 🎯 **Type-safe** - Full TypeScript support

Perfect for detail pages, profile views, and data displays! 🚀
