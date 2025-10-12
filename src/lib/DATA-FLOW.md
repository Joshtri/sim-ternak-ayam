# Data Flow Diagram

## Complete Request/Response Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         COMPONENT                                │
│  const { data: users } = useUsers();                            │
│  {users?.map(user => <div>{user.name}</div>)}                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ calls
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REACT QUERY HOOK                            │
│  export function useUsers() {                                   │
│    return useQuery({                                            │
│      queryKey: ['users'],                                       │
│      queryFn: userService.getUsers  ◄─── calls service         │
│    });                                                          │
│  }                                                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ executes
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                         SERVICE                                  │
│  getUsers: async (): Promise<User[]> => {                       │
│    const response = await api.get<PaginatedResponse<User>>(     │
│      '/User'                                                    │
│    );                                                           │
│    return response.data.data; ◄──── extracts actual data       │
│  }                                                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP GET request
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AXIOS INSTANCE                              │
│  - Adds Authorization header (Bearer token)                     │
│  - Adds Content-Type: application/json                          │
│  - Sets timeout: 30s                                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND API SERVER                            │
│  https://localhost:7195/api/User                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ returns JSON
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API RESPONSE                                │
│  {                                                              │
│    "success": true,                                             │
│    "message": "Berhasil mengambil semua user.",                 │
│    "data": [                            ◄─── This is what we    │
│      { "id": "1", "name": "User 1" },        want to extract   │
│      { "id": "2", "name": "User 2" }                            │
│    ],                                                           │
│    "errors": null,                                              │
│    "statusCode": 200,                                           │
│    "timestamp": "2025-10-11T15:35:00.9569107+07:00"            │
│  }                                                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ response interceptor
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   AXIOS INTERCEPTOR                              │
│  - Checks for 401 → redirect to login                           │
│  - Checks for other errors → log them                           │
│  - Returns response if successful                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ returns to service
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                         SERVICE                                  │
│  response.data = {                                              │
│    success: true,                                               │
│    message: "...",                                              │
│    data: [...],  ◄────── Extract this with response.data.data  │
│    errors: null,                                                │
│    statusCode: 200,                                             │
│    timestamp: "..."                                             │
│  }                                                              │
│                                                                 │
│  return response.data.data; // Returns just the array          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ returns User[]
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REACT QUERY                                 │
│  - Caches the result                                            │
│  - Manages loading state                                        │
│  - Manages error state                                          │
│  - Returns data to component                                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ returns User[]
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                         COMPONENT                                │
│  data = [                                                       │
│    { "id": "1", "name": "User 1" },                             │
│    { "id": "2", "name": "User 2" }                              │
│  ]                                                              │
│                                                                 │
│  {data.map(user => <div>{user.name}</div>)}                     │
└─────────────────────────────────────────────────────────────────┘
```

## Response Data Extraction

### Visual breakdown of `response.data.data`:

```typescript
const response = await api.get('/User');

// response is the full axios response:
{
  status: 200,
  statusText: "OK",
  headers: {...},
  config: {...},
  data: {                           ◄─── response.data
    success: true,
    message: "Success",
    data: [...],                    ◄─── response.data.data (what we want!)
    errors: null,
    statusCode: 200,
    timestamp: "2025-10-11..."
  }
}

// So we need TWO .data accessors:
return response.data.data;
//     ^^^^^^^^^^^^^ ^^^^^
//     |             |
//     |             +-- Actual array/object from API
//     |
//     +-- API response wrapper object
```

## Error Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         COMPONENT                                │
│  const mutation = useCreateUser();                              │
│  mutation.mutate(userData);                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REACT QUERY HOOK                            │
│  useMutation({                                                  │
│    mutationFn: userService.createUser,                          │
│    onError: (error) => {                                        │
│      console.error(getErrorMessage(error));                     │
│    }                                                            │
│  })                                                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND RETURNS ERROR                         │
│  {                                                              │
│    "success": false,                                            │
│    "message": "Validation failed",                              │
│    "data": null,                                                │
│    "errors": {                      ◄─── Validation errors      │
│      "email": ["Email is required"],                            │
│      "name": ["Name is required"]                               │
│    },                                                           │
│    "statusCode": 400,                                           │
│    "timestamp": "2025-10-11..."                                 │
│  }                                                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   AXIOS INTERCEPTOR                              │
│  - Logs error based on status code                              │
│  - Returns rejected promise                                     │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    getErrorMessage()                             │
│  - Checks for error.response.data.errors                        │
│  - Extracts all validation error messages                       │
│  - Joins them: "Email is required, Name is required"            │
│  - Falls back to error.response.data.message                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      COMPONENT                                   │
│  Shows error message to user via toast/alert                    │
│  "Email is required, Name is required"                          │
└─────────────────────────────────────────────────────────────────┘
```

## Type Flow

```typescript
// 1. Define the data model
interface User {
  id: string;
  name: string;
  email: string;
}

// 2. Type the API response
PaginatedResponse<User> = {
  success: boolean;
  message: string;
  data: User[];           ◄─── Array of User objects
  errors: null;
  statusCode: number;
  timestamp: string;
}

// 3. Service extracts and returns the typed data
getUsers(): Promise<User[]>  ◄─── Returns User[], not PaginatedResponse<User>

// 4. React Query hook uses the service return type
useQuery<User[]>({
  queryFn: userService.getUsers  ◄─── Infers User[] from service
})

// 5. Component receives typed data
const { data: users } = useUsers();
//            ^^^^^
//            Type: User[] | undefined

// 6. Use with full type safety
users?.map(user => (
  //       ^^^^ Type: User
  <div>{user.name}</div>
  //         ^^^^ TypeScript knows this exists
));
```

## Mutation Flow (POST/PUT/DELETE)

```
Component                Hook                Service              API
   |                      |                     |                  |
   |--mutate(userData)--->|                     |                  |
   |                      |--createUser()------>|                  |
   |                      |                     |--POST /User----->|
   |                      |                     |                  |
   |                      |                     |<--201 Created----|
   |                      |                     |  {success,       |
   |                      |                     |   message,       |
   |                      |                     |   data: {...},   |
   |                      |                     |   ...}           |
   |                      |                     |                  |
   |                      |<--return user-------|                  |
   |                      |  (extracted data)   |                  |
   |                      |                     |                  |
   |<--onSuccess(user)----|                     |                  |
   |  invalidate queries  |                     |                  |
   |  show success msg    |                     |                  |
   |                      |                     |                  |
```

## Summary

1. **Component** calls **React Query Hook**
2. **Hook** executes **Service** function
3. **Service** calls **Axios Instance** (global api)
4. **Axios** adds auth token and makes HTTP request to **Backend**
5. **Backend** returns JSON with structure: `{success, message, data, errors, statusCode, timestamp}`
6. **Axios interceptor** handles errors (401 → redirect)
7. **Service** extracts actual data with `response.data.data`
8. **React Query** caches and returns data to **Component**
9. **Component** renders data with full TypeScript support

**Key Concept:** The service layer handles the extraction of `data` from the API response wrapper, so components only work with clean, typed data.
