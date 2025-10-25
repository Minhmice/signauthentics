"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { FieldTooltip } from "@/app/dashboard/components/forms/shared/FieldTooltip";
import { ImageUpload } from "@/app/dashboard/components/shared/ImageUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Step4Media() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const featuredImage = watch("featuredImage");
  const gallery = watch("gallery") || [];

  const handleFeaturedImageChange = (images: Array<{ id: string; url: string; name: string }>) => {
    setValue("featuredImage", images[0]?.url || "");
  };

  const handleGalleryChange = (images: Array<{ id: string; url: string; name: string }>) => {
    setValue("gallery", images.map(img => img.url));
  };

  return (
    <FormSection
      title="Media"
      description="Add images to your article"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="featuredImage">
            Featured Image
            <FieldTooltip content="Main image displayed with the article" />
          </Label>
          <ImageUpload
            images={featuredImage ? [{ id: "1", url: featuredImage, name: "featured" }] : []}
            onChange={handleFeaturedImageChange}
            maxImages={1}
            className="h-48"
          />
          {errors.featuredImage && (
            <p className="text-sm text-red-500">{String(errors.featuredImage.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gallery">
            Gallery Images
            <FieldTooltip content="Additional images for the article gallery" />
          </Label>
          <ImageUpload
            images={gallery.map((url: string, index: number) => ({ id: String(index), url, name: `gallery-${index}` }))}
            onChange={handleGalleryChange}
            maxImages={10}
            className="h-32"
          />
          {errors.gallery && (
            <p className="text-sm text-red-500">{String(errors.gallery.message)}</p>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Image Guidelines</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Featured image: Recommended size 1200x630px</li>
            <li>• Gallery images: Recommended size 800x600px</li>
            <li>• Supported formats: JPG, PNG, WebP</li>
            <li>• Maximum file size: 5MB per image</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}