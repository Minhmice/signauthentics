"use client";

/**
 * Import Button Component
 * Import data từ file CSV/JSON
 */

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Upload, FileText, FileJson } from "lucide-react";

interface ImportButtonProps {
  onImport?: (format: string, file: File) => void;
  className?: string;
  disabled?: boolean;
}

export function ImportButton({ onImport, className, disabled }: ImportButtonProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (format: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = format === "csv" ? ".csv" : ".json";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImport) {
      const format = file.name.endsWith('.csv') ? 'csv' : 'json';
      onImport(format, file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800 ${className}`}
            disabled={disabled}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-zinc-800 border-zinc-700">
          <DropdownMenuItem
            onClick={() => handleFileSelect("csv")}
            className="text-zinc-300 hover:text-white hover:bg-zinc-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Import CSV
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleFileSelect("json")}
            className="text-zinc-300 hover:text-white hover:bg-zinc-700"
          >
            <FileJson className="w-4 h-4 mr-2" />
            Import JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept=".csv,.json"
      />
    </>
  );
}
