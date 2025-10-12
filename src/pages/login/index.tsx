import DefaultLayout from "@/layouts/default";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <DefaultLayout>
      <section className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <LoginForm />
      </section>
    </DefaultLayout>
  );
}
