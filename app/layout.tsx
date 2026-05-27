import type { Metadata } from "next";
import "./globals.css";

import QueryProvider from "./providers/QueryProvider";
import ReduxProvider from "@/store/provider";
import ErrorBoundary from "@/components/admin/ErrorBoundary";

import ConditionalLayout from "@/components/layout/ConditionalLayout";

import { Plus_Jakarta_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "Venture Launcher",
  description: "A platform for connecting founders and investors",
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${jakarta.className} min-h-screen flex flex-col`}
      >
        <ReduxProvider>
          <QueryProvider>
            <ErrorBoundary>
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </ErrorBoundary>
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}