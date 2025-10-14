import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
// Link from router removed because this form uses a plain anchor for the register link
import { Mail, Lock, LogIn } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";

import { useLogin } from "../hooks/useAuth";

import { Card } from "@/components/ui/Card";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const methods = useForm<LoginFormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login.mutateAsync({
        username: data.username,
        password: data.password,
      });
    } catch (error) {
      // Errors are handled inside the hook (toasts), but log to avoid unhandled promise
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-md p-6">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 pb-6">
            <div className="flex items-center gap-2">
              <LogIn className="text-primary" size={24} />
              <h1 className="text-2xl font-bold">Login</h1>
            </div>
            <p className="text-default-500 text-center">
              Selamat datang di Sistem Manajemen Ternak Ayam Broiler
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {/* Username Input */}
            <Input
              {...methods.register("username", {
                required: "Username wajib diisi",
              })}
              errorMessage={methods.formState.errors.username?.message}
              isInvalid={!!methods.formState.errors.username}
              label="Username"
              placeholder="Masukkan username Anda"
              startContent={<Mail className="text-default-400" size={18} />}
              type="text"
              variant="bordered"
            />

            {/* Password Input */}
            <Input
              {...methods.register("password", {
                required: "Password wajib diisi",
                minLength: {
                  value: 6,
                  message: "Password minimal 6 karakter",
                },
              })}
              errorMessage={methods.formState.errors.password?.message}
              isInvalid={!!methods.formState.errors.password}
              label="Password"
              placeholder="Masukkan password Anda"
              startContent={<Lock className="text-default-400" size={18} />}
              type="password"
              variant="bordered"
            />

            {/* Submit Button */}
            <Button
              className="w-full mt-4"
              color="primary"
              isLoading={
                login.status === "pending" || methods.formState.isSubmitting
              }
              size="lg"
              startContent={<LogIn size={18} />}
              type="submit"
            >
              Masuk
            </Button>

            {/* Register Link */}
            <div className="text-center text-sm text-default-500 mt-4">
              Belum punya akun?{" "}
              <a className="text-primary hover:underline" href="/register">
                Daftar di sini
              </a>
            </div>
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}
