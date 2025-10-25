"use client";

import * as React from "react";
import { X, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageFile {
  id: string;
  url: string;
  file?: File;
  name: string;
}

interface ImagePreviewProps {
  images: ImageFile[];
  onRemove: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  className?: string;
}

export function ImagePreview({
  images,
  onRemove,
  onReorder,
  className,
}: ImagePreviewProps) {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onReorder(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", className)}>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={cn(
            "relative group bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700",
            draggedIndex === index && "opacity-50",
            dragOverIndex === index && "ring-2 ring-blue-500"
          )}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
        >
          {/* Image */}
          <div className="aspect-square relative">
            <img
              src={image.url}
              alt={image.name}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onRemove(image.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition-colors"
                  aria-label={`Remove ${image.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Drag Handle */}
            <div className="absolute top-2 left-2 p-1 bg-black/50 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="h-3 w-3" />
            </div>

            {/* Image Number */}
            <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 rounded text-xs text-white">
              {index + 1}
            </div>
          </div>

          {/* Image Name */}
          <div className="p-2">
            <p className="text-xs text-zinc-300 truncate" title={image.name}>
              {image.name}
            </p>
            {image.file && (
              <p className="text-xs text-zinc-500">
                {(image.file.size / 1024 / 1024).toFixed(1)} MB
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
