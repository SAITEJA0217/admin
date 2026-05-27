// app/auth/reset-password/page.tsx

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-zinc-950 transition-colors duration-150">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:bg-zinc-900 dark:border-zinc-800/80 sm:p-8">

        {/* Suspense handles the client-side parsing wait for useSearchParams() safely */}
        <Suspense fallback={
          <div className="text-center p-4 flex flex-col items-center justify-center gap-3 select-none">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            <p className="text-sm text-gray-500 dark:text-zinc-400">Loading token parameters...</p>
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>

      </div>
    </main>
  );
}
