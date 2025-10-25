"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step3EligibilityRulesProps {
  form: UseFormReturn<Record<string, unknown>>;
}

export function Step3EligibilityRules({ form }: Step3EligibilityRulesProps) {
  const { register, formState: { errors } } = form;

  return (
    <FormSection
      title="Eligibility Rules"
      description="Who can use this voucher and under what conditions"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="validFrom">Valid From</Label>
            <Input
              id="validFrom"
              type="datetime-local"
              {...register("validFrom", { valueAsDate: true })}
            />
            {errors.validFrom && (
              <p className="text-sm text-red-500">{errors.validFrom.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="validUntil">Valid Until</Label>
            <Input
              id="validUntil"
              type="datetime-local"
              {...register("validUntil", { valueAsDate: true })}
            />
            {errors.validUntil && (
              <p className="text-sm text-red-500">{errors.validUntil.message}</p>
            )}
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Eligibility Guidelines</h4>
          <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>• <strong>Usage Limit:</strong> Maximum number of times this voucher can be used</li>
            <li>• <strong>Used Count:</strong> Current number of times the voucher has been used</li>
            <li>• <strong>Valid From:</strong> Start date and time when voucher becomes active</li>
            <li>• <strong>Valid Until:</strong> End date and time when voucher expires</li>
            <li>• Leave usage limit as 0 for unlimited usage</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
