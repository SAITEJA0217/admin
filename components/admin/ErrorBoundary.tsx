"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { logger } from "@/lib/logger";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.critical("ErrorBoundary", "Client UI crashed", error, {
      componentStack: errorInfo.componentStack,
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#05050A] text-white">
          <div className="relative max-w-md w-full rounded-2xl border border-red-500/20 bg-white/[0.02] backdrop-blur-xl p-8 text-center space-y-6 overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

            <div className="mx-auto rounded-2xl bg-red-500/15 border border-red-500/30 p-4 w-fit">
              <AlertTriangle className="h-8 w-8 text-red-400 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">System Error Isolated</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                An unexpected user interface exception was caught and gracefully isolated. Live operations telemetry has logged this failure event.
              </p>
              {this.state.error && (
                <pre className="mt-4 rounded-xl border border-white/[0.05] bg-black/40 p-3 text-[10px] text-red-300 font-mono text-left overflow-x-auto max-h-24">
                  {this.state.error.message}
                </pre>
              )}
            </div>

            <button
              onClick={this.handleReset}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 py-2.5 text-xs font-semibold text-white hover:from-red-500 hover:to-orange-500 transition-all shadow-lg shadow-red-900/30"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset UI Environment
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
