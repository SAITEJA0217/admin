// components/auth/LoginForm.tsx

"use client";

import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";

import { useAppDispatch } from "@/store/hooks";
import {
  login as loginAction,
  logout as logoutAction,
} from "@/store/slices/authSlice";

import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { login, resendVerificationLink } from "@/services/auth";
import { setAccessToken, setRefreshToken } from "@/lib/token";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [serverError, setServerError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  // Unverified account visibility state mechanics
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false);
  const [verifyEmailInput, setVerifyEmailInput] = useState("");
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError("");
      setNeedsEmailVerification(false);
      setVerifyStatus(null);

      const response = await login(data);
      console.log("Login response:", response);

      setAccessToken(response.data.accessToken);
      if (response.data.refreshToken) {
        setRefreshToken(response.data.refreshToken);
      }
      dispatch(loginAction(response.data.user));

      const user = response.data.user;

      switch (user.role) {
        case "FOUNDER":
          router.push("/founder");
          break;
        case "INVESTOR":
          router.push("/investor");
          break;
        case "MANUFACTURER":
          router.push("/manufacturer");
          break;
        case "ADMIN":
          router.push("/admin");
          break;
        default:
          router.push("/");
          break;
      }
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(logoutAction());

      const message = error instanceof Error ? error.message : "Login failed";
      setServerError(message);

      // Matches your exact server exception string rule to unlock the resend dropzone configuration
      if (
        (message.toLowerCase().includes("verify") && message.toLowerCase().includes("email")) ||
        message.includes("Please verify your email address")
      ) {
        setNeedsEmailVerification(true);
        // Syncs user's typed email straight into verification box automatically
        if (data.email) setVerifyEmailInput(data.email);
      }
    }
  };

  // Dispatches immediate token re-generation requests to backend email system routing layers
  const handleResendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyEmailInput) return;

    try {
      setIsSendingLink(true);
      setVerifyStatus(null);

      await resendVerificationLink(verifyEmailInput);

      setVerifyStatus({
        type: "success",
        text: "Activation link generated! Please inspect your inbox parameters."
      });
    } catch (err) {
      setVerifyStatus({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to emit transactional verification data payload."
      });
    } finally {
      setIsSendingLink(false);
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="mt-2 text-sm text-gray-500">
          Welcome back to Venture Launcher
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:border-transparent dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full rounded-lg border border-gray-300 bg-white pl-4 pr-12 py-3 text-gray-900 outline-none focus:ring-2 focus:border-transparent dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password Link Layout */}
        <div className="flex justify-end text-sm font-medium">
          <button
            type="button"
            onClick={() => router.push("/auth/forgot-password")}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Forgot Password?
          </button>
        </div>

        {/* Server Validation Exception Display Frame */}
        {serverError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:bg-red-950/20 dark:border-red-900 text-sm space-y-3">
            <div className="flex items-start gap-2.5 text-red-600 dark:text-red-400">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p className="font-medium leading-relaxed">{serverError}</p>
            </div>

            {/*
              OPTIONAL RESEND PANEL:
              Kept purely unrendered by default. Transitions to active layout blocks
              only if unverified user exceptions are dropped from server calls.
            */}
            {needsEmailVerification && (
              <div className="mt-3 border-t border-red-200/60 dark:border-red-900/40 pt-3 space-y-2">
                <p className="text-xs font-semibold text-neutral-600 dark:text-zinc-400">
                  Resend validation token credentials instantly:
                </p>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 h-4 w-4 text-gray-400 dark:text-zinc-500 pointer-events-none" />
                  <input
                    type="email"
                    value={verifyEmailInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setVerifyEmailInput(e.target.value)}
                    placeholder="account@example.com"
                    className="w-full text-xs rounded-lg border border-red-200 bg-white pl-9 pr-12 py-2.5 text-gray-900 outline-none focus:ring-2 focus:ring-red-400 dark:bg-zinc-900 dark:text-white dark:border-zinc-800"
                  />
                  <button
                    type="button"
                    disabled={isSendingLink || !verifyEmailInput}
                    onClick={handleResendRequest}
                    className="absolute right-1.5 p-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center"
                    aria-label="Submit automated email resend link verification pipeline"
                  >
                    {isSendingLink ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Microservice feedback notices logs tracking variables */}
                {verifyStatus && (
                  <p className={`text-xs font-semibold mt-1.5
                    ${verifyStatus.type === "success"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                    }
                  `}>
                    {verifyStatus.text}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Submit Actions Button Controls */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-black hover:bg-neutral-800 py-3 font-medium text-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Registration CTA Row Link */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Don't have an account?</p>
        <button
          type="button"
          onClick={() => router.push("/auth/register")}
          className="mt-1 font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Create account
        </button>
      </div>
    </div>
  );
}
