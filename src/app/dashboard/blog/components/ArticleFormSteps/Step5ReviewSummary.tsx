"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Tag, User, Eye } from "lucide-react";

export function Step5ReviewSummary() {
  const { watch } = useFormContext();
  const formData = watch();

  return (
    <FormSection
      title="Review & Summary"
      description="Review your article before publishing"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Article Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {formData.title || "Article Title"}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  {formData.category || "Category"}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {formData.status || "Status"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formData.publishedAt ? new Date(formData.publishedAt).toLocaleDateString('vi-VN') : "Not set"}
                </span>
              </div>
            </div>

            {formData.excerpt && (
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Excerpt</h3>
                <p className="text-gray-600 dark:text-gray-300">{formData.excerpt}</p>
              </div>
            )}

            {formData.tags && formData.tags.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {formData.metaTitle && (
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">SEO Title</h3>
                <p className="text-gray-600 dark:text-gray-300">{formData.metaTitle}</p>
              </div>
            )}

            {formData.metaDescription && (
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">SEO Description</h3>
                <p className="text-gray-600 dark:text-gray-300">{formData.metaDescription}</p>
              </div>
            )}

            {formData.content && (
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Content Preview</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg max-h-40 overflow-y-auto">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {formData.content.substring(0, 300)}
                    {formData.content.length > 300 ? "..." : ""}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Ready to Publish?</h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Review all the information above and click &ldquo;Save&rdquo; to create or update your article.
            {formData.status === "published" && " This article will be published immediately."}
          </p>
        </div>
      </div>
    </FormSection>
  );
}