"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Crown, Star, Shield, Clock } from "lucide-react";

export function Step5ReviewSummary() {
  const { watch } = useFormContext();
  const formData = watch();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "bronze":
        return <Star className="h-4 w-4" />;
      case "silver":
        return <Star className="h-4 w-4" />;
      case "gold":
        return <Crown className="h-4 w-4" />;
      case "platinum":
        return <Crown className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300";
      case "silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
      case "gold":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "platinum":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  return (
    <FormSection
      title="Review & Summary"
      description="Review customer information before saving"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={formData.avatar} alt="Customer avatar" />
                <AvatarFallback>
                  {formData.name ? getInitials(formData.name) : <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{formData.name || "Customer Name"}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formData.email || "customer@example.com"}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Contact Information</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{formData.email || "No email"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{formData.phone || "No phone"}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Account Status</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="capitalize">{formData.status || "Unknown"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>
                      {formData.lastLoginAt ? 
                        new Date(formData.lastLoginAt).toLocaleDateString('vi-VN') : 
                        "Never logged in"
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Membership</h4>
              <div className="flex items-center gap-2">
                <Badge className={`${getTierColor(formData.membershipTier)} flex items-center gap-1`}>
                  {getTierIcon(formData.membershipTier)}
                  {formData.membershipTier ? 
                    formData.membershipTier.charAt(0).toUpperCase() + formData.membershipTier.slice(1) : 
                    "No tier"
                  }
                </Badge>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formData.loyaltyPoints || 0} points
                </span>
              </div>
            </div>

            {formData.shippingAddresses && formData.shippingAddresses.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">Shipping Addresses</h4>
                <div className="space-y-2">
                  {formData.shippingAddresses.map((address: { id: string; label: string; fullAddress: string; isDefault: boolean }, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">{address.label}</div>
                        <div className="text-gray-600 dark:text-gray-400">{address.fullAddress}</div>
                        {address.isDefault && (
                          <Badge variant="secondary" className="mt-1">Default</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.bannedReason && (
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <h4 className="font-medium text-red-900 dark:text-red-100 mb-1">Ban Reason</h4>
                <p className="text-sm text-red-700 dark:text-red-300">{formData.bannedReason}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Ready to Save?</h4>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Review all the information above and click &ldquo;Save&rdquo; to create or update the customer.
            {formData.status === "banned" && " This customer will be banned and cannot place orders."}
          </p>
        </div>
      </div>
    </FormSection>
  );
}