"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Step1OrderDetails() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <FormSection
      title="Order Details"
      description="Basic order information and identification"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="orderNumber">Order Number *</Label>
            <Input
              id="orderNumber"
              {...register("orderNumber")}
              placeholder="Enter order number"
            />
            {errors.orderNumber && (
              <p className="text-sm text-red-500">{errors.orderNumber.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerId">Customer ID *</Label>
            <Input
              id="customerId"
              {...register("customerId")}
              placeholder="Enter customer ID"
            />
            {errors.customerId && (
              <p className="text-sm text-red-500">{errors.customerId.message as string}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Order Notes</Label>
          <Textarea
            id="notes"
            {...register("notes")}
            placeholder="Enter any special notes or instructions"
            rows={3}
          />
          {errors.notes && (
            <p className="text-sm text-red-500">{errors.notes.message as string}</p>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Order Guidelines</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Order number should be unique and follow your naming convention</li>
            <li>• Customer ID must match an existing customer in the system</li>
            <li>• Notes can include special instructions or order requirements</li>
            <li>• All fields marked with * are required</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
