/**
 * Kandang Edit Form
 * Form for editing existing kandang with petugas assignment
 */

import type { KandangEditFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useEffect } from "react";

import { useUpdateKandang, useKandang } from "../hooks/useKandang";

import { kandangEditSchema } from "./fields";
import {
  getDefaultKandangEditFormValues,
  transformKandangEditFormData,
  transformUsersToOptions,
} from "./helpers";

import { useUsers } from "@/features/users-management/hooks/useUsers";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { SkeletonForm } from "@/components/ui";

/**
 * Handle form submission
 */
const handleFormSubmit = async (
  id: string,
  data: KandangEditFormData,
  updateKandang: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformKandangEditFormData(data, id);

    console.log("Updating kandang data:", transformedData);

    // Call API to update kandang
    await updateKandang.mutateAsync({ id, data: transformedData });

    console.log("Kandang updated successfully!");

    // Navigate back to list
    navigate({ to: "/daftar-kandang" });
  } catch (error) {
    console.error("Error updating kandang:", error);
  }
};

export function KandangEditForm() {
  const navigate = useNavigate();
  const { idEdit } = useParams({ strict: false }) as { idEdit: string };
  const updateKandang = useUpdateKandang();

  // Fetch existing kandang data
  const { data: kandang, isLoading: isLoadingKandang } = useKandang(idEdit);

  // Fetch users for petugas dropdown
  const { data: users, isLoading: isLoadingUsers } = useUsers();

  // Initialize react-hook-form
  const methods = useForm<KandangEditFormData>({
    defaultValues: getDefaultKandangEditFormValues(),
    mode: "onBlur",
  });

  // Update form values when kandang data is loaded
  useEffect(() => {
    if (kandang) {
      methods.reset(getDefaultKandangEditFormValues(kandang));
    }
  }, [kandang, methods]);

  // Transform users to select options
  const petugasOptions = useMemo(() => {
    if (!users) return [];

    // Filter users with role "Petugas"
    const petugasUsers = users.filter(
      (u: any) => String(u.role ?? "") === "Petugas"
    );

    return transformUsersToOptions(petugasUsers);
  }, [users]);

  // Update schema with dynamic petugas options
  const dynamicSchema = useMemo(() => {
    return {
      ...kandangEditSchema,
      sections: kandangEditSchema.sections.map(section => ({
        ...section,
        fields: section.fields.map(field => {
          if (field.name === "petugasId" && field.type === "select") {
            return {
              ...field,
              options: petugasOptions,
            };
          }

          return field;
        }),
      })),
    };
  }, [petugasOptions]);

  const onSubmit = (data: KandangEditFormData) => {
    handleFormSubmit(idEdit, data, updateKandang, navigate);
  };

  const isLoading = isLoadingUsers || isLoadingKandang;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className={isLoading ? "p-0" : "p-6"}>
          {/* Loading state for users data */}
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
                  backHref="/daftar-kandang"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || updateKandang.isPending
                  }
                  submitLabel="Update Kandang"
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

export default KandangEditForm;
