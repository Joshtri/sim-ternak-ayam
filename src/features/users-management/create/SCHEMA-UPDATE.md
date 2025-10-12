# User Create Form - C# DTO Schema Update

## Updated Files

All files have been updated to match the C# backend DTO schema.

## C# CreateUserDto Schema

```json
{
  "username": "string",
  "password": "string",
  "confirmPassword": "string",
  "fullName": "string",
  "email": "user@example.com",
  "noWA": "0901916421",
  "role": 0
}
```

## Role Enum Values

```typescript
enum UserRole {
  PETUGAS = 0,    // Petugas lapangan
  OPERATOR = 1,   // Operator sistem
  PEMILIK = 2,    // Pemilik usaha
}
```

## Updated Files Summary

### 1. `services/userService.ts`
**Updated:** `CreateUserDto` interface

```typescript
export interface CreateUserDto {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  noWA: string;
  role: number; // 0 = Petugas, 1 = Operator, 2 = Pemilik
}
```

### 2. `enums/index.ts`
**Updated:** Role enum to use numeric values

```typescript
export enum UserRole {
  PETUGAS = 0,
  OPERATOR = 1,
  PEMILIK = 2,
}

// Added helper functions
- getRoleLabel(role)
- getRoleOptions()
```

### 3. `types.ts`
**Updated:** `UserFormData` interface

```typescript
export interface UserFormData {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  noWA: string;
  role: number;
}
```

### 4. `create/validations/index.ts`
**Updated:** Validation rules

**Added:**
- `validateFullName` - Full name validation
- `validateNoWA` - WhatsApp number validation
- `validateConfirmPassword` - Confirm password validation
- `createValidatePasswordMatch` - Dynamic password match validator

**Removed:**
- `validateFirstName`
- `validateLastName`
- `validatePhone`
- `validateStatus`

### 5. `create/fields.ts`
**Completely rewritten** to match new schema

**Form Fields:**

**Section 1: Informasi Pribadi**
1. `fullName` - Text input (2 columns)
2. `email` - Email input (1 column)
3. `noWA` - Tel input (1 column)

**Section 2: Informasi Akun**
1. `username` - Text input (2 columns)
2. `password` - Password input (1 column)
3. `confirmPassword` - Password input (1 column)
4. `role` - Select dropdown (2 columns)

**Removed:**
- firstName, lastName fields (combined into fullName)
- phone field (replaced with noWA)
- status field
- emailNotifications, twoFactorAuth switches

### 6. `create/helpers.ts`
**Updated:** Helper functions

**Key Changes:**
```typescript
// Default values
getDefaultUserFormValues(): Partial<UserFormData> => ({
  username: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  email: "",
  noWA: "",
  role: UserRole.PETUGAS,
})

// Transform for API
transformUserFormData(data: UserFormData): CreateUserDto => ({
  username: data.username.trim(),
  password: data.password,
  confirmPassword: data.confirmPassword,
  fullName: data.fullName.trim(),
  email: data.email.trim().toLowerCase(),
  noWA: data.noWA.trim(),
  role: data.role,
})
```

**New Helper Functions:**
- `doPasswordsMatch` - Check if passwords match
- `formatWhatsAppNumber` - Format noWA for display
- `isValidWhatsAppNumber` - Validate noWA format
- `suggestUsername` - Generate username from fullName

### 7. `create/index.tsx`
**Updated:** Component integration

**Added:**
- `useCreateUser` hook from React Query
- `useNavigate` hook from TanStack Router
- API integration in `handleFormSubmit`
- Error display UI
- Loading state handling

## Form Layout

### Desktop View
```
┌─────────────────────────────────────────┐
│ Informasi Pribadi                       │
│ ┌───────────────────────────────────┐   │
│ │ Nama Lengkap (full width)         │   │
│ ├──────────────────┬────────────────┤   │
│ │ Email            │ No. WhatsApp   │   │
│ └──────────────────┴────────────────┘   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Informasi Akun                          │
│ ┌───────────────────────────────────┐   │
│ │ Username (full width)             │   │
│ ├──────────────────┬────────────────┤   │
│ │ Password         │ Confirm Pass   │   │
│ ├───────────────────────────────────┤   │
│ │ Role Pengguna (full width)        │   │
│ └───────────────────────────────────┘   │
└─────────────────────────────────────────┘

          [Kembali] [Reset] [Simpan User]
```

