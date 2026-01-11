import type { AyamFormData } from "./helpers";
import type { KandangCapacityInfo } from "../interface";

import { useForm, FormProvider, useWatch } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { AlertTriangle, XCircle, Info } from "lucide-react";

import { useCreateAyam } from "../hooks/useAyams";
import { ayamService } from "../services/ayamService";

import { ayamSchema } from "./fields";
import {
  getDefaultAyamFormValues,
  transformAyamFormData,
  transformKandangsToOptions,
} from "./helpers";

import { useKandangs } from "@/features/kandang/hooks/useKandang";
import { ICurrentUser } from "@/interfaces/common";
import { useCurrentUser } from "@/features/auth/hooks/useAuth";
import { FormBuilder } from "@/components/ui/Form/FormBuilder";
import { Card } from "@/components/ui/Card";
import FormActions from "@/components/ui/Form/FormActions";
import { SkeletonForm } from "@/components/ui";
import { showToast } from "@/utils/showToast";

export function AyamCreateForm() {
  const navigate = useNavigate();
  const createAyam = useCreateAyam();
  const { data: meData, isLoading: isLoadingMe } =
    useCurrentUser<ICurrentUser>();

  // Capacity Info State
  const [capacityInfo, setCapacityInfo] = useState<KandangCapacityInfo | null>(
    null
  );
  const [isLoadingCapacity, setIsLoadingCapacity] = useState(false);

  // Warning Modal State
  const {
    isOpen: isWarningOpen,
    onOpen: onWarningOpen,
    onOpenChange: onWarningOpenChange,
    onClose: onWarningClose,
  } = useDisclosure();
  const [forceInputReason, setForceInputReason] = useState("");

  // Error Modal State
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onOpenChange: onErrorOpenChange,
  } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch kandangs for dropdown
  const { data: kandangs, isLoading: isLoadingKandangs } = useKandangs();

  // Initialize react-hook-form
  const methods = useForm<AyamFormData>({
    defaultValues: getDefaultAyamFormValues(),
    mode: "onBlur",
  });

  const { control } = methods; // Removed setValue
  const selectedKandangId = useWatch({ control, name: "kandangId" });
  const selectedTanggalMasuk = useWatch({ control, name: "tanggalMasuk" });

  // ... (useMemo for filteredKandangs and kandangOptions - unchanged)

  // Filter kandangs based on user role
  const filteredKandangs = useMemo(() => {
    if (!kandangs || !meData) return [];
    const roleNormalized = String(meData.role ?? "").toLowerCase();

    if (roleNormalized === "petugas") {
      const managedKandangIds = new Set(
        (meData.kandangsManaged ?? []).map((k: any) => String(k.id))
      );

      return kandangs.filter(kandang =>
        managedKandangIds.has(String(kandang.id))
      );
    }

    return kandangs;
  }, [kandangs, meData]);

  // Kandang Options
  const kandangOptions = useMemo(
    () => transformKandangsToOptions(filteredKandangs),
    [filteredKandangs]
  );

  // Dynamic Schema with Kandang Options
  const dynamicSchema = useMemo(() => {
    return {
      ...ayamSchema,
      sections: ayamSchema.sections.map(section => ({
        ...section,
        fields: section.fields.map(field => {
          if (field.name === "kandangId" && field.type === "select") {
            return { ...field, options: kandangOptions };
          }

          return field;
        }),
      })),
    };
  }, [kandangOptions]);

  // Fetch Capacity when Kandang or Tanggal Masuk changes
  useEffect(() => {
    if (selectedKandangId) {
      const fetchCapacity = async () => {
        setIsLoadingCapacity(true);
        try {
          // Format date to yyyy-MM
          let periodeRencana = undefined;

          if (selectedTanggalMasuk) {
            // Assuming string "YYYY-MM-DD" from date input
            if (
              typeof selectedTanggalMasuk === "string" &&
              selectedTanggalMasuk.length >= 7
            ) {
              periodeRencana = selectedTanggalMasuk.substring(0, 7);
            } else if ((selectedTanggalMasuk as any) instanceof Date) {
              // Fallback if it is a Date object (use local time)
              const d = selectedTanggalMasuk as unknown as Date;
              const year = d.getFullYear();
              const month = String(d.getMonth() + 1).padStart(2, "0");

              periodeRencana = `${year}-${month}`;
            }
          }

          const info = await ayamService.getKandangCapacity(
            selectedKandangId,
            periodeRencana
          );

          setCapacityInfo(info);
        } catch {
          showToast({
            title: "Error",
            description: "Gagal mengambil data kapasitas kandang",
            color: "error",
          });
          setCapacityInfo(null);
        } finally {
          setIsLoadingCapacity(false);
        }
      };

      fetchCapacity();
    } else {
      setCapacityInfo(null);
    }
  }, [selectedKandangId, selectedTanggalMasuk]);

  // Submit Handler
  const onSubmit = async (data: AyamFormData) => {
    // 1. Check Capacity Overflow
    if (
      capacityInfo &&
      Number(data.jumlahMasuk) > capacityInfo.kapasitasTersedia
    ) {
      setErrorMessage(
        `Jumlah input (${data.jumlahMasuk} ekor) melebihi kapasitas tersedia (${capacityInfo.kapasitasTersedia} ekor).`
      );
      onErrorOpen();

      return;
    }

    // 2. Check Leftover Chicken (Warning)
    if (capacityInfo?.adaSisaAyam) {
      onWarningOpen();

      return;
    }

    // 3. Normal Submit
    await performSubmit(data);
  };

  const performSubmit = async (
    data: AyamFormData,
    forceInput = false,
    alasanInput: string | null = null
  ) => {
    try {
      const transformedData = {
        ...transformAyamFormData(data),
        forceInput,
        alasanInput,
      };

      await createAyam.mutateAsync(transformedData);
      showToast({
        title: "Berhasil",
        description: "Data ayam berhasil dibuat",
        color: "success",
      });
      navigate({ to: "/daftar-ayam" });
    } catch {
      // createAyam mutation handles error toast usually, but we can double check
    }
  };

  const handleForceSubmit = () => {
    if ((forceInputReason?.length ?? 0) < 20) {
      showToast({
        title: "Validasi Gagal",
        description: "Alasan wajib diisi minimal 20 karakter",
        color: "warning",
      });

      return;
    }
    const data = methods.getValues();

    performSubmit(data, true, forceInputReason);
    onWarningClose();
  };

  const isLoading = isLoadingKandangs || isLoadingMe;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className={isLoading ? "p-0" : "p-6"}>
          {isLoading ? (
            <SkeletonForm fields={4} />
          ) : (
            <div className="space-y-6">
              <FormBuilder schema={dynamicSchema} />

              {/* Info Card - Capacity */}
              {selectedKandangId && capacityInfo && (
                <div
                  className={`p-4 rounded-lg border ${
                    capacityInfo.adaSisaAyam
                      ? "bg-warning-50 border-warning-200"
                      : "bg-primary-50 border-primary-200"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-full ${
                        capacityInfo.adaSisaAyam
                          ? "bg-warning-100 text-warning-600"
                          : "bg-primary-100 text-primary-600"
                      }`}
                    >
                      {capacityInfo.adaSisaAyam ? (
                        <AlertTriangle size={24} />
                      ) : (
                        <Info size={24} />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4
                        className={`font-bold ${capacityInfo.adaSisaAyam ? "text-warning-800" : "text-primary-800"}`}
                      >
                        Informasi {capacityInfo.namaKandang}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-700">
                        <div className="flex justify-between">
                          <span>Kapasitas Kandang:</span>
                          <span className="font-semibold">
                            {capacityInfo.kapasitasKandang} ekor
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ayam Hidup Saat Ini:</span>
                          <span className="font-semibold">
                            {capacityInfo.totalAyamHidup} ekor
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Kapasitas Tersedia:</span>
                          <span className="font-semibold">
                            {capacityInfo.kapasitasTersedia} ekor
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Pengisian:</span>
                          <span className="font-semibold">
                            {capacityInfo.persentasePengisian}%
                          </span>
                        </div>
                      </div>

                      {capacityInfo.adaSisaAyam && (
                        <div className="mt-3 pt-3 border-t border-warning-200 text-warning-900 text-sm">
                          <strong>⚠️ PERINGATAN:</strong> Kandang ini masih
                          memiliki {capacityInfo.sisaAyamDariPeriodeSebelumnya}{" "}
                          ayam sisa dari periode {capacityInfo.periodeAyamSisa}.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <FormActions
                  backHref="/daftar-ayam"
                  backLabel="Kembali"
                  isSubmitting={
                    methods.formState.isSubmitting ||
                    createAyam.isPending ||
                    isLoadingCapacity
                  }
                  submitLabel="Simpan Data Ayam"
                  onReset={() => {
                    methods.reset();
                    setCapacityInfo(null);
                  }}
                />
              </div>
            </div>
          )}
        </Card>
      </form>

      {/* Warning Modal (Sisa Ayam) */}
      <Modal
        isOpen={isWarningOpen}
        size="lg"
        onOpenChange={onWarningOpenChange}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-warning">
                  <AlertTriangle />
                  <span>Peringatan: Ada Ayam Sisa</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="bg-warning-50 p-4 rounded-lg text-sm text-warning-900">
                    <p className="font-semibold">
                      Kandang {capacityInfo?.namaKandang} masih memiliki{" "}
                      {capacityInfo?.sisaAyamDariPeriodeSebelumnya} ayam sisa
                      dari periode {capacityInfo?.periodeAyamSisa}.
                    </p>
                    <p className="mt-2">
                      Sistem tidak menyarankan mencampur ayam baru dengan ayam
                      sisa karena perbedaan umur akan mempengaruhi evaluasi
                      produktivitas.
                    </p>
                    <p className="mt-2 font-semibold">
                      Apakah Anda yakin ingin melanjutkan input ayam baru?
                    </p>
                  </div>

                  <div>
                    <Textarea
                      label="Alasan input ayam baru (Wajib, min. 20 karakter)"
                      minRows={3}
                      placeholder="Contoh: Batch baru dari supplier PT ABC sudah dipesan 2 minggu lalu..."
                      value={forceInputReason}
                      variant="bordered"
                      onValueChange={setForceInputReason}
                    />
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {forceInputReason.length}/20 karakter
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button
                  color="warning"
                  isDisabled={forceInputReason.length < 20}
                  onPress={handleForceSubmit}
                >
                  Lanjutkan Input Ayam
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Error Modal (Capacity Overflow) */}
      <Modal isOpen={isErrorOpen} onOpenChange={onErrorOpenChange}>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex items-center gap-2 text-danger">
                <XCircle /> Error: Kapasitas Tidak Cukup
              </ModalHeader>
              <ModalBody>
                <div className="space-y-2">
                  <p>{errorMessage}</p>
                  <div className="bg-gray-50 p-3 rounded text-sm grid grid-cols-2 gap-2 mt-2">
                    <span>Kapasitas Kandang:</span>
                    <span className="font-semibold text-right">
                      {capacityInfo?.kapasitasKandang}
                    </span>
                    <span>Ayam Hidup Saat Ini:</span>
                    <span className="font-semibold text-right">
                      {capacityInfo?.totalAyamHidup}
                    </span>
                    <span className="text-primary font-bold">
                      Maksimal Input:
                    </span>
                    <span className="font-semibold text-right text-primary">
                      {capacityInfo?.kapasitasTersedia}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Silakan kurangi jumlah ayam atau pindahkan ayam sisa
                    terlebih dahulu.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </FormProvider>
  );
}
