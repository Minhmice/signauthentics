"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Step2ValueSettingsProps {
  form: UseFormReturn<Record<string, unknown>>;
}

export function Step2ValueSettings({ form }: Step2ValueSettingsProps) {
  const { register, formState: { errors } } = form;

  return (
    <FormSection
      title="Value Settings"
      description="Discount type, amount, and scope"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Discount Type *</Label>
            <Select {...register("type")}>
              <SelectTrigger>
                <SelectValue placeholder="Select discount type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Discount Value *</Label>
            <Input
              id="value"
              type="number"
              min="0"
              step="0.01"
              {...register("value", { valueAsNumber: true })}
              placeholder="Enter discount value"
            />
            {errors.value && (
              <p className="text-sm text-red-500">{errors.value.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="scope">Scope</Label>
          <Select {...register("scope")}>
            <SelectTrigger>
              <SelectValue placeholder="Select scope" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="category">Specific Category</SelectItem>
              <SelectItem value="product">Specific Product</SelectItem>
              <SelectItem value="customer">Specific Customer</SelectItem>
            </SelectContent>
          </Select>
          {errors.scope && (
            <p className="text-sm text-red-500">{errors.scope.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minOrderAmount">Minimum Order Amount</Label>
            <Input
              id="minOrderAmount"
              type="number"
              min="0"
              step="0.01"
              {...register("minOrderAmount", { valueAsNumber: true })}
              placeholder="Enter minimum order amount"
            />
            {errors.minOrderAmount && (
              <p className="text-sm text-red-500">{errors.minOrderAmount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxDiscountAmount">Maximum Discount Amount</Label>
            <Input
              id="maxDiscountAmount"
              type="number"
              min="0"
              step="0.01"
              {...register("maxDiscountAmount", { valueAsNumber: true })}
              placeholder="Enter maximum discount amount"
            />
            {errors.maxDiscountAmount && (
              <p className="text-sm text-red-500">{errors.maxDiscountAmount.message}</p>
            )}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Value Guidelines</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• <strong>Percentage:</strong> Enter value as percentage (e.g., 10 for 10%)</li>
            <li>• <strong>Fixed Amount:</strong> Enter value in your base currency</li>
            <li>• <strong>Scope:</strong> Determines which products the voucher applies to</li>
            <li>• <strong>Minimum Order:</strong> Customer must spend this amount to use voucher</li>
            <li>• <strong>Maximum Discount:</strong> Caps the total discount amount</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
