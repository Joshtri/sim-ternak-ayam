/**
 * Vaksin Edit Form
 * Form for editing existing vaksin data
 */

import type { VaksinEditFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";

import { useUpdateVaksin, useVaksinById } from "../hooks/useVaksin";

import { vaksinEditSchema } from "./fields";
import {
  getDefaultVaksinEditFormValues,
  transformVaksinEditFormData,
} from "./helpers";

import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { SkeletonForm } from "@/components/ui";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  id: string,
  data: VaksinEditFormData,
  updateVaksin: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformVaksinEditFormData(data);

    console.log("Updating vaksin data:", transformedData);

    // Call API to update vaksin
    await updateVaksin.mutateAsync({ id, data: transformedData });

    console.log("Vaksin data updated successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-vaksin" });
  } catch (error) {
    console.error("Error updating vaksin data:", error);
  }
};

export function VaksinEditForm() {
  const navigate = useNavigate();
  const { idEdit } = useParams({ strict: false }) as { idEdit: string };
  const updateVaksin = useUpdateVaksin();

  // Fetch existing vaksin data
  const { data: vaksin, isLoading: isLoadingVaksin } = useVaksinById(idEdit);

  // Initialize react-hook-form
  const methods = useForm<VaksinEditFormData>({
    defaultValues: getDefaultVaksinEditFormValues(),
    mode: "onBlur",
  });

  // Update form values when vaksin data is loaded
  useEffect(() => {
    if (vaksin) {
      methods.reset(getDefaultVaksinEditFormValues(vaksin));
    }
  }, [vaksin, methods]);

  const onSubmit = (data: VaksinEditFormData) => {
    handleFormSubmit(idEdit, data, updateVaksin, navigate);
  };

  const isLoading = isLoadingVaksin;

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
              {/* Form builder */}
              <FormBuilder schema={vaksinEditSchema} />

              {/* Form actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <FormActions
                  backHref="/daftar-vaksin"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || updateVaksin.isPending
                  }
                  submitLabel="Update Data Vaksin"
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

export default VaksinEditForm;
