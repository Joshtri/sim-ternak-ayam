/**
 * Enhanced Operasional Create Form
 * Form for creating new operasional data with dynamic fields and biaya integration
 */

import type { CreateOperasionalDto } from "../types";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";

import { useCreateOperasional } from "../hooks/useOperasional";

import { useJenisKegiatans } from "@/features/jenis-kegiatan/hooks/useJenisKegiatan";
import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { useUsers } from "@/features/users-management/hooks/useUsers";
import { usePakans } from "@/features/pakan/hooks/usePakan";
import { useVaksins } from "@/features/vaksin/hooks/useVaksin";
import { usePakanById } from "@/features/pakan/hooks/usePakan";
import { useVaksinById } from "@/features/vaksin/hooks/useVaksin";
import { Card } from "@/components/ui/Card";
import { SkeletonForm } from "@/components/ui";
import FormActions from "@/components/ui/Form/FormActions";
import { SelectInput } from "@/components/ui/Inputs/SelectInput";
import { DatePickerInput } from "@/components/ui/Inputs/DatePickerInput";
import { NumberInput } from "@/components/ui/Inputs/NumberInput";
import { Badge } from "@/components/ui/Badge";

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
  biayaJumlah?: number;
  jenisBiaya?: string;
}

export function OperasionalCreateForm() {
  const navigate = useNavigate();
  const createOperasional = useCreateOperasional();
  // const createBiaya = useCreateBiaya();

  // Fetch data for dropdowns
  const { data: jenisKegiatans, isLoading: isLoadingJenisKegiatans } =
    useJenisKegiatans();
  const { data: kandangs, isLoading: isLoadingKandangs } = useKandangs();
  const { data: users, isLoading: isLoadingUsers } = useUsers({
    role: "petugas",
  });
  const { data: pakans, isLoading: isLoadingPakans } = usePakans();
  const { data: vaksins, isLoading: isLoadingVaksins } = useVaksins();

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
      biayaJumlah: 0,
      jenisBiaya: "",
    },
    mode: "onChange",
  });

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
  // const selectedTanggal = useWatch({
  //   control: methods.control,
  //   name: "tanggal",
  // });
  const jumlahValue = useWatch({ control: methods.control, name: "jumlah" });

  // Get selected jenis kegiatan details
  const selectedJenisKegiatan = useMemo(() => {
    if (!jenisKegiatans || !selectedJenisKegiatanId) return null;

    return jenisKegiatans.find(jk => jk.id === selectedJenisKegiatanId);
  }, [jenisKegiatans, selectedJenisKegiatanId]);

  // Determine if this activity requires pakan or vaksin based on radio selection
  const requiresPakan = resourceType === "pakan";
  const requiresVaksin = resourceType === "vaksin";
  // const requiresBiaya = requiresPakan || requiresVaksin;

  // Fetch stock data for selected pakan
  const { data: selectedPakan } = usePakanById(
    selectedPakanId || "",
    !!selectedPakanId && requiresPakan
  );

  // Fetch stock data for selected vaksin
  const { data: selectedVaksin } = useVaksinById(
    selectedVaksinId || "",
    !!selectedVaksinId && requiresVaksin
  );

  // Auto-fill jenisBiaya removed as it's no longer needed for manual input

  // Clear pakan/vaksin when resource type changes
  useEffect(() => {
    if (!requiresPakan) {
      methods.setValue("pakanId", "");
    }
    if (!requiresVaksin) {
      methods.setValue("vaksinId", "");
    }
  }, [requiresPakan, requiresVaksin, methods]);

  // Auto-fill petugas based on selected kandang
  const selectedKandangId = useWatch({
    control: methods.control,
    name: "kandangId",
  });

  useEffect(() => {
    if (selectedKandangId && kandangs) {
      const selectedKandang = kandangs.find(k => k.id === selectedKandangId);

      if (selectedKandang && selectedKandang.petugasId) {
        methods.setValue("petugasId", selectedKandang.petugasId);
      }
    }
  }, [selectedKandangId, kandangs, methods]);

  // Transform data to select options
  const jenisKegiatanOptions = useMemo(() => {
    if (!jenisKegiatans) return [];

    return jenisKegiatans.map(jk => ({
      label: jk.namaKegiatan,
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
    if (!pakans) return [];

    return pakans.map(p => ({
      label: `${p.namaPakan} (Periode: ${p.bulan}/${p.tahun})`,
      value: p.id,
      description: `Stok: ${p.stokKg.toLocaleString("id-ID")} kg`,
    }));
  }, [pakans]);

  const vaksinOptions = useMemo(() => {
    if (!vaksins) return [];

    return vaksins.map(v => ({
      label: `${v.namaVaksin} (Periode: ${v.bulan}/${v.tahun})`,
      value: v.id,
      description: `Stok: ${v.stok.toLocaleString("id-ID")} dosis`,
    }));
  }, [vaksins]);

  // Get dynamic label for jumlah field
  const jumlahLabel = useMemo(() => {
    if (requiresPakan) return "Jumlah (kg)";
    if (requiresVaksin) return "Jumlah (dosis)";

    return "Jumlah";
  }, [requiresPakan, requiresVaksin, selectedJenisKegiatan]);

  // Get available stock
  const availableStock = useMemo(() => {
    if (requiresPakan && selectedPakan) return selectedPakan.stokKg;
    if (requiresVaksin && selectedVaksin) return selectedVaksin.stok;

    return null;
  }, [requiresPakan, requiresVaksin, selectedPakan, selectedVaksin]);

  // Validate stock
  const stockError = useMemo(() => {
    if (availableStock !== null && jumlahValue > availableStock) {
      return `Jumlah melebihi stok tersedia (${availableStock.toLocaleString("id-ID")})`;
    }

    return null;
  }, [availableStock, jumlahValue]);

  // Handle form submission
  const onSubmit = async (data: OperasionalFormData) => {
    try {
      // Validate stock before submission
      if (stockError) {
        methods.setError("jumlah", { message: stockError });

        return;
      }

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
      const operasionalData: Partial<CreateOperasionalDto> = {
        jenisKegiatanId: data.jenisKegiatanId,
        tanggal: data.tanggal,
        jumlah: Number(data.jumlah),
        petugasId: data.petugasId,
        kandangId: data.kandangId,
      };

      // Add optional fields
      if (data.pakanId && data.pakanId !== "") {
        operasionalData.pakanId = data.pakanId;
      }

      if (data.vaksinId && data.vaksinId !== "") {
        operasionalData.vaksinId = data.vaksinId;
      }

      // Create operasional first (biaya created automatically on backend)
      await createOperasional.mutateAsync(operasionalData);

      // Navigate back to list
      navigate({ to: "/daftar-operasional" });
    } catch (error) {
      console.error("Error creating operasional:", error);
    }
  };

  // Check if any data is loading
  const isLoadingAnyData =
    isLoadingJenisKegiatans ||
    isLoadingKandangs ||
    isLoadingUsers ||
    isLoadingPakans ||
    isLoadingVaksins;

  // Calculate estimated cost

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
                    Informasi Kegiatan Operasional
                  </h3>
                  <p className="text-sm text-gray-600">
                    Masukkan detail kegiatan harian peternakan
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
                              Stok Awal (Periode{" "}
                              {requiresPakan && selectedPakan
                                ? `${selectedPakan.bulan}/${selectedPakan.tahun}`
                                : requiresVaksin && selectedVaksin
                                  ? `${selectedVaksin.bulan}/${selectedVaksin.tahun}`
                                  : "-"}
                              ):
                            </span>
                            <span className="text-sm font-bold text-blue-900">
                              {availableStock.toLocaleString("id-ID")}{" "}
                              {requiresPakan ? "kg" : "dosis"}
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
                      {stockError ||
                        (availableStock !== null
                          ? `Maksimal: ${availableStock.toLocaleString("id-ID")}`
                          : "Jumlah/quantity kegiatan yang dilakukan")}
                    </p>
                    {stockError && (
                      <p className="mt-1 text-sm text-red-600">{stockError}</p>
                    )}
                  </div>

                  {/* Information Note */}
                  <div className="md:col-span-2 mt-2">
                    <p className="text-xs text-gray-500 italic">
                      * Catatan: Data biaya akan dibuat otomatis oleh sistem
                      berdasarkan jenis kegiatan dan jumlah yang diinputkan.
                    </p>
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
                    createOperasional.isPending
                  }
                  submitLabel="Simpan Data Operasional"
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

export default OperasionalCreateForm;
