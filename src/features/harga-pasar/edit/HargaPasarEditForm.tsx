import type { UpdateHargaPasarPayload } from "../types";

import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Input, Button, Switch, Textarea, Spinner } from "@heroui/react";

import { useHargaPasarById, useUpdateHargaPasar } from "../hooks/useHargaPasar";

import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/common/PageHeader";

export default function HargaPasarEditForm({ id }: { id: string }) {
  const navigate = useNavigate();
  const { data: existingData, isLoading: isLoadingData } =
    useHargaPasarById(id);
  const updateMutation = useUpdateHargaPasar();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateHargaPasarPayload>({
    defaultValues: {
      hargaPerKg: 0,
      tanggalMulai: "",
      tanggalBerakhir: "",
      isAktif: true,
      keterangan: "",
      wilayah: "",
    },
  });

  // Pre-fill form when data loads
  useEffect(() => {
    if (existingData) {
      reset({
        hargaPerKg: existingData.hargaPerKg,
        tanggalMulai: existingData.tanggalMulai.split("T")[0],
        tanggalBerakhir: existingData.tanggalBerakhir
          ? existingData.tanggalBerakhir.split("T")[0]
          : "",
        isAktif: existingData.isAktif,
        keterangan: existingData.keterangan || "",
        wilayah: existingData.wilayah || "",
      });
    }
  }, [existingData, reset]);

  const onSubmit = async (data: UpdateHargaPasarPayload) => {
    try {
      await updateMutation.mutateAsync({
        id,
        data: {
          ...data,
          hargaPerKg: Number(data.hargaPerKg), // Ensure number
          tanggalBerakhir: data.tanggalBerakhir || undefined, // Send undefined if empty
        },
      });
      navigate({ to: "/harga-pasar" });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner color="primary" label="Memuat data..." />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Harga Pasar", href: "/harga-pasar" },
          { label: "Edit", href: `/harga-pasar/${id}/edit` },
        ]}
        description="Perbarui informasi harga pasar."
        title="Edit Harga Pasar"
      />

      <Card className="p-6 max-w-2xl">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Controller
              control={control}
              name="hargaPerKg"
              render={({ field }) => (
                <Input
                  {...field}
                  isRequired
                  errorMessage={errors.hargaPerKg?.message}
                  isInvalid={!!errors.hargaPerKg}
                  label="Harga Per Kg (Rp)"
                  placeholder="Contoh: 24000"
                  type="number"
                  value={String(field.value)}
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                />
              )}
              rules={{
                required: "Harga wajib diisi",
                min: { value: 1, message: "Harga harus lebih dari 0" },
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                control={control}
                name="tanggalMulai"
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    errorMessage={errors.tanggalMulai?.message}
                    isInvalid={!!errors.tanggalMulai}
                    label="Tanggal Mulai Berlaku"
                    placeholder="Pilih tanggal"
                    type="date"
                  />
                )}
                rules={{ required: "Tanggal mulai wajib diisi" }}
              />

              <Controller
                control={control}
                name="tanggalBerakhir"
                render={({ field }) => (
                  <Input
                    {...field}
                    errorMessage={errors.tanggalBerakhir?.message}
                    isInvalid={!!errors.tanggalBerakhir}
                    label="Tanggal Berakhir (Opsional)"
                    placeholder="Pilih tanggal"
                    type="date"
                  />
                )}
              />
            </div>

            <Controller
              control={control}
              name="wilayah"
              render={({ field }) => (
                <Input
                  {...field}
                  errorMessage={errors.wilayah?.message}
                  isInvalid={!!errors.wilayah}
                  label="Wilayah (Opsional)"
                  placeholder="Contoh: Jawa Timur"
                />
              )}
            />

            <Controller
              control={control}
              name="keterangan"
              render={({ field }) => (
                <Textarea
                  {...field}
                  errorMessage={errors.keterangan?.message}
                  isInvalid={!!errors.keterangan}
                  label="Keterangan (Opsional)"
                  placeholder="Tambahkan catatan jika ada"
                />
              )}
            />

            <Controller
              control={control}
              name="isAktif"
              render={({ field: { value, onChange, ...field } }) => (
                <div className="flex items-center justify-between p-2 border rounded-lg border-default-200">
                  <span className="text-default-700">Status Aktif</span>
                  <Switch
                    {...field}
                    isSelected={value}
                    onValueChange={onChange}
                  >
                    {value ? "Aktif" : "Non-Aktif"}
                  </Switch>
                </div>
              )}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-default-100">
            <Button
              color="default"
              isDisabled={isSubmitting || updateMutation.isPending}
              variant="flat"
              onPress={() => navigate({ to: "/harga-pasar" })}
            >
              Batal
            </Button>
            <Button
              color="primary"
              isLoading={isSubmitting || updateMutation.isPending}
              type="submit"
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
