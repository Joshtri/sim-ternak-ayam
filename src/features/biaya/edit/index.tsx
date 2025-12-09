/**
 * Biaya Edit Form
 * Form for editing existing biaya data
 */

import type { BiayaEditFormData } from "./helpers";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useEffect, useState } from "react";

import { useUpdateBiaya, useBiayaById } from "../hooks/useBiaya";
import { transformKandangsToOptions } from "../create/helpers";

import {
  getDefaultBiayaEditFormValues,
  transformBiayaEditFormData,
  transformUsersToOptions,
  transformOperasionalsToOptions,
} from "./helpers";

import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { ICurrentUser } from "@/interfaces/common";
import { useUsers } from "@/features/users-management/hooks/useUsers";
import { useOperasionals } from "@/features/operasional/hooks/useOperasional";
import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { SkeletonForm } from "@/components/ui";
import { SelectInput } from "@/components/ui/Inputs/SelectInput";
import { TextInput } from "@/components/ui/Inputs/TextInput";
import { DatePickerInput } from "@/components/ui/Inputs/DatePickerInput";
import { NumberInput } from "@/components/ui/Inputs/NumberInput";
import { TextareaInput } from "@/components/ui/Inputs/TextareaInput";

type KategoriBiaya = "operasional" | "pembelian";

