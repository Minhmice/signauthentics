"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Step1BasicInfoProps {
  form: UseFormReturn<Record<string, unknown>>;
}

export function Step1BasicInfo({ form }: Step1BasicInfoProps) {
  const { register, formState: { errors } } = form;

  return (
    <FormSection
      title="Basic Information"
      description="Voucher name, code, and description"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="code">Voucher Code *</Label>
            <Input
              id="code"
              {...register("code")}
              placeholder="Enter voucher code"
            />
            {errors.code && (
              <p className="text-sm text-red-500">{errors.code.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Voucher Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter voucher name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Enter voucher description"
            rows={3}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isActive"
            {...register("isActive")}
          />
          <Label htmlFor="isActive">Active Voucher</Label>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Voucher Guidelines</h4>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>• Voucher code should be unique and easy to remember</li>
            <li>• Use uppercase letters and numbers for better readability</li>
            <li>• Description helps customers understand the voucher benefits</li>
            <li>• Only active vouchers can be used by customers</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
