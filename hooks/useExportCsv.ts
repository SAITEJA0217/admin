import { useCallback } from "react";

interface ExportOptions {
  filename?: string;
}

export function useExportCsv() {
  const exportToCsv = useCallback(
    <T extends Record<string, unknown>>(
      data: T[],
      options: ExportOptions = {}
    ) => {
      if (!data.length) return;

      const filename = options.filename ?? `export-${Date.now()}.csv`;
      const headers = Object.keys(data[0]);

      const csvContent = [
        headers.join(","),
        ...data.map((row) =>
          headers
            .map((h) => {
              const val = row[h];
              const str = val == null ? "" : String(val);
              // Escape quotes and wrap in quotes if contains comma
              return str.includes(",") || str.includes('"')
                ? `"${str.replace(/"/g, '""')}"`
                : str;
            })
            .join(",")
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    },
    []
  );

  return { exportToCsv };
}
