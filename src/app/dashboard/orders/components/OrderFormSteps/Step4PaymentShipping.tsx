"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function Step4PaymentShipping() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <FormSection
      title="Payment & Shipping"
      description="Payment method, shipping details, and order totals"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select {...register("paymentMethod")}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.paymentMethod && (
              <p className="text-sm text-red-500">{errors.paymentMethod.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <Select {...register("paymentStatus")}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            {errors.paymentStatus && (
              <p className="text-sm text-red-500">{errors.paymentStatus.message as string}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fulfillmentStatus">Fulfillment Status</Label>
          <Select {...register("fulfillmentStatus")}>
            <SelectTrigger>
              <SelectValue placeholder="Select fulfillment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          {errors.fulfillmentStatus && (
            <p className="text-sm text-red-500">{errors.fulfillmentStatus.message as string}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="subtotal">Subtotal</Label>
            <Input
              id="subtotal"
              type="number"
              min="0"
              step="0.01"
              {...register("subtotal", { valueAsNumber: true })}
              placeholder="Enter subtotal"
            />
            {errors.subtotal && (
              <p className="text-sm text-red-500">{errors.subtotal.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tax">Tax</Label>
            <Input
              id="tax"
              type="number"
              min="0"
              step="0.01"
              {...register("tax", { valueAsNumber: true })}
              placeholder="Enter tax amount"
            />
            {errors.tax && (
              <p className="text-sm text-red-500">{errors.tax.message as string}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="shipping">Shipping</Label>
            <Input
              id="shipping"
              type="number"
              min="0"
              step="0.01"
              {...register("shipping", { valueAsNumber: true })}
              placeholder="Enter shipping cost"
            />
            {errors.shipping && (
              <p className="text-sm text-red-500">{errors.shipping.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount">Discount</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              step="0.01"
              {...register("discount", { valueAsNumber: true })}
              placeholder="Enter discount amount"
            />
            {errors.discount && (
              <p className="text-sm text-red-500">{errors.discount.message as string}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="total">Total</Label>
          <Input
            id="total"
            type="number"
            min="0"
            step="0.01"
            {...register("total", { valueAsNumber: true })}
            placeholder="Enter total amount"
          />
          {errors.total && (
            <p className="text-sm text-red-500">{errors.total.message as string}</p>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Payment Guidelines</h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Payment method determines how the customer will pay</li>
            <li>• Payment status tracks the current payment state</li>
            <li>• Fulfillment status tracks order processing and delivery</li>
            <li>• All monetary values should be in your base currency</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
