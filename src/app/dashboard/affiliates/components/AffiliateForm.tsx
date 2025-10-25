"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { BaseForm, FormStepConfig } from "@/app/dashboard/components/forms/BaseForm";
import { Step1BasicInfo } from "./AffiliateFormSteps/Step1BasicInfo";
import { Step2CommissionSettings } from "./AffiliateFormSteps/Step2CommissionSettings";
import { Step3ReviewSummary } from "./AffiliateFormSteps/Step3ReviewSummary";
import { VALIDATION_MESSAGES } from "@/lib/form-utils";
import * as z from "zod";

// Validation schema
const affiliateFormSchema = z
  .object({
    name: z
      .string()
      .min(2, VALIDATION_MESSAGES.minLength(2))
      .max(100, VALIDATION_MESSAGES.maxLength(100)),
    email: z
      .string()
      .email(VALIDATION_MESSAGES.email),
    phone: z
      .string()
      .min(10, VALIDATION_MESSAGES.minLength(10))
      .max(15, VALIDATION_MESSAGES.maxLength(15)),
    company: z
      .string()
      .min(2, VALIDATION_MESSAGES.minLength(2))
      .max(100, VALIDATION_MESSAGES.maxLength(100))
      .optional(),
    website: z
      .string()
      .url(VALIDATION_MESSAGES.url)
      .optional()
      .or(z.literal("")),
    commissionRate: z
      .number()
      .min(0, VALIDATION_MESSAGES.min(0))
      .max(100, VALIDATION_MESSAGES.max(100)),
    status: z.enum(["active", "inactive"]),
    notes: z
      .string()
      .max(500, VALIDATION_MESSAGES.maxLength(500))
      .optional(),
  });

export type AffiliateFormData = z.infer<typeof affiliateFormSchema>;

interface AffiliateFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  affiliate?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    website?: string;
    commissionRate: number;
    totalSales: number;
    totalCommission: number;
    referralsCount: number;
    status: string;
    notes?: string;
  };
  onSave?: (data: AffiliateFormData) => void;
}

export function AffiliateForm({ open, onOpenChange, affiliate, onSave }: AffiliateFormProps) {
  const isEdit = !!affiliate;

  const handleSubmit = async (data: AffiliateFormData) => {
    try {
      await onSave?.(data);
      onOpenChange(false);
      toast.success(
        affiliate ? "Affiliate updated successfully!" : "Affiliate created successfully!"
      );
    } catch (error) {
      console.error("Error saving affiliate:", error);
      toast.error("Failed to save affiliate. Please try again.");
    }
  };

  const defaultValues: Partial<AffiliateFormData> = {
    name: affiliate?.name || "",
    email: affiliate?.email || "",
    phone: affiliate?.phone || "",
    company: affiliate?.company || "",
    website: affiliate?.website || "",
    commissionRate: affiliate?.commissionRate || 5,
    status: (affiliate?.status as "active" | "inactive") || "active",
    notes: affiliate?.notes || "",
  };

  // Step wrapper components
  const Step1Wrapper = ({ form }: { form: UseFormReturn<AffiliateFormData> }) => <Step1BasicInfo form={form} />;
  const Step2Wrapper = ({ form }: { form: UseFormReturn<AffiliateFormData> }) => <Step2CommissionSettings form={form} />;
  const Step3Wrapper = ({ form }: { form: UseFormReturn<AffiliateFormData> }) => <Step3ReviewSummary form={form} />;

  const steps: FormStepConfig<AffiliateFormData>[] = [
    {
      id: "basic",
      title: "Thông tin cơ bản",
      description: "Thông tin liên hệ và công ty",
      component: Step1Wrapper,
    },
    {
      id: "commission",
      title: "Cài đặt hoa hồng",
      description: "Thiết lập tỷ lệ hoa hồng và ghi chú",
      component: Step2Wrapper,
    },
    {
      id: "review",
      title: "Xem lại",
      description: "Kiểm tra thông tin trước khi lưu",
      component: Step3Wrapper,
    },
  ];

  return (
    <BaseForm
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Chỉnh sửa đối tác" : "Thêm đối tác mới"}
      description={isEdit ? "Cập nhật thông tin đối tác" : "Thêm đối tác affiliate mới"}
      steps={steps}
      schema={affiliateFormSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Cập nhật" : "Tạo mới"}
      allowStepNavigation={true}
    />
  );
}
