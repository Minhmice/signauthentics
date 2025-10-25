"use client";

import * as React from "react";
import { BaseForm, FormStepConfig } from "@/app/dashboard/components/forms/BaseForm";
import { VoucherFormSchema } from "@/lib/form-utils";
import { vouchersAPI, type Voucher } from "@/lib/mock/db";
import { Step1BasicInfo } from "./VoucherFormSteps/Step1BasicInfo";
import { Step2ValueSettings } from "./VoucherFormSteps/Step2ValueSettings";
import { Step3EligibilityRules } from "./VoucherFormSteps/Step3EligibilityRules";
import { Step4UsageLimits } from "./VoucherFormSteps/Step4UsageLimits";
import { Step5ReviewSummary } from "./VoucherFormSteps/Step5ReviewSummary";
import { toast } from "sonner";
import { z } from "zod";

type VoucherFormData = z.infer<typeof VoucherFormSchema>;

interface VoucherFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  voucher?: Voucher;
  onSuccess?: () => void;
  onSave?: (data: Record<string, unknown>) => Promise<void>;
}

export function VoucherForm({ open, onOpenChange, voucher, onSuccess, onSave }: VoucherFormProps) {
  const isEdit = !!voucher;

  const handleSubmit = async (data: VoucherFormData) => {
    try {
      if (onSave) {
        await onSave(data);
      } else {
        // Convert form data to API format
        const apiData = {
          code: data.code,
          type: data.type,
          value: data.value,
          scope: data.scope,
          usageLimit: data.usageLimit,
          usedCount: data.usedCount,
          validFrom: data.validFrom?.toISOString() || "",
          validTo: data.validUntil?.toISOString() || "",
          status: data.isActive ? "active" : "inactive",
          description: data.description || "",
        };

        if (voucher) {
          await vouchersAPI.update(voucher.id, apiData);
          toast.success("Voucher updated successfully!");
        } else {
          await vouchersAPI.create(apiData);
          toast.success("Voucher created successfully!");
        }
      }
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error saving voucher:", error);
      toast.error("Failed to save voucher. Please try again.");
    }
  };

  const defaultValues: Partial<VoucherFormData> = {
    code: voucher?.code || "",
    name: voucher?.code || "", // Using code as name since Voucher type doesn't have name
    description: voucher?.description || "",
    type: (voucher?.type as "percentage" | "fixed_amount") || "percentage",
    value: voucher?.value || 0,
    scope: (voucher?.scope as "all" | "category" | "product" | "customer") || "all",
    minOrderAmount: 0,
    maxDiscountAmount: 0,
    usageLimit: voucher?.usageLimit || 0,
    usedCount: voucher?.usedCount || 0,
    validFrom: voucher?.validFrom ? new Date(voucher.validFrom) : undefined,
    validUntil: voucher?.validTo ? new Date(voucher.validTo) : undefined,
    isActive: voucher?.status === "active" || true,
    createdAt: voucher?.createdAt ? new Date(voucher.createdAt) : undefined,
  };

  const steps: FormStepConfig<any>[] = [
    {
      id: "basic",
      title: "Thông tin cơ bản",
      description: "Tên voucher và mô tả",
      component: Step1BasicInfo as any,
    },
    {
      id: "value",
      title: "Thiết lập giá trị",
      description: "Loại giảm giá và số tiền",
      component: Step2ValueSettings as any,
    },
    {
      id: "eligibility",
      title: "Điều kiện áp dụng",
      description: "Ai có thể sử dụng voucher này",
      component: Step3EligibilityRules as any,
    },
    {
      id: "limits",
      title: "Giới hạn sử dụng",
      description: "Hạn chế sử dụng và thời hạn",
      component: Step4UsageLimits as any,
    },
    {
      id: "review",
      title: "Xem lại",
      description: "Kiểm tra và lưu voucher",
      component: Step5ReviewSummary as any,
    },
  ];

  return (
    <BaseForm
      open={open}
      onOpenChange={onOpenChange}
      title={isEdit ? "Chỉnh sửa voucher" : "Tạo voucher mới"}
      description={isEdit ? "Cập nhật thông tin voucher" : "Tạo voucher mới cho hệ thống"}
      steps={steps}
      schema={VoucherFormSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Cập nhật" : "Tạo mới"}
      allowStepNavigation={true}
    />
  );
}