## Validation Rules

### Username
- Required
- Min: 3 characters
- Max: 20 characters
- Pattern: Letters, numbers, underscore only
- Example: `john_doe123`

### Password
- Required
- Min: 8 characters
- Must contain: uppercase, lowercase, number
- Example: `MyPass123`

### Confirm Password
- Required
- Must match password field

### Full Name
- Required
- Min: 3 characters
- Max: 100 characters
- Pattern: Letters and spaces only
- Example: `John Doe Smith`

### Email
- Required
- Must be valid email format
- Example: `user@example.com`

### No. WhatsApp (noWA)
- Required
- Pattern: `0` or `62` prefix + 9-12 digits
- Examples: `081234567890`, `628123456789`

### Role
- Required
- Options:
  - Petugas (0)
  - Operator (1)
  - Pemilik (2)

## API Integration

### Endpoint
```
POST /User
```

### Request Body
```json
{
  "username": "johndoe",
  "password": "MyPass123",
  "confirmPassword": "MyPass123",
  "fullName": "John Doe",
  "email": "john@example.com",
  "noWA": "081234567890",
  "role": 0
}
```

### Success Response
```json
{
  "success": true,
  "message": "User berhasil dibuat",
  "data": {
    "id": "123",
    "username": "johndoe",
    "fullName": "John Doe",
    "email": "john@example.com",
    "noWA": "081234567890",
    "role": 0,
    "isActive": true,
    "createdAt": "2025-10-11T...",
    "updatedAt": "2025-10-11T..."
  },
  "errors": null,
  "statusCode": 201,
  "timestamp": "2025-10-11T..."
}
```

### Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "errors": {
    "username": ["Username sudah digunakan"],
    "email": ["Email sudah terdaftar"]
  },
  "statusCode": 400,
  "timestamp": "2025-10-11T..."
}
```

## Usage in Component

```typescript
import { UserCreateForm } from "@/features/users-management/create";

function CreateUserPage() {
  return (
    <div className="container">
      <h1>Tambah User Baru</h1>
      <UserCreateForm />
    </div>
  );
}
```

## Flow Diagram

```
User fills form
      │
      ▼
Form validation (React Hook Form)
      │
      ▼
Submit button clicked
      │
      ▼
transformUserFormData()
      │
      ▼
useCreateUser.mutate()
      │
      ▼
POST /User with CreateUserDto
      │
      ├─── Success
      │    ├─ Show success message
      │    ├─ Invalidate users cache
      │    └─ Navigate to /users-management
      │
      └─── Error
           ├─ Show error message
           └─ Keep form data (allow retry)
```

## Migration Checklist

If migrating from old schema:

- [x] Update CreateUserDto interface
- [x] Update UserRole enum to numeric
- [x] Update UserFormData interface
- [x] Add validateFullName validation
- [x] Add validateNoWA validation
- [x] Add validateConfirmPassword validation
- [x] Remove firstName/lastName fields
- [x] Remove phone field
- [x] Remove status field
- [x] Remove preference fields
- [x] Update form fields.ts
- [x] Update helpers.ts
- [x] Update create/index.tsx
- [x] Test form submission
- [x] Test validation rules
- [x] Test API integration

## Testing

### Manual Test Cases

1. **Valid Submission**
   - Fill all required fields
   - Ensure passwords match
   - Select a role
   - Click "Simpan User"
   - Should create user and navigate to list

2. **Validation Errors**
   - Leave fields empty → Show required errors
   - Enter short username → Show min length error
   - Enter weak password → Show pattern error
   - Mismatched passwords → Show match error
   - Invalid email → Show format error
   - Invalid noWA → Show format error

3. **API Errors**
   - Duplicate username → Show error message
   - Duplicate email → Show error message
   - Server error → Show generic error

## Notes

- All fields are required except noted
- Password strength is validated on client
- Username uniqueness is validated on server
- Email uniqueness is validated on server
- noWA format accepts both `0` and `62` prefix
- Role is numeric (0, 1, 2) not string
- confirmPassword is sent to backend for server-side validation
- Form auto-navigates to list on success
- React Query handles caching and invalidation
