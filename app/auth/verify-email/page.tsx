// app/auth/verify-email/page.tsx

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";

export default function VerifyEmailPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-slate-50 dark:bg-zinc-950 select-none">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 sm:p-8">

                {/* Enforces correct client parameter resolution rendering loops */}
                <Suspense fallback={
                    <div className="text-center p-4 flex flex-col items-center justify-center gap-3">
                        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                        <p className="text-sm text-gray-500 dark:text-zinc-400">Loading token context parameters...</p>
                    </div>
                }>
                    <VerifyEmailForm />
                </Suspense>

            </div>
        </main>
    );
}
