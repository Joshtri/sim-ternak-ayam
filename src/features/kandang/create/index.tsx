/**
 * Kandang Create Form
 * Form for creating new kandang with petugas assignment
 */

import type { KandangFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

import { useCreateKandang } from "../hooks/useKandang";

import { kandangSchema } from "./fields";
import {
  getDefaultKandangFormValues,
  transformKandangFormData,
  transformUsersToOptions,
} from "./helpers";

import { useUsers } from "@/features/users-management/hooks/useUsers";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  data: KandangFormData,
  createKandang: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformKandangFormData(data);

    console.log("Submitting kandang data:", transformedData);

    // Call API to create kandang
    await createKandang.mutateAsync(transformedData);

    console.log("Kandang created successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-kandang" });
  } catch (error) {
    console.error("Error creating kandang:", error);
  }
};

/**
 * Handle form reset
 */
const handleFormReset = (resetFn: () => void) => {
  resetFn();
};

export function KandangCreateForm() {
  const navigate = useNavigate();
  const createKandang = useCreateKandang();

  // Fetch users for petugas dropdown
  const { data: users, isLoading: isLoadingUsers } = useUsers();

  // Initialize react-hook-form
  const methods = useForm<KandangFormData>({
    defaultValues: getDefaultKandangFormValues(),
    mode: "onBlur",
  });

  // Transform users to select options
  const petugasOptions = useMemo(() => {
    if (!users) return [];

    // Filter users with role "Petugas"
    const petugasUsers = users.filter(
      (u: any) => String(u.role ?? "") === "Petugas"
    );

    return transformUsersToOptions(petugasUsers);
  }, [users]);

  // Update schema with dynamic petugas options
  const dynamicSchema = useMemo(() => {
    return {
      ...kandangSchema,
      sections: kandangSchema.sections.map(section => ({
        ...section,
        fields: section.fields.map(field => {
          if (field.name === "petugasId" && field.type === "select") {
            return {
              ...field,
              options: petugasOptions,
            };
          }

          return field;
        }),
      })),
    };
  }, [petugasOptions]);

  const onSubmit = (data: KandangFormData) => {
    handleFormSubmit(data, createKandang, navigate);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="p-6">
          {/* Loading state for users data */}
          {isLoadingUsers ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-gray-500">Memuat data petugas...</div>
            </div>
          ) : (
            <>
              {/* Form builder with dynamic schema */}
              <FormBuilder schema={dynamicSchema} />

              {/* Form actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <FormActions
                  backHref="/daftar-kandang"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || createKandang.isPending
                  }
                  submitLabel="Simpan Kandang"
                  onReset={() => handleFormReset(methods.reset)}
                />
              </div>
            </>
          )}
        </Card>
      </form>
    </FormProvider>
  );
}
