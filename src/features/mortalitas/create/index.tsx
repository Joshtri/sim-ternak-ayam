/**
 * Mortalitas Create Form (Auto FIFO & Manual Split)
 * Form for creating new mortalitas data with flexible allocation modes
 */

import type { MortalitasFormData } from "./helpers";

import { useForm, FormProvider, useWatch, Controller } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { CloudUpload, X, Info, CheckCircle, AlertTriangle } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  RadioGroup,
  Radio,
  Input,
} from "@heroui/react";

import { mortalitasService } from "../services/mortalitasService";

import { mortalitasSchema } from "./fields";
import {
  getDefaultMortalitasFormValues,
  transformMortalitasFormData,
  convertFileToBase64,
} from "./helpers";

import { ayamService } from "@/features/ayams/services/ayamService";
import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { transformKandangsToOptions } from "@/features/ayams/create/helpers";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { ICurrentUser } from "@/interfaces/common";
import { showToast } from "@/utils/showToast";
import { SkeletonForm } from "@/components/ui";
import { Ayam } from "@/features/ayams/interface";

export function MortalitasCreateForm() {
  const navigate = useNavigate();

  const { data: meData, isLoading: isLoadingMe } =
    useCurrentUser<ICurrentUser>();
  const { data: kandangs, isLoading: isLoadingKandangs } = useKandangs();

  // State for Chicken Info
  const [chickenInfo, setChickenInfo] = useState<{
    total: number;
    breakdown: Ayam[];
  } | null>(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Success Modal State
  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onOpenChange: onSuccessOpenChange,
  } = useDisclosure();
  const [successData, setSuccessData] = useState<any>(null);

  // Initialize form
  const methods = useForm<MortalitasFormData>({
    defaultValues: getDefaultMortalitasFormValues(),
    mode: "onBlur",
  });

  const { control, setValue } = methods;
  const selectedKandangId = useWatch({ control, name: "kandangId" });
  const mode = useWatch({ control, name: "mode" });
  const jumlahKematian = useWatch({ control, name: "jumlahKematian" });

  // Real-time split values for validation display
  const jumlahLama = useWatch({ control, name: "jumlahDariAyamLama" }) || 0;
  const jumlahBaru = useWatch({ control, name: "jumlahDariAyamBaru" }) || 0;

  // Filters
  const filteredKandangs = useMemo(() => {
    if (!kandangs || !meData) return [];
    const roleNormalized = String(meData.role ?? "").toLowerCase();

    if (roleNormalized === "petugas") {
      const managedKandangIds = new Set(
        (meData.kandangsManaged ?? []).map((k: any) => String(k.id))
      );

      return kandangs.filter(k => managedKandangIds.has(String(k.id)));
    }

    return kandangs;
  }, [kandangs, meData]);

  const kandangOptions = useMemo(
    () => transformKandangsToOptions(filteredKandangs),
    [filteredKandangs]
  );

  // Split Schema logic
  const { upperSchema, lowerSchema } = useMemo(() => {
    const originalSection = mortalitasSchema.sections[0];
    const topFields = [];
    const bottomFields = [];
    let splitFound = false;

    // We want to split BEFORE "jumlahKematian"
    originalSection.fields.forEach(field => {
      // Filter out fields if needed, or modify them
      let modifiedField = field;

      if (field.name === "kandangId" && field.type === "select") {
        modifiedField = { ...field, options: kandangOptions };
      }

      if (field.name === "jumlahKematian") {
        splitFound = true;
        if (mode === "manual-split") {
          modifiedField = {
            ...field,
            disabled: true,
            placeholder: "Terhitung otomatis...",
          };
        }
      }

      if (!splitFound) {
        topFields.push(modifiedField);
      } else {
        bottomFields.push(modifiedField);
      }
    });

    return {
      upperSchema: {
        ...mortalitasSchema,
        sections: [{ ...originalSection, fields: topFields }],
      },
      lowerSchema: {
        ...mortalitasSchema,
        sections: [
          {
            ...originalSection,
            fields: bottomFields,
            title: "",
            description: "",
          },
        ],
        // Remove title/desc from lower section to avoid duplication header
      },
    };
  }, [kandangOptions, mode]);

  // Auto-calculate Total in Manual Split Mode
  useEffect(() => {
    if (mode === "manual-split") {
      const total = Number(jumlahLama || 0) + Number(jumlahBaru || 0);

      setValue("jumlahKematian", total, { shouldValidate: true });
    }
  }, [mode, jumlahLama, jumlahBaru, setValue]);

  // Fetch Chicken Info
  useEffect(() => {
    if (selectedKandangId) {
      const fetchInfo = async () => {
        setIsLoadingInfo(true);
        try {
          const ayams = await ayamService.getAyams({
            kandangId: selectedKandangId,
            period: "all",
          });
          const total = ayams.reduce(
            (sum, a) => sum + (a.sisaAyamHidup || 0),
            0
          );

          setChickenInfo({
            total,
            breakdown: ayams.filter(a => (a.sisaAyamHidup || 0) > 0),
          });
        } catch {
          showToast({
            title: "Error",
            description: "Gagal mengambil data ayam",
            color: "error",
          });
          setChickenInfo(null);
        } finally {
          setIsLoadingInfo(false);
        }
      };

      fetchInfo();
    } else {
      setChickenInfo(null);
    }
  }, [selectedKandangId]);

  // Handle File
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      handleRemoveFile();

      return;
    }

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];

    if (!validTypes.includes(file.type)) {
      showToast({
        title: "Format Invalid",
        description: "Harus gambar",
        color: "error",
      });

      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast({
        title: "Size Error",
        description: "Max 5MB",
        color: "error",
      });

      return;
    }

    try {
      const base64 = await convertFileToBase64(file);

      methods.setValue("fotoMortalitasBase64", base64);
      methods.setValue("fotoMortalitasFileName", file.name);
      setSelectedFile(file);
      setPreviewUrl(base64);
    } catch {
      showToast({
        title: "Error",
        description: "Gagal proses file",
        color: "error",
      });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    methods.setValue("fotoMortalitasBase64", "");
    methods.setValue("fotoMortalitasFileName", "");
    const input = document.getElementById("fotoMortalitas") as HTMLInputElement;

    if (input) input.value = "";
  };

  // Calculate Limits
  const ayamLamaLimit = useMemo(() => {
    if (!chickenInfo?.breakdown?.length) return 0;
    const sorted = [...chickenInfo.breakdown].sort(
      (a, b) =>
        new Date(a.tanggalMasuk).getTime() - new Date(b.tanggalMasuk).getTime()
    );

    return sorted[0].sisaAyamHidup || 0;
  }, [chickenInfo]);

  const ayamBaruLimit = useMemo(() => {
    if (!chickenInfo?.breakdown?.length) return 0;
    if (chickenInfo.breakdown.length === 1) return 0;
    const sorted = [...chickenInfo.breakdown].sort(
      (a, b) =>
        new Date(a.tanggalMasuk).getTime() - new Date(b.tanggalMasuk).getTime()
    );

    return sorted.slice(1).reduce((sum, a) => sum + (a.sisaAyamHidup || 0), 0);
  }, [chickenInfo]);

  // Submit
  const onSubmit = async (data: MortalitasFormData) => {
    if (!chickenInfo) return;

    if (Number(data.jumlahKematian) > chickenInfo.total) {
      methods.setError("jumlahKematian", {
        type: "manual",
        message: `Jumlah melebihi total ayam hidup (${chickenInfo.total})`,
      });

      return;
    }

    if (data.mode === "manual-split") {
      const l = Number(data.jumlahDariAyamLama || 0);
      const b = Number(data.jumlahDariAyamBaru || 0);
      const totalSplit = l + b;

      if (totalSplit !== Number(data.jumlahKematian)) {
        showToast({
          title: "Validasi Gagal",
          description: `Total split (${totalSplit}) tidak sama dengan Jumlah Kematian (${data.jumlahKematian})`,
          color: "warning",
        });

        return;
      }

      if (l > ayamLamaLimit) {
        methods.setError("jumlahDariAyamLama", {
          message: `Max ${ayamLamaLimit}`,
        });

        return;
      }
      if (b > ayamBaruLimit) {
        methods.setError("jumlahDariAyamBaru", {
          message: `Max ${ayamBaruLimit}`,
        });

        return;
      }
    }

    try {
      const payload = transformMortalitasFormData(data);
      // Use the standard endpoint which now handles both auto-fifo and manual-split
      const result = await mortalitasService.createMortalitas(payload);

      setSuccessData(result);
      onSuccessOpen();
    } catch (error: any) {
      showToast({
        title: "Gagal",
        description: error.response?.data?.message || "Gagal membuat data",
        color: "error",
      });
    }
  };

  const handleSuccessClose = () => {
    onSuccessOpenChange();
    navigate({ to: "/daftar-mortalitas" });
  };

  const isLoading = isLoadingKandangs || isLoadingMe;
  const isMultiBatch = (chickenInfo?.breakdown?.length || 0) > 1;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className={isLoading ? "p-0" : "p-6"}>
          {isLoading ? (
            <SkeletonForm fields={6} />
          ) : (
            <div className="space-y-6">
              <FormBuilder schema={upperSchema} />

              {/* Mode Selection */}
              <div className="border border-slate-200 rounded-lg overflow-hidden my-4">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-700">
                    Mode Input Mortalitas
                  </h3>
                </div>
                <div className="p-4 bg-white">
                  <Controller
                    control={control}
                    name="mode"
                    render={({ field }) => (
                      <RadioGroup
                        className="gap-6"
                        orientation="horizontal"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <Radio
                          description="Sistem otomatis pilih dari batch terlama"
                          value="auto-fifo"
                        >
                          Auto Otomatis (Rekomen)
                        </Radio>
                        <Radio
                          description="Tentukan sendiri dari batch lama/baru"
                          isDisabled={!isMultiBatch}
                          value="manual-split"
                        >
                          Manual Split {!isMultiBatch && "(Min. 2 Batch)"}
                        </Radio>
                      </RadioGroup>
                    )}
                  />

                  {mode === "manual-split" && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg animate-in fade-in slide-in-from-top-2">
                      <h4 className="font-semibold text-sm text-blue-800 mb-3 flex items-center gap-2">
                        <Info size={16} /> DETAIL SPLIT
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-600">
                            Dari Ayam Lama (Max: {ayamLamaLimit})
                          </label>
                          <Controller
                            control={control}
                            name="jumlahDariAyamLama"
                            render={({ field, fieldState }) => (
                              <Input
                                placeholder="0"
                                type="number"
                                {...field}
                                endContent={
                                  <span className="text-sm text-gray-400">
                                    ekor
                                  </span>
                                }
                                errorMessage={fieldState.error?.message}
                                isInvalid={!!fieldState.error}
                                value={field.value?.toString() || ""}
                                onChange={e =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            )}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-gray-600">
                            Dari Ayam Baru (Max: {ayamBaruLimit})
                          </label>
                          <Controller
                            control={control}
                            name="jumlahDariAyamBaru"
                            render={({ field, fieldState }) => (
                              <Input
                                placeholder="0"
                                type="number"
                                {...field}
                                endContent={
                                  <span className="text-sm text-gray-400">
                                    ekor
                                  </span>
                                }
                                errorMessage={fieldState.error?.message}
                                isInvalid={!!fieldState.error}
                                value={field.value?.toString() || ""}
                                onChange={e =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end items-center gap-2 text-sm">
                        <span className="text-gray-600">Total Split:</span>
                        <span
                          className={`font-bold ${Number(jumlahLama) + Number(jumlahBaru) === Number(jumlahKematian) ? "text-green-600" : "text-red-500"}`}
                        >
                          {Number(jumlahLama) + Number(jumlahBaru)}
                        </span>
                        <span className="text-gray-400">
                          / {jumlahKematian} ekor
                        </span>
                        {Number(jumlahLama) + Number(jumlahBaru) ===
                        Number(jumlahKematian) ? (
                          <CheckCircle className="text-green-600" size={16} />
                        ) : (
                          <AlertTriangle className="text-red-500" size={16} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <FormBuilder schema={lowerSchema} />

              {/* Custom file upload */}
              <div className="border-t pt-4">
                <p className="block text-sm font-medium text-gray-700 mb-2">
                  Foto Mortalitas (Opsional)
                </p>
                {!selectedFile && (
                  <div className="flex items-center justify-center w-full">
                    <label
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                      htmlFor="fotoMortalitas"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <CloudUpload className="w-8 h-8 mb-2 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Klik upload</span>{" "}
                          atau drag & drop
                        </p>
                        <p className="text-xs text-gray-500">
                          Max 5MB (JPG, PNG)
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
                {selectedFile && previewUrl && (
                  <div className="mt-4 relative inline-block">
                    <img
                      alt="Preview"
                      className="w-full max-w-xs h-auto rounded-lg border"
                      src={previewUrl}
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                      type="button"
                      onClick={handleRemoveFile}
                    >
                      <X size={16} />
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedFile.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Info Card */}
              {selectedKandangId && chickenInfo && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Info className="text-primary" size={20} />
                    Informasi Populasi Kandang
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="bg-white p-3 rounded border">
                      <span className="text-gray-500 block">
                        Total Ayam Hidup
                      </span>
                      <span className="text-xl font-bold text-primary">
                        {chickenInfo.total.toLocaleString()} ekor
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <span className="text-gray-500 block">Jumlah Batch</span>
                      <span className="text-xl font-bold">
                        {chickenInfo.breakdown.length} batch
                      </span>
                    </div>
                  </div>
                  {chickenInfo.breakdown.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase">
                        Breakdown Batch:
                      </p>
                      <div className="space-y-1">
                        {chickenInfo.breakdown.map(ayam => (
                          <div
                            key={ayam.id}
                            className="flex justify-between text-xs bg-white p-2 border rounded"
                          >
                            <span>
                              {new Date(ayam.tanggalMasuk).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                            <span className="font-mono">
                              {ayam.sisaAyamHidup?.toLocaleString()} ekor
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-6 border-t">
                <FormActions
                  backHref="/daftar-mortalitas"
                  backLabel="Kembali"
                  isSubmitting={methods.formState.isSubmitting || isLoadingInfo}
                  submitLabel={
                    mode === "manual-split"
                      ? "Simpan Data (Manual Split)"
                      : "Simpan Data (Otomatis)"
                  }
                  onReset={() => {
                    methods.reset();
                    handleRemoveFile();
                    setChickenInfo(null);
                  }}
                />
              </div>
            </div>
          )}
        </Card>
      </form>

      {/* Success Modal */}
      <Modal
        hideCloseButton
        isDismissable={false}
        isOpen={isSuccessOpen}
        size="lg"
        onOpenChange={onSuccessOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1 text-center pt-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-xl font-bold text-green-700">
                  Mortalitas Berhasil Dicatat!
                </h2>
                <p className="text-sm text-gray-500 font-normal">
                  {successData?.message}
                </p>
              </ModalHeader>
              <ModalBody>
                {successData?.data && Array.isArray(successData.data) && (
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <p className="font-semibold mb-2">
                        Rincian Alokasi (
                        {mode === "manual-split" ? "Split" : "Otomatis"}):
                      </p>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {successData.data.map((item: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center border-b border-gray-100 last:border-0 pb-2 last:pb-0"
                          >
                            <div>
                              <p className="font-medium text-gray-700">
                                Batch{" "}
                                {new Date(
                                  item.ayam?.tanggalMasuk ||
                                    item.tanggalKematian
                                ).toLocaleDateString("id-ID")}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.penyebabKematian}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-danger">
                                {item.jumlahKematian} ekor
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="justify-center pb-8">
                <Button
                  className="w-full max-w-xs"
                  color="primary"
                  onPress={handleSuccessClose}
                >
                  Selesai & Kembali ke Daftar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </FormProvider>
  );
}

export default MortalitasCreateForm;
