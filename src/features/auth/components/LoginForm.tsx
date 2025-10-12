import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@tanstack/react-router";
import { Mail, Lock, LogIn } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";

import { Card } from "@/components/ui/Card";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const methods = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login attempt:", data);
    // TODO: Handle login logic here
    // Example: await loginUser(data.email, data.password);
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
            {/* Email Input */}
            <Input
              {...methods.register("email", {
                required: "Email wajib diisi",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Format email tidak valid",
                },
              })}
              errorMessage={methods.formState.errors.email?.message}
              isInvalid={!!methods.formState.errors.email}
              label="Email"
              placeholder="Masukkan email Anda"
              startContent={<Mail className="text-default-400" size={18} />}
              type="email"
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
              isLoading={methods.formState.isSubmitting}
              size="lg"
              startContent={<LogIn size={18} />}
              type="submit"
            >
              Masuk
            </Button>

            {/* Register Link */}
            <div className="text-center text-sm text-default-500 mt-4">
              Belum punya akun?{" "}
              <Link className="text-primary hover:underline" href="/register">
                Daftar di sini
              </Link>
            </div>
          </div>
        </Card>
      </form>
    </FormProvider>
  );
}
