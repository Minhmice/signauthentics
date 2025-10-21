"use client";

/**
 * ImageUpload Component với Drag & Drop
 * - Upload multiple images
 * - Drag & drop để reorder
 * - Preview với delete button
 * - Tái sử dụng cho Products, Content, News
 */

import * as React from "react";
import { Upload, X, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    onChange?.(images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageFile[] = [];
    const remainingSlots = maxImages - images.length;

    Array.from(files)
      .slice(0, remainingSlots)
      .forEach((file) => {
        // Validate file size
        if (file.size > maxSizeMB * 1024 * 1024) {
          alert(`File ${file.name} vượt quá ${maxSizeMB}MB`);
          return;
        }

        // Create preview URL
        const url = URL.createObjectURL(file);
        newImages.push({
          id: `${Date.now()}-${Math.random()}`,
          url,
          file,
          name: file.name,
        });
      });

    setImages([...images, ...newImages]);
  };

  const handleDelete = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(dropIndex, 0, draggedImage);

    setImages(newImages);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDropZoneDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDropZoneDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDropZoneDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Zone */}
      {images.length < maxImages && (
        <div
          onDragOver={handleDropZoneDragOver}
          onDragLeave={handleDropZoneDragLeave}
          onDrop={handleDropZoneDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
            isDragOver
              ? "border-blue-500 bg-blue-500/5"
              : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/50 hover:bg-zinc-800"
          )}
        >
          <Upload className={cn("w-12 h-12 mx-auto mb-3", isDragOver ? "text-blue-500" : "text-zinc-500")} />
          <p className="text-sm text-zinc-300 mb-1">
            <span className="font-semibold text-blue-500">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-zinc-500">
            PNG, JPG, WEBP up to {maxSizeMB}MB (Max {maxImages} images)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={accept}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={cn(
                "relative group aspect-square bg-zinc-800 rounded-lg overflow-hidden border-2 transition-all cursor-move",
                draggedIndex === index && "opacity-50",
                dragOverIndex === index && draggedIndex !== index && "border-blue-500",
                draggedIndex !== index && "border-zinc-700"
              )}
            >
              {/* Image Preview */}
              <img src={image.url} alt={image.name} className="w-full h-full object-cover" />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {/* Drag Handle */}
                <div className="absolute top-2 left-2 p-1 bg-zinc-900 rounded cursor-grab active:cursor-grabbing">
                  <GripVertical className="w-4 h-4 text-zinc-400" />
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(image.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                  title="Delete image"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Primary Badge */}
              {index === 0 && (
                <div className="absolute bottom-2 left-2">
                  <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-semibold rounded">
                    Primary
                  </span>
                </div>
              )}

              {/* Image Name */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-xs text-white truncate">{image.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Text */}
      {images.length > 0 && (
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <p>
            {images.length} / {maxImages} images uploaded
          </p>
          <p>Drag images to reorder • First image is primary</p>
        </div>
      )}
    </div>
  );
}

/**
 * Simple Image Upload (Single Image)
 * Cho trường hợp chỉ cần 1 ảnh đơn giản
 */
interface SingleImageUploadProps {
  image?: string;
  onChange?: (url: string | null) => void;
  maxSizeMB?: number;
  accept?: string;
  className?: string;
}

export function SingleImageUpload({
  image,
  onChange,
  maxSizeMB = 2,
  accept = "image/jpeg,image/png,image/webp",
  className,
}: SingleImageUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(image || null);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null) => {
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File vượt quá ${maxSizeMB}MB`);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(url);
  };

  const handleDelete = () => {
    setPreview(null);
    onChange?.(null);
  };

  return (
    <div className={cn("relative", className)}>
      {preview ? (
        <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden group">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              onClick={handleDelete}
              className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files[0];
            handleFileSelect(file);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "aspect-video border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all",
            isDragOver ? "border-blue-500 bg-blue-500/5" : "border-zinc-700 hover:border-zinc-600 bg-zinc-800/50"
          )}
        >
          <Upload className={cn("w-10 h-10 mb-2", isDragOver ? "text-blue-500" : "text-zinc-500")} />
          <p className="text-sm text-zinc-300 mb-1">
            <span className="font-semibold text-blue-500">Click</span> or drag image here
          </p>
          <p className="text-xs text-zinc-500">Max {maxSizeMB}MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

