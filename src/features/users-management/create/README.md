# User Management Feature

Complete example of using FormFieldRenderer with separated concerns and React Hook Form validation.

## 📁 File Structure

```
user-management/
├── types.ts                     # TypeScript type definitions
├── validations.ts              # RHF validation rules (separated)
├── fields.ts                   # Form field configurations
├── helpers.ts                  # Business logic & utility functions
├── UserCreateForm.example.tsx  # Complete form example
└── README.md                   # This file
```

## 🎯 Separation of Concerns

### 1. **types.ts** - Type Definitions
```typescript
export interface UserFormData {
  firstName: string;
  lastName: string;
  // ... all form fields
}
```

**Purpose:** Define all TypeScript interfaces and types

---

### 2. **validations.ts** - Validation Rules
```typescript
export const validateFirstName = {
  required: "Nama depan wajib diisi",
  minLength: {
    value: 2,
    message: "Nama depan minimal 2 karakter",
  },
  // ... more rules
};
```

**Purpose:** All React Hook Form validation rules separated from components
- Each field has its own validation function
- Easy to test in isolation
- Reusable across different forms

---

### 3. **fields.ts** - Field Configurations
```typescript
export const userFormSchema: FormSchema = {
  sections: [
    {
      title: "Informasi Dasar",
      columns: 2,
      fields: [
        {
          type: "text",
          name: "firstName",
          label: "Nama Depan",
          validation: validateFirstName, // ← from validations.ts
        },
        // ... more fields
      ],
    },
  ],
};
```

**Purpose:** Define form structure and configuration
- Import validations from validations.ts
- Configure layout (sections, columns, field types)
- Add conditions for dynamic fields

---

### 4. **helpers.ts** - Business Logic
```typescript
// Default values
export const getDefaultUserFormValues = () => ({
  emailNotifications: true,
  status: "active",
});

// Data transformation
export const transformUserFormData = (data) => {
  // Clean up data before API call
  return cleanedData;
};

// Utility functions
export const getRoleLabel = (role) => { ... };
export const suggestUsername = (firstName, lastName) => { ... };
export const isPasswordStrong = (password) => { ... };
```

**Purpose:** All business logic and utility functions
- Data transformation
- Default values
- Formatting functions
- Validation helpers
- Business rules

---

### 5. **UserCreateForm.example.tsx** - Component
```typescript
const handleFormSubmit = async (data: UserFormData) => {
  const transformedData = transformUserFormData(data);
  // Call API...
};

const handleFormReset = (resetFn: () => void) => {
  resetFn();
};

export function UserCreateForm() {
  const methods = useForm<UserFormData>({
    defaultValues: getDefaultUserFormValues(),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <FormBuilder schema={userFormSchema} />
        {/* Buttons */}
      </form>
    </FormProvider>
  );
}
```

**Purpose:** Clean, minimal React component
- Import everything from separate files
- Just handles React/UI logic
- Super clean and readable

---

## ✨ Benefits of This Structure

### 1. **Separation of Concerns**
- ✅ Types in `types.ts`
- ✅ Validations in `validations.ts`
- ✅ Field configs in `fields.ts`
- ✅ Business logic in `helpers.ts`
- ✅ UI component in `UserCreateForm.tsx`

### 2. **Easy to Maintain**
```
Need to change validation? → Edit validations.ts
Need to add field? → Edit fields.ts
Need to change business logic? → Edit helpers.ts
```

### 3. **Reusable**
```typescript
// Use the same validation in different forms
import { validateEmail } from './validations';

// Use the same helpers
import { transformUserFormData } from './helpers';
```

### 4. **Testable**
```typescript
// Test validation separately
test('validateEmail requires valid email', () => { ... });

// Test helpers separately
test('transformUserFormData removes empty fields', () => { ... });

// Test form separately
test('UserCreateForm renders correctly', () => { ... });
```

### 5. **Clean Components**
```typescript
// Component is just 30 lines!
// No validation logic
// No business logic
// Just UI and form setup
```

---

## 🚀 How to Use

### Create New Form

1. **Create types** (`types.ts`)
   ```typescript
   export interface MyFormData { ... }
   ```

2. **Create validations** (`validations.ts`)
   ```typescript
   export const validateMyField = { ... };
   ```

3. **Create field config** (`fields.ts`)
   ```typescript
   export const myFormSchema: FormSchema = { ... };
   ```

4. **Create helpers** (`helpers.ts`)
   ```typescript
   export const transformMyFormData = (data) => { ... };
   ```

5. **Create component** (`MyForm.tsx`)
   ```typescript
   import { myFormSchema } from './fields';
   // ... use FormBuilder
   ```

### Extend Existing Form

1. **Add validation** in `validations.ts`
2. **Add field** in `fields.ts` with new validation
3. **Add helper** in `helpers.ts` if needed
4. **Component automatically renders new field!** ✨

---

## 📦 File Size Comparison

### Without Separation:
```
UserCreateForm.tsx: 500+ lines
├── Types
├── Validations
├── Field configs
├── Business logic
└── UI code
```

### With Separation:
```
types.ts:        50 lines
validations.ts:  100 lines
fields.ts:       150 lines
helpers.ts:      120 lines
UserForm.tsx:    30 lines
────────────────────────
Total: Same lines, but organized! ✨
```

---

## 🎓 Learning Path

1. Start with **types.ts** - Define your data structure
2. Create **validations.ts** - Add validation rules
3. Build **fields.ts** - Configure form fields
4. Add **helpers.ts** - Business logic
5. Create **Component** - Put it all together

## 💡 Pro Tips

1. **Keep validations.ts pure** - No side effects, just validation objects
2. **Make helpers.ts testable** - Pure functions only
3. **Keep fields.ts declarative** - Just configuration
4. **Component stays minimal** - Import and use, don't define
5. **Types first** - Always start with TypeScript types

---

## 🔥 Result

```typescript
// Component is THIS simple:
export function UserCreateForm() {
  const methods = useForm<UserFormData>({
    defaultValues: getDefaultUserFormValues(),
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
        <FormBuilder schema={userFormSchema} />
        <FormActions onReset={handleFormReset} />
      </form>
    </FormProvider>
  );
}
```

**Everything else is imported from separate, organized files!** 🎉
