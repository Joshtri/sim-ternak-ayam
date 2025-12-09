/**
 * Vaksin Create Form
 * Form for creating new vaksin data
 */

import type { VaksinFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

import { useCreateVaksin } from "../hooks/useVaksin";

import { vaksinSchema } from "./fields";
import { getDefaultVaksinFormValues, transformVaksinFormData } from "./helpers";

import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  data: VaksinFormData,
  createVaksin: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformVaksinFormData(data);

    console.log("Submitting vaksin data:", transformedData);

    // Call API to create vaksin
    await createVaksin.mutateAsync(transformedData);

    console.log("Vaksin data created successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-vaksin-dan-vitamin" });
  } catch (error) {
    console.error("Error creating vaksin data:", error);
  }
};

/**
 * Handle form reset
 */
const handleFormReset = (resetFn: () => void) => {
  resetFn();
};

export function VaksinCreateForm() {
  const navigate = useNavigate();
  const createVaksin = useCreateVaksin();

  // Initialize react-hook-form
  const methods = useForm<VaksinFormData>({
    defaultValues: getDefaultVaksinFormValues(),
    mode: "onBlur",
  });

  const onSubmit = (data: VaksinFormData) => {
    handleFormSubmit(data, createVaksin, navigate);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="p-6">
          {/* Form builder */}
          <FormBuilder schema={vaksinSchema} />

          {/* Form actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <FormActions
              backHref="/daftar-vaksin-dan-vitamin"
              backLabel="Kembali"
              isSubmitting={
                methods.formState.isSubmitting || createVaksin.isPending
              }
              submitLabel="Simpan Data Vaksin"
              onReset={() => handleFormReset(methods.reset)}
            />
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}

export default VaksinCreateForm;
