"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Step2CustomerInfo() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <FormSection
      title="Customer Information"
      description="Customer details and contact information"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name *</Label>
            <Input
              id="customerName"
              {...register("customerName")}
              placeholder="Enter customer name"
            />
            {errors.customerName && (
              <p className="text-sm text-red-500">{errors.customerName.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerEmail">Customer Email *</Label>
            <Input
              id="customerEmail"
              type="email"
              {...register("customerEmail")}
              placeholder="Enter customer email"
            />
            {errors.customerEmail && (
              <p className="text-sm text-red-500">{errors.customerEmail.message as string}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerPhone">Customer Phone *</Label>
          <Input
            id="customerPhone"
            {...register("customerPhone")}
            placeholder="Enter customer phone number"
          />
          {errors.customerPhone && (
            <p className="text-sm text-red-500">{errors.customerPhone.message as string}</p>
          )}
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Customer Guidelines</h4>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>• Customer information should be accurate and up-to-date</li>
            <li>• Email will be used for order confirmations and updates</li>
            <li>• Phone number should include country code if international</li>
            <li>• All customer fields are required for order processing</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
