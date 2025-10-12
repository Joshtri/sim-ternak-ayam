/**
 * Ayam Create Form
 * Form for creating new ayam data with kandang assignment
 */

import type { AyamFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

import { useCreateAyam } from "../hooks/useAyams";

import { ayamSchema } from "./fields";
import {
  getDefaultAyamFormValues,
  transformAyamFormData,
  transformKandangsToOptions,
} from "./helpers";

import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  data: AyamFormData,
  createAyam: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformAyamFormData(data);

    console.log("Submitting ayam data:", transformedData);

    // Call API to create ayam
    await createAyam.mutateAsync(transformedData);

    console.log("Ayam data created successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-ayam" });
  } catch (error) {
    console.error("Error creating ayam data:", error);
  }
};

/**
 * Handle form reset
 */
const handleFormReset = (resetFn: () => void) => {
  resetFn();
};

export function AyamCreateForm() {
  const navigate = useNavigate();
  const createAyam = useCreateAyam();

  // Fetch kandangs for dropdown
  const { data: kandangs, isLoading: isLoadingKandangs } = useKandangs();

  // Initialize react-hook-form
  const methods = useForm<AyamFormData>({
    defaultValues: getDefaultAyamFormValues(),
    mode: "onBlur",
  });

  // Transform kandangs to select options
  const kandangOptions = useMemo(() => {
    if (!kandangs) return [];

    return transformKandangsToOptions(kandangs);
  }, [kandangs]);

  // Update schema with dynamic kandang options
  const dynamicSchema = useMemo(() => {
    return {
      ...ayamSchema,
      sections: ayamSchema.sections.map(section => ({
        ...section,
        fields: section.fields.map(field => {
          if (field.name === "kandangId" && field.type === "select") {
            return {
              ...field,
              options: kandangOptions,
            };
          }

          return field;
        }),
      })),
    };
  }, [kandangOptions]);

  const onSubmit = (data: AyamFormData) => {
    handleFormSubmit(data, createAyam, navigate);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="p-6">
          {/* Loading state for kandangs data */}
          {isLoadingKandangs ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-gray-500">Memuat data kandang...</div>
            </div>
          ) : (
            <>
              {/* Form builder with dynamic schema */}
              <FormBuilder schema={dynamicSchema} />

              {/* Form actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <FormActions
                  backHref="/daftar-ayam"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || createAyam.isPending
                  }
                  submitLabel="Simpan Data Ayam"
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
