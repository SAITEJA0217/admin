// app/founder/layout.tsx

"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import FounderSidebar from "@/components/founder/layout/FounderSidebar";
import FounderMobileNav from "@/components/founder/layout/FounderMobileNav";
import FounderTopbar from "@/components/founder/layout/FounderTopbar";

import { useAppSelector } from "@/store/hooks";

interface FounderLayoutProps {
  children: React.ReactNode;
}

export default function FounderLayout({
  children,
}: FounderLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Not logged in
    if (!isAuthenticated || !user) {
      router.replace("/auth/login");
      return;
    }

    // Wrong role → redirect to the correct dashboard
    switch (user.role as any) {
      case "FOUNDER":
        // Allowed, do nothing
        break;

      case "INVESTOR":
        router.replace("/investor");
        break;

      case "MANUFACTURER":
        router.replace("/manufacturer");
        break;

      case "ADMIN":
        router.replace("/admin");
        break;

      default:
        router.replace("/");
        break;
    }
  }, [isAuthenticated, user, router]);

  // Prevent unauthorized content flash
  if (!isAuthenticated || !user) {
    return null;
  }

  if (user.role !== "FOUNDER") {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Mobile / Tablet Navigation */}
      <FounderMobileNav />

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <FounderSidebar />

        {/* Main Content Area */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* Topbar */}
          <FounderTopbar pathname={pathname} />

          {/* Page Content */}
          <main className="flex-1 p-4 md:p-6 xl:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}