"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Step4UsageLimitsProps {
  form: UseFormReturn<Record<string, unknown>>;
}

export function Step4UsageLimits({ form }: Step4UsageLimitsProps) {
  const { register, formState: { errors } } = form;

  return (
    <FormSection
      title="Usage Limits"
      description="Set usage restrictions and limits for this voucher"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="usageLimit">Usage Limit</Label>
            <Input
              id="usageLimit"
              type="number"
              min="0"
              {...register("usageLimit", { valueAsNumber: true })}
              placeholder="Enter usage limit (0 = unlimited)"
            />
            {errors.usageLimit && (
              <p className="text-sm text-red-500">{errors.usageLimit.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="usedCount">Used Count</Label>
            <Input
              id="usedCount"
              type="number"
              min="0"
              {...register("usedCount", { valueAsNumber: true })}
              placeholder="Enter current usage count"
            />
            {errors.usedCount && (
              <p className="text-sm text-red-500">{errors.usedCount.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              {...register("isActive")}
            />
            <Label htmlFor="isActive">Active Voucher</Label>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Usage Guidelines</h4>
            <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
              <li>• <strong>Usage Limit:</strong> Maximum number of times this voucher can be used</li>
              <li>• <strong>Used Count:</strong> Current number of times the voucher has been used</li>
              <li>• <strong>Active Status:</strong> Only active vouchers can be used by customers</li>
              <li>• Set usage limit to 0 for unlimited usage</li>
              <li>• Used count should not exceed the usage limit</li>
            </ul>
          </div>
        </div>
      </div>
    </FormSection>
  );
}
