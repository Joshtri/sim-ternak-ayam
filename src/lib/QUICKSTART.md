# Quick Start Guide - Axios + React Query

## Installation (Already Done)
- `axios` - HTTP client
- `@tanstack/react-query` - Data fetching and caching

## 3-Step Pattern

### 1️⃣ Create Service (API calls)
```typescript
// src/features/chickens/services/chickenService.ts
import api, { ApiResponse, PaginatedResponse } from '@/lib/axios';

// API Response structure from backend:
// {
//   "success": true,
//   "message": "Success message",
//   "data": [...],
//   "errors": null,
//   "statusCode": 200,
//   "timestamp": "2025-10-11T15:35:00.9569107+07:00"
// }

export const chickenService = {
  getChickens: async () => {
    const response = await api.get<PaginatedResponse<Chicken>>('/chickens');
    // Return just the data array
    return response.data.data;
  },

  createChicken: async (chicken: CreateChickenDto) => {
    const response = await api.post<ApiResponse<Chicken>>('/chickens', chicken);
    // Return just the data object
    return response.data.data;
  },
};
```

### 2️⃣ Create Hooks (React Query)
```typescript
// src/features/chickens/hooks/useChickens.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chickenService } from '../services/chickenService';

export function useChickens() {
  return useQuery({
    queryKey: ['chickens'],
    queryFn: chickenService.getChickens,
  });
}

export function useCreateChicken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chickenService.createChicken,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chickens'] });
    },
  });
}
```

### 3️⃣ Use in Component
```typescript
// src/features/chickens/components/ChickenList.tsx
import { useChickens, useCreateChicken } from '../hooks/useChickens';

export function ChickenList() {
  const { data: chickens, isLoading } = useChickens();
  const createChicken = useCreateChicken();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {chickens?.map(chicken => (
        <div key={chicken.id}>{chicken.name}</div>
      ))}
      <button onClick={() => createChicken.mutate({ name: 'New Chicken' })}>
        Add Chicken
      </button>
    </div>
  );
}
```

## Common Patterns

### GET with Parameters
```typescript
// Service
getChickens: async (filters: ChickenFilters) => {
  const response = await api.get<PaginatedResponse<Chicken>>('/chickens', {
    params: filters
  });
  return response.data.data; // Extract data array from API response
}

// Hook
export function useChickens(filters: ChickenFilters) {
  return useQuery({
    queryKey: ['chickens', filters],
    queryFn: () => chickenService.getChickens(filters),
  });
}

// Component
const { data } = useChickens({ status: 'active', page: 1 });
```

### POST/PUT/DELETE
```typescript
// Service
updateChicken: async (id: string, data: UpdateChickenDto) => {
  const response = await api.put(`/chickens/${id}`, data);
  return response.data.data;
}

// Hook
export function useUpdateChicken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateChickenDto }) =>
      chickenService.updateChicken(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chickens'] });
    },
  });
}

// Component
const updateChicken = useUpdateChicken();
updateChicken.mutate({ id: '123', data: { name: 'Updated Name' } });
```

### Conditional Fetching
```typescript
const { data } = useQuery({
  queryKey: ['chicken', id],
  queryFn: () => chickenService.getChicken(id),
  enabled: !!id, // Only fetch when id exists
});
```

### Pagination
```typescript
// Service
getChickens: async (page = 1, limit = 10) => {
  const response = await api.get<PaginatedResponse<Chicken>>('/chickens', {
    params: { page, limit },
  });
  // Return just the data array
  return response.data.data;
}

// Hook
export function useChickens(page: number) {
  return useQuery({
    queryKey: ['chickens', 'list', page],
    queryFn: () => chickenService.getChickens(page, 10),
  });
}

// Component
const [page, setPage] = useState(1);
const { data } = useChickens(page);
```

## Error Handling
```typescript
import { getErrorMessage } from '@/lib/axios';

const createChicken = useMutation({
  mutationFn: chickenService.createChicken,
  onError: (error) => {
    const message = getErrorMessage(error);
    alert(message); // or use your toast/notification system
  },
});
```

## Loading States
```typescript
const { data, isLoading, isFetching, error } = useQuery(...);
const mutation = useMutation(...);

// isLoading - first time loading
// isFetching - loading (including background refetch)
// mutation.isPending - mutation in progress
// mutation.isSuccess - mutation succeeded
// mutation.isError - mutation failed
```

## Cache Invalidation
```typescript
const queryClient = useQueryClient();

// Invalidate all chickens queries
queryClient.invalidateQueries({ queryKey: ['chickens'] });

// Invalidate specific chicken
queryClient.invalidateQueries({ queryKey: ['chickens', id] });

// Invalidate multiple
queryClient.invalidateQueries({ queryKey: ['chickens'] });
queryClient.invalidateQueries({ queryKey: ['farms'] });
```

## Available Types
```typescript
import {
  ApiResponse,        // { data: T, message?: string, status: 'success' | 'error' }
  PaginatedResponse,  // { data: T[], pagination: {...} }
  ApiError,          // { message: string, errors?: {...}, status?: number }
  getErrorMessage,   // (error: unknown) => string
} from '@/lib/axios';
```

## Examples in Codebase
- Full service: `src/features/users-management/services/userService.ts`
- Full hooks: `src/features/users-management/hooks/useUsers.ts`
- Full component: `src/features/users-management/components/UserListExample.tsx`

## Tips
1. ✅ Always type your API responses with generics
2. ✅ Keep API calls in service files, not components
3. ✅ Use React Query hooks for data fetching
4. ✅ Invalidate queries after mutations
5. ✅ Use `enabled` option for conditional queries
6. ✅ Use proper query keys structure for better caching
7. ❌ Don't call `api.get()` directly in components
8. ❌ Don't forget to invalidate related queries after mutations
