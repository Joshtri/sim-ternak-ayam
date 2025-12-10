/**
 * Mortalitas Create Form
 * Form for creating new mortalitas data
 */

import type { MortalitasFormData } from "./helpers";

import { useForm, FormProvider, UseFormSetError } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { useCreateMortalitas } from "../hooks/useMortalitas";

import { mortalitasSchema } from "./fields";
import {
  getDefaultMortalitasFormValues,
  transformMortalitasFormData,
  transformAyamsToOptions,
  convertFileToBase64,
} from "./helpers";

import { useAyams } from "@/features/ayams/hooks/useAyams";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { ICurrentUser } from "@/interfaces/common";
import { showToast } from "@/utils/showToast";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  data: MortalitasFormData,
  createMortalitas: any,
  navigate: any,
  setError: UseFormSetError<MortalitasFormData>
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformMortalitasFormData(data);

    console.log("Submitting mortalitas data:", transformedData);

    // Call API to create mortalitas
    await createMortalitas.mutateAsync(transformedData);

    console.log("Mortalitas data created successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-mortalitas" });
  } catch (error: any) {
    console.error("Error creating mortalitas data:", error);

    // Handle 400 Validation Errors
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data?.errors
    ) {
      const apiErrors = error.response.data.errors;

      Object.keys(apiErrors).forEach(key => {
        // Convert PascalCase (API) to camelCase (Form)
        const fieldName = (key.charAt(0).toLowerCase() +
          key.slice(1)) as keyof MortalitasFormData;

        setError(fieldName, {
          type: "server",
          message: apiErrors[key][0],
        });
      });
    }
  }
};

/**
 * Handle form reset
 */
const handleFormReset = (resetFn: () => void) => {
  resetFn();
};

export function MortalitasCreateForm() {
  const navigate = useNavigate();
  const createMortalitas = useCreateMortalitas();

  // Fetch current user to get managed kandangs
  const { data: meData, isLoading: isLoadingMe } =
    useCurrentUser<ICurrentUser>();

  // Fetch ayams for dropdown
  const { data: ayams, isLoading: isLoadingAyams } = useAyams();

  // State for file upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Initialize react-hook-form
  const methods = useForm<MortalitasFormData>({
    defaultValues: getDefaultMortalitasFormValues(),
    mode: "onBlur",
  });

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
      ...mortalitasSchema,
      sections: mortalitasSchema.sections.map(section => ({
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

  // Handle file selection
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl("");
      methods.setValue("fotoMortalitasBase64", "");
      methods.setValue("fotoMortalitasFileName", "");

      return;
    }

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!validTypes.includes(file.type)) {
      showToast({
        title: "Format Tidak Valid",
        description: "Format foto harus JPG, PNG, GIF, atau WebP",
        color: "error",
      });

      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    if (file.size > maxSize) {
      showToast({
        title: "Ukuran Terlalu Besar",
        description: "Ukuran foto maksimal 5MB",
        color: "error",
      });

      return;
    }

    try {
      // Convert to base64
      const base64 = await convertFileToBase64(file);

      // Update form values
      methods.setValue("fotoMortalitasBase64", base64);
      methods.setValue("fotoMortalitasFileName", file.name);

      // Set preview
      setSelectedFile(file);
      setPreviewUrl(base64);

      showToast({
        title: "Foto Dipilih",
        description: `${file.name} siap untuk diupload`,
        color: "success",
      });
    } catch (error) {
      console.error("Error converting file to base64:", error);
      showToast({
        title: "Gagal Memproses Foto",
        description: "Terjadi kesalahan saat memproses foto",
        color: "error",
      });
    }
  };

  // Handle remove file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    methods.setValue("fotoMortalitasBase64", "");
    methods.setValue("fotoMortalitasFileName", "");

    // Reset file input
    const fileInput = document.getElementById(
      "fotoMortalitas"
    ) as HTMLInputElement;

    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = (data: MortalitasFormData) => {
    handleFormSubmit(data, createMortalitas, navigate, methods.setError);
  };

  const isLoading = isLoadingAyams || isLoadingMe;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="p-6">
          {/* Loading state for ayams data */}
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-gray-500">Memuat data ayam...</div>
            </div>
          ) : (
            <>
              {/* Form builder with dynamic schema */}
              <FormBuilder schema={dynamicSchema} />

              {/* Custom file upload field */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foto Mortalitas (Opsional)
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Upload foto mortalitas (maksimal 5MB, format: JPG, PNG, GIF,
                  WebP)
                </p>

                {/* File input */}
                {!selectedFile && (
                  <div className="flex items-center justify-center w-full">
                    <label
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      htmlFor="fotoMortalitas"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-2 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">
                            Klik untuk upload
                          </span>{" "}
                          atau drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF, WebP (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        accept="image/*"
                        className="hidden"
                        id="fotoMortalitas"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                )}

                {/* Preview and remove */}
                {selectedFile && previewUrl && (
                  <div className="mt-4">
                    <div className="relative inline-block">
                      <img
                        alt="Preview"
                        className="w-full max-w-md h-auto rounded-lg border border-gray-300"
                        src={previewUrl}
                      />
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                        title="Hapus foto"
                        type="button"
                        onClick={handleRemoveFile}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M6 18L18 6M6 6l12 12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {selectedFile.name} (
                      {(selectedFile.size / 1024).toFixed(2)} KB)
                    </p>
                  </div>
                )}
              </div>

              {/* Form actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <FormActions
                  backHref="/daftar-mortalitas"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || createMortalitas.isPending
                  }
                  submitLabel="Simpan Data Mortalitas"
                  onReset={() => {
                    handleFormReset(methods.reset);
                    handleRemoveFile();
                  }}
                />
              </div>
            </>
          )}
        </Card>
      </form>
    </FormProvider>
  );
}

export default MortalitasCreateForm;
