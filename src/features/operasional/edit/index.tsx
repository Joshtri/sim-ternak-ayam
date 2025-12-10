/**
 * Operasional Edit Form
 * Form for editing existing operasional data
 */

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import {
  useUpdateOperasional,
  useOperasionalById,
  useOperasionalFormData,
  useValidateStock,
} from "../hooks/useOperasional";

import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { useUsers } from "@/features/users-management/hooks/useUsers";
import { Card } from "@/components/ui/Card";
import { SkeletonForm } from "@/components/ui";
import FormActions from "@/components/ui/Form/FormActions";
import { SelectInput } from "@/components/ui/Inputs/SelectInput";
import { DatePickerInput } from "@/components/ui/Inputs/DatePickerInput";
import { NumberInput } from "@/components/ui/Inputs/NumberInput";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/utils/showToast";

type ResourceType = "none" | "pakan" | "vaksin";

interface OperasionalFormData {
  jenisKegiatanId: string;
  tanggal: string;
  jumlah: number;
  petugasId: string;
  kandangId: string;
  resourceType: ResourceType;
  pakanId?: string;
  vaksinId?: string;
}

export function OperasionalEditForm() {
  const navigate = useNavigate();
  const { idEdit } = useParams({ strict: false }) as { idEdit: string };

  const updateOperasional = useUpdateOperasional();
  const validateStock = useValidateStock();

  // Fetch existing data
  const { data: operasional, isLoading: isLoadingOperasional } =
    useOperasionalById(idEdit);

  // Use single hook for form options data
  const { data: formData, isLoading: isLoadingFormData } =
    useOperasionalFormData();

  // Extract data from formData response
  const jenisKegiatans = formData?.jenisKegiatan || [];
  const vaksins = formData?.vaksins || [];
  const pakans = formData?.pakans || [];

  const { data: kandangs, isLoading: isLoadingKandangs } = useKandangs();
  const { data: users, isLoading: isLoadingUsers } = useUsers({
    role: "petugas",
  });

  // Initialize react-hook-form
  const methods = useForm<OperasionalFormData>({
    defaultValues: {
      jenisKegiatanId: "",
      tanggal: new Date().toISOString().split("T")[0],
      jumlah: 0,
      petugasId: "",
      kandangId: "",
      resourceType: "none",
      pakanId: "",
      vaksinId: "",
    },
    mode: "onChange",
  });

  // Populate form when data is loaded
  useEffect(() => {
    if (operasional) {
      // Determine resource type
      let rType: ResourceType = "none";

      if (operasional.pakanId) rType = "pakan";
      if (operasional.vaksinId) rType = "vaksin";

      methods.reset({
        jenisKegiatanId: operasional.jenisKegiatanId,
        tanggal: operasional.tanggal?.split("T")[0] || "",
        jumlah: operasional.jumlah || 0,
        petugasId: operasional.petugasId,
        kandangId: operasional.kandangId,
        resourceType: rType,
        pakanId: operasional.pakanId || "",
        vaksinId: operasional.vaksinId || "",
      });
    }
  }, [operasional, methods]);

  // Watch form fields
  const selectedJenisKegiatanId = useWatch({
    control: methods.control,
    name: "jenisKegiatanId",
  });
  const resourceType = useWatch({
    control: methods.control,
    name: "resourceType",
  });
  const selectedPakanId = useWatch({
    control: methods.control,
    name: "pakanId",
  });
  const selectedVaksinId = useWatch({
    control: methods.control,
    name: "vaksinId",
  });
  const jumlahValue = useWatch({ control: methods.control, name: "jumlah" });

  // Determine if this activity requires pakan or vaksin based on radio selection
  const requiresPakan = resourceType === "pakan";
  const requiresVaksin = resourceType === "vaksin";

  // Selected resource details from local data
  const selectedPakan = useMemo(
    () => pakans.find((p: any) => p.id === selectedPakanId),
    [pakans, selectedPakanId]
  );

  const selectedVaksin = useMemo(
    () => vaksins.find((v: any) => v.id === selectedVaksinId),
    [vaksins, selectedVaksinId]
  );

  // Clear pakan/vaksin when resource type changes
  useEffect(() => {
    // Only clear if the user actively changes the type (we might need improved logic to avoid clearing on initial load, but reset() handles initial load)
    if (!requiresPakan && methods.getValues("pakanId"))
      methods.setValue("pakanId", "");
    if (!requiresVaksin && methods.getValues("vaksinId"))
      methods.setValue("vaksinId", "");
  }, [requiresPakan, requiresVaksin, methods]);

  // Real-time stock validation effect
  const [stockValidationMsg, setStockValidationMsg] = useState<string | null>(
    null
  );

  useEffect(() => {
    const checkStock = async () => {
      // Logic for Edit: We simply check if the NEW amount is valid.
      // NOTE: This does not account for restoring the OLD amount.
      // Ideally backend handles "update" validation logic.
      // For now, we reuse the same validation as Create, which might be stricter than necessary
      // (e.g. if I have 0 stock left but I am editing a record that uses 10, I should be able to keep 10).
      // We will skip client-side strict blocking if it's too complex, or we try best effort.

      if (
        (requiresPakan && selectedPakanId) ||
        (requiresVaksin && selectedVaksinId)
      ) {
        if (jumlahValue > 0) {
          try {
            const result = await validateStock.mutateAsync({
              vaksinId: requiresVaksin ? selectedVaksinId : undefined,
              pakanId: requiresPakan ? selectedPakanId : undefined,
              jumlah: Number(jumlahValue),
            });

            if (!result.success) {
              // On Edit: If validation fails, we might check if it is "our own" usage causing it?
              // The API simple says "not enough stock".
              // We'll show the warning but we won't BLOCK submission in frontend for Edit if possible,
              // or we assume user is increasing amount beyond limit.
              setStockValidationMsg(result.message);
              // methods.setError("jumlah", { message: result.message }); // Optional: uncomment to block
            } else {
              setStockValidationMsg(null);
              methods.clearErrors("jumlah");
            }
          } catch (e: any) {
            console.error("Stock validation check failed", e);
            // Don't block editing on validation error
            // setStockValidationMsg(e.message || "Validasi stok gagal");
          }
        }
      } else {
        setStockValidationMsg(null);
        methods.clearErrors("jumlah");
      }
    };

    // Check immediately if we have all values, otherwise debounce
    if (jumlahValue > 0 && (selectedPakanId || selectedVaksinId)) {
      const timeoutId = setTimeout(checkStock, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setStockValidationMsg(null);
      methods.clearErrors("jumlah");
    }
  }, [
    jumlahValue,
    selectedPakanId,
    selectedVaksinId,
    requiresPakan,
    requiresVaksin,
    // Removed validateStock and methods to avoid infinite loop
  ]);

  // Auto-fill petugas based on selected kandang
  const selectedKandangId = useWatch({
    control: methods.control,
    name: "kandangId",
  });

  useEffect(() => {
    // Only auto-fill if the selectedKandang changes and is not the initial one from loaded data
    // Or strictly follow current selection.
    if (selectedKandangId && kandangs) {
      const selectedKandang = kandangs.find(k => k.id === selectedKandangId);

      if (selectedKandang && selectedKandang.petugasId) {
        // Only set if current petugasId is empty to avoid overwriting existing data on load?
        // Or overwrite if kandang changes?
        // Let's check against current form value
        const currentPetugas = methods.getValues("petugasId");

        if (!currentPetugas) {
          methods.setValue("petugasId", selectedKandang.petugasId);
        }
      }
    }
  }, [selectedKandangId, kandangs, methods]);

  // Transform data to select options
  const jenisKegiatanOptions = useMemo(() => {
    return jenisKegiatans.map((jk: any) => ({
      label: jk.nama || jk.namaKegiatan,
      value: jk.id,
      description: jk.deskripsi,
    }));
  }, [jenisKegiatans]);

  const kandangOptions = useMemo(() => {
    if (!kandangs) return [];

    return kandangs.map(k => ({
      label: `${k.namaKandang} - ${k.petugasNama || "Tanpa Petugas"}`,
      value: k.id,
      description: `Kapasitas: ${k.kapasitas.toLocaleString("id-ID")} ekor - ${k.lokasi}`,
    }));
  }, [kandangs]);

  const petugasOptions = useMemo(() => {
    if (!users) return [];

    return users.map(u => ({
      label: u.fullName,
      value: u.id,
      description: u.email,
    }));
  }, [users]);

  const pakanOptions = useMemo(() => {
    return pakans.map((p: any) => ({
      label: p.info || `${p.namaPakan} - Sisa: ${p.stokTersisaKg} kg`,
      value: p.id,
      description: p.statusStok ? `Status: ${p.statusStok}` : undefined,
    }));
  }, [pakans]);

  const vaksinOptions = useMemo(() => {
    return vaksins.map((v: any) => ({
      label: v.info || `${v.namaVaksin} - Sisa: ${v.stokTersisa}`,
      value: v.id,
      description: v.statusStok ? `Status: ${v.statusStok}` : undefined,
    }));
  }, [vaksins]);

  // Get dynamic label for jumlah field
  const jumlahLabel = useMemo(() => {
    if (requiresPakan) return "Jumlah (kg)";
    if (requiresVaksin) return "Jumlah (dosis)";

    return "Jumlah";
  }, [requiresPakan, requiresVaksin]);

  // Get available stock (from local data)
  const availableStock = useMemo(() => {
    if (requiresPakan && selectedPakan)
      return selectedPakan.stokTersisaKg ?? selectedPakan.stokKg;
    if (requiresVaksin && selectedVaksin)
      return selectedVaksin.stokTersisa ?? selectedVaksin.stok;

    return null;
  }, [requiresPakan, requiresVaksin, selectedPakan, selectedVaksin]);

  // Handle form submission
  const onSubmit = async (data: OperasionalFormData) => {
    try {
      // Validate pakan/vaksin selection
      if (requiresPakan && !data.pakanId) {
        methods.setError("pakanId", { message: "Pakan harus dipilih" });

        return;
      }

      if (requiresVaksin && !data.vaksinId) {
        methods.setError("vaksinId", { message: "Vaksin harus dipilih" });

        return;
      }

      // Transform operasional data
      const operasionalData: Partial<UpdateOperasionalDto> = {
        id: idEdit,
        jenisKegiatanId: data.jenisKegiatanId,
        tanggal: data.tanggal,
        jumlah: Number(data.jumlah),
        petugasId: data.petugasId,
        kandangId: data.kandangId,
      };

      // Add optional fields
      if (data.pakanId && data.pakanId !== "") {
        operasionalData.pakanId = data.pakanId;
      } else {
        operasionalData.pakanId = undefined; // Ensure we clear it if switched to none
      }

      if (data.vaksinId && data.vaksinId !== "") {
        operasionalData.vaksinId = data.vaksinId;
      } else {
        operasionalData.vaksinId = undefined;
      }

      // Update operasional
      await updateOperasional.mutateAsync({
        id: idEdit,
        data: operasionalData,
      });

      showToast({
        title: "Sukses",
        description: "Data operasional berhasil diperbarui",
        color: "success",
      });
      navigate({ to: "/daftar-operasional" });
    } catch (error: any) {
      console.error("Error updating operasional:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Terjadi kesalahan saat memperbarui data";

      showToast({
        title: "Gagal",
        description: errorMessage,
        color: "error",
      });
    }
  };

  // Check if any data is loading
  const isLoadingAnyData =
    isLoadingFormData ||
    isLoadingKandangs ||
    isLoadingUsers ||
    isLoadingOperasional;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className={isLoadingAnyData ? "p-0" : "p-6"}>
          {isLoadingAnyData ? (
            <SkeletonForm fields={8} />
          ) : (
            <>
              <div className="space-y-6">
                {/* Section Title */}
                <div>
                  <h3 className="text-lg font-semibold">
                    Edit Informasi Kegiatan Operasional
                  </h3>
                  <p className="text-sm text-gray-600">
                    Perbarui detail kegiatan harian peternakan
                  </p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Jenis Kegiatan */}
                  <div className="md:col-span-2">
                    <SelectInput
                      required
                      description="Pilih jenis kegiatan yang akan dilakukan"
                      label="Jenis Kegiatan"
                      name="jenisKegiatanId"
                      options={jenisKegiatanOptions}
                      placeholder="Pilih jenis kegiatan"
                    />
                  </div>

                  {/* Tanggal */}
                  <div>
                    <DatePickerInput
                      required
                      label="Tanggal Kegiatan"
                      name="tanggal"
                    />
                    <p className="text-tiny text-gray-400 mt-1 ml-1">
                      Tanggal pelaksanaan kegiatan
                    </p>
                  </div>

                  {/* Kandang */}
                  <div>
                    <SelectInput
                      required
                      description="Pilih kandang tempat kegiatan dilakukan"
                      label="Kandang"
                      name="kandangId"
                      options={kandangOptions}
                      placeholder="Pilih kandang"
                    />
                  </div>

                  {/* Petugas */}
                  <div className="md:col-span-2">
                    <SelectInput
                      required
                      description="Pilih petugas yang melakukan kegiatan"
                      label="Petugas"
                      name="petugasId"
                      options={petugasOptions}
                      placeholder="Pilih petugas"
                    />
                  </div>

                  {/* Resource Type Selection (Radio) */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-3">
                      Apakah kegiatan ini menggunakan stok?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          checked={resourceType === "none"}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                          type="radio"
                          value="none"
                          onChange={e =>
                            methods.setValue(
                              "resourceType",
                              e.target.value as ResourceType
                            )
                          }
                        />
                        <span className="text-sm">Tidak menggunakan stok</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          checked={resourceType === "pakan"}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                          type="radio"
                          value="pakan"
                          onChange={e =>
                            methods.setValue(
                              "resourceType",
                              e.target.value as ResourceType
                            )
                          }
                        />
                        <span className="text-sm">Menggunakan Pakan</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          checked={resourceType === "vaksin"}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                          type="radio"
                          value="vaksin"
                          onChange={e =>
                            methods.setValue(
                              "resourceType",
                              e.target.value as ResourceType
                            )
                          }
                        />
                        <span className="text-sm">Menggunakan Vaksin</span>
                      </label>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Pilih apakah kegiatan ini memerlukan pakan atau vaksin
                      dari stok
                    </p>
                  </div>

                  {/* Conditional: Pakan Field */}
                  {requiresPakan && (
                    <div className="md:col-span-2">
                      <SelectInput
                        required
                        description="Pilih pakan yang akan digunakan"
                        label="Pilih Pakan"
                        name="pakanId"
                        options={pakanOptions}
                        placeholder="Pilih jenis pakan"
                      />
                    </div>
                  )}

                  {/* Conditional: Vaksin Field */}
                  {requiresVaksin && (
                    <div className="md:col-span-2">
                      <SelectInput
                        required
                        description="Pilih vaksin yang akan digunakan"
                        label="Pilih Vaksin"
                        name="vaksinId"
                        options={vaksinOptions}
                        placeholder="Pilih jenis vaksin"
                      />
                    </div>
                  )}

                  {/* Stock Display */}
                  {(requiresPakan || requiresVaksin) &&
                    availableStock !== null && (
                      <div className="md:col-span-2">
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-900">
                              Stok Tersedia:
                            </span>
                            <span className="text-sm font-bold text-blue-900">
                              {availableStock.toLocaleString("id-ID")}{" "}
                              {requiresPakan ? "kg" : "dosis"}
                              {selectedPakan?.statusStok && (
                                <Badge
                                  className="ml-2"
                                  color={
                                    selectedPakan.statusStok === "Aman"
                                      ? "success"
                                      : "danger"
                                  }
                                  variant="flat"
                                >
                                  {selectedPakan.statusStok}
                                </Badge>
                              )}
                              {selectedVaksin?.statusStok && (
                                <Badge
                                  className="ml-2"
                                  color={
                                    selectedVaksin.statusStok === "Aman"
                                      ? "success"
                                      : "danger"
                                  }
                                  variant="flat"
                                >
                                  {selectedVaksin.statusStok}
                                </Badge>
                              )}
                            </span>
                          </div>

                          {jumlahValue > 0 && (
                            <div className="flex items-center justify-between border-t border-blue-200 pt-2">
                              <span className="text-sm font-medium text-blue-900">
                                Estimasi Sisa Stok:
                              </span>
                              <Badge
                                color={
                                  availableStock - jumlahValue < 0
                                    ? "danger"
                                    : "success"
                                }
                                variant="flat"
                              >
                                {(availableStock - jumlahValue).toLocaleString(
                                  "id-ID"
                                )}{" "}
                                {requiresPakan ? "kg" : "dosis"}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  {/* Jumlah */}
                  <div className="md:col-span-2">
                    <NumberInput
                      required
                      label={jumlahLabel}
                      min={1}
                      name="jumlah"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {stockValidationMsg ||
                        (availableStock !== null
                          ? `Maksimal: ${availableStock.toLocaleString("id-ID")}`
                          : "Jumlah/quantity kegiatan yang dilakukan")}
                    </p>
                    {stockValidationMsg && (
                      <p className="mt-1 text-sm text-red-600">
                        {stockValidationMsg}
                      </p>
                    )}
                  </div>
                </div>
              </div>

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
                  onReset={() => {
                    methods.reset();
                    // Refetch original to reset properly
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

export default OperasionalEditForm;
