"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { FieldTooltip } from "@/app/dashboard/components/forms/shared/FieldTooltip";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Step2Content() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <FormSection
      title="Article Content"
      description="Write your article content"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="content">
            Article Content
            <FieldTooltip content="The main content of your article. Use markdown for formatting." />
          </Label>
          <Textarea
            id="content"
            {...register("content")}
            placeholder="Write your article content here... You can use markdown for formatting."
            rows={20}
            className={`min-h-[400px] ${errors.content ? "border-red-500" : ""}`}
          />
           {errors.content && (
             <p className="text-sm text-red-500">{String(errors.content.message)}</p>
           )}
          <div className="text-sm text-gray-500 mt-1">
            <p>You can use markdown formatting:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li><code>**bold text**</code> for bold</li>
              <li><code>*italic text*</code> for italic</li>
              <li><code># Heading</code> for headings</li>
              <li><code>- List item</code> for lists</li>
              <li><code>[Link text](URL)</code> for links</li>
            </ul>
          </div>
        </div>
      </div>
    </FormSection>
  );
}

