"use client";

/**
 * ExportButton Component
 * Export dropdown với các format options (CSV, JSON, PDF)
 */

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, FileJson, File } from "lucide-react";

interface ExportButtonProps {
  data: unknown[];
  filename?: string;
  onExport?: (format: string, data: unknown[]) => void;
  className?: string;
  disabled?: boolean;
}

export function ExportButton({
  data,
  filename = "export",
  onExport,
  className,
  disabled = false,
}: ExportButtonProps) {
  const handleExport = (format: string) => {
    if (onExport) {
      onExport(format, data);
      return;
    }

    switch (format) {
      case "csv":
        exportToCSV(data, filename);
        break;
      case "json":
        exportToJSON(data, filename);
        break;
      case "pdf":
        // PDF export would require additional library like jsPDF
        console.log("PDF export not implemented yet");
        break;
    }
  };

  const exportToCSV = (data: unknown[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0] as Record<string, unknown>);
    const csvContent = [
      headers.join(","),
      ...data.map(row => 
        headers.map(header => {
          const value = (row as Record<string, unknown>)[header];
          // Escape commas and quotes in CSV
          if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = (data: unknown[], filename: string) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.json`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled || data.length === 0}
          className={`bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800 ${className}`}
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-900 border-zinc-800 text-white">
        <DropdownMenuItem
          onClick={() => handleExport("csv")}
          className="text-zinc-300 hover:text-white hover:bg-zinc-800"
        >
          <FileText className="w-4 h-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport("json")}
          className="text-zinc-300 hover:text-white hover:bg-zinc-800"
        >
          <FileJson className="w-4 h-4 mr-2" />
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleExport("pdf")}
          disabled
          className="text-zinc-500 hover:text-zinc-500 hover:bg-transparent"
        >
          <File className="w-4 h-4 mr-2" />
          Export as PDF (Coming Soon)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
