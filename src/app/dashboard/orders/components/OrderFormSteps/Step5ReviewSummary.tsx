"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, User, CreditCard, Truck, DollarSign, MapPin } from "lucide-react";

export function Step5ReviewSummary() {
  const { watch } = useFormContext();
  const formData = watch();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "completed":
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "credit_card":
      case "debit_card":
        return "💳";
      case "paypal":
        return "🅿️";
      case "bank_transfer":
        return "🏦";
      case "cash_on_delivery":
        return "💵";
      case "cryptocurrency":
        return "₿";
      default:
        return "💳";
    }
  };

  return (
    <FormSection
      title="Review & Summary"
      description="Review order information before saving"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Order Details</h4>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">Order Number:</span> {formData.orderNumber || "Not set"}</div>
                    <div><span className="font-medium">Order Date:</span> {formData.createdAt ? new Date(formData.createdAt).toLocaleString() : "Not set"}</div>
                    {formData.notes && (
                      <div><span className="font-medium">Notes:</span> {formData.notes}</div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Customer Information
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">Name:</span> {formData.customerName || "Not set"}</div>
                    <div><span className="font-medium">Email:</span> {formData.customerEmail || "Not set"}</div>
                    <div><span className="font-medium">Phone:</span> {formData.customerPhone || "Not set"}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Addresses
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Shipping:</span>
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        {formData.shippingAddress?.fullAddress || "Not set"}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Billing:</span>
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        {formData.billingAddress?.fullAddress || "Not set"}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Payment & Shipping
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Payment:</span>
                      <span>{getPaymentMethodIcon(formData.paymentMethod)}</span>
                      <span className="capitalize">{formData.paymentMethod?.replace("_", " ") || "Not set"}</span>
                      <Badge className={getStatusColor(formData.paymentStatus)}>
                        {formData.paymentStatus || "Not set"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Fulfillment:</span>
                      <Truck className="h-4 w-4" />
                      <Badge className={getStatusColor(formData.fulfillmentStatus)}>
                        {formData.fulfillmentStatus || "Not set"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {formData.items && formData.items.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Order Items</h4>
                <div className="space-y-2">
                  {formData.items.map((item: { id: string; productId: string; productName: string; quantity: number; price: number; total: number }, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <div className="font-medium">{item.productName || `Item ${index + 1}`}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.productId && `ID: ${item.productId}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${(item.total || 0).toFixed(2)}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {item.quantity || 1} × ${(item.price || 0).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${(formData.subtotal || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${(formData.tax || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${(formData.shipping || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span>-${(formData.discount || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total:</span>
                  <span>${(formData.total || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Ready to Save?</h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Review all the information above and click &ldquo;Save&rdquo; to create or update the order.
            {formData.paymentStatus === "completed" && " This order will be marked as paid."}
            {formData.fulfillmentStatus === "shipped" && " This order will be marked as shipped."}
          </p>
        </div>
      </div>
    </FormSection>
  );
}