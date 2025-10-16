/**
 * Jenis Kegiatan Edit Form
 * Form for editing existing jenis kegiatan data
 */

import type { JenisKegiatanEditFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";

import {
  useUpdateJenisKegiatan,
  useJenisKegiatanById,
} from "../hooks/useJenisKegiatan";

import { jenisKegiatanEditSchema } from "./fields";
import {
  getDefaultJenisKegiatanEditFormValues,
  transformJenisKegiatanEditFormData,
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
  data: JenisKegiatanEditFormData,
  updateJenisKegiatan: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformJenisKegiatanEditFormData(data);

    console.log("Updating jenis kegiatan data:", transformedData);

    // Call API to update jenis kegiatan
    await updateJenisKegiatan.mutateAsync({ id, data: transformedData });

    console.log("Jenis kegiatan data updated successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-jenis-kegiatan" });
  } catch (error) {
    console.error("Error updating jenis kegiatan data:", error);
  }
};

export function JenisKegiatanEditForm() {
  const navigate = useNavigate();
  const { idEdit } = useParams({ strict: false }) as { idEdit: string };
  const updateJenisKegiatan = useUpdateJenisKegiatan();

  // Fetch existing jenis kegiatan data
  const { data: jenisKegiatan, isLoading: isLoadingJenisKegiatan } =
    useJenisKegiatanById(idEdit);

  // Initialize react-hook-form
  const methods = useForm<JenisKegiatanEditFormData>({
    defaultValues: getDefaultJenisKegiatanEditFormValues(),
    mode: "onBlur",
  });

  // Update form values when jenis kegiatan data is loaded
  useEffect(() => {
    if (jenisKegiatan) {
      methods.reset(getDefaultJenisKegiatanEditFormValues(jenisKegiatan));
    }
  }, [jenisKegiatan, methods]);

  const onSubmit = (data: JenisKegiatanEditFormData) => {
    handleFormSubmit(idEdit, data, updateJenisKegiatan, navigate);
  };

  const isLoading = isLoadingJenisKegiatan;

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
              <FormBuilder schema={jenisKegiatanEditSchema} />

              {/* Form actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <FormActions
                  backHref="/daftar-jenis-kegiatan"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting ||
                    updateJenisKegiatan.isPending
                  }
                  submitLabel="Update Jenis Kegiatan"
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

export default JenisKegiatanEditForm;
