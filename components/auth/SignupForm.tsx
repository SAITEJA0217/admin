"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

import {
    signupSchema,
    type SignupFormData,
} from "@/schemas/auth.schema";
import { register as registerUser } from "@/services/auth";

const roleLabels: Record<string, string> = {
    FOUNDER: "Founder",
    INVESTOR: "Investor",
    MANUFACTURER: "Manufacturer",
    
};

export default function SignupForm() {
    const router = useRouter();

    const [serverError, setServerError] = useState<string>("");

    // State to track visibility for both password fields
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State to track custom dropdown layout open state
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            role: "FOUNDER",
        },
    });

    // Track the active selected role value in real time
    const currentRole = watch("role");

    const onSubmit = async (data: SignupFormData) => {
        try {
            setServerError("");

            const { confirmPassword, ...payload } = data;
            const response = await registerUser(payload);

            console.log("Registration response:", response);
            router.push("/auth/verification-sent");
        } catch (error) {
            console.error("Registration failed:", error);

            const message =
                error instanceof Error
                    ? error.message
                    : "Registration failed";

            setServerError(message);
        }
    };

    return (
        <div className="space-y-6">
            {/* Heading */}
            <div>
                <h1 className="text-3xl font-bold">
                    Create Account
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Join Venture Launcher
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:border-transparent dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100"
                        placeholder="you@example.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Role (Custom Dropdown Menu component layout) */}
                <div className="relative">
                    <label
                        htmlFor="role"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                        Role
                    </label>

                    {/* Keep hidden native register active so react-hook-form grabs the data state */}
                    <input type="hidden" {...register("role")} />

                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full text-left rounded-lg border border-gray-300 bg-white text-gray-900 px-4 py-3 outline-none focus:ring-2 focus:border-transparent dark:bg-zinc-900 dark:text-gray-100 dark:border-zinc-700 flex justify-between items-center shadow-sm"
                    >
                        <span>{roleLabels[currentRole] || "Select a Role"}</span>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:bg-zinc-800 dark:border-zinc-700 overflow-hidden">
                            <ul className="py-1">
                                {(["FOUNDER", "INVESTOR", "MANUFACTURER"] as const).map((roleVal) => (
                                    <li key={roleVal}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setValue("role", roleVal);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150
                                                ${currentRole === roleVal
                                                    ? "bg-gray-100 text-black font-semibold dark:bg-zinc-700 dark:text-white"
                                                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-zinc-700/50"
                                                }
                                            `}
                                        >
                                            {roleLabels[roleVal]}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {errors.role && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.role.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...register("password")}
                            className="w-full rounded-lg border border-gray-300 bg-white pl-4 pr-12 py-3 text-gray-900 outline-none focus:ring-2 focus:border-transparent dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100"
                            placeholder="Create a password"
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

                {/* Confirm Password */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            {...register("confirmPassword")}
                            className="w-full rounded-lg border border-gray-300 bg-white pl-4 pr-12 py-3 text-gray-900 outline-none focus:ring-2 focus:border-transparent dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-100"
                            placeholder="Re-enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none dark:text-gray-400 dark:hover:text-gray-200"
                            aria-label={showConfirmPassword ? "Hide confirmation password" : "Show confirmation password"}
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Server Error */}
                {serverError && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:bg-red-950/30 dark:border-red-900">
                        <p className="text-sm text-red-600 dark:text-red-400">
                            {serverError}
                        </p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-black hover:bg-neutral-800 py-3 font-medium text-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                    {isSubmitting ? "Creating account..." : "Create Account"}
                </button>
            </form>

            {/* Login CTA */}
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                    href="/auth/login"
                    className="font-medium text-black hover:underline dark:text-white"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
}
