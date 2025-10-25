"use client";

import * as React from "react";
import { toast } from "sonner";
import { BaseForm, FormStepConfig } from "@/app/dashboard/components/forms/BaseForm";
import { Step1BasicDetails } from "./ProductFormSteps/Step1BasicDetails";
import { Step2PricingInventory } from "./ProductFormSteps/Step2PricingInventory";
import { Step3Media } from "./ProductFormSteps/Step3Media";
import { Step4Description } from "./ProductFormSteps/Step4Description";
import { Step5ReviewSummary } from "./ProductFormSteps/Step5ReviewSummary";
import { VALIDATION_MESSAGES } from "@/lib/form-utils";
import * as z from "zod";

// Validation schema
const productFormSchema = z
  .object({
    title: z
      .string()
      .min(2, VALIDATION_MESSAGES.minLength(2))
      .max(200, VALIDATION_MESSAGES.maxLength(200)),
    slug: z.string().optional(),
    category: z.enum(["jersey", "ball", "photo", "boots", "vietnam"]),
    rarity: z.enum(["common", "rare", "epic", "legendary"]),
    playerId: z.string().optional(),
    limitedQty: z.number().min(0, VALIDATION_MESSAGES.nonNegative).optional(),
    priceVND: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
    originalPrice: z.number().min(0, VALIDATION_MESSAGES.nonNegative).optional(),
    accentHex: z.string().optional(),
    description: z.string().min(10, VALIDATION_MESSAGES.minLength(10)),
    images: z.array(z.string()).optional(),
    status: z.enum(["active", "inactive"]),
    stock: z.number().min(0, VALIDATION_MESSAGES.nonNegative),
    trackInventory: z.boolean(),
    // SEO fields
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.string().optional(),
  });

type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: {
    id: string;
    title: string;
    slug: string;
    category: string;
    rarity: string;
    playerId?: string;
    limitedQty?: number;
    priceVND: number;
    originalPrice?: number;
    accentHex?: string;
    description: string;
    images?: string[];
    status: string;
    stock: number;
    trackInventory: boolean;
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
  onSave?: (data: ProductFormData) => void;
}

export function ProductForm({ open, onOpenChange, product, onSave }: ProductFormProps) {
  const isEdit = !!product;

  const handleSubmit = async (data: ProductFormData) => {
    try {
      await onSave?.(data);
      onOpenChange(false);
      toast.success(
        product ? "Product updated successfully!" : "Product created successfully!"
      );
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    }
  };

  const defaultValues: Partial<ProductFormData> = {
    title: product?.title || "",
    slug: product?.slug || "",
    category: (product?.category as "jersey" | "ball" | "photo" | "boots" | "vietnam") || "jersey",
    rarity: (product?.rarity as "common" | "rare" | "epic" | "legendary") || "common",
    playerId: product?.playerId || "",
    limitedQty: product?.limitedQty || 0,
    priceVND: product?.priceVND || 0,
    originalPrice: product?.originalPrice || 0,
    accentHex: product?.accentHex || "",
    description: product?.description || "",
    images: product?.images || [],
    status: (product?.status as "active" | "inactive") || "active",
    stock: product?.stock || 0,
    trackInventory: product?.trackInventory || true,
    metaTitle: product?.metaTitle || "",
    metaDescription: product?.metaDescription || "",
    keywords: product?.keywords || "",
  };

  // Step wrapper components
  const Step1Wrapper = ({ form }: { form: any }) => <Step1BasicDetails form={form as any} images={[]} setImages={() => {}} />;
  const Step2Wrapper = ({ form }: { form: any }) => <Step2PricingInventory form={form as any} />;
  const Step3Wrapper = ({ form }: { form: any }) => <Step3Media form={form as any} images={[]} setImages={() => {}} />;
  const Step4Wrapper = ({ form }: { form: any }) => <Step4Description form={form as any} />;
  const Step5Wrapper = ({ form }: { form: any }) => <Step5ReviewSummary form={form as any} images={[]} />;

  const steps: FormStepConfig<ProductFormData>[] = [
    {
      id: "basic",
      title: "Thông tin cơ bản",
      description: "Tên sản phẩm, danh mục và thông tin cơ bản",
      component: Step1Wrapper,
    },
    {
      id: "pricing",
      title: "Giá và tồn kho",
      description: "Thiết lập giá bán và quản lý tồn kho",
      component: Step2Wrapper,
    },
    {
      id: "media",
      title: "Hình ảnh",
      description: "Tải lên hình ảnh sản phẩm",
      component: Step3Wrapper,
    },
    {
      id: "description",
      title: "Mô tả & SEO",
      description: "Mô tả chi tiết và thông tin SEO",
      component: Step4Wrapper,
    },
    {
      id: "review",
      title: "Xem lại",
      description: "Kiểm tra thông tin trước khi lưu",
      component: Step5Wrapper,
    },
  ];

  return (
    <BaseForm
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm mới"}
      description={isEdit ? "Cập nhật thông tin sản phẩm" : "Thêm sản phẩm mới vào hệ thống"}
      steps={steps}
      schema={productFormSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Cập nhật" : "Tạo mới"}
      allowStepNavigation={true}
    />
  );
}