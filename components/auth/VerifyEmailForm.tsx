// app/auth/verify-email/page.tsx

"use client";

import { useEffect, useState, type ChangeEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, XCircle, Mail, ArrowRight } from "lucide-react";

import { verifyEmail, resendVerificationLink } from "@/services/auth";

// --- CHILD COMPONENT: Handles Hook Readings and Context Logic ---
function VerifyEmailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Grabs value seamlessly from ?token=... parameters string safely
    const token = searchParams.get("token") || "";

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("Verifying your email address...");

    const [resendEmail, setResendEmail] = useState("");
    const [isResending, setIsResending] = useState(false);
    const [resendStatus, setResendStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        async function handleVerification() {
            if (!token) {
                setSuccess(false);
                setMessage("Missing or empty token parameters inside incoming URL link.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await verifyEmail(token);

                setSuccess(true);
                setMessage(
                    response.message || "Email verified successfully. You may now log in to your dashboard."
                );
            } catch (error) {
                console.error("Email verification failed:", error);
                setSuccess(false);
                setMessage(
                    error instanceof Error ? error.message : "The verification link is invalid or has expired."
                );
            } finally {
                setLoading(false);
            }
        }

        handleVerification();
    }, [token]);

    const handleResendSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resendEmail) return;

        try {
            setIsResending(true);
            setResendStatus(null);
            await resendVerificationLink(resendEmail);

            setResendStatus({
                type: "success",
                text: "A fresh verification link has been dispatched to your inbox."
            });
            setResendEmail("");
        } catch (err) {
            setResendStatus({
                type: "error",
                text: err instanceof Error ? err.message : "Failed to trigger automated email systems."
            });
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="text-center space-y-4">
            {/* Status Icon */}
            <div className="flex justify-center">
                {loading ? (
                    <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                ) : success ? (
                    <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                ) : (
                    <XCircle className="h-12 w-12 text-red-500" />
                )}
            </div>

            {/* Dynamic Status Title */}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                {loading ? "Verifying Email" : success ? "Email Verified" : "Verification Failed"}
            </h1>

            {/* Server Feedback Logs Info Text */}
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {message}
            </p>

            {/* Context Actions Container Box Block */}
            {!loading && (
                <div className="space-y-4 pt-4">
                    {success ? (
                        <button
                            type="button"
                            onClick={() => router.push("/auth/login")}
                            className="w-full rounded-lg bg-black hover:bg-neutral-800 px-4 py-3 font-medium text-white transition dark:bg-white dark:text-black"
                        >
                            Continue to Login
                        </button>
                    ) : (
                        <div className="space-y-6 text-left border-t border-gray-100 dark:border-zinc-800 pt-6">
                            <form onSubmit={handleResendSubmit} className="space-y-3">
                                <label className="text-xs font-semibold text-gray-700 dark:text-zinc-300 uppercase tracking-wider block">
                                    Request Fresh Link
                                </label>
                                <div className="relative flex items-center">
                                    <Mail className="absolute left-3 h-4 w-4 text-gray-400 dark:text-zinc-500 pointer-events-none" />
                                    <input
                                        type="email"
                                        required
                                        disabled={isResending}
                                        value={resendEmail}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setResendEmail(e.target.value)}
                                        placeholder="Enter account email"
                                        className="w-full text-sm rounded-lg border border-gray-300 bg-white pl-10 pr-12 py-2.5 text-gray-900 outline-none dark:bg-zinc-950 dark:text-white dark:border-zinc-800"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isResending || !resendEmail}
                                        className="absolute right-1.5 p-1.5 rounded-md bg-black text-white hover:bg-neutral-800 transition dark:bg-white dark:text-black flex items-center justify-center"
                                    >
                                        {isResending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                                    </button>
                                </div>
                            </form>

                            {resendStatus && (
                                <div className={`rounded-lg border p-3 text-xs leading-relaxed
                                    ${resendStatus.type === "success"
                                        ? "border-green-200 bg-green-50 text-green-700 dark:bg-emerald-950/20 dark:border-emerald-900/60 dark:text-emerald-400"
                                        : "border-red-200 bg-red-50 text-red-700 dark:bg-red-950/20 dark:border-red-900/60 dark:text-red-400"
                                    }`}>
                                    <span>{resendStatus.text}</span>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => router.push("/auth/login")}
                                className="w-full text-center text-sm font-medium text-gray-600 hover:text-black dark:text-zinc-400 block pt-2"
                            >
                                Return to Sign In
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// --- PARENT ROOT EXPORT: Safely Wraps Children inside Suspense boundaries ---
export default function VerifyEmailPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-slate-50 dark:bg-zinc-950 select-none">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 sm:p-8">
                <Suspense fallback={
                    <div className="text-center p-4 flex flex-col items-center justify-center gap-3">
                        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                        <p className="text-sm text-gray-500 dark:text-zinc-400">Loading token context parameters...</p>
                    </div>
                }>
                    <VerifyEmailContent />
                </Suspense>
            </div>
        </main>
    );
}
