/**
 * Jenis Kegiatan Create Form
 * Form for creating new jenis kegiatan data
 */

import type { JenisKegiatanFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";

import { useCreateJenisKegiatan } from "../hooks/useJenisKegiatan";

import { jenisKegiatanSchema } from "./fields";
import {
  getDefaultJenisKegiatanFormValues,
  transformJenisKegiatanFormData,
} from "./helpers";

import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  data: JenisKegiatanFormData,
  createJenisKegiatan: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformJenisKegiatanFormData(data);

    console.log("Submitting jenis kegiatan data:", transformedData);

    // Call API to create jenis kegiatan
    await createJenisKegiatan.mutateAsync(transformedData);

    console.log("Jenis kegiatan data created successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-jenis-kegiatan" });
  } catch (error) {
    console.error("Error creating jenis kegiatan data:", error);
  }
};

/**
 * Handle form reset
 */
const handleFormReset = (resetFn: () => void) => {
  resetFn();
};

export function JenisKegiatanCreateForm() {
  const navigate = useNavigate();
  const createJenisKegiatan = useCreateJenisKegiatan();

  // Initialize react-hook-form
  const methods = useForm<JenisKegiatanFormData>({
    defaultValues: getDefaultJenisKegiatanFormValues(),
    mode: "onBlur",
  });

  const onSubmit = (data: JenisKegiatanFormData) => {
    handleFormSubmit(data, createJenisKegiatan, navigate);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="p-6">
          {/* Form builder */}
          <FormBuilder schema={jenisKegiatanSchema} />

          {/* Form actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <FormActions
              backHref="/daftar-jenis-kegiatan"
              backLabel="Kembali"
              isSubmitting={
                methods.formState.isSubmitting || createJenisKegiatan.isPending
              }
              submitLabel="Simpan Jenis Kegiatan"
              onReset={() => handleFormReset(methods.reset)}
            />
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}

export default JenisKegiatanCreateForm;
