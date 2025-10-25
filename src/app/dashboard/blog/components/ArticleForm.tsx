"use client";

import * as React from "react";
import { BaseForm } from "@/app/dashboard/components/forms/BaseForm";
import { ArticleFormSchema } from "@/lib/form-utils";
import { z } from "zod";
import { FieldValues } from "react-hook-form";

type ArticleFormData = z.infer<typeof ArticleFormSchema>;
import { articlesAPI, type Article } from "@/lib/mock/db";
import { Step1BasicInfo } from "./ArticleFormSteps/Step1BasicInfo";
import { Step2Content } from "./ArticleFormSteps/Step2Content";
import { Step3SEO } from "./ArticleFormSteps/Step3SEO";
import { Step4Media } from "./ArticleFormSteps/Step4Media";
import { Step5ReviewSummary } from "./ArticleFormSteps/Step5ReviewSummary";

interface ArticleFormProps {
  article?: Article;
  onSuccess?: () => void;
  onCancel?: () => void;
  trigger?: React.ReactNode;
}

const steps = [
  { id: "basic", title: "Basic Information", description: "Title, category, and status", component: Step1BasicInfo },
  { id: "content", title: "Content", description: "Article content and excerpt", component: Step2Content },
  { id: "seo", title: "SEO Settings", description: "Meta tags and SEO optimization", component: Step3SEO },
  { id: "media", title: "Media", description: "Featured image and gallery", component: Step4Media },
  { id: "review", title: "Review & Summary", description: "Review and publish", component: Step5ReviewSummary },
];

export function ArticleForm({ article, onSuccess, onCancel, trigger }: ArticleFormProps) {
  const [open, setOpen] = React.useState(false);

  const defaultValues = React.useMemo(() => {
    if (article) {
      return {
        title: article.title,
        slug: article.slug,
        category: article.category as "News" | "Player Profile" | "Guide" | "Review" | "Analysis" | "Interview" | "Opinion",
        status: article.status as "draft" | "published" | "archived",
        content: article.content,
        excerpt: article.excerpt,
        metaTitle: (article as Record<string, unknown>).metaTitle as string || "",
        metaDescription: (article as Record<string, unknown>).metaDescription as string || "",
        featuredImage: article.featuredImage || "",
        gallery: (article as Record<string, unknown>).gallery as string[] || [],
        tags: article.tags || [],
        publishedAt: article.publishedAt ? new Date(article.publishedAt) : undefined,
      };
    }
    return {
      title: "",
      slug: "",
      category: "News" as const,
      status: "draft" as const,
      content: "",
      excerpt: "",
      metaTitle: "",
      metaDescription: "",
      featuredImage: "",
      gallery: [],
      tags: [],
      publishedAt: undefined,
    };
  }, [article]);

  const handleSubmit = async (data: ArticleFormData) => {
    try {
      const submitData = {
        ...data,
        excerpt: data.excerpt || "",
        metaTitle: data.metaTitle || "",
        metaDescription: data.metaDescription || "",
        featuredImage: data.featuredImage || "",
        gallery: data.gallery || [],
        tags: data.tags || [],
        publishedAt: data.publishedAt ? data.publishedAt.toISOString() : new Date().toISOString(),
        author: article?.author || "Admin",
        views: article?.views || 0,
        likes: article?.likes || 0,
        createdAt: article?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      if (article) {
        await articlesAPI.update(article.id, submitData);
      } else {
        await articlesAPI.create(submitData);
      }
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      onCancel?.();
    }
  };

  return (
    <>
      {trigger && (
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          {trigger}
        </div>
      )}
      <BaseForm
        open={open}
        onOpenChange={handleOpenChange}
        schema={ArticleFormSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit as (data: FieldValues) => void | Promise<void>}
        steps={steps}
        title={article ? "Edit Article" : "Create New Article"}
      />
    </>
  );
}