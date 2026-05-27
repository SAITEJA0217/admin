"use client";

import { useEffect } from "react";
import { ShieldAlert, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Render Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {/* Ambient glow */}
      <div className="absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-red-900/10 blur-[120px] -z-10" />

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-6 shadow-lg shadow-red-950/20">
        <ShieldAlert className="h-8 w-8" />
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">System Malfunction</h2>
      <p className="mt-3 max-w-md text-sm text-slate-400">
        An unexpected error occurred while processing this dashboard view. Our operational intelligence monitors have been notified.
      </p>

      {error.message && (
        <div className="mt-6 rounded-xl border border-white/6 bg-white/2 px-4 py-3 max-w-lg">
          <p className="text-xs font-mono text-red-300 break-all">{error.message}</p>
          {error.digest && (
            <p className="text-[10px] font-mono text-slate-500 mt-1">Digest: {error.digest}</p>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-xl bg-linear-to-r from-red-600 to-orange-600 px-5 py-3 text-xs font-semibold text-white hover:from-red-500 hover:to-orange-500 transition-all shadow-lg shadow-red-900/20"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Attempt Recovery
        </button>
        <Link
          href="/admin/operations"
          className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-5 py-3 text-xs font-semibold text-slate-300 hover:bg-white/8 transition-colors"
        >
          <Home className="h-3.5 w-3.5" />
          Dashboard Home
        </Link>
      </div>
    </div>
  );
}
