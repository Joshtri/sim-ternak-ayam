/**
 * Operasional Edit Form
 * Form for editing existing operasional data
 */

import type { OperasionalEditFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useEffect } from "react";

import {
  useUpdateOperasional,
  useOperasionalById,
} from "../hooks/useOperasional";

import { operasionalEditSchema } from "./fields";
import {
  getDefaultOperasionalEditFormValues,
  transformOperasionalEditFormData,
  transformJenisKegiatansToOptions,
  transformKandangsToOptions,
  transformUsersToOptions,
  transformPakansToOptions,
  transformVaksinsToOptions,
} from "./helpers";

import { useJenisKegiatans } from "@/features/jenis-kegiatan/hooks/useJenisKegiatan";
import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { useUsers } from "@/features/users-management/hooks/useUsers";
import { usePakans } from "@/features/pakan/hooks/usePakan";
import { useVaksins } from "@/features/vaksin/hooks/useVaksin";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { SkeletonForm } from "@/components/ui";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  id: string,
  data: OperasionalEditFormData,
  updateOperasional: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformOperasionalEditFormData(data, id);

    console.log("Updating operasional data:", transformedData);

    // Call API to update operasional
    await updateOperasional.mutateAsync({ id, data: transformedData });

    console.log("Operasional data updated successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-operasional" });
  } catch (error) {
    console.error("Error updating operasional data:", error);
  }
};

export function OperasionalEditForm() {
  const navigate = useNavigate();
  const { idEdit } = useParams({ strict: false }) as { idEdit: string };
  const updateOperasional = useUpdateOperasional();

  // Fetch existing operasional data
  const { data: operasional, isLoading: isLoadingOperasional } =
    useOperasionalById(idEdit);

  // Fetch data for dropdowns
  const { data: jenisKegiatans, isLoading: isLoadingJenisKegiatans } =
    useJenisKegiatans();
  const { data: kandangs, isLoading: isLoadingKandangs } = useKandangs();
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  const { data: pakans, isLoading: isLoadingPakans } = usePakans();
  const { data: vaksins, isLoading: isLoadingVaksins } = useVaksins();

  // Initialize react-hook-form
  const methods = useForm<OperasionalEditFormData>({
    defaultValues: getDefaultOperasionalEditFormValues(),
    mode: "onBlur",
  });

  // Update form values when operasional data is loaded
  useEffect(() => {
    if (operasional) {
      methods.reset(getDefaultOperasionalEditFormValues(operasional));
    }
  }, [operasional, methods]);

  // Transform data to select options
  const jenisKegiatanOptions = useMemo(() => {
    if (!jenisKegiatans) return [];

    return transformJenisKegiatansToOptions(jenisKegiatans);
  }, [jenisKegiatans]);

  const kandangOptions = useMemo(() => {
    if (!kandangs) return [];

    return transformKandangsToOptions(kandangs);
  }, [kandangs]);

  const petugasOptions = useMemo(() => {
    if (!users) return [];

    return transformUsersToOptions(users);
  }, [users]);

  const pakanOptions = useMemo(() => {
    if (!pakans) return [];

    return transformPakansToOptions(pakans);
  }, [pakans]);

  const vaksinOptions = useMemo(() => {
    if (!vaksins) return [];

    return transformVaksinsToOptions(vaksins);
  }, [vaksins]);

  // Update schema with dynamic options
  const dynamicSchema = useMemo(() => {
    return {
      ...operasionalEditSchema,
      sections: operasionalEditSchema.sections.map(section => ({
        ...section,
        fields: section.fields.map(field => {
          if (field.name === "jenisKegiatanId" && field.type === "select") {
            return {
              ...field,
              options: jenisKegiatanOptions,
            };
          }

          if (field.name === "kandangId" && field.type === "select") {
            return {
              ...field,
              options: kandangOptions,
            };
          }

          if (field.name === "petugasId" && field.type === "select") {
            return {
              ...field,
              options: petugasOptions,
            };
          }

          if (field.name === "pakanId" && field.type === "select") {
            return {
              ...field,
              options: pakanOptions,
            };
          }

          if (field.name === "vaksinId" && field.type === "select") {
            return {
              ...field,
              options: vaksinOptions,
            };
          }

          return field;
        }),
      })),
    };
  }, [
    jenisKegiatanOptions,
    kandangOptions,
    petugasOptions,
    pakanOptions,
    vaksinOptions,
  ]);

  const onSubmit = (data: OperasionalEditFormData) => {
    handleFormSubmit(idEdit, data, updateOperasional, navigate);
  };

  // Check if any data is loading
  const isLoading =
    isLoadingJenisKegiatans ||
    isLoadingKandangs ||
    isLoadingUsers ||
    isLoadingPakans ||
    isLoadingVaksins ||
    isLoadingOperasional;

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
                  backHref="/daftar-operasional"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting ||
                    updateOperasional.isPending
                  }
                  submitLabel="Update Data Operasional"
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

export default OperasionalEditForm;
