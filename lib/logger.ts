// ─── Centralized Production Diagnostics & Telemetry ──────────────────────────────

export type LogSeverity = "info" | "warning" | "error" | "critical";

export interface LogEntry {
  timestamp: string;
  severity: LogSeverity;
  module: string;
  message: string;
  context?: Record<string, any>;
  error?: Error | any;
}

class ProductionLogger {
  private logQueue: LogEntry[] = [];
  private readonly maxQueueSize = 50;

  constructor() {
    if (typeof window !== "undefined") {
      // Offline/Online triggers
      window.addEventListener("online", () => this.info("System", "Network status changed: ONLINE"));
      window.addEventListener("offline", () => this.warning("System", "Network status changed: OFFLINE"));

      // Telemetry error trapping
      window.addEventListener("unhandledrejection", (event) => {
        this.critical("PromiseReject", "Unhandled promise rejection detected", {
          reason: event.reason,
        });
      });
    }
  }

  private emit(entry: LogEntry) {
    // Write to standard outputs
    const formatted = `[VL-ADMIN][${entry.timestamp}][${entry.severity.toUpperCase()}][${entry.module}] ${entry.message}`;
    if (entry.severity === "error" || entry.severity === "critical") {
      console.error(formatted, entry.context || "", entry.error || "");
    } else if (entry.severity === "warning") {
      console.warn(formatted, entry.context || "");
    } else {
      console.log(formatted, entry.context || "");
    }

    // Push to diagnostics queue
    this.logQueue.push(entry);
    if (this.logQueue.length > this.maxQueueSize) {
      this.logQueue.shift(); // Evict oldest
    }

    // In dynamic production, telemetry details would be shipped here
    // e.g. Sentry.captureMessage / LogRocket.track
  }

  public info(module: string, message: string, context?: Record<string, any>) {
    this.emit({
      timestamp: new Date().toISOString(),
      severity: "info",
      module,
      message,
      context,
    });
  }

  public warning(module: string, message: string, context?: Record<string, any>) {
    this.emit({
      timestamp: new Date().toISOString(),
      severity: "warning",
      module,
      message,
      context,
    });
  }

  public error(module: string, message: string, error?: any, context?: Record<string, any>) {
    this.emit({
      timestamp: new Date().toISOString(),
      severity: "error",
      module,
      message,
      context,
      error,
    });
  }

  public critical(module: string, message: string, error?: any, context?: Record<string, any>) {
    this.emit({
      timestamp: new Date().toISOString(),
      severity: "critical",
      module,
      message,
      context,
      error,
    });
  }

  // Retrieve in-memory log buffer for system audit panel
  public getDiagnosticsBuffer(): LogEntry[] {
    return [...this.logQueue];
  }

  // Centralized Health State Verification
  public getHealthState() {
    const isOnline = typeof window !== "undefined" ? window.navigator.onLine : true;
    return {
      status: isOnline ? "healthy" : "degraded",
      network: isOnline ? "online" : "offline",
      diagnosticsQueueLength: this.logQueue.length,
      unresolvedErrors: this.logQueue.filter(l => l.severity === "error" || l.severity === "critical").length,
    };
  }
}

export const logger = new ProductionLogger();
