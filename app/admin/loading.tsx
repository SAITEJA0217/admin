"use client";

import { motion } from "framer-motion";

export default function AdminLoading() {
  return (
    <div className="min-h-[70vh] w-full px-4 py-8 sm:px-6 lg:px-8 xl:px-10 space-y-8 flex flex-col justify-center items-center">
      {/* Ambient radial glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 h-150 w-150 rounded-full bg-purple-900/5 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 h-125 w-125 rounded-full bg-blue-900/5 blur-[120px]" />
      </div>

      <div className="w-full max-w-4xl space-y-6">
        {/* Header skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-pulse">
          <div className="space-y-3">
            <div className="h-4 w-28 rounded-full bg-purple-500/10 border border-purple-500/20" />
            <div className="h-8 w-64 rounded-xl bg-white/4" />
            <div className="h-3 w-80 rounded-lg bg-white/3" />
          </div>
          <div className="h-10 w-32 rounded-xl bg-white/4" />
        </div>

        {/* Dynamic premium loader spinner */}
        <div className="flex justify-center py-12">
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="h-12 w-12 rounded-full border-2 border-purple-500/10 border-t-purple-500 shadow-lg shadow-purple-950/20"
            />
            <div className="absolute h-8 w-8 rounded-full bg-[#0A0A0F]/80 backdrop-blur-sm" />
          </div>
        </div>

        {/* Content mock rows */}
        <div className="rounded-2xl border border-white/7 bg-white/2 p-6 space-y-4 animate-pulse">
          <div className="flex gap-4 border-b border-white/5 pb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 w-24 rounded bg-white/4" />
            ))}
          </div>
          {[1, 2, 3].map((row) => (
            <div key={row} className="flex gap-4 items-center py-2 border-b border-white/3 last:border-b-0">
              <div className="h-8 w-8 rounded-full bg-white/3" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/4 rounded bg-white/4" />
                <div className="h-2.5 w-1/3 rounded bg-white/3" />
              </div>
              <div className="h-4 w-16 rounded bg-white/4" />
              <div className="h-6 w-12 rounded bg-white/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
