import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import { authService } from "@/features/auth/services/authService";
import { showToast } from "@/utils/showToast";
import { Card } from "@/components/ui/Card";

interface ProfileAccountProps {
  user: any;
}

type FormValues = {
  username: string;
  fullName: string;
};

export default function ProfileAccount({ user }: ProfileAccountProps) {
  const qc = useQueryClient();

  const methods = useForm<FormValues>({
    defaultValues: {
      username: user?.username ?? "",
      fullName: user?.fullName ?? "",
    },
  });

  useEffect(() => {
    methods.reset({
      username: user?.username ?? "",
      fullName: user?.fullName ?? "",
    });
  }, [user]);

  const mutation = useMutation({
    mutationFn: (payload: FormValues) =>
      authService.updateProfile(user.id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      showToast({
        title: "Berhasil",
        description: "Profil berhasil disimpan.",
        color: "success",
      });
    },
    onError: (err: any) => {
      showToast({
        title: "Gagal",
        description: String(err?.message ?? "Gagal menyimpan profil"),
        color: "error",
      });
    },
  });

  const onSubmit = async (data: FormValues) => {
    await mutation.mutateAsync(data);
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Akun</h2>

      <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          {...methods.register("username", {
            required: "Username wajib diisi",
          })}
          errorMessage={methods.formState.errors.username?.message}
          isInvalid={!!methods.formState.errors.username}
          label="Username"
          placeholder="Username"
          variant="bordered"
        />

        <Input
          {...methods.register("fullName", {
            required: "Nama lengkap wajib diisi",
          })}
          errorMessage={methods.formState.errors.fullName?.message}
          isInvalid={!!methods.formState.errors.fullName}
          label="Nama Lengkap"
          placeholder="Nama Lengkap"
          variant="bordered"
        />

        <div className="flex gap-2">
          <Button
            color="primary"
            isLoading={mutation.status === "pending"}
            type="submit"
          >
            Simpan
          </Button>
        </div>
      </form>
    </Card>
  );
}
