# FormBuilder & FormFieldRenderer

Sistem auto-rendering form yang powerful untuk membuat form kompleks dengan konfigurasi simple.

## 🎯 Kenapa Pakai Ini?

**Tanpa FormBuilder (cara lama):**
```tsx
<TextInput name="firstName" label="Nama Depan" required />
<TextInput name="lastName" label="Nama Belakang" required />
<TextInput name="email" type="email" label="Email" required />
<SelectInput name="role" label="Role" options={[...]} required />
<SwitchInput name="notifications" label="Notifikasi" />
// ... 10+ lines repetitive code
```

**Dengan FormBuilder (cara baru):**
```tsx
<FormBuilder schema={userFormSchema} />
// 1 line! ✨
```

## 📦 Struktur

```
src/
├── types/
│   └── form-fields.ts          # Type definitions
├── components/ui/Form/
│   ├── FormFieldRenderer.tsx   # Renders individual field
│   ├── FormBuilder.tsx         # Renders complete form
│   └── FormFieldWrapper.tsx    # Wrapper for labels/errors
└── features/
    └── user-management/
        └── fields.ts            # Field definitions
```

## 🚀 Quick Start

### 1. Buat Field Definition

Buat file `fields.ts` di feature folder (misal: `features/user-management/fields.ts`):

```typescript
import type { FormSchema } from "@/types/form-fields";

export const userFormSchema: FormSchema = {
  sections: [
    {
      title: "Informasi Dasar",
      description: "Data pribadi pengguna",
      columns: 2, // 2 kolom responsive grid
      fields: [
        {
          type: "text",
          name: "firstName",
          label: "Nama Depan",
          placeholder: "Masukkan nama depan",
          required: true,
          colSpan: 1, // Span 1 kolom
        },
        {
          type: "email",
          name: "email",
          label: "Email",
          placeholder: "user@example.com",
          required: true,
          colSpan: 2, // Span 2 kolom (full width dalam grid 2 kolom)
        },
        {
          type: "select",
          name: "role",
          label: "Role",
          required: true,
          options: [
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ],
        },
      ],
    },
  ],
};
```

### 2. Gunakan di Form Component

```tsx
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { userFormSchema } from "./fields";

// Zod validation
const schema = z.object({
  firstName: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["admin", "user"]),
});

export function UserForm() {
  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormBuilder schema={userFormSchema} />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

## 📝 Field Types

### Text Inputs
```typescript
{
  type: "text" | "email" | "password" | "url" | "tel",
  name: "fieldName",
  label: "Label",
  placeholder: "Placeholder...",
  required: true,
  maxLength: 100,
}
```

### Number & Currency
```typescript
{
  type: "number",
  name: "age",
  label: "Umur",
  min: 0,
  max: 100,
}

{
  type: "currency",
  name: "price",
  label: "Harga",
  currencySymbol: "Rp",
}
```

### Textarea
```typescript
{
  type: "textarea",
  name: "description",
  label: "Deskripsi",
  rows: 4,
  maxLength: 500,
}
```

### Select
```typescript
{
  type: "select",
  name: "category",
  label: "Kategori",
  options: [
    { label: "Option 1", value: "opt1", description: "Description" },
    { label: "Option 2", value: "opt2" },
  ],
  selectionMode: "single", // or "multiple"
}
```

### Autocomplete
```typescript
{
  type: "autocomplete",
  name: "country",
  label: "Negara",
  options: [...],
  allowCustomValue: true,
}
```

### Radio
```typescript
{
  type: "radio",
  name: "gender",
  label: "Jenis Kelamin",
  options: [
    { label: "Laki-laki", value: "male" },
    { label: "Perempuan", value: "female" },
  ],
  orientation: "horizontal",
}
```

### Checkbox & Switch
```typescript
{
  type: "checkbox",
  name: "agree",
  label: "Setuju dengan syarat",
  checkboxLabel: "Ya, saya setuju",
}

{
  type: "switch",
  name: "notifications",
  label: "Notifikasi",
  defaultChecked: true,
}
```

### Date Picker
```typescript
{
  type: "date" | "datetime" | "time",
  name: "birthdate",
  label: "Tanggal Lahir",
  minDate: "2000-01-01",
  maxDate: "2024-12-31",
}
```

### Read-Only
```typescript
{
  type: "readonly",
  name: "id",
  label: "ID",
  value: "12345",
}
```

### Custom Field
```typescript
{
  type: "custom",
  name: "customField",
  label: "Custom",
  render: ({ name, error }) => (
    <YourCustomComponent name={name} error={error} />
  ),
}
```

## 🎨 Advanced Features

### Conditional Fields

Field muncul berdasarkan kondisi:

```typescript
{
  type: "password",
  name: "password",
  label: "Password",
  // Hanya muncul saat create (tidak ada ID)
  condition: (formValues) => !formValues.id,
}
```

### Conditional Sections

Section muncul berdasarkan kondisi:

```typescript
{
  title: "Pengaturan Premium",
  condition: (formValues) => formValues.plan === "premium",
  fields: [...],
}
```

### Grid Layout

```typescript
{
  columns: 2, // 2 kolom di desktop, 1 di mobile
  fields: [
    { name: "field1", colSpan: 1 }, // 50% width
    { name: "field2", colSpan: 2 }, // 100% width
  ],
}
```

### Multi-Section Forms

```typescript
export const formSchema: FormSchema = {
  sections: [
    {
      title: "Section 1",
      fields: [...],
    },
    {
      title: "Section 2",
      description: "Additional info",
      fields: [...],
    },
  ],
};
```

### Dynamic Options

```typescript
{
  type: "select",
  name: "city",
  label: "Kota",
  // Options dari function
  options: () => fetchCitiesFromAPI(),
  // atau
  options: () => getCitiesFromState(),
}
```

## 🎯 Complete Example

Lihat file lengkap di:
- **Field Definition:** `src/features/user-management/fields.ts`
- **Form Usage:** `src/features/user-management/UserCreateForm.example.tsx`

## 💡 Tips

1. **Organize by Feature:** Letakkan field definitions di folder feature masing-masing
2. **Reuse Schemas:** Buat schema terpisah untuk create/edit jika berbeda
3. **Type Safety:** TypeScript akan auto-complete field types!
4. **Validation:** Gunakan Zod untuk validation, bukan validation prop
5. **Keep it DRY:** Satu schema bisa dipakai di multiple forms

## 🔧 Customization

### Custom Field Component

```typescript
// 1. Buat component
export function CustomRating({ name, error }: { name: string; error?: string }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <RatingStars {...field} />}
    />
  );
}

// 2. Gunakan di schema
{
  type: "custom",
  name: "rating",
  render: (props) => <CustomRating {...props} />,
}
```

### Custom Styling

```typescript
{
  name: "field",
  className: "my-custom-class",
  colSpan: 2,
}
```

## 📚 TypeScript Support

Full TypeScript support dengan auto-complete:

```typescript
import type { FieldConfig, FormSchema, TextFieldConfig } from "@/types/form-fields";

const field: TextFieldConfig = {
  type: "text", // Auto-complete!
  name: "username",
  // ... TypeScript akan suggest semua properties
};
```

## 🎉 Benefits

✅ **90% less code** - No more repetitive JSX
✅ **Centralized** - All field configs in one place
✅ **Type-safe** - Full TypeScript support
✅ **Reusable** - Share schemas across forms
✅ **Maintainable** - Easy to update fields
✅ **Conditional** - Show/hide based on form state
✅ **Responsive** - Auto grid layout
✅ **Consistent** - Same styling everywhere

Happy coding! 🚀
