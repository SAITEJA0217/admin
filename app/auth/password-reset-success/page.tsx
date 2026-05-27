// app/auth/password-reset-success/page.tsx

"use client";

import { useRouter } from "next/navigation";

export default function PasswordResetSuccessPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
                <div className="text-center space-y-4">
                    <div className="text-5xl">✅</div>

                    <h1 className="text-3xl font-bold">
                        Password Reset Successful
                    </h1>

                    <p className="text-sm leading-6 text-gray-600">
                        Your password has been updated successfully.
                        You can now sign in using your new password.
                    </p>

                    <div className="pt-4">
                        <button
                            type="button"
                            onClick={() =>
                                router.push("/auth/login")
                            }
                            className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
