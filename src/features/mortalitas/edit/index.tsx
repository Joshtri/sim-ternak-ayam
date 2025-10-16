/**
 * Mortalitas Edit Form
 * Form for editing existing mortalitas data
 */

import type { MortalitasEditFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useEffect } from "react";

import { useUpdateMortalitas, useMortalitasById } from "../hooks/useMortalitas";

import { mortalitasEditSchema } from "./fields";
import {
  getDefaultMortalitasEditFormValues,
  transformMortalitasEditFormData,
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
  data: MortalitasEditFormData,
  updateMortalitas: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformMortalitasEditFormData(data);

    console.log("Updating mortalitas data:", transformedData);

    // Call API to update mortalitas
    await updateMortalitas.mutateAsync({ id, data: transformedData });

    console.log("Mortalitas data updated successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-mortalitas" });
  } catch (error) {
    console.error("Error updating mortalitas data:", error);
  }
};

export function MortalitasEditForm() {
  const navigate = useNavigate();
  const { idEdit } = useParams({ strict: false }) as { idEdit: string };
  const updateMortalitas = useUpdateMortalitas();

  // Fetch existing mortalitas data
  const { data: mortalitas, isLoading: isLoadingMortalitas } =
    useMortalitasById(idEdit);

  // Fetch current user to get managed kandangs
  const { data: meData, isLoading: isLoadingMe } =
    useCurrentUser<ICurrentUser>();

  // Fetch ayams for dropdown
  const { data: ayams, isLoading: isLoadingAyams } = useAyams();

  // Initialize react-hook-form
  const methods = useForm<MortalitasEditFormData>({
    defaultValues: getDefaultMortalitasEditFormValues(),
    mode: "onBlur",
  });

  // Update form values when mortalitas data is loaded
  useEffect(() => {
    if (mortalitas) {
      console.log("Raw mortalitas data from API:", mortalitas);
      const formValues = getDefaultMortalitasEditFormValues(mortalitas);

      console.log("Form values after transformation:", formValues);
      methods.reset(formValues);
    }
  }, [mortalitas, methods]);

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
      ...mortalitasEditSchema,
      sections: mortalitasEditSchema.sections.map(section => ({
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

  const onSubmit = (data: MortalitasEditFormData) => {
    handleFormSubmit(idEdit, data, updateMortalitas, navigate);
  };

  const isLoading = isLoadingAyams || isLoadingMe || isLoadingMortalitas;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className={isLoading ? "p-0" : "p-6"}>
          {/* Loading state for ayams data */}
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
                  backHref="/daftar-mortalitas"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || updateMortalitas.isPending
                  }
                  submitLabel="Update Data Mortalitas"
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

export default MortalitasEditForm;
