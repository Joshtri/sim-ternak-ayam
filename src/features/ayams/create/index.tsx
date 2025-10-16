/**
 * Ayam Create Form
 * Form for creating new ayam data with kandang assignment
 */

import type { AyamFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";

import { ICurrentUser } from "@/interfaces/common";
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
import { SkeletonCard, SkeletonForm } from "@/components/ui";

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

    const { data: meData, isLoading: isLoadingMe } = useCurrentUser<ICurrentUser>();

  // Fetch kandangs for dropdown
  const { data: kandangs, isLoading: isLoadingKandangs } = useKandangs();

  // Initialize react-hook-form
  const methods = useForm<AyamFormData>({
    defaultValues: getDefaultAyamFormValues(),
    mode: "onBlur",
  });

  // Filter kandangs based on user role and managed kandangs
  const filteredKandangs = useMemo(() => {
    if (!kandangs || !meData) return [];

    const roleNormalized = String(meData.role ?? "").toLowerCase();

    // If user is Petugas, filter kandangs by managed kandangs
    if (roleNormalized === "petugas") {
      const managedKandangIds = new Set(
        (meData.kandangsManaged ?? []).map((k: any) => String(k.id))
      );

      return kandangs.filter(kandang => managedKandangIds.has(String(kandang.id)));
    }

    // For other roles (Pemilik, Admin, etc.), show all kandangs
    return kandangs;
  }, [kandangs, meData]);

  // Transform filtered kandangs to select options
  const kandangOptions = useMemo(() => {
    if (!filteredKandangs) return [];

    return transformKandangsToOptions(filteredKandangs);
  }, [filteredKandangs]);

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

  const isLoading = isLoadingKandangs || isLoadingMe;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className={isLoading ? "p-0" : "p-6"}>
          {/* Loading state */}
          {isLoading ? (
            <SkeletonForm fields={4} />
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
