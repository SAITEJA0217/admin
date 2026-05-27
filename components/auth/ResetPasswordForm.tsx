// components/auth/ResetPasswordForm.tsx

"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { resetPassword } from "@/services/auth";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Grabs validation key signatures out of query arrays (?token=...)
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Field visibility tracking flags
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      setError("Invalid or missing account synchronization token parameter references.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password threshold restriction violated. Must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Your configured password attributes do not match identically.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      // Fires our payload straight down into your centralized api handler mapping configurations
      const response = await resetPassword(token, newPassword, confirmPassword);

      setMessage(response.message || "Your account credentials have been securely updated.");

      setTimeout(() => {
        router.push("/auth/password-reset-success");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected database mutation exception occurred."
      );
    } finally {
      setLoading(false);
    }
  }

  // Handle fallback invalid state displays beautifully
  if (!token) {
    return (
      <div className="text-center py-4 space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-red-50 p-3 dark:bg-red-950/20">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Invalid Reset Link</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
            This account password renewal route is missing valid authorization token signatures. Please request a fresh recovery link.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/auth/forgot-password")}
          className="w-full rounded-lg bg-black hover:bg-neutral-800 py-2.5 text-sm font-medium text-white transition dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          Go to Forgot Password
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none">
      {/* Title block headings */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Reset Password</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
          Configure a fresh security credential configuration to access your dashboard workspace safely.
        </p>
      </div>

      {/* Dynamic Operation Notifications Status Alerts */}
      {error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/20 dark:border-red-900 dark:text-red-400 leading-normal">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="flex items-start gap-2.5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:bg-emerald-950/20 dark:border-emerald-900/60 dark:text-emerald-400 leading-normal">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{message}</span>
        </div>
      )}

      {/* Primary Input Processing Form Container */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password input field box */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-zinc-200">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              required
              disabled={loading}
              value={newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
              className={inputFieldStyles}
              placeholder="Minimum 6 characters"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition"
              aria-label={showPass ? "Hide password field" : "Reveal password field"}
            >
              {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Password Matching Confirmation field box */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-zinc-200">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              required
              disabled={loading}
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
              className={inputFieldStyles}
              placeholder="Re-enter password choices"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition"
              aria-label={showConfirmPass ? "Hide confirm field" : "Reveal confirm field"}
            >
              {showConfirmPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Action Button: Dispatches token encryption reset values */}
        <button
          type="submit"
          disabled={loading || !newPassword || !confirmPassword}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-black hover:bg-neutral-800 py-3 font-medium text-white transition disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-md mt-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Resetting Password...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              <span>Reset Password</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

const inputFieldStyles =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 focus:border-transparent transition dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder:text-zinc-600";
