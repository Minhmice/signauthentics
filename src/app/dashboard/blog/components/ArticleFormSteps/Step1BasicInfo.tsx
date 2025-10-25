"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { FieldTooltip } from "@/app/dashboard/components/forms/shared/FieldTooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function Step1BasicInfo() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const [newTag, setNewTag] = React.useState("");
  const tags = watch("tags") || [];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setValue("tags", [...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue("tags", tags.filter((tag: string) => tag !== tagToRemove));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue("title", title);
    setValue("slug", generateSlug(title));
  };

  return (
    <FormSection
      title="Basic Information"
      description="Set up the basic details for your article"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              Article Title
              <FieldTooltip content="The main title of your article" />
            </Label>
            <Input
              id="title"
              {...register("title")}
              onChange={handleTitleChange}
              placeholder="Enter article title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{String(errors.title.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              URL Slug
              <FieldTooltip content="URL-friendly version of the title" />
            </Label>
            <Input
              id="slug"
              {...register("slug")}
              placeholder="article-url-slug"
              className={errors.slug ? "border-red-500" : ""}
            />
            {errors.slug && (
              <p className="text-sm text-red-500">{String(errors.slug.message)}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="category">
              Category
              <FieldTooltip content="Choose the article category" />
            </Label>
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="News">News</SelectItem>
                <SelectItem value="Player Profile">Player Profile</SelectItem>
                <SelectItem value="Guide">Guide</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Analysis">Analysis</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Opinion">Opinion</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{String(errors.category.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">
              Status
              <FieldTooltip content="Current publication status" />
            </Label>
            <Select onValueChange={(value) => setValue("status", value)}>
              <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-500">{String(errors.status.message)}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">
            Excerpt
            <FieldTooltip content="Brief summary of the article" />
          </Label>
          <Textarea
            id="excerpt"
            {...register("excerpt")}
            placeholder="Enter a brief excerpt..."
            rows={3}
            className={errors.excerpt ? "border-red-500" : ""}
          />
          {errors.excerpt && (
            <p className="text-sm text-red-500">{String(errors.excerpt.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">
            Tags
            <FieldTooltip content="Add tags to categorize your article" />
          </Label>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </FormSection>
  );
}