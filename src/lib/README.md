# Global Axios Instance with React Query

This directory contains the global Axios configuration that can be used throughout the application with React Query.

## Files Overview

- `axios.ts` - Global Axios instance with interceptors and types
- `query-hooks.ts` - Reusable React Query hooks (optional alternative approach)
- `index.ts` - Main exports
- `example-service.ts` - Example service implementation (can be deleted)
- `API-RESPONSE-MAPPING.md` - **Important: Explains how to map your backend API responses**
- `QUICKSTART.md` - Quick reference guide
- `README.md` - This file (comprehensive documentation)

## Quick Start

### 1. Basic Usage

```typescript
// In your service file
import api, { ApiResponse } from '@/lib/axios';

export const myService = {
  getData: async () => {
    const response = await api.get<ApiResponse<MyData>>('/endpoint');
    return response.data.data;
  },
};
```

### 2. With React Query

```typescript
// In your hooks file
import { useQuery } from '@tanstack/react-query';
import { myService } from '../services/myService';

export function useMyData() {
  return useQuery({
    queryKey: ['myData'],
    queryFn: myService.getData,
  });
}
```

### 3. In Components

```typescript
import { useMyData } from '../hooks/useMyData';

function MyComponent() {
  const { data, isLoading, error } = useMyData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data}</div>;
}
```

## Features

### Automatic Token Management
The axios instance automatically adds JWT tokens from localStorage to all requests.

```typescript
// Token is automatically added to headers
const response = await api.get('/protected-endpoint');
```

### Automatic 401 Handling
When a 401 response is received, the user is automatically redirected to login.

### Error Handling
Use the `getErrorMessage` helper to extract user-friendly error messages:

```typescript
import { getErrorMessage } from '@/lib/axios';

try {
  await api.post('/endpoint', data);
} catch (error) {
  console.error(getErrorMessage(error));
}
```

### TypeScript Types

Built-in types matching your backend API response structure:

```typescript
// Single item response (GET by ID, POST, PUT, PATCH)
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
  statusCode: number;
  timestamp: string;
}

// List/collection response (GET all)
interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  errors: Record<string, string[]> | null;
  statusCode: number;
  timestamp: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error response
interface ApiError {
  success: boolean;
  message: string;
  errors: Record<string, string[]> | null;
  statusCode: number;
  timestamp: string;
}
```

**Important:** See `API-RESPONSE-MAPPING.md` for detailed explanation of how to use these types.

## Complete Example Pattern

### Step 1: Define Types
```typescript
// src/features/users/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
}
```

### Step 2: Create Service
```typescript
// src/features/users/services/userService.ts
import api, { ApiResponse, PaginatedResponse } from '@/lib/axios';
import { User, CreateUserDto } from '../types';

export const userService = {
  // GET all users - returns array
  getUsers: async (page = 1, limit = 10): Promise<User[]> => {
    const response = await api.get<PaginatedResponse<User>>('/User', {
      params: { page, limit },
    });
    // Extract data array from API response
    return response.data.data;
  },

  // GET single user - returns object
  getUser: async (id: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/User/${id}`);
    // Extract data object from API response
    return response.data.data;
  },

  // POST create user - returns created object
  createUser: async (data: CreateUserDto): Promise<User> => {
    const response = await api.post<ApiResponse<User>>('/User', data);
    // Extract data object from API response
    return response.data.data;
  },

  // PUT update user - returns updated object
  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(`/User/${id}`, data);
    // Extract data object from API response
    return response.data.data;
  },

  // DELETE user - returns nothing
  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/User/${id}`);
  },
};
```

**Key Pattern:** Always extract data with `response.data.data`
- First `.data` is the axios response body
- Second `.data` is your actual data from the API response structure

### Step 3: Create React Query Hooks
```typescript
// src/features/users/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { getErrorMessage } from '@/lib/axios';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (page: number, limit: number) => [...userKeys.lists(), page, limit] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

export function useUsers(page = 1, limit = 10) {
  return useQuery({
    queryKey: userKeys.list(page, limit),
    queryFn: () => userService.getUsers(page, limit),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getUser(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
    onError: (error) => {
      console.error(getErrorMessage(error));
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      userService.updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
}
```

### Step 4: Use in Component
```typescript
// src/features/users/components/UserList.tsx
import { useUsers, useCreateUser, useDeleteUser } from '../hooks/useUsers';

export function UserList() {
  const { data: usersData, isLoading } = useUsers(1, 10);
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();

  const handleCreate = () => {
    createUser.mutate({
      name: 'John Doe',
      email: 'john@example.com',
    });
  };

  const handleDelete = (id: string) => {
    deleteUser.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleCreate}>Create User</button>
      {usersData?.data.map(user => (
        <div key={user.id}>
          {user.name}
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## Configuration

### Environment Variables
Set your API base URL in `.env`:
```
VITE_BASE_API_URL=http://localhost:3000/api
```

### Customizing Axios Instance
Edit `src/lib/axios.ts` to customize:
- Timeout duration
- Default headers
- Request/response interceptors
- Error handling behavior

### Token Management
By default, tokens are stored in localStorage with key `authToken`. To change this:

```typescript
// In axios.ts, update the request interceptor
const token = localStorage.getItem('yourCustomTokenKey');
```

## Best Practices

1. **Query Keys**: Use a consistent pattern for query keys
   ```typescript
   const keys = {
     all: ['resource'] as const,
     lists: () => [...keys.all, 'list'] as const,
     list: (filters) => [...keys.lists(), filters] as const,
     details: () => [...keys.all, 'detail'] as const,
     detail: (id) => [...keys.details(), id] as const,
   };
   ```

2. **Service Layer**: Keep all API calls in service files, not in hooks or components

3. **Error Handling**: Always use `getErrorMessage` for consistent error messages

4. **Type Safety**: Always type your API responses using generics

5. **Cache Invalidation**: Invalidate related queries after mutations

6. **Loading States**: Use React Query's built-in loading states (`isLoading`, `isPending`)

## Testing

```typescript
// Mock the axios instance in tests
import api from '@/lib/axios';
import { vi } from 'vitest';

vi.mock('@/lib/axios');

// In your test
(api.get as jest.Mock).mockResolvedValue({ data: mockData });
```

## Real Examples

Check these files for complete working examples:
- `src/features/users-management/services/userService.ts` - Service implementation
- `src/features/users-management/hooks/useUsers.ts` - React Query hooks
- `src/features/users-management/components/UserListExample.tsx` - Component usage
