// app/auth/verification-sent/page.tsx

"use client";

import { useRouter } from "next/navigation";

export default function VerificationSentPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
                <div className="text-center space-y-4">
                    <div className="text-5xl">📧</div>

                    <h1 className="text-3xl font-bold">
                        Check Your Email
                    </h1>

                    <p className="text-sm leading-6 text-gray-600">
                        We have sent an email with a verification or password
                        reset link. Please open your inbox and click the link to
                        continue.
                    </p>

                    <p className="text-sm text-gray-500">
                        If you do not see the email, check your spam or junk
                        folder.
                    </p>

                    <div className="space-y-3 pt-4">
                        <button
    type="button"
    onClick={() =>
        router.push("/auth/login")
    }
    className="w-full rounded-lg border px-4 py-3 font-medium hover:bg-gray-50"
>
    I&apos;ve Verified My Email
</button>

                        <button
                            type="button"
                            onClick={() =>
                                router.push("/auth/login")
                            }
                            className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white"
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}