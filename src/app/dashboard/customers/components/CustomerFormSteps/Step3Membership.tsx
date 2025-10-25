"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Step3Membership() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <FormSection
      title="Membership & Loyalty"
      description="Customer's membership tier and loyalty points"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="membershipTier">Membership Tier</Label>
            <Select {...register("membershipTier")}>
              <SelectTrigger>
                <SelectValue placeholder="Select membership tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bronze">Bronze</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
              </SelectContent>
            </Select>
            {errors.membershipTier && (
              <p className="text-sm text-red-500">{errors.membershipTier.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="loyaltyPoints">Loyalty Points</Label>
            <Input
              id="loyaltyPoints"
              type="number"
              min="0"
              {...register("loyaltyPoints", { valueAsNumber: true })}
              placeholder="Enter loyalty points"
            />
            {errors.loyaltyPoints && (
              <p className="text-sm text-red-500">{errors.loyaltyPoints.message as string}</p>
            )}
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Membership Benefits</h4>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>• <strong>Bronze:</strong> Basic benefits, 5% discount</li>
            <li>• <strong>Silver:</strong> Enhanced benefits, 10% discount</li>
            <li>• <strong>Gold:</strong> Premium benefits, 15% discount</li>
            <li>• <strong>Platinum:</strong> VIP benefits, 20% discount</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
