"use client";

import * as React from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileSelect: (files: FileList | null) => void;
  maxImages: number;
  currentCount: number;
  maxSizeMB: number;
  accept: string;
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  className?: string;
}

export function UploadZone({
  onFileSelect,
  maxImages,
  currentCount,
  maxSizeMB,
  accept,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  className,
}: UploadZoneProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      onFileSelect(files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const canUpload = currentCount < maxImages;

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-lg p-6 text-center transition-colors",
        isDragOver
          ? "border-blue-500 bg-blue-500/10"
          : "border-zinc-600 hover:border-zinc-500",
        !canUpload && "opacity-50 cursor-not-allowed",
        className
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        disabled={!canUpload}
      />

      <div className="flex flex-col items-center space-y-2">
        <Upload
          className={cn(
            "h-8 w-8",
            isDragOver ? "text-blue-500" : "text-zinc-400"
          )}
        />
        <div className="space-y-1">
          <p className="text-sm font-medium text-zinc-300">
            {isDragOver
              ? "Drop images here"
              : canUpload
              ? "Click to upload or drag and drop"
              : `Maximum ${maxImages} images reached`}
          </p>
          <p className="text-xs text-zinc-500">
            {canUpload
              ? `PNG, JPG, WEBP up to ${maxSizeMB}MB each`
              : `${currentCount}/${maxImages} images`}
          </p>
        </div>
      </div>

      {canUpload && (
        <button
          type="button"
          onClick={handleClick}
          className="absolute inset-0 w-full h-full"
          aria-label="Upload images"
        />
      )}
    </div>
  );
}
