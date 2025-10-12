/**
 * Pakan Create Form
 * Form for creating new pakan data
 */

import type { PakanFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

import { useCreatePakan } from "../hooks/usePakan";

import { pakanSchema } from "./fields";
import { getDefaultPakanFormValues, transformPakanFormData } from "./helpers";

import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  data: PakanFormData,
  createPakan: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformPakanFormData(data);

    console.log("Submitting pakan data:", transformedData);

    // Call API to create pakan
    await createPakan.mutateAsync(transformedData);

    console.log("Pakan data created successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-pakan" });
  } catch (error) {
    console.error("Error creating pakan data:", error);
  }
};

/**
 * Handle form reset
 */
const handleFormReset = (resetFn: () => void) => {
  resetFn();
};

export function PakanCreateForm() {
  const navigate = useNavigate();
  const createPakan = useCreatePakan();

  // Initialize react-hook-form
  const methods = useForm<PakanFormData>({
    defaultValues: getDefaultPakanFormValues(),
    mode: "onBlur",
  });

  const onSubmit = (data: PakanFormData) => {
    handleFormSubmit(data, createPakan, navigate);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="p-6">
          {/* Form builder */}
          <FormBuilder schema={pakanSchema} />

          {/* Form actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <FormActions
              backHref="/daftar-pakan"
              backLabel="Kembali"
              isSubmitting={
                methods.formState.isSubmitting || createPakan.isPending
              }
              submitLabel="Simpan Data Pakan"
              onReset={() => handleFormReset(methods.reset)}
            />
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}

export default PakanCreateForm;
