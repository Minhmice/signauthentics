"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "@/app/dashboard/components/forms/shared/FormSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Step4EmergencyContactProps {
  form: UseFormReturn<Record<string, unknown>>;
}

export function Step4EmergencyContact({ form }: Step4EmergencyContactProps) {
  const { register, formState: { errors } } = form;

  return (
    <FormSection
      title="Emergency Contact"
      description="Emergency contact information for safety and HR purposes"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
          <Input
            id="emergencyContactName"
            {...register("emergencyContactName")}
            placeholder="Enter emergency contact name"
          />
          {errors.emergencyContactName && (
            <p className="text-sm text-red-500">{errors.emergencyContactName.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
            <Input
              id="emergencyContactPhone"
              {...register("emergencyContactPhone")}
              placeholder="Enter emergency contact phone"
            />
            {errors.emergencyContactPhone && (
              <p className="text-sm text-red-500">{errors.emergencyContactPhone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyContactRelation">Relationship *</Label>
            <Select {...register("emergencyContactRelation")}>
              <SelectTrigger>
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.emergencyContactRelation && (
              <p className="text-sm text-red-500">{errors.emergencyContactRelation.message}</p>
            )}
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Emergency Contact Guidelines</h4>
          <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
            <li>• Emergency contact should be someone who can be reached 24/7</li>
            <li>• Contact information should be current and verified</li>
            <li>• This information is used only in emergency situations</li>
            <li>• Contact will be notified only when necessary for safety</li>
            <li>• All emergency contact data is kept confidential</li>
          </ul>
        </div>
      </div>
    </FormSection>
  );
}
