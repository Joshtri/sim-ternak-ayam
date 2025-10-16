/**
 * Pakan Edit Form
 * Form for editing existing pakan data
 */

import type { PakanEditFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";

import { useUpdatePakan, usePakanById } from "../hooks/usePakan";

import { pakanEditSchema } from "./fields";
import {
  getDefaultPakanEditFormValues,
  transformPakanEditFormData,
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
  data: PakanEditFormData,
  updatePakan: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformPakanEditFormData(data);

    console.log("Updating pakan data:", transformedData);

    // Call API to update pakan
    await updatePakan.mutateAsync({ id, data: transformedData });

    console.log("Pakan data updated successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-pakan" });
  } catch (error) {
    console.error("Error updating pakan data:", error);
  }
};

export function PakanEditForm() {
  const navigate = useNavigate();
  const { idEdit } = useParams({ strict: false }) as { idEdit: string };
  const updatePakan = useUpdatePakan();

  // Fetch existing pakan data
  const { data: pakan, isLoading: isLoadingPakan } = usePakanById(idEdit);

  // Initialize react-hook-form
  const methods = useForm<PakanEditFormData>({
    defaultValues: getDefaultPakanEditFormValues(),
    mode: "onBlur",
  });

  // Update form values when pakan data is loaded
  useEffect(() => {
    if (pakan) {
      methods.reset(getDefaultPakanEditFormValues(pakan));
    }
  }, [pakan, methods]);

  const onSubmit = (data: PakanEditFormData) => {
    handleFormSubmit(idEdit, data, updatePakan, navigate);
  };

  const isLoading = isLoadingPakan;

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
              <FormBuilder schema={pakanEditSchema} />

              {/* Form actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <FormActions
                  backHref="/daftar-pakan"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || updatePakan.isPending
                  }
                  submitLabel="Update Data Pakan"
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

export default PakanEditForm;
