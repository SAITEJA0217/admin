"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Routes that use their own private dashboard layouts
  const dashboardRoutePrefixes = [
    "/founder",
    "/investor",
    "/manufacturer",
    "/admin",
  ];

  const isDashboardRoute = dashboardRoutePrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // Founder, Investor, Manufacturer, and Admin dashboards
  // should not render the public Navbar/Footer.
  if (isDashboardRoute) {
    return <>{children}</>;
  }

  // Public marketing and authentication pages
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black flex flex-col">
        {children}
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}