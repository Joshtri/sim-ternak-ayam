/**
 * Example: User Create Form using FormBuilder
 * This file shows how to use the FormBuilder component with field definitions
 * Using React Hook Form validation (not Zod)
 */

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

import { UserFormData } from "../types";
import { useCreateUser } from "../hooks/useUsers";

import { userFormSchema } from "./fields";
import { getDefaultUserFormValues, transformUserFormData } from "./helpers";

import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";

/**
 * Handle form submission
 * Separated function for business logic
 */
const handleFormSubmit = async (
  data: UserFormData,
  createUser: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformUserFormData(data);

    console.log("Submitting user data:", transformedData);

    // Call API to create user
    await createUser.mutateAsync(transformedData);

    // TODO: Show success toast
    console.log("User created successfully!");

    // Navigate back to list
    navigate({ to: "/users-management" });
  } catch (error) {
    console.error("Error creating user:", error);
    // TODO: Show error toast
    // The error will be displayed by React Query
  }
};

/**
 * Handle form reset
 * Separated function for clarity
 */
const handleFormReset = (resetFn: () => void) => {
  resetFn();
};

export function UserCreateForm() {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  // Initialize react-hook-form (no Zod resolver needed!)
  const methods = useForm<UserFormData>({
    defaultValues: getDefaultUserFormValues(),
    mode: "onBlur", // Validate on blur
  });

  const onSubmit = (data: UserFormData) => {
    handleFormSubmit(data, createUser, navigate);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="p-6">
          {/* This single component renders the entire form! */}
          <FormBuilder schema={userFormSchema} />

          {/* Form actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <FormActions
              backHref="/users-management"
              backLabel="Kembali"
              isSubmitting={methods.formState.isSubmitting || createUser.isPending}
              submitLabel="Simpan User"
              onReset={() => handleFormReset(methods.reset)}
            />
          </div>

          {/* Show error if mutation failed */}
          {createUser.isError && (
            <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-lg">
              <p className="text-danger text-sm">
                Gagal membuat user. Silakan coba lagi.
              </p>
            </div>
          )}
        </Card>
      </form>
    </FormProvider>
  );
}

/**
 * ========================================
 * USAGE COMPARISON
 * ========================================
 *
 * WITHOUT FormBuilder (old way):
 * --------------------------------
 * <TextInput
 *   name="firstName"
 *   label="Nama Depan"
 *   placeholder="..."
 *   required
 *   validation={validateFirstName}
 * />
 * <TextInput
 *   name="lastName"
 *   label="Nama Belakang"
 *   placeholder="..."
 *   required
 *   validation={validateLastName}
 * />
 * <TextInput
 *   name="email"
 *   type="email"
 *   label="Email"
 *   placeholder="..."
 *   required
 *   validation={validateEmail}
 * />
 * ... (15+ more lines of repetitive JSX)
 *
 * WITH FormBuilder (new way):
 * ---------------------------
 * <FormBuilder schema={userFormSchema} />
 *
 * (Just 1 line! All fields + validation defined in separate files)
 *
 * ========================================
 * BENEFITS:
 * ========================================
 * ✅ Validation rules separated in validations.ts
 * ✅ Field configs separated in fields.ts
 * ✅ Submit/reset logic separated in functions
 * ✅ 90% less code in component
 * ✅ Easy to maintain and reuse
 * ✅ Type-safe with TypeScript
 */
