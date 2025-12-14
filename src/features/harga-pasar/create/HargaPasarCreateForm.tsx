import type { CreateHargaPasarPayload } from "../types";

import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { Input, Button, Switch, Textarea } from "@heroui/react";

import { useCreateHargaPasar } from "../hooks/useHargaPasar";

import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/common/PageHeader";

export default function HargaPasarCreateForm() {
  const navigate = useNavigate();
  const createMutation = useCreateHargaPasar();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateHargaPasarPayload>({
    defaultValues: {
      hargaPerKg: 0,
      tanggalMulai: new Date().toISOString().split("T")[0],
      isAktif: true,
      keterangan: "",
      wilayah: "",
    },
  });

  const onSubmit = async (data: CreateHargaPasarPayload) => {
    try {
      await createMutation.mutateAsync({
        ...data,
        hargaPerKg: Number(data.hargaPerKg), // Ensure number
      });
      navigate({ to: "/harga-pasar" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      

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
              isDisabled={isSubmitting || createMutation.isPending}
              variant="flat"
              onPress={() => navigate({ to: "/harga-pasar" })}
            >
              Batal
            </Button>
            <Button
              color="primary"
              isLoading={isSubmitting || createMutation.isPending}
              type="submit"
            >
              Simpan
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
