"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { UploadZone } from "./UploadZone";
import { ImagePreview } from "./ImagePreview";

interface ImageFile {
  id: string;
  url: string;
  file?: File;
  name: string;
}

interface ImageUploadProps {
  images?: ImageFile[];
  onChange?: (images: ImageFile[]) => void;
  maxImages?: number;
  maxSizeMB?: number;
  accept?: string;
  className?: string;
}

export function ImageUpload({
  images: initialImages = [],
  onChange,
  maxImages = 6,
  maxSizeMB = 2,
  accept = "image/jpeg,image/png,image/webp",
  className,
}: ImageUploadProps) {
  const [images, setImages] = React.useState<ImageFile[]>(initialImages);
  const [isDragOver, setIsDragOver] = React.useState(false);

  React.useEffect(() => {
    onChange?.(images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newImages: ImageFile[] = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    Array.from(files).forEach((file) => {
      if (images.length + newImages.length >= maxImages) return;
      if (file.size > maxSizeBytes) return;
      if (!accept.split(',').some(type => file.type.match(type.trim()))) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        const newImage: ImageFile = {
          id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          url,
          file,
          name: file.name,
        };
        
        setImages(prev => {
          const updated = [...prev, newImage];
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemove = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    setImages(prev => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      return newImages;
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const canUpload = images.length < maxImages;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Zone */}
      {canUpload && (
        <UploadZone
          onFileSelect={handleFileSelect}
          maxImages={maxImages}
          currentCount={images.length}
          maxSizeMB={maxSizeMB}
          accept={accept}
          isDragOver={isDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        />
      )}

      {/* Image Preview */}
      <ImagePreview
        images={images}
        onRemove={handleRemove}
        onReorder={handleReorder}
      />

      {/* Upload Info */}
      {images.length > 0 && (
        <div className="text-xs text-zinc-500 text-center">
          {images.length} of {maxImages} images uploaded
        </div>
      )}
    </div>
  );
}

export type { ImageFile, ImageUploadProps };
