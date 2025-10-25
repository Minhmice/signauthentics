"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { FieldTooltip } from "@/app/dashboard/components/forms/shared/FieldTooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Step3SEO() {
  const { register, watch, formState: { errors } } = useFormContext();
  const title = watch("title") || "";
  const content = watch("content") || "";

  const generateMetaTitle = () => {
    if (title) {
      return `${title} | SignAuthentics`;
    }
    return "";
  };

  const generateMetaDescription = () => {
    if (content) {
      const plainText = content.replace(/[#*`]/g, "").replace(/\n/g, " ");
      return plainText.substring(0, 160) + (plainText.length > 160 ? "..." : "");
    }
    return "";
  };

  return (
    <FormSection
      title="SEO Settings"
      description="Optimize your article for search engines"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="metaTitle">
            Meta Title
            <FieldTooltip content="Title that appears in search results (50-60 characters recommended)" />
          </Label>
          <div className="flex gap-2">
            <Input
              id="metaTitle"
              {...register("metaTitle")}
              placeholder="Enter meta title"
              className={errors.metaTitle ? "border-red-500" : ""}
            />
            <button
              type="button"
              onClick={() => {
                const metaTitle = generateMetaTitle();
                if (metaTitle) {
                  // @ts-expect-error - DOM element type issue
                  document.getElementById("metaTitle").value = metaTitle;
                }
              }}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Auto
            </button>
          </div>
          {errors.metaTitle && (
            <p className="text-sm text-red-500">{String(errors.metaTitle.message)}</p>
          )}
          <div className="text-sm text-gray-500">
            Character count: {watch("metaTitle")?.length || 0}/60
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription">
            Meta Description
            <FieldTooltip content="Description that appears in search results (150-160 characters recommended)" />
          </Label>
          <div className="flex gap-2">
            <Textarea
              id="metaDescription"
              {...register("metaDescription")}
              placeholder="Enter meta description"
              rows={3}
              className={errors.metaDescription ? "border-red-500" : ""}
            />
            <button
              type="button"
              onClick={() => {
                const metaDescription = generateMetaDescription();
                if (metaDescription) {
                  // @ts-expect-error - DOM element type issue
                  document.getElementById("metaDescription").value = metaDescription;
                }
              }}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm self-start"
            >
              Auto
            </button>
          </div>
          {errors.metaDescription && (
            <p className="text-sm text-red-500">{String(errors.metaDescription.message)}</p>
          )}
          <div className="text-sm text-gray-500">
            Character count: {watch("metaDescription")?.length || 0}/160
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">SEO Preview</h4>
          <div className="space-y-2">
            <div className="text-blue-600 dark:text-blue-400 text-lg font-medium">
              {watch("metaTitle") || title || "Your article title"}
            </div>
            <div className="text-green-600 dark:text-green-400 text-sm">
              signauthentics.com/blog/{watch("slug") || "article-slug"}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              {watch("metaDescription") || "Your meta description will appear here..."}
            </div>
          </div>
        </div>
      </div>
    </FormSection>
  );
}