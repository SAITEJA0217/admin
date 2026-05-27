"use client";

import { motion } from "framer-motion";
import { FileText, UserCheck, BarChart3, Zap } from "lucide-react";

export default function PageHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="space-y-2">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1">
          <Zap className="h-3 w-3 text-purple-400" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-purple-400">
            Command Center
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Platform{" "}
          <span className="text-gradient-purple">Operational</span>{" "}
          Intelligence
        </h1>

        {/* Description */}
        <p className="max-w-xl text-sm text-slate-400 leading-relaxed">
          Monitor platform health, moderation systems, verification pipelines
          and ecosystem operations in real time.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200">
          <FileText className="h-3.5 w-3.5" />
          Review Reports
        </button>
        <button className="flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 text-xs font-semibold text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-200">
          <UserCheck className="h-3.5 w-3.5" />
          Verify Profiles
        </button>
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-200">
          <BarChart3 className="h-3.5 w-3.5" />
          Open Analytics
        </button>
      </div>
    </motion.div>
  );
}
