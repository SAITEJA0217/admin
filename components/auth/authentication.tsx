"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { useAppDispatch } from "@/store/hooks";
import { logout as logoutAction } from "@/store/slices/authSlice";

import {
    getAccessToken,
    clearTokens,
} from "@/lib/token";

export default function AuthButton() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [isAuthenticated, setIsAuthenticated] =
        useState(false);
    const [isLoading, setIsLoading] =
        useState(true);

    const checkAuth = useCallback(() => {
        const token = getAccessToken();

        setIsAuthenticated(Boolean(token));
        setIsLoading(false);
    }, []);

    useEffect(() => {
        // Initial auth check
        checkAuth();

        // Listen for localStorage changes across tabs
        window.addEventListener(
            "storage",
            checkAuth
        );

        // Listen for custom auth changes in the same tab
        window.addEventListener(
            "auth-changed",
            checkAuth
        );

        return () => {
            window.removeEventListener(
                "storage",
                checkAuth
            );
            window.removeEventListener(
                "auth-changed",
                checkAuth
            );
        };
    }, [checkAuth]);

    const handleLogout = () => {
        // Remove both access and refresh tokens
        clearTokens();

        // Clear Redux authentication state
        dispatch(logoutAction());

        // Redirect to login page
        router.push("/auth/login");
        router.refresh();
    };

    // Avoid hydration flicker
    if (isLoading) {
        return null;
    }

    // Not logged in
    if (!isAuthenticated) {
        return (
            <Link
                href="/auth/login"
                className="rounded-lg bg-black px-4 py-2 font-medium text-white hover:opacity-90"
            >
                Login
            </Link>
        );
    }

    // Logged in
    return (
        <div className="flex items-center gap-3">
            <Link
                href="/profile"
                className="rounded-lg border px-4 py-2 font-medium hover:bg-gray-50"
            >
                Profile
            </Link>

            <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:opacity-90"
            >
                Logout
            </button>
        </div>
    );
}