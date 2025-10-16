/**
 * User Edit Form
 * Form for editing existing user data
 * Note: Password change is handled separately
 */

import type { UserEditFormData } from "./helpers";

import { useForm, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";

import { useUpdateUser, useUser } from "../hooks/useUsers";

import { userEditSchema } from "./fields";
import {
  getDefaultUserEditFormValues,
  transformUserEditFormData,
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
  data: UserEditFormData,
  updateUser: any,
  navigate: any
) => {
  try {
    // Transform data before sending to API
    const transformedData = transformUserEditFormData(data);

    console.log("Updating user data:", transformedData);

    // Call API to update user
    await updateUser.mutateAsync({ id, data: transformedData });

    console.log("User data updated successfully!");

    // Navigate back to list
    navigate({ to: "/users-management" });
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

export function UserEditForm() {
  const navigate = useNavigate();
  const { idEdit } = useParams({ strict: false }) as { idEdit: string };
  const updateUser = useUpdateUser();

  // Fetch existing user data
  const { data: user, isLoading: isLoadingUser } = useUser(idEdit);

  // Initialize react-hook-form
  const methods = useForm<UserEditFormData>({
    defaultValues: getDefaultUserEditFormValues(),
    mode: "onBlur",
  });

  // Update form values when user data is loaded
  useEffect(() => {
    if (user) {
      console.log("=== USER EDIT FORM DEBUG ===");
      console.log("Raw user data from API:", user);
      const formValues = getDefaultUserEditFormValues(user);

      console.log("Form values after transformation:", formValues);
      console.log("Current form values before reset:", methods.getValues());
      methods.reset(formValues);
      console.log("Current form values after reset:", methods.getValues());
      console.log("=== END DEBUG ===");
    }
  }, [user, methods]);

  const onSubmit = (data: UserEditFormData) => {
    handleFormSubmit(idEdit, data, updateUser, navigate);
  };

  const isLoading = isLoadingUser;

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
              {/* Form builder with schema */}
              <FormBuilder schema={userEditSchema} />

              {/* Information about password */}
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Catatan:</strong> Untuk mengubah password, gunakan
                  fitur "Ubah Password" yang terpisah.
                </p>
              </div>

              {/* Form actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <FormActions
                  backHref="/users-management"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || updateUser.isPending
                  }
                  submitLabel="Update Data User"
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

export default UserEditForm;
