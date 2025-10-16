/**
 * Panen Edit Form
 * Form for editing existing panen data
 */

import type { PanenEditFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useEffect } from "react";

import { useUpdatePanen, usePanenById } from "../hooks/usePanen";

import { panenEditSchema } from "./fields";
import {
  getDefaultPanenEditFormValues,
  transformPanenEditFormData,
  transformAyamsToOptions,
} from "./helpers";

import { useAyams } from "@/features/ayams/hooks/useAyams";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { ICurrentUser } from "@/interfaces/common";
import { SkeletonForm } from "@/components/ui";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  id: string,
  data: PanenEditFormData,
  updatePanen: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformPanenEditFormData(data);

    console.log("Updating panen data:", transformedData);

    // Call API to update panen
    await updatePanen.mutateAsync({ id, data: transformedData });

    console.log("Panen data updated successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-panen" });
  } catch (error) {
    console.error("Error updating panen data:", error);
  }
};

export function PanenEditForm() {
  const navigate = useNavigate();
  const { idEdit } = useParams({ strict: false }) as { idEdit: string };
  const updatePanen = useUpdatePanen();

  // Fetch existing panen data
  const { data: panen, isLoading: isLoadingPanen } = usePanenById(idEdit);

  // Fetch current user to get managed kandangs
  const { data: meData, isLoading: isLoadingMe } =
    useCurrentUser<ICurrentUser>();

  // Fetch ayams for dropdown
  const { data: ayams, isLoading: isLoadingAyams } = useAyams();

  // Initialize react-hook-form
  const methods = useForm<PanenEditFormData>({
    defaultValues: getDefaultPanenEditFormValues(),
    mode: "onBlur",
  });

  // Update form values when panen data is loaded
  useEffect(() => {
    if (panen) {
      console.log("Raw panen data from API:", panen);
      const formValues = getDefaultPanenEditFormValues(panen);

      console.log("Form values after transformation:", formValues);
      methods.reset(formValues);
    }
  }, [panen, methods]);

  // Filter ayams based on user role and managed kandangs
  const filteredAyams = useMemo(() => {
    if (!ayams || !meData) return [];

    const roleNormalized = String(meData.role ?? "").toLowerCase();

    // If user is Petugas, filter ayams by managed kandangs
    if (roleNormalized === "petugas") {
      const managedKandangIds = new Set(
        (meData.kandangsManaged ?? []).map((k: any) => String(k.id))
      );

      return ayams.filter(ayam =>
        managedKandangIds.has(String(ayam.kandangId))
      );
    }

    // For other roles (Pemilik, Admin, etc.), show all ayams
    return ayams;
  }, [ayams, meData]);

  // Transform filtered ayams to select options
  const ayamOptions = useMemo(() => {
    if (!filteredAyams) return [];

    return transformAyamsToOptions(filteredAyams);
  }, [filteredAyams]);

  // Update schema with dynamic ayam options
  const dynamicSchema = useMemo(() => {
    return {
      ...panenEditSchema,
      sections: panenEditSchema.sections.map(section => ({
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

  const onSubmit = (data: PanenEditFormData) => {
    handleFormSubmit(idEdit, data, updatePanen, navigate);
  };

  const isLoading = isLoadingAyams || isLoadingMe || isLoadingPanen;

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
                  backHref="/daftar-panen"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || updatePanen.isPending
                  }
                  submitLabel="Update Data Panen"
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

export default PanenEditForm;
