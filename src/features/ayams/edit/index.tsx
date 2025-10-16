/**
 * Ayam Edit Form
 * Form for editing existing ayam data with kandang assignment
 */

import type { AyamEditFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useEffect } from "react";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";

import { ICurrentUser } from "@/interfaces/common";
import { useUpdateAyam, useAyam } from "../hooks/useAyams";

import { ayamEditSchema } from "./fields";
import {
  getDefaultAyamEditFormValues,
  transformAyamEditFormData,
  transformKandangsToOptions,
} from "./helpers";

import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { SkeletonForm } from "@/components/ui";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  id: string,
  data: AyamEditFormData,
  updateAyam: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformAyamEditFormData(data,id);

    console.log("Updating ayam data:", transformedData);

    // Call API to update ayam
    await updateAyam.mutateAsync({ id, data: transformedData });

    console.log("Ayam data updated successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-ayam" });
  } catch (error) {
    console.error("Error updating ayam data:", error);
  }
};

export function AyamEditForm() {
  const navigate = useNavigate();
  const { idEdit } = useParams({ strict: false }) as { idEdit: string };
  const updateAyam = useUpdateAyam();

  const { data: meData, isLoading: isLoadingMe } = useCurrentUser<ICurrentUser>();

  // Fetch existing ayam data
  const { data: ayam, isLoading: isLoadingAyam } = useAyam(idEdit);

  // Fetch kandangs for dropdown
  const { data: kandangs, isLoading: isLoadingKandangs } = useKandangs();

  // Initialize react-hook-form
  const methods = useForm<AyamEditFormData>({
    defaultValues: getDefaultAyamEditFormValues(),
    mode: "onBlur",
  });

  // Update form values when ayam data is loaded
  useEffect(() => {
    if (ayam) {
      methods.reset(getDefaultAyamEditFormValues(ayam));
    }
  }, [ayam, methods]);

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
      ...ayamEditSchema,
      sections: ayamEditSchema.sections.map(section => ({
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

  const onSubmit = (data: AyamEditFormData) => {
    handleFormSubmit(idEdit, data, updateAyam, navigate);
  };

  const isLoading = isLoadingKandangs || isLoadingMe || isLoadingAyam;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className={isLoading ? "p-0" : "p-6"}>
          {/* Loading state */}
          {isLoading ? (
            // <div className="flex justify-center items-center p-8">
            //   <div className="text-gray-500">Memuat data...</div>
            // </div>
            <SkeletonForm fields={8} />
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
                    methods.formState.isSubmitting || updateAyam.isPending
                  }
                  submitLabel="Update Data Ayam"
                  onReset={() => methods.reset()}
                />
              </div>
            </>
          )}
        </Card>
      </form>
    </FormProvider>
  );
}

export default AyamEditForm;
