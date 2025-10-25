"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag, Percent, DollarSign, Users, Calendar, Shield, CheckCircle, XCircle } from "lucide-react";

interface Step5ReviewSummaryProps {
  form: UseFormReturn<Record<string, unknown>>;
}

export function Step5ReviewSummary({ form }: Step5ReviewSummaryProps) {
  const { watch } = form;
  const formData = watch() as any;

  const getDiscountText = () => {
    if (formData.type === "percentage") {
      return `${formData.value}% off`;
    } else {
      return `$${formData.value} off`;
    }
  };

  const getStatusColor = (status: boolean) => {
    return status ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
  };

  const getStatusIcon = (status: boolean) => {
    return status ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />;
  };

  const getScopeText = (scope: string) => {
    switch (scope) {
      case "all":
        return "All Products";
      case "jersey":
        return "Jerseys Only";
      case "ball":
        return "Balls Only";
      case "photo":
        return "Photos Only";
      case "boots":
        return "Boots Only";
      case "vietnam":
        return "Vietnam Products Only";
      case "custom":
        return "Custom Selection";
      default:
        return "All Products";
    }
  };

  return (
    <FormSection
      title="Review & Summary"
      description="Review voucher information before saving"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Voucher Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Basic Information</h4>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">Code:</span> {formData.code || "Not set"}</div>
                    <div><span className="font-medium">Name:</span> {formData.name || "Not set"}</div>
                    <div><span className="font-medium">Description:</span> {formData.description || "Not set"}</div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Status:</span>
                      <Badge className={getStatusColor(formData.isActive)}>
                        {getStatusIcon(formData.isActive)}
                        {formData.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Value Settings</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Discount:</span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {getDiscountText()}
                      </span>
                    </div>
                    <div><span className="font-medium">Type:</span> {formData.type === "percentage" ? "Percentage" : "Fixed Amount"}</div>
                    <div><span className="font-medium">Scope:</span> {getScopeText(formData.scope)}</div>
                    {formData.minOrderAmount > 0 && (
                      <div><span className="font-medium">Min Order:</span> ${formData.minOrderAmount}</div>
                    )}
                    {formData.maxDiscountAmount > 0 && (
                      <div><span className="font-medium">Max Discount:</span> ${formData.maxDiscountAmount}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Usage Limits</h4>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">Total Limit:</span> {formData.usageLimit || "Unlimited"}</div>
                    <div><span className="font-medium">Used:</span> {formData.usedCount || 0}</div>
                    {formData.usageLimit > 0 && (
                      <div><span className="font-medium">Remaining:</span> {formData.usageLimit - (formData.usedCount || 0)}</div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Validity Period</h4>
                  <div className="space-y-1 text-sm">
                    <div><span className="font-medium">Valid From:</span> {formData.validFrom ? new Date(formData.validFrom).toLocaleString() : "Not set"}</div>
                    <div><span className="font-medium">Valid Until:</span> {formData.validUntil ? new Date(formData.validUntil).toLocaleString() : "Not set"}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Example Usage</h4>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Order Amount:</span>
                    <span>$100.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount ({getDiscountText()}):</span>
                    <span className="text-green-600 dark:text-green-400">
                      -${formData.type === "percentage" ? 
                        (formData.maxDiscountAmount > 0 ? 
                          Math.min((100 * formData.value) / 100, formData.maxDiscountAmount).toFixed(2) : 
                          ((100 * formData.value) / 100).toFixed(2)
                        ) : 
                        Math.min(formData.value, 100).toFixed(2)
                      }
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-1">
                    <span>Final Amount:</span>
                    <span>
                      ${(100 - (formData.type === "percentage" ? 
                        (formData.maxDiscountAmount > 0 ? 
                          Math.min((100 * formData.value) / 100, formData.maxDiscountAmount) : 
                          (100 * formData.value) / 100
                        ) : 
                        Math.min(formData.value, 100)
                      )).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Customer Eligibility</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All customer types can use this voucher
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-green-500" />
                <span className="font-medium">Time Restrictions</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formData.validFrom && formData.validUntil ? 
                  "Valid for specific time period" : 
                  "No time restrictions"
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Security</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Standard security measures applied
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Ready to Save?</h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Review all the information above and click &ldquo;Save&rdquo; to create or update the voucher.
            {formData.isActive && " This voucher will be immediately available for use."}
            {!formData.isActive && " This voucher will be created but will not be active until you enable it."}
          </p>
        </div>
      </div>
    </FormSection>
  );
}