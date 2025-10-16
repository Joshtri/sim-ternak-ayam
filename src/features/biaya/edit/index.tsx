/**
 * Biaya Edit Form
 * Form for editing existing biaya data
 */

import type { BiayaEditFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useEffect } from "react";

import { useUpdateBiaya, useBiayaById } from "../hooks/useBiaya";

import { biayaEditSchema } from "./fields";
import {
  getDefaultBiayaEditFormValues,
  transformBiayaEditFormData,
  transformUsersToOptions,
  transformOperasionalsToOptions,
} from "./helpers";

import { useUsers } from "@/features/users-management/hooks/useUsers";
import { useOperasionals } from "@/features/operasional/hooks/useOperasional";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { SkeletonForm } from "@/components/ui";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  id: string,
  data: BiayaEditFormData,
  updateBiaya: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformBiayaEditFormData(data);

    console.log("Updating biaya data:", transformedData);

    // Call API to update biaya
    await updateBiaya.mutateAsync({ id, data: transformedData });

    console.log("Biaya data updated successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-biaya" });
  } catch (error) {
    console.error("Error updating biaya data:", error);
  }
};

export function BiayaEditForm() {
  const navigate = useNavigate();
  const { idEdit } = useParams({ strict: false }) as { idEdit: string };
  const updateBiaya = useUpdateBiaya();

  // Fetch existing biaya data
  const { data: biaya, isLoading: isLoadingBiaya } = useBiayaById(idEdit);

  // Fetch data for dropdowns
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { data: operasionals, isLoading: isLoadingOperasionals } =
    useOperasionals();

  // Initialize react-hook-form
  const methods = useForm<BiayaEditFormData>({
    defaultValues: getDefaultBiayaEditFormValues(),
    mode: "onBlur",
  });

  // Update form values when biaya data is loaded
  useEffect(() => {
    if (biaya) {
      methods.reset(getDefaultBiayaEditFormValues(biaya));
    }
  }, [biaya, methods]);

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
      ...biayaEditSchema,
      sections: biayaEditSchema.sections.map(section => ({
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

  const onSubmit = (data: BiayaEditFormData) => {
    handleFormSubmit(idEdit, data, updateBiaya, navigate);
  };

  // Check if any data is loading
  const isLoading = isLoadingUsers || isLoadingOperasionals || isLoadingBiaya;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className={isLoading ? "p-0" : "p-6"}>
          {/* Loading state for data */}
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
                  backHref="/daftar-biaya"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || updateBiaya.isPending
                  }
                  submitLabel="Update Data Biaya"
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

export default BiayaEditForm;
