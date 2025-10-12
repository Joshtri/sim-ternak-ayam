/**
 * Mortalitas Create Form
 * Form for creating new mortalitas data
 */

import type { MortalitasFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

import { useCreateMortalitas } from "../hooks/useMortalitas";

import { mortalitasSchema } from "./fields";
import {
  getDefaultMortalitasFormValues,
  transformMortalitasFormData,
  transformAyamsToOptions,
} from "./helpers";

import { useAyams } from "@/features/ayams/hooks/useAyams";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  data: MortalitasFormData,
  createMortalitas: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformMortalitasFormData(data);

    console.log("Submitting mortalitas data:", transformedData);

    // Call API to create mortalitas
    await createMortalitas.mutateAsync(transformedData);

    console.log("Mortalitas data created successfully!");

    // Navigate back to list
    navigate({ to: "/mortalitas" });
  } catch (error) {
    console.error("Error creating mortalitas data:", error);
  }
};

/**
 * Handle form reset
 */
const handleFormReset = (resetFn: () => void) => {
  resetFn();
};

export function MortalitasCreateForm() {
  const navigate = useNavigate();
  const createMortalitas = useCreateMortalitas();

  // Fetch ayams for dropdown
  const { data: ayams, isLoading: isLoadingAyams } = useAyams();

  // Initialize react-hook-form
  const methods = useForm<MortalitasFormData>({
    defaultValues: getDefaultMortalitasFormValues(),
    mode: "onBlur",
  });

  // Transform ayams to select options
  const ayamOptions = useMemo(() => {
    if (!ayams) return [];

    return transformAyamsToOptions(ayams);
  }, [ayams]);

  // Update schema with dynamic ayam options
  const dynamicSchema = useMemo(() => {
    return {
      ...mortalitasSchema,
      sections: mortalitasSchema.sections.map(section => ({
        ...section,
        fields: section.fields.map(field => {
          if (field.name === "ayamId" && field.type === "select") {
            return {
              ...field,
              options: ayamOptions,
            };
          }

          return field;
        }),
      })),
    };
  }, [ayamOptions]);

  const onSubmit = (data: MortalitasFormData) => {
    handleFormSubmit(data, createMortalitas, navigate);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="p-6">
          {/* Loading state for ayams data */}
          {isLoadingAyams ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-gray-500">Memuat data ayam...</div>
            </div>
          ) : (
            <>
              {/* Form builder with dynamic schema */}
              <FormBuilder schema={dynamicSchema} />

              {/* Form actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <FormActions
                  backHref="/daftar-mortalitas"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || createMortalitas.isPending
                  }
                  submitLabel="Simpan Data Mortalitas"
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

export default MortalitasCreateForm;
