# API Response Structure Mapping

## Your Backend API Response Format

Your backend returns responses in this structure:

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

## TypeScript Interfaces

### ApiResponse<T>
Used for single item responses (GET by ID, POST, PUT, PATCH)

```typescript
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;                                  // The actual data (single item)
  errors: Record<string, string[]> | null;  // Validation errors
  statusCode: number;
  timestamp: string;
}
```

**Example:**
```typescript
// GET /User/123
{
  "success": true,
  "message": "User found",
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "errors": null,
  "statusCode": 200,
  "timestamp": "2025-10-11T15:35:00.9569107+07:00"
}
```

### PaginatedResponse<T>
Used for list/collection responses (GET all)

```typescript
export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];                                // Array of items
  errors: Record<string, string[]> | null;
  statusCode: number;
  timestamp: string;
  pagination?: {                            // Optional pagination metadata
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

**Example:**
```typescript
// GET /User
{
  "success": true,
  "message": "Berhasil mengambil semua user.",
  "data": [
    { "id": "1", "name": "User 1", "email": "user1@example.com" },
    { "id": "2", "name": "User 2", "email": "user2@example.com" }
  ],
  "errors": null,
  "statusCode": 200,
  "timestamp": "2025-10-11T15:35:00.9569107+07:00",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1
  }
}
```

### ApiError
Used for error responses

```typescript
export interface ApiError {
  success: boolean;          // Will be false
  message: string;           // Error message
  errors: Record<string, string[]> | null;  // Field validation errors
  statusCode: number;        // HTTP status code (400, 404, 500, etc.)
  timestamp: string;
}
```

**Example:**
```typescript
// POST /User with invalid data
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": {
    "email": ["Email is required", "Email must be valid"],
    "name": ["Name is required"]
  },
  "statusCode": 400,
  "timestamp": "2025-10-11T15:35:00.9569107+07:00"
}
```

## How to Use in Services

### Pattern 1: Single Item (GET by ID, POST, PUT, PATCH)

```typescript
import api, { ApiResponse } from '@/lib/axios';

// GET single user
getUser: async (id: string): Promise<User> => {
  const response = await api.get<ApiResponse<User>>(`/User/${id}`);
  //    ^^^^^^^                ^^^^^^^^^^^^^^^          ^^^^^^^^^^^^
  //    Full axios response    TypeScript type          API endpoint

  return response.data.data;
  //     ^^^^^^^^^^^^^ ^^^^^
  //     response.data is the API response object
  //                   .data is the actual user data
}

// POST create user
createUser: async (userData: CreateUserDto): Promise<User> => {
  const response = await api.post<ApiResponse<User>>('/User', userData);
  return response.data.data;
}

// PUT update user
updateUser: async (id: string, userData: UpdateUserDto): Promise<User> => {
  const response = await api.put<ApiResponse<User>>(`/User/${id}`, userData);
  return response.data.data;
}
```

### Pattern 2: List/Collection (GET all)

```typescript
import api, { PaginatedResponse } from '@/lib/axios';

// GET all users
getUsers: async (filters?: UserFilters): Promise<User[]> => {
  const response = await api.get<PaginatedResponse<User>>('/User', {
    params: filters
  });
  //    ^^^^^^^^^^^^^^^            ^^^^^^^^^^^^^^^^^^^^^^
  //    Full axios response        TypeScript type

  return response.data.data;
  //     ^^^^^^^^^^^^^ ^^^^^
  //     response.data is the API response object
  //                   .data is the array of users
}
```

### Pattern 3: DELETE

```typescript
// DELETE user
deleteUser: async (id: string): Promise<void> => {
  await api.delete(`/User/${id}`);
  // Usually don't need to return anything for delete
}
```

## Accessing Response Metadata

If you need to access the full response (message, statusCode, etc.):

```typescript
// Return the full response
getUsers: async (): Promise<PaginatedResponse<User>> => {
  const response = await api.get<PaginatedResponse<User>>('/User');
  return response.data; // Return the full API response
}

// In your component/hook
const { data } = useUsers();
console.log(data.message);    // "Berhasil mengambil semua user."
console.log(data.data);       // Array of users
console.log(data.statusCode); // 200
console.log(data.pagination); // Pagination metadata if available
```

## Error Handling

The `getErrorMessage` helper automatically extracts error messages:

```typescript
import { getErrorMessage } from '@/lib/axios';

try {
  await userService.createUser(userData);
} catch (error) {
  const message = getErrorMessage(error);
  // If validation errors exist, combines all error messages
  // Otherwise returns the main error message
  console.error(message);
}
```

**Error extraction logic:**
1. Checks if `errors` object exists and extracts all field errors
2. Falls back to `message` field
3. Falls back to generic error message

## Quick Reference

| Scenario | Response Type | Return Value | Example |
|----------|---------------|--------------|---------|
| GET by ID | `ApiResponse<T>` | `response.data.data` | Single user object |
| GET all | `PaginatedResponse<T>` | `response.data.data` | Array of users |
| POST | `ApiResponse<T>` | `response.data.data` | Created user object |
| PUT | `ApiResponse<T>` | `response.data.data` | Updated user object |
| PATCH | `ApiResponse<T>` | `response.data.data` | Updated user object |
| DELETE | Any | `void` or `response.data` | No return needed |

## Common Mistakes to Avoid

❌ **Wrong - Accessing data directly:**
```typescript
const response = await api.get('/User');
return response.data; // This returns the whole API response, not the data array
```

✅ **Correct - Extracting the data:**
```typescript
const response = await api.get<PaginatedResponse<User>>('/User');
return response.data.data; // This returns just the data array
```

❌ **Wrong - Wrong type:**
```typescript
const response = await api.get<User[]>('/User'); // Wrong type
```

✅ **Correct - Using PaginatedResponse:**
```typescript
const response = await api.get<PaginatedResponse<User>>('/User');
```

❌ **Wrong - Not typing the response:**
```typescript
const response = await api.get('/User'); // No TypeScript support
```

✅ **Correct - Full typing:**
```typescript
const response = await api.get<PaginatedResponse<User>>('/User');
```

## Summary

1. **Always use `ApiResponse<T>` for single items**
2. **Always use `PaginatedResponse<T>` for arrays/lists**
3. **Always extract data with `response.data.data`** (yes, two `.data` accessors)
4. **Use `getErrorMessage(error)` for error handling**
5. **Type your API calls with generics** for full TypeScript support

The pattern is consistent:
```
axios call → response.data (API response) → response.data.data (actual data)
```
