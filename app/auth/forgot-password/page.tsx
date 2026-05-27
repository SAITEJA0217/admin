// app/auth/forgot-password/page.tsx

import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-zinc-950 transition-colors duration-150">
      <ForgotPasswordForm />
    </main>
  );
}