export function BiayaEditForm() {
  const navigate = useNavigate();
  const { idEdit } = useParams({ strict: false }) as { idEdit: string };
  const updateBiaya = useUpdateBiaya();
  const { data: currentUser } = useCurrentUser<ICurrentUser>();

  // Fetch existing biaya data
  const { data: biaya, isLoading: isLoadingBiaya } = useBiayaById(idEdit);

  // Local state for category toggle
  const [kategoriBiaya, setKategoriBiaya] =
    useState<KategoriBiaya>("operasional");

  // Fetch data for dropdowns
  const { data: users, isLoading: isLoadingUsers } = useUsers({
    role: "petugas",
  });
  const { data: operasionals, isLoading: isLoadingOperasionals } =
    useOperasionals();
  const { data: kandangs, isLoading: isLoadingKandangs } = useKandangs();

  // Initialize react-hook-form
  const methods = useForm<BiayaEditFormData>({
    defaultValues: getDefaultBiayaEditFormValues(),
    mode: "onBlur",
  });

  const selectedOperasionalId = useWatch({
    control: methods.control,
    name: "operasionalId",
  });

  const buktiBase64Value = useWatch({
    control: methods.control,
    name: "buktiBase64",
  });

  // Update form values when biaya data is loaded
  useEffect(() => {
    if (biaya) {
      methods.reset(getDefaultBiayaEditFormValues(biaya));
      // Determine category based on operasionalId existence
      if (biaya.operasionalId) {
        setKategoriBiaya("operasional");
      } else {
        setKategoriBiaya("pembelian");
      }
    }
  }, [biaya, methods]);

  // Transform data to select options
  const petugasOptions = useMemo(() => {
    if (!users) return [];

    return transformUsersToOptions(users);
  }, [users]);

  const operasionalOptions = useMemo(() => {
    if (!operasionals) return [];

    return transformOperasionalsToOptions(operasionals);
  }, [operasionals]);

  const kandangsOptions = useMemo(() => {
    if (!kandangs) return [];

    return transformKandangsToOptions(kandangs);
  }, [kandangs]);

  // Effect: Auto-populate fields based on selected Operasional (Only if user manually changes it, to avoid overwriting existing data on load)
  // We can check if the form is dirty or if this is a user action.
  // For simplicity similar to Create form: only run if we have selectedOperasionalId and we are in operasional mode.
  // BUT in Edit mode, we don't want to auto-overwrite everything if loaded data is different (unlikely but safe to be careful).
  // However, linking operasional implies the kandang and petugas usually match.
  // We'll keep the auto-fill logic but maybe be careful.

  // NOTE: In Edit, usually we trust the loaded data first. We should only auto-fill if the user CHANGES the operasionalId.
  // The current useEffect logic in Create form runs whenever selectedOperasionalId changes, which happens on initial load too.
  // Since we reset form above, let's let the user override if they want.

  // Effect: Handle Category Change (Same logic as Create)
  useEffect(() => {
    if (kategoriBiaya === "pembelian") {
      // Clear specific fields only if user explicitly switches (which we can't easily detect vs initial load set).
      // But we set initial Category in the other useEffect.
      // So we need to be careful not to clear data immediately after load.
      // We can assume if form is dirty or we could potentially skip this clearing on first render.

      // For now, let's only set defaults if fields are empty to avoid wiping loaded data if we mis-categorized?
      // Actually, if we switch to 'pembelian', we definitely don't want operasionalId.
      const currentOpId = methods.getValues("operasionalId");

      if (!currentOpId && currentUser?.id) {
        // If "pembelian" and no operasional (likely new or switched), default petugas to current user if empty
        const currentPetugas = methods.getValues("petugasId");

        if (!currentPetugas) {
          methods.setValue("petugasId", currentUser.id);
        }
      }
    }
  }, [kategoriBiaya, currentUser, methods]);

  const onSubmit = async (data: BiayaEditFormData) => {
    try {
      if (kategoriBiaya === "operasional" && !data.operasionalId) {
        methods.setError("operasionalId", {
          message: "Harap pilih kegiatan operasional",
        });

        return;
      }

      const transformedData = transformBiayaEditFormData(
        data,
        idEdit,
        kategoriBiaya
      );

      console.log("Updating biaya data:", transformedData);
      await updateBiaya.mutateAsync({ id: idEdit, data: transformedData });
      console.log("Biaya data updated successfully!");
      navigate({ to: "/daftar-biaya" });
    } catch (error) {
      console.error("Error updating biaya data:", error);
    }
  };

  const isLoading =
    isLoadingUsers ||
    isLoadingOperasionals ||
    isLoadingBiaya ||
    isLoadingKandangs;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className={isLoading ? "p-0" : "p-6"}>
          {isLoading ? (
            <SkeletonForm fields={8} />
          ) : (
            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Kategori Biaya <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      checked={kategoriBiaya === "operasional"}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      type="radio"
                      value="operasional"
                      onChange={() => {
                        setKategoriBiaya("operasional");
                        // When switching to operasional, if we have saved data we might want to restore or just let user pick.
                      }}
                    />
                    <span className="text-sm">Pengeluaran Operasional</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      checked={kategoriBiaya === "pembelian"}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      type="radio"
                      value="pembelian"
                      onChange={() => {
                        setKategoriBiaya("pembelian");
                        methods.setValue("operasionalId", "");
                        methods.setValue("kandangId", "");
                      }}
                    />
                    <span className="text-sm">Pembelian</span>
                  </label>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {kategoriBiaya === "operasional"
                    ? "Biaya yang timbul dari kegiatan operasional harian (pakan, vaksin, dll)"
                    : "Biaya untuk pembelian aset, stok, atau pengeluaran umum lainnya"}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Operasional Dropdown - visible only for 'operasional' category */}
                {kategoriBiaya === "operasional" && (
                  <div className="md:col-span-2">
                    <SelectInput
                      required
                      description="Pilih kegiatan operasional yang menjadi sumber biaya"
                      label="Kegiatan Operasional"
                      name="operasionalId"
                      options={operasionalOptions}
                      placeholder="Pilih kegiatan operasional"
                      onChange={e => {
                        // Manually handle auto-fill on change to ensure it happens
                        const selectedId = e.target.value;

                        methods.setValue("operasionalId", selectedId);
                        const selectedOp = operasionals?.find(
                          op => op.id === selectedId
                        );

                        if (selectedOp) {
                          if (selectedOp.kandangId)
                            methods.setValue("kandangId", selectedOp.kandangId);
                          if (selectedOp.petugasId)
                            methods.setValue("petugasId", selectedOp.petugasId);
                        }
                      }}
                    />
                  </div>
                )}

                {/* Common Fields */}
                <div className="md:col-span-2">
                  <TextInput
                    required
                    description="Jenis atau kategori pengeluaran"
                    label="Nama Biaya"
                    name="jenisBiaya"
                    placeholder="Masukkan nama/jenis biaya (contoh: Beli Pakan, Listrik, Gaji)"
                  />
                </div>

                <div>
                  <DatePickerInput
                    required
                    label="Tanggal Biaya"
                    name="tanggal"
                  />
                </div>

                <div>
                  <NumberInput
                    required
                    label="Jumlah (Rp)"
                    min={0}
                    name="jumlah"
                    placeholder="Masukkan nominal biaya"
                  />
                </div>

                {/* Conditional Fields for Operasional */}
                {kategoriBiaya === "operasional" && (
                  <>
                    <div>
                      <SelectInput
                        required
                        label="Kandang"
                        name="kandangId"
                        options={kandangsOptions}
                        placeholder="Pilih kandang"
                      />
                    </div>
                    <div>
                      <SelectInput
                        required
                        label="Petugas"
                        name="petugasId"
                        options={petugasOptions}
                        placeholder="Pilih petugas"
                      />
                    </div>
                  </>
                )}

                {/* Optional Fields */}
                <div className="md:col-span-2">
                  <TextareaInput
                    label="Keterangan (Opsional)"
                    name="keterangan"
                    placeholder="Masukkan keterangan tambahan"
                    required={false}
                  />
                </div>

                <div className="md:col-span-2">
                  <TextareaInput
                    label="Catatan (Opsional)"
                    name="catatan"
                    placeholder="Catatan internal"
                    required={false}
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="border border-gray-300 rounded-md p-4 border-dashed relative">
                    <p className="text-sm font-medium mb-2">
                      Bukti Biaya (Foto/Dokumen)
                    </p>

                    {/* Show existing or uploaded preview if possible - for now just the input and maybe a status */}
                    {buktiBase64Value && (
                      <div className="mb-3">
                        <p className="text-xs text-green-600 mb-1">
                          Bukti aktif tersedia (uploaded)
                        </p>
                        <img
                          alt="Preview Bukti"
                          className="h-32 object-contain border rounded bg-gray-50"
                          src={buktiBase64Value}
                        />
                      </div>
                    )}

                    <input
                      accept="image/*"
                      className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-md file:border-0
                         file:text-sm file:font-semibold
                         file:bg-primary/10 file:text-primary
                         hover:file:bg-primary/20
                         cursor-pointer
                       "
                      type="file"
                      onChange={e => {
                        const file = e.target.files?.[0];

                        if (file) {
                          const reader = new FileReader();

                          reader.onloadend = () => {
                            methods.setValue(
                              "buktiBase64",
                              reader.result as string,
                              { shouldDirty: true }
                            );
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Upload bukti pembayaran baru (Max 5MB) untuk mengganti
                      yang lama
                    </p>
                  </div>
                </div>
              </div>

              {/* Form actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <FormActions
                  backHref="/daftar-biaya"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting || updateBiaya.isPending
                  }
                  submitLabel="Update Data Biaya"
                  onReset={() => {
                    methods.reset();
                    // Reset category based on ID again if needed
                  }}
                />
              </div>
            </div>
          )}
        </Card>
      </form>
    </FormProvider>
  );
}

export default BiayaEditForm;
