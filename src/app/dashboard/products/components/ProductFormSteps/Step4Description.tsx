"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
// Import schema from parent component
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { FieldTooltip } from "@/app/dashboard/components/forms/shared/FieldTooltip";
import { AnimatedSection, AnimatedField } from "@/app/dashboard/components/forms/shared/FormAnimations";
import { FileText, Hash, Link } from "lucide-react";

interface Step4DescriptionProps {
  form: UseFormReturn<any>;
}

export function Step4Description({ form }: Step4DescriptionProps) {
  return (
    <AnimatedSection>
      <FormSection
        title="Mô tả và SEO"
        description="Thêm mô tả chi tiết và thông tin SEO"
        icon={FileText}
      >
        <div className="space-y-6">
          {/* Description */}
          <AnimatedField>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-200">
                    Mô tả sản phẩm *
                    <FieldTooltip content="Mô tả chi tiết về sản phẩm" />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value as string}
                      placeholder="Nhập mô tả chi tiết về sản phẩm..."
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimatedField>

          {/* SEO Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatedField>
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Meta Title
                      <FieldTooltip content="Tiêu đề SEO cho trang sản phẩm" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                          {...field}
                          value={field.value as string}
                          placeholder="Tiêu đề SEO..."
                          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AnimatedField>

            <AnimatedField>
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-zinc-200">
                      Meta Description
                      <FieldTooltip content="Mô tả SEO cho trang sản phẩm" />
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Link className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                        <Textarea
                          {...field}
                          value={field.value as string}
                          placeholder="Mô tả SEO..."
                          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 pl-10 min-h-[80px]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AnimatedField>
          </div>

          {/* Keywords */}
          <AnimatedField>
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-zinc-200">
                    Từ khóa
                    <FieldTooltip content="Các từ khóa liên quan đến sản phẩm (phân cách bằng dấu phẩy)" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value as string}
                      placeholder="từ khóa 1, từ khóa 2, từ khóa 3..."
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AnimatedField>
        </div>
      </FormSection>
    </AnimatedSection>
  );
}


