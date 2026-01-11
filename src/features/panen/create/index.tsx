/**
 * Panen Create Form (Auto FIFO)
 * Form for creating new panen data with automatic FIFO allocation
 */

import type { PanenFormData } from "./helpers";

import { useForm, FormProvider, useWatch, Controller } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
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
import { CheckCircle, Info, AlertTriangle } from "lucide-react";

import { panenService } from "../services/panenService";

import { panenSchema } from "./fields";
import { getDefaultPanenFormValues, transformPanenFormData } from "./helpers";

import { ayamService } from "@/features/ayams/services/ayamService";
import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { transformKandangsToOptions } from "@/features/ayams/create/helpers";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { ICurrentUser } from "@/interfaces/common";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { SkeletonForm } from "@/components/ui";
import { showToast } from "@/utils/showToast";
import { Ayam } from "@/features/ayams/interface";

export function PanenCreateForm() {
  const navigate = useNavigate();
  // We use useCreatePanen hook but we will bypass it for auto-fifo call manually strictly speaking,
  // or we can just use the service directly. Using service directly allows cleaner handling of the custom response.
  // But let's keep hook if useful. Actually, useCreatePanen likely calls createPanen.
  // We'll call service directly for this specialized endpoint or create a new hook.
  // For now service direct is fine.

  const { data: meData, isLoading: isLoadingMe } =
    useCurrentUser<ICurrentUser>();
  const { data: kandangs, isLoading: isLoadingKandangs } = useKandangs();

  // State for Chicken Info
  const [chickenInfo, setChickenInfo] = useState<{
    total: number;
    breakdown: Ayam[];
    raw: Ayam[];
  } | null>(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);

  // Success Modal State
  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onOpenChange: onSuccessOpenChange,
  } = useDisclosure();
  const [successData, setSuccessData] = useState<any>(null);

  // Initialize form
  const methods = useForm<PanenFormData>({
    defaultValues: getDefaultPanenFormValues(),
    mode: "onBlur",
  });

  const { control, setValue } = methods;
  const selectedKandangId = useWatch({ control, name: "kandangId" });
  const mode = useWatch({ control, name: "mode" });
  const jumlahLama = useWatch({ control, name: "jumlahDariAyamLama" });
  const jumlahBaru = useWatch({ control, name: "jumlahDariAyamBaru" });
  const jumlahTernak = useWatch({ control, name: "jumlahEkorPanen" });

  // Filter Kandangs
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
    const originalSection = panenSchema.sections[0];
    const topFields: any[] = [];
    const bottomFields: any[] = [];
    let splitFound = false;

    // Split before "jumlahEkorPanen"
    originalSection.fields.forEach(field => {
      let modifiedField = field;

      if (field.name === "kandangId" && field.type === "select") {
        modifiedField = { ...field, options: kandangOptions };
      }

      if (field.name === "jumlahEkorPanen") {
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
        ...panenSchema,
        sections: [{ ...originalSection, fields: topFields }],
      },
      lowerSchema: {
        ...panenSchema,
        sections: [
          {
            ...originalSection,
            fields: bottomFields,
            title: "",
            description: "",
          },
        ],
      },
    };
  }, [kandangOptions, mode]);

  // Auto-calculate Total
  useEffect(() => {
    if (mode === "manual-split") {
      const total = Number(jumlahLama || 0) + Number(jumlahBaru || 0);

      setValue("jumlahEkorPanen", total, { shouldValidate: true });
    }
  }, [mode, jumlahLama, jumlahBaru, setValue]);

  // Limits
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

  // Fetch Chicken Info when Kandang Select
  useEffect(() => {
    if (selectedKandangId) {
      const fetchInfo = async () => {
        setIsLoadingInfo(true);
        try {
          // Fetch all active chickens in this kandang
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
            raw: ayams,
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

  // Submit Handler
  const onSubmit = async (data: PanenFormData) => {
    if (!chickenInfo) return;

    // Validate quantity
    if (Number(data.jumlahEkorPanen) > chickenInfo.total) {
      methods.setError("jumlahEkorPanen", {
        type: "manual",
        message: `Jumlah melebihi total ayam hidup (${chickenInfo.total} ekor)`,
      });

      return;
    }

    if (data.mode === "manual-split") {
      const l = Number(data.jumlahDariAyamLama || 0);
      const b = Number(data.jumlahDariAyamBaru || 0);
      const totalSplit = l + b;

      if (totalSplit !== Number(data.jumlahEkorPanen)) {
        showToast({
          title: "Validasi Gagal",
          description: `Total split (${totalSplit}) tidak sama dengan target (${data.jumlahEkorPanen})`,
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
      const payload = transformPanenFormData(data);
      const result = await panenService.createPanen(payload);

      setSuccessData(result);
      onSuccessOpen();
    } catch (error: any) {
      showToast({
        title: "Gagal",
        description: error.response?.data?.message || "Gagal membuat panen",
        color: "error",
      });
    }
  };

  const handleSuccessClose = () => {
    onSuccessOpenChange();
    navigate({ to: "/daftar-panen" });
  };

  const isLoading = isLoadingKandangs || isLoadingMe;
  const isMultiBatch = (chickenInfo?.breakdown?.length || 0) > 1;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className={isLoading ? "p-0" : "p-6"}>
          {isLoading ? (
            <SkeletonForm fields={4} />
          ) : (
            <div className="space-y-6">
              <FormBuilder schema={upperSchema} />

              {/* Mode Selection */}
              <div className="border border-slate-200 rounded-lg overflow-hidden my-4">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-700">
                    Mode Panen
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
                          Otomatis
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
                          className={`font-bold ${Number(jumlahLama) + Number(jumlahBaru) === Number(jumlahTernak) ? "text-green-600" : "text-red-500"}`}
                        >
                          {Number(jumlahLama) + Number(jumlahBaru)}
                        </span>
                        <span className="text-gray-400">
                          / {jumlahTernak} ekor
                        </span>
                        {Number(jumlahLama) + Number(jumlahBaru) ===
                        Number(jumlahTernak) ? (
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

              {/* Info Card */}
              {selectedKandangId && chickenInfo && (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
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

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <FormActions
                  backHref="/daftar-panen"
                  backLabel="Kembali"
                  isSubmitting={methods.formState.isSubmitting || isLoadingInfo}
                  submitLabel="Simpan Panen"
                  onReset={() => {
                    methods.reset();
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
                  Panen Berhasil Dicatat!
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
                        Rincian Alokasi{" "}
                        {mode === "manual-split" ? "(Manual Split)" : ""}:
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
                                  item.ayam?.tanggalMasuk || item.tanggalPanen
                                ).toLocaleDateString("id-ID")}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.namaKandang}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">
                                {item.jumlahEkorPanen} ekor
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.beratRataRata} kg (avg)
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
