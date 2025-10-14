/**
 * Panen Create Form
 * Form for creating new panen data
 */

import type { PanenFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

import { useCreatePanen } from "../hooks/usePanen";

import { panenSchema } from "./fields";
import {
  getDefaultPanenFormValues,
  transformPanenFormData,
  transformAyamsToOptions,
} from "./helpers";

import { useAyams } from "@/features/ayams/hooks/useAyams";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { ICurrentUser } from "@/interfaces/common";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  data: PanenFormData,
  createPanen: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformPanenFormData(data);

    console.log("Submitting panen data:", transformedData);

    // Call API to create panen
    await createPanen.mutateAsync(transformedData);

    console.log("Panen data created successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-panen" });
  } catch (error) {
    console.error("Error creating panen data:", error);
  }
};

/**
 * Handle form reset
 */
const handleFormReset = (resetFn: () => void) => {
  resetFn();
};

export function PanenCreateForm() {
  const navigate = useNavigate();
  const createPanen = useCreatePanen();

  // Fetch ayams for dropdown
  const { data: ayams, isLoading: isLoadingAyams } = useAyams();
  const { data: meData, isLoading: isLoadingMe } =
    useCurrentUser<ICurrentUser>();

  // Initialize react-hook-form
  const methods = useForm<PanenFormData>({
    defaultValues: getDefaultPanenFormValues(),
    mode: "onBlur",
  });

  const filteredAyams = useMemo(() => {
    if (!ayams || !meData) return [];

    const roleNormalized = String(meData?.role ?? "").toLowerCase();

    if (roleNormalized === "petugas" && meData?.kandangsManaged?.length) {
      // For Petugas, filter ayams by kandangId they manage
      const managedKandangIds = meData.kandangsManaged.map((k: any) =>
        String(k.id)
      );

      return ayams.filter(a => managedKandangIds.includes(String(a.kandangId)));
    }

    return ayams;
  }, [ayams, meData]);

  // Transform ayams to select options
  const ayamOptions = useMemo(() => {
    if (!filteredAyams) return [];

    return transformAyamsToOptions(filteredAyams);
  }, [filteredAyams]);

  // Update schema with dynamic ayam options
  const dynamicSchema = useMemo(() => {
    return {
      ...panenSchema,
      sections: panenSchema.sections.map(section => ({
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

  const onSubmit = (data: PanenFormData) => {
    handleFormSubmit(data, createPanen, navigate);
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
                  backHref="/daftar-panen"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || createPanen.isPending
                  }
                  submitLabel="Simpan Data Panen"
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

export default PanenCreateForm;
