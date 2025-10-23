/**
 * Kandang Asisten Create/Edit Form
 * Form for creating or editing kandang assistant assignments
 */

import type { KandangAsistenFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import {
  useCreateKandangAsisten,
  useUpdateKandangAsisten,
  useKandangAsistenById,
} from "../hooks/useKandangAsisten";

import { kandangAsistenSchema } from "./fields";
import {
  getDefaultKandangAsistenFormValues,
  transformKandangAsistenFormData,
  transformUpdateKandangAsistenFormData,
  transformKandangsToOptions,
  transformPetugasToOptions,
} from "./helpers";

import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { useUsers } from "@/features/users-management/hooks/useUsers";

interface KandangAsistenFormProps {
  id?: string; // If provided, this is edit mode
}

export function KandangAsistenForm({ id }: KandangAsistenFormProps) {
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Fetch data for dropdowns
  const { data: kandangs } = useKandangs();
  const { data: users } = useUsers();

  // Fetch existing data if editing
  const { data: existingData, isLoading: isLoadingExisting } =
    useKandangAsistenById(id || "", isEditMode);

  const createMutation = useCreateKandangAsisten();
  const updateMutation = useUpdateKandangAsisten();

  // Initialize react-hook-form
  const methods = useForm<KandangAsistenFormData>({
    defaultValues: getDefaultKandangAsistenFormValues(),
    mode: "onBlur",
  });

  // Populate form with existing data in edit mode
  useEffect(() => {
    if (isEditMode && existingData) {
      methods.reset({
        kandangId: existingData.kandangId,
        asistenId: existingData.asistenId,
        catatan: existingData.catatan || "",
        isAktif: existingData.isAktif,
      });
    }
  }, [existingData, isEditMode, methods]);

  // Update schema with dynamic options
  const schemaWithOptions = {
    ...kandangAsistenSchema,
    sections: kandangAsistenSchema.sections.map(section => ({
      ...section,
      fields: section.fields.map(field => {
        if (field.name === "kandangId") {
          return {
            ...field,
            options: transformKandangsToOptions(kandangs || []),
          };
        }
        if (field.name === "asistenId") {
          return {
            ...field, 
            options: transformPetugasToOptions(users || []),
          };
        }

        return field;
      }),
    })),
  };

  const onSubmit = async (data: KandangAsistenFormData) => {
    try {
      if (isEditMode && id) {
        // Update existing
        const updateData = transformUpdateKandangAsistenFormData(data);

        await updateMutation.mutateAsync({ id, data: updateData });
      } else {
        // Create new
        const createData = transformKandangAsistenFormData(data);

        await createMutation.mutateAsync(createData);
      }

      // Navigate back to list
      navigate({ to: "/kandang-asistens" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const isSubmitting =
    methods.formState.isSubmitting ||
    createMutation.isPending ||
    updateMutation.isPending;

  if (isEditMode && isLoadingExisting) {
    return (
      <Card className="p-6">
        <div className="text-center">Memuat data...</div>
      </Card>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="p-6">
          {/* Form builder */}
          <FormBuilder schema={schemaWithOptions} />

          {/* Form actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <FormActions
              backHref="/kandang-asistens"
              backLabel="Kembali"
              isSubmitting={isSubmitting}
              submitLabel={
                isEditMode ? "Update Asisten Kandang" : "Simpan Asisten Kandang"
              }
              onReset={() => methods.reset()}
            />
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}

export default KandangAsistenForm;
