"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
// Import schema from parent component
import { ImageUpload } from "@/app/dashboard/components/shared/ImageUpload";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { FieldTooltip } from "@/app/dashboard/components/forms/shared/FieldTooltip";
import { AnimatedSection, AnimatedField } from "@/app/dashboard/components/forms/shared/FormAnimations";
import { Camera, Image as ImageIcon } from "lucide-react";

interface Step3MediaProps {
  form: UseFormReturn<any>;
  images: Array<{ id: string; url: string; name: string }>;
  setImages: React.Dispatch<React.SetStateAction<Array<{ id: string; url: string; name: string }>>>;
}

export function Step3Media({ form, images, setImages }: Step3MediaProps) {
  return (
    <AnimatedSection>
      <FormSection
        title="Hình ảnh sản phẩm"
        description="Tải lên hình ảnh minh họa cho sản phẩm"
        icon={Camera}
      >
        <div className="space-y-6">
          <AnimatedField>
            <div>
              <label className="text-sm font-medium text-zinc-200 mb-2 block">
                Hình ảnh sản phẩm
                <FieldTooltip content="Tải lên tối đa 10 hình ảnh, hình đầu tiên sẽ là ảnh đại diện" />
              </label>
              <ImageUpload
                images={images}
                onChange={setImages}
                maxImages={10}
                accept="image/*"
                className="w-full"
              />
              <p className="text-xs text-zinc-500 mt-2">
                Hỗ trợ: JPG, PNG, WebP. Kích thước tối đa: 5MB mỗi ảnh
              </p>
            </div>
          </AnimatedField>
        </div>
      </FormSection>
    </AnimatedSection>
  );
}


