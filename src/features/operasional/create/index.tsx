/**
 * Enhanced Operasional Create Form
 * Form for creating new operasional data with dynamic fields and biaya integration
 */

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";

import { useCreateOperasional } from "../hooks/useOperasional";
import { useCreateBiaya } from "@/features/biaya/hooks/useBiaya";
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

import type { CreateOperasionalDto } from "../types";
import type { CreateBiayaDto } from "@/features/biaya/types";

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
  const createBiaya = useCreateBiaya();

  // Fetch data for dropdowns
  const { data: jenisKegiatans, isLoading: isLoadingJenisKegiatans } = useJenisKegiatans();
  const { data: kandangs, isLoading: isLoadingKandangs } = useKandangs();
  const { data: users, isLoading: isLoadingUsers } = useUsers({ role: "petugas" });
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
  const selectedJenisKegiatanId = useWatch({ control: methods.control, name: "jenisKegiatanId" });
  const resourceType = useWatch({ control: methods.control, name: "resourceType" });
  const selectedPakanId = useWatch({ control: methods.control, name: "pakanId" });
  const selectedVaksinId = useWatch({ control: methods.control, name: "vaksinId" });
  const selectedTanggal = useWatch({ control: methods.control, name: "tanggal" });
  const jumlahValue = useWatch({ control: methods.control, name: "jumlah" });

  // Get selected jenis kegiatan details
  const selectedJenisKegiatan = useMemo(() => {
    if (!jenisKegiatans || !selectedJenisKegiatanId) return null;
    return jenisKegiatans.find(jk => jk.id === selectedJenisKegiatanId);
  }, [jenisKegiatans, selectedJenisKegiatanId]);

  // Determine if this activity requires pakan or vaksin based on radio selection
  const requiresPakan = resourceType === "pakan";
  const requiresVaksin = resourceType === "vaksin";
  const requiresBiaya = requiresPakan || requiresVaksin;

  // Fetch stock data for selected pakan
  const { data: selectedPakan } = usePakanById(selectedPakanId || "", !!selectedPakanId && requiresPakan);

  // Fetch stock data for selected vaksin
  const { data: selectedVaksin } = useVaksinById(selectedVaksinId || "", !!selectedVaksinId && requiresVaksin);

  // Auto-fill jenisBiaya when resource type changes
  useEffect(() => {
    if (requiresPakan) {
      methods.setValue("jenisBiaya", "Pakan");
    } else if (requiresVaksin) {
      methods.setValue("jenisBiaya", "Vaksin");
    } else {
      methods.setValue("jenisBiaya", "");
      methods.setValue("biayaJumlah", 0);
    }
  }, [requiresPakan, requiresVaksin, methods]);

  // Clear pakan/vaksin when resource type changes
  useEffect(() => {
    if (!requiresPakan) {
      methods.setValue("pakanId", "");
    }
    if (!requiresVaksin) {
      methods.setValue("vaksinId", "");
    }
  }, [requiresPakan, requiresVaksin, methods]);

  // Transform data to select options
  const jenisKegiatanOptions = useMemo(() => {
    if (!jenisKegiatans) return [];
    return jenisKegiatans.map(jk => ({
      label: jk.namaKegiatan,
      value: jk.id,
      description: `${jk.deskripsi} (${jk.satuan})`,
    }));
  }, [jenisKegiatans]);

  const kandangOptions = useMemo(() => {
    if (!kandangs) return [];
    return kandangs.map(k => ({
      label: k.namaKandang,
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
      label: p.namaPakan,
      value: p.id,
      description: `Stok: ${p.stokKg.toLocaleString("id-ID")} kg`,
    }));
  }, [pakans]);

  const vaksinOptions = useMemo(() => {
    if (!vaksins) return [];
    return vaksins.map(v => ({
      label: v.namaVaksin,
      value: v.id,
      description: `Stok: ${v.stok.toLocaleString("id-ID")} dosis`,
    }));
  }, [vaksins]);

  // Get dynamic label for jumlah field
  const jumlahLabel = useMemo(() => {
    if (requiresPakan) return "Jumlah (kg)";
    if (requiresVaksin) return "Jumlah (dosis)";
    return selectedJenisKegiatan ? `Jumlah (${selectedJenisKegiatan.satuan})` : "Jumlah";
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

      // Validate biaya for activities that require stock
      if (requiresBiaya && (!data.biayaJumlah || data.biayaJumlah <= 0)) {
        methods.setError("biayaJumlah", {
          message: "Biaya harus diisi untuk kegiatan yang menggunakan stok"
        });
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

      console.log("Submitting operasional data:", operasionalData);

      // Create operasional first
      const createdOperasional = await createOperasional.mutateAsync(operasionalData);

      console.log("Operasional created:", createdOperasional);

      // If this activity requires biaya, create biaya record
      if (requiresBiaya && data.biayaJumlah && data.biayaJumlah > 0) {
        const biayaData: Partial<CreateBiayaDto> = {
          jenisBiaya: data.jenisBiaya || "",
          tanggal: data.tanggal,
          jumlah: Number(data.biayaJumlah),
          petugasId: data.petugasId,
          operasionalId: (createdOperasional as any).id || (createdOperasional as any).data?.id,
        };

        console.log("Submitting biaya data:", biayaData);

        await createBiaya.mutateAsync(biayaData);

        console.log("Biaya created successfully!");
      }

      console.log("All data created successfully!");

      // Navigate back to list
      navigate({ to: "/daftar-operasional" });
    } catch (error) {
      console.error("Error creating operasional/biaya:", error);
    }
  };

  // Check if any data is loading
  const isLoadingAnyData =
    isLoadingJenisKegiatans ||
    isLoadingKandangs ||
    isLoadingUsers ||
    isLoadingPakans ||
    isLoadingVaksins;

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
                  <h3 className="text-lg font-semibold">Informasi Kegiatan Operasional</h3>
                  <p className="text-sm text-gray-600">
                    Masukkan detail kegiatan harian peternakan
                  </p>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Jenis Kegiatan */}
                  <div className="md:col-span-2">
                    <SelectInput
                      name="jenisKegiatanId"
                      label="Jenis Kegiatan"
                      placeholder="Pilih jenis kegiatan"
                      options={jenisKegiatanOptions}
                      required
                      helperText="Pilih jenis kegiatan yang akan dilakukan"
                    />
                  </div>

                  {/* Tanggal */}
                  <div>
                    <DatePickerInput
                      name="tanggal"
                      label="Tanggal Kegiatan"
                      required
                      helperText="Tanggal pelaksanaan kegiatan"
                    />
                  </div>

                  {/* Kandang */}
                  <div>
                    <SelectInput
                      name="kandangId"
                      label="Kandang"
                      placeholder="Pilih kandang"
                      options={kandangOptions}
                      required
                      helperText="Pilih kandang tempat kegiatan dilakukan"
                    />
                  </div>

                  {/* Petugas */}
                  <div className="md:col-span-2">
                    <SelectInput
                      name="petugasId"
                      label="Petugas"
                      placeholder="Pilih petugas"
                      options={petugasOptions}
                      required
                      helperText="Pilih petugas yang melakukan kegiatan"
                    />
                  </div>

                  {/* Resource Type Selection (Radio) */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-3">
                      Apakah kegiatan ini menggunakan stok? <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="none"
                          checked={resourceType === "none"}
                          onChange={(e) => methods.setValue("resourceType", e.target.value as ResourceType)}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <span className="text-sm">Tidak menggunakan stok</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="pakan"
                          checked={resourceType === "pakan"}
                          onChange={(e) => methods.setValue("resourceType", e.target.value as ResourceType)}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <span className="text-sm">Menggunakan Pakan</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          value="vaksin"
                          checked={resourceType === "vaksin"}
                          onChange={(e) => methods.setValue("resourceType", e.target.value as ResourceType)}
                          className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                        />
                        <span className="text-sm">Menggunakan Vaksin</span>
                      </label>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Pilih apakah kegiatan ini memerlukan pakan atau vaksin dari stok
                    </p>
                  </div>

                  {/* Conditional: Pakan Field */}
                  {requiresPakan && (
                    <div className="md:col-span-2">
                      <SelectInput
                        name="pakanId"
                        label="Pilih Pakan"
                        placeholder="Pilih jenis pakan"
                        options={pakanOptions}
                        required
                        helperText="Pilih pakan yang akan digunakan"
                      />
                    </div>
                  )}

                  {/* Conditional: Vaksin Field */}
                  {requiresVaksin && (
                    <div className="md:col-span-2">
                      <SelectInput
                        name="vaksinId"
                        label="Pilih Vaksin"
                        placeholder="Pilih jenis vaksin"
                        options={vaksinOptions}
                        required
                        helperText="Pilih vaksin yang akan digunakan"
                      />
                    </div>
                  )}

                  {/* Stock Display */}
                  {(requiresPakan || requiresVaksin) && availableStock !== null && (
                    <div className="md:col-span-2">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-900">
                            Sisa stok bulan ini:
                          </span>
                          <Badge
                            color={availableStock < 50 ? "danger" : "success"}
                            variant="flat"
                          >
                            {availableStock.toLocaleString("id-ID")} {requiresPakan ? "kg" : "dosis"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Jumlah */}
                  <div className="md:col-span-2">
                    <NumberInput
                      name="jumlah"
                      label={jumlahLabel}
                      placeholder="Masukkan jumlah"
                      required
                      min={1}
                      helperText={
                        stockError ||
                        (availableStock !== null
                          ? `Maksimal: ${availableStock.toLocaleString("id-ID")}`
                          : "Jumlah/quantity kegiatan yang dilakukan")
                      }
                    />
                    {stockError && (
                      <p className="mt-1 text-sm text-red-600">{stockError}</p>
                    )}
                  </div>

                  {/* Conditional: Biaya Section */}
                  {requiresBiaya && (
                    <>
                      <div className="md:col-span-2 mt-4">
                        <div className="border-t pt-4">
                          <h4 className="text-md font-semibold mb-4">Informasi Biaya</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Biaya wajib diisi karena kegiatan ini menggunakan stok
                          </p>
                        </div>
                      </div>

                      {/* Jenis Biaya (Read-only) */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Jenis Biaya <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={methods.watch("jenisBiaya") || ""}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Otomatis terisi sesuai jenis stok yang digunakan
                        </p>
                      </div>

                      {/* Jumlah Biaya */}
                      <div>
                        <NumberInput
                          name="biayaJumlah"
                          label="Jumlah Biaya (Rp)"
                          placeholder="Masukkan jumlah biaya"
                          required
                          min={1}
                          helperText="Total biaya yang dikeluarkan"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Form actions */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <FormActions
                  backHref="/daftar-operasional"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting ||
                    createOperasional.isPending ||
                    createBiaya.isPending
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
