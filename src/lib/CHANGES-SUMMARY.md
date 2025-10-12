# Changes Summary - API Response Mapping

## What Changed

The Axios library and TypeScript interfaces have been updated to match your backend API response structure.

## Your Backend API Response Structure

```json
{
  "success": true,
  "message": "Berhasil mengambil semua user.",
  "data": [],
  "errors": null,
  "statusCode": 200,
  "timestamp": "2025-10-11T15:35:00.9569107+07:00"
}
```

## Updated Files

### 1. `src/lib/axios.ts`
**Changed:**
- `ApiResponse<T>` interface - Added `success`, `errors`, `statusCode`, `timestamp` fields
- `PaginatedResponse<T>` interface - Same additions + optional `pagination` field
- `ApiError` interface - Updated to match backend error structure
- `getErrorMessage()` - Now extracts validation errors from `errors` field

**Before:**
```typescript
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}
```

**After:**
```typescript
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
  statusCode: number;
  timestamp: string;
}
```

### 2. `src/features/users-management/services/userService.ts`
**Changed:**
- All endpoints now use `/User` instead of `/users` (capitalized)
- `getUsers()` now returns `User[]` instead of `PaginatedResponse<User>`
- All methods properly extract data using `response.data.data`

**Before:**
```typescript
getUsers: async (filters?: UserFilters): Promise<PaginatedResponse<User>> => {
  const response = await api.get<PaginatedResponse<User>>("/users", {
    params: filters,
  });
  return response.data;
}
```

**After:**
```typescript
getUsers: async (filters?: UserFilters): Promise<User[]> => {
  const response = await api.get<PaginatedResponse<User>>("/User", {
    params: filters,
  });
  return response.data.data; // Extract the data array
}
```

### 3. `src/features/users-management/components/UserListExample.tsx`
**Changed:**
- Updated to work with `User[]` return type instead of `PaginatedResponse<User>`
- Simplified pagination controls

**Before:**
```typescript
const { data: usersData } = useUsers();
{usersData?.data.map(...)}
{usersData?.pagination && (...)}
```

**After:**
```typescript
const { data: users } = useUsers();
{users?.map(...)}
```

## Key Pattern to Remember

**Always extract data with `response.data.data`:**

```typescript
const response = await api.get<PaginatedResponse<User>>('/User');
//                     ^^^^^^^^^^^^^^^^^^^^^^^^^^
//                     Full axios response wrapper

return response.data.data;
//     ^^^^^^^^^^^^^ ^^^^^
//     |             |
//     |             +-- Actual data (from API response)
//     |
//     +-- API response object (success, message, data, errors, etc.)
```

## How to Use in Your Code

### For GET requests returning a list:
```typescript
getChickens: async (): Promise<Chicken[]> => {
  const response = await api.get<PaginatedResponse<Chicken>>('/Chicken');
  return response.data.data; // Returns Chicken[]
}
```

### For GET requests returning a single item:
```typescript
getChicken: async (id: string): Promise<Chicken> => {
  const response = await api.get<ApiResponse<Chicken>>(`/Chicken/${id}`);
  return response.data.data; // Returns Chicken
}
```

### For POST/PUT requests:
```typescript
createChicken: async (data: CreateChickenDto): Promise<Chicken> => {
  const response = await api.post<ApiResponse<Chicken>>('/Chicken', data);
  return response.data.data; // Returns created Chicken
}
```

### For DELETE requests:
```typescript
deleteChicken: async (id: string): Promise<void> => {
  await api.delete(`/Chicken/${id}`);
  // Usually don't need to return anything
}
```

## Error Handling

The `getErrorMessage()` helper now properly extracts errors:

```typescript
import { getErrorMessage } from '@/lib/axios';

try {
  await chickenService.createChicken(data);
} catch (error) {
  const message = getErrorMessage(error);
  // Extracts from error.response.data.errors or error.response.data.message
  console.error(message);
}
```

**Example error response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": {
    "name": ["Name is required"],
    "age": ["Age must be greater than 0"]
  },
  "statusCode": 400,
  "timestamp": "2025-10-11T15:35:00.9569107+07:00"
}
```

`getErrorMessage()` will return: "Name is required, Age must be greater than 0"

## Migration Checklist

If you have existing services, update them to:

- [ ] Use `PaginatedResponse<T>` for GET all/list endpoints
- [ ] Use `ApiResponse<T>` for GET by ID, POST, PUT, PATCH endpoints
- [ ] Extract data with `response.data.data` (not just `response.data`)
- [ ] Return `T[]` for list methods, not `PaginatedResponse<T>`
- [ ] Return `T` for single item methods, not `ApiResponse<T>`
- [ ] Use `getErrorMessage()` in mutation `onError` callbacks

## Documentation

- **Full API mapping guide:** `src/lib/API-RESPONSE-MAPPING.md`
- **Quick reference:** `src/lib/QUICKSTART.md`
- **Complete documentation:** `src/lib/README.md`

## Questions?

See the working examples:
- Service: `src/features/users-management/services/userService.ts`
- Hooks: `src/features/users-management/hooks/useUsers.ts`
- Component: `src/features/users-management/components/UserListExample.tsx`
