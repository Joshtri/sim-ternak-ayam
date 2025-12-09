/**
 * Biaya Create Form
 * Form for creating new biaya data
 */

import type { BiayaFormData } from "./helpers";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useEffect, useState } from "react";

import { useCreateBiaya } from "../hooks/useBiaya";

import {
  getDefaultBiayaFormValues,
  transformBiayaFormData,
  transformUsersToOptions,
  transformOperasionalsToOptions,
  transformKandangsToOptions,
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

export function BiayaCreateForm() {
  const navigate = useNavigate();
  const createBiaya = useCreateBiaya();
  const { data: currentUser } = useCurrentUser<ICurrentUser>();

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
  const methods = useForm<BiayaFormData>({
    defaultValues: getDefaultBiayaFormValues(),
    mode: "onBlur",
  });

  // Watch fields
  const selectedOperasionalId = useWatch({
    control: methods.control,
    name: "operasionalId",
  });

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

  // Effect: Auto-populate fields based on selected Operasional
  useEffect(() => {
    if (
      kategoriBiaya === "operasional" &&
      selectedOperasionalId &&
      operasionals
    ) {
      const selectedOp = operasionals.find(
        op => op.id === selectedOperasionalId
      );

      if (selectedOp) {
        if (selectedOp.kandangId) {
          methods.setValue("kandangId", selectedOp.kandangId);
        }
        if (selectedOp.petugasId) {
          methods.setValue("petugasId", selectedOp.petugasId);
        }
      }
    }
  }, [selectedOperasionalId, operasionals, kategoriBiaya, methods]);

  // Effect: Handle Category Change
  useEffect(() => {
    if (kategoriBiaya === "pembelian") {
      // Clear specific fields
      methods.setValue("operasionalId", "");
      methods.setValue("kandangId", "");

      // Auto-set current user as petugas
      if (currentUser?.id) {
        methods.setValue("petugasId", currentUser.id);
      }
    } else {
      // Reset petugas if switching back to operasional (user must select operasional to auto-fill)
      // methods.setValue("petugasId", "");
    }
  }, [kategoriBiaya, currentUser, methods]);

  const onSubmit = async (data: BiayaFormData) => {
    try {
      // Manual validation based on category
      if (kategoriBiaya === "operasional" && !data.operasionalId) {
        methods.setError("operasionalId", {
          message: "Harap pilih kegiatan operasional",
        });

        return;
      }

      const transformedData = transformBiayaFormData(data, kategoriBiaya);

      console.log("Submitting biaya data:", transformedData);
      await createBiaya.mutateAsync(transformedData);
      console.log("Biaya data created successfully!");
      navigate({ to: "/daftar-biaya" });
    } catch (error) {
      console.error("Error creating biaya data:", error);
    }
  };

  // Check if any data is loading
  const isLoadingAnyData =
    isLoadingUsers || isLoadingOperasionals || isLoadingKandangs;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className={isLoadingAnyData ? "p-0" : "p-6"}>
          {isLoadingAnyData ? (
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
                      onChange={() => setKategoriBiaya("operasional")}
                    />
                    <span className="text-sm">Pengeluaran Operasional</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      checked={kategoriBiaya === "pembelian"}
                      className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      type="radio"
                      value="pembelian"
                      onChange={() => setKategoriBiaya("pembelian")}
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

                {/* Month/Year - Auto calculated usually but editable */}
                {/* Keeping them hidden or visible based on preference, defaulting to visible as per schema */}
                {/* Schema had them as optional number inputs. Let's keep them if user wants to override */}
                {/* 
                <div>
                  <NumberInput label="Bulan" name="bulan" min={1} max={12} placeholder="1-12" />
                </div>
                <div>
                   <NumberInput label="Tahun" name="tahun" min={2020} max={2100} placeholder="YYYY" />
                </div> 
                */}

                {/* Optional Fields */}
                <div className="md:col-span-2">
                  <TextareaInput
                    label="Keterangan (Opsional)"
                    name="keterangan"
                    placeholder="Masukkan keterangan tambahan"
                  />
                </div>

                <div className="md:col-span-2">
                  <TextareaInput
                    label="Catatan (Opsional)"
                    name="catatan"
                    placeholder="Catatan internal"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="border border-gray-300 rounded-md p-4 border-dashed relative">
                    <p className="text-sm font-medium mb-2">
                      Bukti Biaya (Foto/Dokumen)
                    </p>

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
                              reader.result as string
                            );
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Upload bukti pembayaran (Max 5MB)
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
                    methods.formState.isSubmitting || createBiaya.isPending
                  }
                  submitLabel="Simpan Data Biaya"
                  onReset={() => methods.reset()}
                />
              </div>
            </div>
          )}
        </Card>
      </form>
    </FormProvider>
  );
}

export default BiayaCreateForm;
