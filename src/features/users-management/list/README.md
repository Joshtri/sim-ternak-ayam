# User Management List Component

This component provides a complete user management interface using your existing UI components.

## Features

✅ **Search & Filter**
- Real-time search by name or email
- Role filtering support
- Debounced search for better performance

✅ **Data Display**
- Responsive table/card layout (mobile-friendly)
- Sortable columns
- Pagination support
- Loading states with skeleton

✅ **User Actions**
- View user details
- Edit user
- Toggle active/inactive status
- Delete user (with confirmation)

✅ **Visual Elements**
- Color-coded role badges (Admin: Red, Manager: Orange, Operator: Blue)
- Status badges (Active: Green, Inactive: Gray)
- Action buttons with icons
- Breadcrumb navigation

## Components Used

### UI Components (`@/components/ui`)
- **ListGrid** - Main data table/grid component with search, pagination, and sorting
- **Badge** - Status and role indicators
- **LinkButton** - Navigation buttons with routing

### Icons (lucide-react)
- `UserPlus` - Add user button
- `Eye` - View details
- `Pencil` - Edit user
- `Shield/ShieldOff` - Toggle status
- `Trash2` - Delete user

## Data Flow

```
Component → useUsers hook → userService.getUsers() → API → Backend
                ↓
           Users data (User[])
                ↓
         Transform to rows
                ↓
            ListGrid
                ↓
         User Interface
```

## Code Structure

### 1. State Management
```typescript
const [searchQuery, setSearchQuery] = useState("");
const [roleFilter, setRoleFilter] = useState<string | undefined>();
```

### 2. Data Fetching
```typescript
const { data: users, isLoading } = useUsers({
  search: searchQuery,
  role: roleFilter,
});
```

### 3. Mutations
```typescript
const deleteUser = useDeleteUser();
const toggleStatus = useToggleUserStatus();
```

### 4. Data Transformation
```typescript
const rows = users?.map((user: User) => ({
  key: user.id,
  name: user.name,
  email: user.email,
  role: <Badge>...</Badge>,
  status: <Badge>...</Badge>,
  actions: <div>...</div>,
})) ?? [];
```

## Features Breakdown

### Search Functionality
- Searches across name and email fields
- Debounced for performance (300ms default)
- Updates results in real-time

```typescript
onSearch={value => setSearchQuery(value)}
```

### Role Badges
Role badges are color-coded:
- **Admin**: Red/Danger color
- **Manager**: Orange/Warning color
- **Operator**: Blue/Primary color

```typescript
<Badge
  color={
    user.role === "admin"
      ? "danger"
      : user.role === "manager"
        ? "warning"
        : "primary"
  }
>
  {user.role}
</Badge>
```

### Status Badges
Status badges indicate active state:
- **Active**: Green/Success color
- **Inactive**: Gray/Default color

```typescript
<Badge color={user.isActive ? "success" : "default"}>
  {user.isActive ? "Aktif" : "Nonaktif"}
</Badge>
```

### Action Buttons

**View Details**
```typescript
<LinkButton
  href={`/users-management/${user.id}`}
  startContent={<Eye />}
>
  Detail
</LinkButton>
```

**Edit User**
```typescript
<LinkButton
  href={`/users-management/${user.id}/edit`}
  startContent={<Pencil />}
>
  Edit
</LinkButton>
```

**Toggle Status**
```typescript
<button onClick={() => toggleStatus.mutate(user.id)}>
  {user.isActive ? <ShieldOff /> : <Shield />}
</button>
```

**Delete User**
```typescript
<button
  onClick={() => {
    if (confirm("Are you sure?")) {
      deleteUser.mutate(user.id);
    }
  }}
>
  <Trash2 />
</button>
```

## Responsive Design

The component is fully responsive:
- **Desktop**: Table view with all columns
- **Mobile**: Card view with stacked information
- Automatic switching based on screen size

## Pagination

- Default page size: 10 items
- Client-side pagination (handled by ListGrid)
- Shows total pages and current page
- Previous/Next controls

## Loading States

- Skeleton table/cards shown while loading
- Handled automatically by ListGrid
- Different skeleton for mobile vs desktop

## Empty State

If no users found:
- Shows "Data kosong" message
- Centered in the table area

## Error Handling

- Delete confirmation dialog
- Mutation errors logged to console
- React Query handles retry logic

## Customization

### Change Page Size
```typescript
<ListGrid
  pageSize={20} // Default is 10
  ...
/>
```

### Disable Pagination
```typescript
<ListGrid
  showPagination={false}
  ...
/>
```

### Add Custom Empty State
```typescript
<ListGrid
  empty={
    <div>
      <p>No users found!</p>
      <Button>Add First User</Button>
    </div>
  }
  ...
/>
```

### Customize Search Placeholder
```typescript
<ListGrid
  searchPlaceholder="Search by name, email, or phone..."
  ...
/>
```

## Integration with React Query

The component leverages React Query for:
- Automatic caching
- Background refetching
- Optimistic updates
- Cache invalidation after mutations

When a user is deleted or status toggled:
1. Mutation executes
2. On success, cache is invalidated
3. User list automatically refetches
4. UI updates with new data

## TypeScript Types

All data is fully typed:
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "operator";
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## Best Practices Used

✅ Component composition (using existing UI components)
✅ Type safety with TypeScript
✅ Responsive design
✅ Loading states
✅ Error handling
✅ Confirmation dialogs for destructive actions
✅ Optimistic UI updates with React Query
✅ Proper state management
✅ Clean code structure
✅ Accessibility (ARIA labels, semantic HTML)

## Example Usage

```typescript
// Just import and use!
import UserManagementList from "@/features/users-management/list";

function App() {
  return <UserManagementList />;
}
```

The component is completely self-contained and manages its own state, data fetching, and mutations.

## Future Enhancements

Potential improvements you could add:
- [ ] Bulk actions (select multiple users)
- [ ] Export to CSV/Excel
- [ ] Advanced filters (multiple roles, date range)
- [ ] User avatars in the list
- [ ] Inline editing
- [ ] Column visibility toggle
- [ ] Save filter preferences
- [ ] Batch delete
- [ ] Activity log per user

## Related Files

- **Service**: `src/features/users-management/services/userService.ts`
- **Hooks**: `src/features/users-management/hooks/useUsers.ts`
- **Types**: `src/features/users-management/services/userService.ts`
- **UI Components**: `src/components/ui/`

## Dependencies

- `@heroui/react` - UI component library
- `lucide-react` - Icons
- `@tanstack/react-query` - Data fetching
- `axios` - HTTP client (via global instance)
