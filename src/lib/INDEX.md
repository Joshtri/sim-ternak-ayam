# Axios + React Query Library - Documentation Index

Welcome! This directory contains a fully configured Axios instance for use with React Query, tailored to your backend API response structure.

## 📚 Documentation Files

### 🚀 Quick Start (Start Here!)
**[QUICKSTART.md](./QUICKSTART.md)**
- 3-step pattern overview
- Copy-paste examples
- Common patterns
- Best for: Getting started quickly

### 📖 Complete Guide
**[README.md](./README.md)**
- Comprehensive documentation
- Feature overview
- Complete examples
- Configuration options
- Best practices
- Best for: Understanding everything in detail

### 🔄 API Response Mapping (Important!)
**[API-RESPONSE-MAPPING.md](./API-RESPONSE-MAPPING.md)**
- Your backend API response structure
- TypeScript interface explanations
- Data extraction patterns
- Common mistakes to avoid
- Best for: Understanding `response.data.data`

### 📊 Visual Guide
**[DATA-FLOW.md](./DATA-FLOW.md)**
- Request/response flow diagrams
- Data extraction visualization
- Error flow
- Type flow
- Mutation flow
- Best for: Visual learners

### 📝 What Changed
**[CHANGES-SUMMARY.md](./CHANGES-SUMMARY.md)**
- Summary of adjustments made
- Before/after comparisons
- Migration checklist
- Best for: Understanding updates

## 💻 Code Files

### Core Library
- **`axios.ts`** - Global Axios instance with interceptors
- **`index.ts`** - Clean exports
- **`query-hooks.ts`** - Optional reusable React Query wrappers

### Examples
- **`example-service.ts`** - Service layer examples (can be deleted)

## 🎯 Working Examples

Complete, production-ready examples in the codebase:

1. **Service Layer**
   - `src/features/users-management/services/userService.ts`
   - Shows all CRUD operations
   - Proper TypeScript typing
   - Data extraction

2. **React Query Hooks**
   - `src/features/users-management/hooks/useUsers.ts`
   - Query and mutation hooks
   - Cache invalidation
   - Error handling

3. **Component Usage**
   - `src/features/users-management/components/UserListExample.tsx`
   - Complete working component
   - Shows loading states, mutations, and data display

## 🎓 Learning Path

### For Beginners
1. Start with **QUICKSTART.md** - Copy the 3-step pattern
2. Read **API-RESPONSE-MAPPING.md** - Understand `response.data.data`
3. Look at **userService.ts** - See real examples
4. Try creating your first service

### For Intermediate Users
1. Review **README.md** - Full feature set
2. Study **DATA-FLOW.md** - Understand the complete flow
3. Check **useUsers.ts** - Advanced React Query patterns
4. Implement complex features

### For Advanced Users
1. Review **CHANGES-SUMMARY.md** - Migration guide
2. Customize **axios.ts** - Add interceptors, headers
3. Study **UserListExample.tsx** - Complete patterns
4. Build reusable abstractions

## 🔑 Key Concepts

### The Two `.data` Pattern
```typescript
const response = await api.get('/User');
return response.data.data;
//     ^^^^^^^^^^^^^ ^^^^^
//     Axios wrapper  Your actual data
```

### Type Everything
```typescript
// ✅ Good
const response = await api.get<PaginatedResponse<User>>('/User');

// ❌ Bad
const response = await api.get('/User');
```

### Extract in Service, Not Components
```typescript
// ✅ Good - Service returns clean data
getUsers: async (): Promise<User[]> => {
  const response = await api.get<PaginatedResponse<User>>('/User');
  return response.data.data; // Component gets User[]
}

// ❌ Bad - Component has to extract data
getUsers: async (): Promise<PaginatedResponse<User>> => {
  const response = await api.get<PaginatedResponse<User>>('/User');
  return response.data; // Component gets full API response
}
```

## 📋 Quick Reference

### API Response Structure
```json
{
  "success": true,
  "message": "Success message",
  "data": [...],
  "errors": null,
  "statusCode": 200,
  "timestamp": "2025-10-11T15:35:00.9569107+07:00"
}
```

### TypeScript Types
- `ApiResponse<T>` - Single item (GET by ID, POST, PUT, PATCH)
- `PaginatedResponse<T>` - List/collection (GET all)
- `ApiError` - Error responses

### Service Pattern
```typescript
import api, { ApiResponse, PaginatedResponse } from '@/lib/axios';

export const myService = {
  getAll: async (): Promise<Item[]> => {
    const res = await api.get<PaginatedResponse<Item>>('/items');
    return res.data.data;
  },

  getOne: async (id: string): Promise<Item> => {
    const res = await api.get<ApiResponse<Item>>(`/items/${id}`);
    return res.data.data;
  },

  create: async (data: CreateDto): Promise<Item> => {
    const res = await api.post<ApiResponse<Item>>('/items', data);
    return res.data.data;
  },
};
```

### Hook Pattern
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: myService.getAll,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: myService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}
```

## 🛠️ Configuration

### Environment Variables
`.env`
```
VITE_BASE_API_URL=https://localhost:7195/api
```

### Auth Token
Stored in `localStorage` with key: `authToken`

Change in `axios.ts` if needed:
```typescript
const token = localStorage.getItem('yourCustomKey');
```

## ❓ Troubleshooting

### Problem: TypeScript errors on `response.data.data`
**Solution:** Make sure you're typing the response correctly
```typescript
// ✅ Correct
const response = await api.get<PaginatedResponse<User>>('/User');

// ❌ Wrong
const response = await api.get<User[]>('/User');
```

### Problem: Getting undefined when accessing data
**Solution:** Use optional chaining or check React Query status
```typescript
const { data: users, isLoading } = useUsers();
if (isLoading) return <div>Loading...</div>;
return <div>{users?.map(...)}</div>;
```

### Problem: 401 errors but token exists
**Solution:** Check if token is in localStorage with correct key
```typescript
console.log(localStorage.getItem('authToken')); // Should not be null
```

## 📞 Need Help?

1. Check the documentation files above
2. Look at working examples in `src/features/users-management/`
3. Review your backend API response structure matches the interfaces
4. Verify environment variables are set correctly

## ✅ Checklist for New Services

When creating a new service:
- [ ] Import `api`, `ApiResponse`, `PaginatedResponse` from `@/lib/axios`
- [ ] Type all responses with generics
- [ ] Extract data with `response.data.data`
- [ ] Return clean types (`T` or `T[]`), not wrapped responses
- [ ] Create corresponding React Query hooks
- [ ] Handle errors with `getErrorMessage()`
- [ ] Invalidate queries after mutations

## 🎉 You're Ready!

Start with **QUICKSTART.md** and build your first service. The examples in `src/features/users-management/` are production-ready patterns you can copy.

Happy coding!
