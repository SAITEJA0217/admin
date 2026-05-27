// components/auth/ForgotPasswordForm.tsx

"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { forgotPassword } from "@/services/auth";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await forgotPassword(email);

      setMessage(
        response.message || "If that email exists, a password reset link has been sent."
      );

      // Automated redirect phase matching verification routing mechanics
      setTimeout(() => {
        router.push("/auth/verification-sent");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected failure occurred while requesting token."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:bg-zinc-900 dark:border-zinc-800/80 sm:p-8">

      {/* Navigation Escape Link Row */}
      <button
        type="button"
        onClick={() => router.push("/auth/login")}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Login
      </button>

      {/* Heading Typography block */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Forgot Password
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
          Enter your email address below and we will dispatch a secure single-use recovery link straight to your inbox.
        </p>
      </div>

      {/* Dynamic Context Notification Panels */}
      {error && (
        <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400 leading-normal">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:bg-emerald-950/20 dark:border-emerald-900/60 dark:text-emerald-400 leading-normal">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{message}</span>
        </div>
      )}

      {/* Interactive Processing Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="forgot-email-field" className="mb-2 block text-sm font-medium text-gray-900 dark:text-zinc-200">
            Email Address
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-4 h-5 w-5 text-gray-400 dark:text-zinc-500 pointer-events-none" />
            <input
              id="forgot-email-field"
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white pl-12 pr-4 py-3 text-gray-900 outline-none focus:ring-2 focus:border-transparent transition dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Action Trigger Submit Button Component */}
        <button
          type="submit"
          disabled={loading || !email}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-black hover:bg-neutral-800 py-3 font-medium text-white transition disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-md"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending Reset Link...</span>
            </>
          ) : (
            <span>Send Reset Link</span>
          )}
        </button>
      </form>
    </div>
  );
}
