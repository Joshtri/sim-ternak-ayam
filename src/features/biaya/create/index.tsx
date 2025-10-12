/**
 * Biaya Create Form
 * Form for creating new biaya data
 */

import type { BiayaFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

import { useCreateBiaya } from "../hooks/useBiaya";

import { biayaSchema } from "./fields";
import {
  getDefaultBiayaFormValues,
  transformBiayaFormData,
  transformUsersToOptions,
  transformOperasionalsToOptions,
} from "./helpers";

import { useUsers } from "@/features/users-management/hooks/useUsers";
import { useOperasionals } from "@/features/operasional/hooks/useOperasional";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  data: BiayaFormData,
  createBiaya: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformBiayaFormData(data);

    console.log("Submitting biaya data:", transformedData);

    // Call API to create biaya
    await createBiaya.mutateAsync(transformedData);

    console.log("Biaya data created successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-biaya" });
  } catch (error) {
    console.error("Error creating biaya data:", error);
  }
};

/**
 * Handle form reset
 */
const handleFormReset = (resetFn: () => void) => {
  resetFn();
};

export function BiayaCreateForm() {
  const navigate = useNavigate();
  const createBiaya = useCreateBiaya();

  // Fetch data for dropdowns
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { data: operasionals, isLoading: isLoadingOperasionals } =
    useOperasionals();

  // Initialize react-hook-form
  const methods = useForm<BiayaFormData>({
    defaultValues: getDefaultBiayaFormValues(),
    mode: "onBlur",
  });

  // Transform data to select options
  const petugasOptions = useMemo(() => {
    if (!users) return [];

    return transformUsersToOptions(users);
  }, [users]);

  const operasionalOptions = useMemo(() => {
    if (!operasionals) return [];

    return transformOperasionalsToOptions(operasionals);
  }, [operasionals]);

  // Update schema with dynamic options
  const dynamicSchema = useMemo(() => {
    return {
      ...biayaSchema,
      sections: biayaSchema.sections.map(section => ({
        ...section,
        fields: section.fields.map(field => {
          if (field.name === "petugasId" && field.type === "select") {
            return {
              ...field,
              options: petugasOptions,
            };
          }

          if (field.name === "operasionalId" && field.type === "select") {
            return {
              ...field,
              options: operasionalOptions,
            };
          }

          return field;
        }),
      })),
    };
  }, [petugasOptions, operasionalOptions]);

  const onSubmit = (data: BiayaFormData) => {
    handleFormSubmit(data, createBiaya, navigate);
  };

  // Check if any data is loading
  const isLoadingAnyData = isLoadingUsers || isLoadingOperasionals;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="p-6">
          {/* Loading state for data */}
          {isLoadingAnyData ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-gray-500">Memuat data...</div>
            </div>
          ) : (
            <>
              {/* Form builder with dynamic schema */}
              <FormBuilder schema={dynamicSchema} />

              {/* Form actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <FormActions
                  backHref="/daftar-biaya"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || createBiaya.isPending
                  }
                  submitLabel="Simpan Data Biaya"
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

export default BiayaCreateForm;
